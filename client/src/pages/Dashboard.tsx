import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Sidebar, PageTitle } from '../components';
const adminUrl = import.meta.env.VITE_ADMIN_BASE_URL;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const effectRan = useRef(false); // Track if effect has run
  useEffect(() => {
    if (effectRan.current === false) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${adminUrl}/api/users`, { withCredentials: true });
          setUser(response.data.profile_name);
        } catch (error) {
          if (axios.isAxiosError(error) && error?.response?.data) {
            if (error.response.data === 'No access token found') navigate('/');
            setError(error.response.data);
          } else {
            console.error('Unexpected error:', error);
            setError('An unexpected error occurred.');
          }
        }
      };

      fetchUserProfile();

      effectRan.current = true; // Set the flag after first run
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <PageTitle title={`Hi ${user}, welcome back!`} />
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default Dashboard;
