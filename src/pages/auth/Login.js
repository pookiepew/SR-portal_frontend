import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import Logo from '../../components/ui/Logo';
import Trucks from '../../components/ui/Trucks';

import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const path = localStorage.getItem('path');

  if (user.isAuthenticated && path) return <Redirect to={path} />;
  if (user.isAuthenticated) return <Redirect to='/' />;
  return (
    <section className='h-screen lg:flex'>
      <aside className='pt-16 lg:w-2/5'>
        <Logo className='w-3/4 m-auto sm:w-2/4 md:w-1/4' />
        <h1 className='font-heading font-semibold text-center text-2xl mt-10 md:text-4xl'>
          Sign In
        </h1>
        <LoginForm />
      </aside>
      <aside className='relative hidden lg:w-3/5 h-full overflow-hidden lg:block'>
        <div className='overlay'></div>
        <Trucks className='block trucks bg-cover' />
      </aside>
    </section>
  );
};

export default Login;
