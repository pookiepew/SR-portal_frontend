import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';

import Moment from 'react-moment';

import useInput from '../hooks/use-input';

import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';

import EyeIcon from '../components/ui/icons/Eye-icon';
import EyeOffIcon from '../components/ui/icons/Eye-off-icon';

import {
  checkPassword,
  changePassword,
} from '../store/actions-creators/auth-actions';
import { authActions } from '../store/slices/auth-slice';

const Profile = () => {
  const { user, loading, changePasswordIsValid } = useSelector(
    (state) => state.auth
  );
  const { notification } = useSelector((state) => state.ui);

  const [inputType, setInputType] = useState('password');
  const [changeUserPassword, setChangeUserPassword] = useState(false);
  const [password1InputType, setPassword1InputType] = useState('password');
  const [password2InputType, setPassword2InputType] = useState('password');

  useEffect(() => {
    localStorage.setItem('path', '/profile');
    document.title = 'SR Portal - Profile';
  }, []);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: clearPasswordField,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: enteredPassword1,
    isValid: enteredPassword1IsValid,
    hasError: password1InputHasError,
    valueChangeHandler: password1ChangeHandler,
    inputBlurHandler: password1BlurHandler,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: enteredPassword2,
    isValid: enteredPassword2IsValid,
    hasError: password2InputHasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
  } = useInput((value) => value.trim() === enteredPassword1);

  useEffect(() => {
    if (notification.message === 'Password is correct') {
      clearPasswordField();
    }
  }, [notification, clearPasswordField]);

  const togglePasswordInputHandler = (e) => {
    e.preventDefault();
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
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

  const dispatch = useDispatch();

  const checkPasswordSubmitHandler = (e) => {
    e.preventDefault();
    if (!enteredPasswordIsValid) return;
    dispatch(checkPassword(enteredPassword));
  };

  const changePasswordSubmitHandler = (e) => {
    e.preventDefault();
    if (!enteredPassword1IsValid || !enteredPassword2IsValid) return;
    dispatch(changePassword(enteredPassword1, enteredPassword2));
  };

  const cancelPasswordChangeHandler = () => {
    clearPasswordField();
    setChangeUserPassword(false);
    dispatch(authActions.changePasswordHandler(null));
  };

  const baseInputClasses =
    'block w-full h-9 rounded border pl-2 outline-none hover:border-secondary xl:h-11';

  const passwordInputClasses = !passwordInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const password1InputClasses = !password1InputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const password2InputClasses = !password2InputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  if (!user.isAuthenticated) return <Redirect to='/login' />;
  return (
    <section className='w-full flex pl-4 sm:pl-6 md:pl-8'>
      <Card className='w-full md:w-96 min-w-max mt-5'>
        <div>
          <h5 className='font-heading font-semibold mb-5 capitalize text-lg'>
            {user.name}
          </h5>
          {user.profileImage && <img src={user.profileImage} alt={user.name} />}
        </div>
        <ul className='text-sm'>
          <li className='flex py-2'>
            <h6 className='font-bold w-24'>Email:</h6>
            <a
              href={'mailto:' + user.email}
              className='pl-3 text-blue-500 hover:text-secondary'
            >
              {user.email}
            </a>
          </li>
          <li className='flex py-2'>
            <p className='font-bold w-24'>Joined:</p>
            <Moment className='pl-3'>{user.createdAt}</Moment>
          </li>
          <li className='flex py-2'>
            <p className='font-bold w-24'>Last Updated:</p>
            <Moment className='pl-3'>{user.updatedAt}</Moment>
          </li>
          <li className='flex py-2'>
            <p className='font-bold w-24'>Invited By:</p>
            <p className='pl-3'>
              <span className='capitalize hover:text-black'>
                {user.invitedBy?.name}
              </span>
            </p>
          </li>
          <li className='flex items-center py-2'>
            <p className='font-bold w-24'>Roles:</p>
            <p className='pl-3 text-xs text-gray-600'>
              Create - Read - Update - Delete
            </p>
          </li>
          <ul className='flex flex-col mt-1'>
            {user.roles?.map((role) => (
              <li key={role._id} className='flex list px-3'>
                <span className='w-24 capitalize py-2'>{role.feature}</span>
                <span className='py-2'>{role.access}</span>
              </li>
            ))}

            <button
              className='text-white rounded-sm bg-red-600 w-full py-1 mt-5 hover:bg-red-700'
              onClick={() => setChangeUserPassword(true)}
            >
              Change Password
            </button>
          </ul>
        </ul>
      </Card>
      {changeUserPassword && (
        <>
          <Modal onClick={cancelPasswordChangeHandler}>
            <div className='flex flex-col items-center text-gray-800'>
              <h3 className='font-bold text-xl pb-5 text-red-600'>
                Change Password
              </h3>
              {changePasswordIsValid === null && (
                <form
                  className='mt-4 w-full'
                  onSubmit={checkPasswordSubmitHandler}
                >
                  <div>
                    <label
                      htmlFor='password'
                      className='text-label text-sm top-1/4 left-2 xl:text-base'
                    >
                      Current password
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
                            checkPasswordSubmitHandler(e);
                          }
                        }}
                        autoFocus
                      />
                      <button
                        className='absolute top-0 right-0 px-3 h-full rounded text-gray-600 hover:text-primary hover:shadow-inner'
                        onClick={togglePasswordInputHandler}
                        tabIndex='-1'
                      >
                        {inputType === 'password' ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
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
                        className='flex items-center justify-center text-center px-4 xl:px-2 text-xs xl:text-sm bg-red-500 text-white w-full mt-8 h-8 rounded drop-shadow-lg shadow'
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
                    className='bg-green-600 text-white w-full mt-8 h-8 rounded drop-shadow-lg shadow focus:outline-none hover:bg-green-700'
                  >
                    {loading ? <Loader /> : 'Check password'}
                  </button>
                </form>
              )}
              {changePasswordIsValid && (
                <form
                  className='mt-4 w-full'
                  onSubmit={changePasswordSubmitHandler}
                >
                  <div>
                    <label
                      htmlFor='password1'
                      className='text-label text-sm top-1/4 left-2 xl:text-base'
                    >
                      Enter new password
                    </label>
                    <div className='relative'>
                      <input
                        type={password1InputType}
                        id='password1'
                        className={password1InputClasses}
                        onChange={password1ChangeHandler}
                        onBlur={password1BlurHandler}
                        value={enteredPassword1}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            changePasswordSubmitHandler(e);
                          }
                        }}
                        autoFocus
                      />
                      <button
                        className='absolute top-0 right-0 px-3 h-full rounded text-gray-600 hover:text-primary hover:shadow-inner'
                        onClick={togglePassword1InputHandler}
                        tabIndex='-1'
                      >
                        {inputType === 'password' ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
                      </button>
                    </div>
                    {password1InputHasError && (
                      <p className='text-red-500 text-xs mt-1 xl:text-sm'>
                        Entered password is not correct format or length
                      </p>
                    )}
                  </div>
                  <div className='mt-5'>
                    <label
                      htmlFor='password2'
                      className='text-label text-sm top-1/4 left-2 xl:text-base'
                    >
                      Confirm password
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
                            changePasswordSubmitHandler(e);
                          }
                        }}
                      />
                      <button
                        className='absolute top-0 right-0 px-3 h-full rounded text-gray-600 hover:text-primary hover:shadow-inner'
                        onClick={togglePassword2InputHandler}
                        tabIndex='-1'
                      >
                        {inputType === 'password' ? (
                          <EyeIcon />
                        ) : (
                          <EyeOffIcon />
                        )}
                      </button>
                    </div>
                    {password2InputHasError && (
                      <p className='text-red-500 text-xs mt-1 xl:text-sm'>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                  {notification.show && (
                    <AnimatePresence exitBeforeEnter>
                      <motion.p
                        className='flex items-center justify-center text-center px-4 xl:px-2 text-xs xl:text-sm bg-green-600 text-white w-full mt-8 h-8 rounded drop-shadow-lg shadow'
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
                    className='bg-green-600 text-white w-full mt-8 h-8 rounded drop-shadow-lg shadow focus:outline-none hover:bg-green-700'
                  >
                    {loading ? <Loader /> : 'Submit'}
                  </button>
                </form>
              )}
              <button
                className='bg-primary text-white w-full mt-3 h-8 rounded drop-shadow-lg shadow focus:outline-none hover:bg-primaryHover'
                onClick={cancelPasswordChangeHandler}
              >
                Cancel
              </button>
            </div>
          </Modal>
        </>
      )}
    </section>
  );
};

export default Profile;
