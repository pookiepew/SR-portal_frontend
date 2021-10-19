import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { registerUser } from '../../store/actions-creators/auth-actions';

import EyeIcon from '../ui/icons/Eye-icon';

import EyeOffIcon from '../ui/icons/Eye-off-icon';

import useInput from '../../hooks/use-input';

const RegisterForm = ({ email }) => {
  const [password1InputType, setPassword1InputType] = useState('password');
  const [password2InputType, setPassword2InputType] = useState('password');

  const dispatch = useDispatch();
  const baseInputClasses =
    'block w-full h-9 rounded border pl-2 outline-none hover:border-secondary xl:h-11';

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.length >= 2);

  const {
    value: enteredSurName,
    isValid: enteredSurNameIsValid,
    hasError: surNameInputHasError,
    valueChangeHandler: surNameChangeHandler,
    inputBlurHandler: surNameBlurHandler,
  } = useInput((value) => value.length >= 2);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: enteredPassword2,
    isValid: enteredPassword2IsValid,
    hasError: password2InputHasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
  } = useInput((value) => value === enteredPassword);

  const firstNameInputClasses = !firstNameInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const surNameInputClasses = !surNameInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const passwordInputClasses = !passwordInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const password2InputClasses = !password2InputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const submitHandler = (e) => {
    e.preventDefault();

    passwordBlurHandler();

    if (
      !enteredFirstNameIsValid ||
      !enteredSurNameIsValid ||
      !enteredPasswordIsValid ||
      !enteredPassword2IsValid
    ) {
      return;
    }

    const firstName = enteredFirstName.toLowerCase().trim();
    const surName = enteredSurName.toLowerCase().trim();

    dispatch(
      registerUser({
        firstName,
        surName,
        email,
        password1: enteredPassword,
        password2: enteredPassword2,
      })
    );
  };

  const togglePassword1InputHandler = (e) => {
    e.preventDefault();
    if (password1InputType === 'password') {
      setPassword1InputType('text');
    } else {
      setPassword1InputType('password');
    }
  };

  const togglePassword2InputHandler = (e) => {
    e.preventDefault();
    if (password2InputType === 'password') {
      setPassword2InputType('text');
    } else {
      setPassword2InputType('password');
    }
  };

  return (
    <form
      className='w-screen px-8 pt-8 md:w-3/4 md:m-auto'
      onSubmit={submitHandler}
    >
      <div>
        <label
          htmlFor='name'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          First Name
        </label>
        <input
          type='text'
          id='firstname'
          className={firstNameInputClasses}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          value={enteredFirstName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitHandler(e);
            }
          }}
          autoFocus
          required
        />
        {firstNameInputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            First name must be provided
          </p>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='name'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          Last Name
        </label>
        <input
          type='text'
          id='surname'
          className={surNameInputClasses}
          onChange={surNameChangeHandler}
          onBlur={surNameBlurHandler}
          value={enteredSurName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitHandler(e);
            }
          }}
          required
        />
        {surNameInputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            Last name must be provided
          </p>
        )}
      </div>

      <div className='mt-4'>
        <label
          htmlFor='email'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          className='select-none block w-full h-9 rounded border pl-2 outline-none hover:border-secondary xl:h-11'
          value={email || ''}
          disabled={true}
        />
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
            type={password1InputType}
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
            onClick={togglePassword1InputHandler}
            tabIndex='-1'
          >
            {password1InputType === 'password' ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {passwordInputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            Password must be at least 6 characters
          </p>
        )}
      </div>
      <div className='mt-4'>
        <label
          htmlFor='password2'
          className='text-label text-sm top-1/4 left-2 xl:text-base'
        >
          Confirm Password
        </label>
        <div className='relative'>
          <input
            type={password2InputType}
            id='password2'
            className={password2InputClasses}
            onChange={password2ChangeHandler}
            onBlur={password2BlurHandler}
            value={enteredPassword2}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitHandler(e);
              }
            }}
            required
          />
          <button
            className='absolute top-0 right-0 px-3 h-full rounded text-gray-600 hover:text-primary hover:shadow-inner'
            onClick={togglePassword2InputHandler}
            tabIndex='-1'
          >
            {password2InputType === 'password' ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {password2InputHasError && (
          <p className='text-red-500 text-xs mt-1 xl:text-sm'>
            Passwords do not match
          </p>
        )}
      </div>

      <button
        type='submit'
        className='bg-primary text-white w-full mt-8 h-9 rounded drop-shadow-lg shadow focus:outline-none xl:h-11'
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
