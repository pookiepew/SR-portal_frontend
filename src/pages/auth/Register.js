import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Logo from '../../components/ui/Logo';
import Trucks from '../../components/ui/Trucks';

import RegisterForm from '../../components/forms/RegisterForm';

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const { email, token } = useParams();

  if (user.isAuthenticated) return <Redirect to='/' />;

  localStorage.setItem('token', token);

  return (
    <section className='h-screen lg:flex'>
      <aside className='pt-16 lg:w-2/5'>
        <Logo className='w-3/4 m-auto sm:w-2/4 md:w-1/4' />
        <h1 className='font-heading font-semibold text-center text-2xl mt-10 md:text-4xl'>
          Register
        </h1>
        <RegisterForm email={email} />
      </aside>
      <aside className='relative hidden lg:w-3/5 h-full overflow-hidden lg:block'>
        <div className='overlay'></div>
        <Trucks className='block trucks bg-cover' />
      </aside>
    </section>
  );
};

export default Register;
