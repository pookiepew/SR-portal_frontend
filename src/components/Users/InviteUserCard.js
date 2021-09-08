import { useDispatch, useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';

import { inviteUser } from '../../store/actions-creators/users-actions';

import useInput from '../../hooks/use-input';

import Modal from '../ui/Modal';
import Loader from '../ui/Loader';

import MailIcon from '../ui/icons/Mail-icon';

const InviteUserModal = ({
  toggleInviteCardHandler,
  setShowInviteUserModal,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.users);
  const { notification } = useSelector((state) => state.ui);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: clearEmailInput,
  } = useInput((value) => value.includes('@'));

  const baseInputClasses =
    'h-7 w-64 rounded border pl-2 outline-none hover:border-primary';

  const emailInputClasses = !emailInputHasError
    ? baseInputClasses
    : baseInputClasses + ' border-red-500';

  const sendInviteHandler = () => {
    if (!enteredEmailIsValid) return;
    dispatch(inviteUser(enteredEmail));
    clearEmailInput();
    setShowInviteUserModal(false);
  };

  return (
    <>
      <Modal onClick={() => toggleInviteCardHandler(clearEmailInput)}>
        <div className='flex flex-col max-w-lg items-center text-gray-800'>
          <h3 className='font-bold text-xl pb-5'>Invite User</h3>
          <div className='mb-5'>
            <p>
              Invite a user by entering their email below. The person you invite
              will receive an invitation email they must accept within 24 hours.
            </p>
          </div>
          <div className='flex w-full items-center justify-center'>
            <MailIcon className='h-8 mr-2 text-primary' />
            <div className='relative'>
              <input
                type='email'
                id='email'
                className={emailInputClasses}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                autoFocus
              />
              {emailInputHasError && (
                <p className='absolute -bottom-5 left-2 text-red-500 text-xs xl:text-sm'>
                  Entered email is not valid
                </p>
              )}
            </div>
          </div>
          <p className='mt-10 mb-5'>Are you sure?</p>
          {notification.show && (
            <AnimatePresence exitBeforeEnter>
              <motion.p
                className='flex items-center justify-center text-center px-4 xl:px-2 text-xs xl:text-sm bg-green-500 text-white w-full mt-5 h-8 rounded drop-shadow-lg shadow'
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
              >
                {notification.message}
              </motion.p>
            </AnimatePresence>
          )}
          <div>
            <button
              className='bg-green-600 text-white font-semibold px-4 py-1 rounded-sm mr-5 hover:bg-green-700'
              onClick={sendInviteHandler}
            >
              {loading ? <Loader /> : 'Send Invite'}
            </button>
            <button
              className='bg-primary text-white font-semibold px-4 py-1 rounded-sm hover:bg-primaryHover'
              onClick={() => toggleInviteCardHandler(clearEmailInput)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InviteUserModal;
