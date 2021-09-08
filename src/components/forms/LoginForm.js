import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../store/actions-creators/auth-actions';

import { AnimatePresence, motion } from 'framer-motion';

import Loader from '../ui/Loader';

import EyeIcon from '../ui/icons/Eye-icon';

import EyeOffIcon from '../ui/icons/Eye-off-icon';

import useInput from '../../hooks/use-input';

const LoginForm = () => {
  const [inputType, setInputType] = useState('password');

  const { loading } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const baseInputClasses =
    'block w-full h-9 rounded border pl-2 outline-none hover:border-secondary xl:h-11';

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);

  const emailInputClasses = !emailInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const passwordInputClasses = !passwordInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const submitHandler = (e) => {
    e.preventDefault();

    emailBlurHandler();
    passwordBlurHandler();

    if (!enteredEmailIsValid || !enteredPasswordIsValid) return;

    dispatch(loginUser(enteredEmail.toLowerCase(), enteredPassword));
  };

  const togglePasswordInputHandler = (e) => {
    e.preventDefault();
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  return (
    <form
      className='w-screen px-8 pt-8 md:w-3/4 md:m-auto'
      onSubmit={submitHandler}
    >
      <div>
        <label
          htmlFor='email'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          className={emailInputClasses}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitHandler(e);
            }
          }}
          autoFocus
          required
        />
        {emailInputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            Entered email is not valid
          </p>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='password'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          Password
        </label>
        <div className='relative'>
          <input
            type={inputType}
            id='password'
            className={passwordInputClasses}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitHandler(e);
              }
            }}
            required
          />
          <button
            className='absolute top-0 right-0 px-3 h-full rounded text-gray-600 hover:text-primary hover:shadow-inner'
            onClick={togglePasswordInputHandler}
            tabIndex='-1'
          >
            {inputType === 'password' ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {passwordInputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            Entered password is not correct format or length
          </p>
        )}
      </div>
      {notification.show && (
        <AnimatePresence exitBeforeEnter>
          <motion.p
            className='w-full bg-red-600 text-white rounded drop-shadow-lg h-11 flex items-center justify-center text-center mt-5 px-4 xl:px-2 text-xs xl:text-base'
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
          >
            {notification.message}
          </motion.p>
        </AnimatePresence>
      )}
      <button
        type='submit'
        className='bg-primary text-white w-full h-9 rounded drop-shadow-lg shadow focus:outline-none xl:h-11 hover:bg-primaryHover mt-8'
      >
        {loading ? <Loader className='border-white' /> : 'Sign in!'}
      </button>
    </form>
  );
};

export default LoginForm;
