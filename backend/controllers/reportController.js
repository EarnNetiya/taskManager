const Task = require('../models/Task');
const User = require('../models/User');
const excelJS = require('exceljs');

// Export all tasks as Excel/PDF
// GET /api/reports/export/tasks
const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tasks Report');

        worksheet.columns = [
            { header: 'Task ID', key: '_id', width: 25 },
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Priority', key: 'priority', width: 15 },
            { header: 'Status', key: 'status', width: 20 },
            { header: 'Due Date', key: 'dueDate', width: 20 },
            { header: 'Assigned To', key: 'assignedTo', width: 30 },
        ];

        tasks.forEach((tasks) => {
            const assignedTo = tasks.assignedTo
                .map((user) => `${user.name} (${user.email})`)
                .join(', ');
            worksheet.addRow({
                _id: tasks._id,
                title: tasks.title,
                description: tasks.description,
                priority: tasks.priority,
                status: tasks.status,
                dueDate: tasks.dueDate.toISOString().split('T')[0],
                assignedTo: assignedTo || 'Unassigned',
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=tasks_report.xlsx`
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export user-task report as Excel/PDF
// GET /api/reports/export/users
const exportUsersReport = async (req, res) => {
    try {
        const users = await User.find().select('name email _id').lean();
        const userTasks = await Task.find().populate(
            'assignedTo', 
            'name email _id'
        );

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                InProgressTasks: 0,
                completedTasks: 0,
            };
        });

        userTasks.forEach((task) => {
            if (task.assignedTo) {
                task.assignedTo.forEach((user) => {
                    userTaskMap[user._id].taskCount += 1;
                    if (task.status === 'Pending') {
                        userTaskMap[user._id].pendingTasks += 1;
                    } else if (task.status === 'In Progress') {
                        userTaskMap[user._id].completedTasks += 1;
                    } else if (task.status === 'Completed') {
                        userTaskMap[user._id].InProgressTasks += 1;
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users Task Report');

        worksheet.columns = [
            { header: 'User Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 40 },
            { header: 'Total Tasks', key: 'taskCount', width: 20 },
            { header: 'Pending Tasks', key: 'pendingTasks', width: 20 },
            { header: 'In Progress Tasks', key: 'InProgressTasks', width: 20 },
            { header: 'Completed Tasks', key: 'completedTasks', width: 20 },
        ];

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=users_report.xlsx`
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    exportTasksReport,
    exportUsersReport,
};