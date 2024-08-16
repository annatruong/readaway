import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { readawayLogo } from '../assets';
import { ErrorMessage } from '../components';
const adminUrl = import.meta.env.VITE_ADMIN_BASE_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      console.log('adminUrl: ', adminUrl);
      const response = await axios.post(`${adminUrl}/auth/login`, { email, password }, { withCredentials: true });

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.data) {
        setError(error.response.data);
      } else {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 my-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={readawayLogo} alt="Readaway logo" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customDarkGreen sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-customDarkGreen hover:text-customGreen">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 mb-10">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customDarkGreen sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {error && <ErrorMessage message={error} />}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-customDarkGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customDarkGreen"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold leading-6 text-customDarkGreen hover:text-customGreen">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
