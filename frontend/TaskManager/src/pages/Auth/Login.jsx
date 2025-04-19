import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefalut();
  };
  return (
    <AuthLayout>
      
    </AuthLayout>
  )
};

export default Login;