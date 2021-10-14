import { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

// import Filepond from '../components/ui/FilePond';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    localStorage.setItem('path', '/');
    document.title = 'SR Portal - Dashboard';
  }, []);

  if (user && !user.isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <section className='w-full px-4 sm:pl-72'>
      <h1 className='mt-3'>Dashboard</h1>
      {/* <Filepond className='w-1/2' /> */}
    </section>
  );
};

export default Dashboard;
