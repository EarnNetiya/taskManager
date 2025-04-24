export const BASE_URL = 'http://localhost:8000';

// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Register a new user
        LOGIN: "/api/auth/login", // Login a user
        GET_PROFILE: "/api/auth/profile", // Get user profile
    },

    USERS: {
        GET_ALL_USERS: "/api/users", // Get all users
        GET_USER: (userId) => `/api/users/${userId}`, // Get a specific user
        CREATE_USER: "/api/users", // Create a new user
        UPDATE_USER: (userId) => `/api/users/${userId}`, // Update a specific user
        DELETE_USER: (userId) => `/api/users/${userId}`, // Delete a specific user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", // Get dashboard tasks
        GET_USER_DASHBOARD_DATA: '/api/tasks/user-dashboard-data}', // Get user dashboard tasks
        GET_ALL_TASKS: "/api/tasks", // Get all tasks
        GET_TASKS_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get a specific task
        CREATE_TASK: "/api/tasks", // Create a new task
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, // Update a specific task  
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete a specific task

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update todo checked status
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", // Download all tasks as an excel file
        EXPORT_USERS: "/api/reports/export/users", // Download all users as an excel file
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload an image
    },
}