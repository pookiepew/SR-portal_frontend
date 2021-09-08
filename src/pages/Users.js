import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { fade } from '../variants';

import {
  deleteUser,
  getActiveUsers,
  getInvitedUsers,
  getDeletedUsers,
} from '../store/actions-creators/users-actions';

import UserCard from '../components/Users/UserCard';
import ActiveUsers from '../components/Users/ActiveUsers';
import InvitedUsers from '../components/Users/InvitedUsers';
import DeletedUsers from '../components/Users/DeletedUsers';
import DeleteUserCard from '../components/Users/DeleteUserCard';
import InviteUserCard from '../components/Users/InviteUserCard';

const Users = () => {
  const user = useSelector((state) => state.auth.user);
  const { activeUsers, invitedUsers, deletedUsers } = useSelector(
    (state) => state.users
  );

  const [component, setComponent] = useState('Active-users');

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteUserCard, setShowDeleteUserCard] = useState(false);
  const [showInviteUserCard, setShowInviteUserCard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'SR Portal - Users';
    dispatch(getActiveUsers());

    if (component === 'Invited-users') {
      dispatch(getInvitedUsers());
    }
    if (component === 'Deleted-users') {
      dispatch(getDeletedUsers());
    }
    setSelectedUser(user);
  }, [dispatch, user, component]);

  useEffect(() => {
    localStorage.setItem('path', '/users');
  }, []);

  const selectUserHandler = (name) => {
    const user = activeUsers.filter((user) => user.name === name);
    setSelectedUser(user[0]);
  };

  const toggleInviteCardHandler = (clearEmailInput) => {
    setShowInviteUserCard(!showInviteUserCard);
    if (showInviteUserCard) {
      clearEmailInput();
    }
  };

  const toggleDeleteCardHandler = () => {
    setUserToDelete(selectedUser);
    setShowDeleteUserCard(!showDeleteUserCard);
  };

  const deleteUserHandler = () => {
    setShowDeleteUserCard(false);
    dispatch(deleteUser(userToDelete._id));
    setSelectedUser(user);
  };

  if (!user.isAuthenticated) return <Redirect to='/login' />;
  return (
    <section className='w-full pl-4 sm:pl-6 md:pl-8'>
      <ul className='flex items-center h-10 mt-3 text-sm sm:text-base'>
        <li
          className={
            component === 'Active-users'
              ? 'h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Active-users')}
        >
          Active Users
        </li>
        <li
          className={
            component === 'Invited-users'
              ? 'h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Invited-users')}
        >
          Invited Users
        </li>
        <li
          className={
            component === 'Deleted-users'
              ? 'h-6 font-bold border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Deleted-users')}
        >
          Deleted Users
        </li>
      </ul>
      <AnimatePresence exitBeforeEnter>
        {component === 'Active-users' && (
          <motion.section
            className='md:flex'
            variants={fade}
            initial='hidden'
            animate={component === 'Active-users' ? 'visible' : 'hidden'}
            key={component}
          >
            <ActiveUsers
              users={activeUsers}
              toggleInviteCardHandler={toggleInviteCardHandler}
              setSelectedUser={setSelectedUser}
            />
            <AnimatePresence exitBeforeEnter>
              {selectedUser && (
                <UserCard
                  user={user}
                  selectedUser={selectedUser}
                  toggleDeleteCardHandler={toggleDeleteCardHandler}
                  selectUserHandler={selectUserHandler}
                  component={component}
                  key='UserCard'
                />
              )}
              {showInviteUserCard && (
                <InviteUserCard
                  toggleInviteCardHandler={toggleInviteCardHandler}
                  setShowInviteUserCard={setShowInviteUserCard}
                  key='InviteCard'
                />
              )}
              {showDeleteUserCard && (
                <DeleteUserCard
                  user={userToDelete}
                  toggleDeleteCardHandler={toggleDeleteCardHandler}
                  deleteUserHandler={deleteUserHandler}
                  key='DeleteModal'
                />
              )}
            </AnimatePresence>
          </motion.section>
        )}
        {component === 'Invited-users' && (
          <motion.section
            className='md:flex'
            variants={fade}
            initial='hidden'
            animate={component === 'Invited-users' ? 'visible' : 'hidden'}
            key={component}
          >
            <InvitedUsers
              users={invitedUsers}
              toggleInviteCardHandler={toggleInviteCardHandler}
              setSelectedUser={setSelectedUser}
            />
            <AnimatePresence exitBeforeEnter>
              {selectedUser && (
                <UserCard
                  user={user}
                  selectedUser={selectedUser}
                  toggleDeleteCardHandler={toggleDeleteCardHandler}
                  selectUserHandler={selectUserHandler}
                  component={component}
                  key='UserCard'
                />
              )}
              {showInviteUserCard && (
                <InviteUserCard
                  toggleInviteCardHandler={toggleInviteCardHandler}
                  setShowInviteUserCard={setShowInviteUserCard}
                  key='InviteCard'
                />
              )}
            </AnimatePresence>
          </motion.section>
        )}
        {component === 'Deleted-users' && (
          <motion.section
            className='md:flex'
            variants={fade}
            initial='hidden'
            animate={component === 'Deleted-users' ? 'visible' : 'hidden'}
            key={component}
          >
            <DeletedUsers
              users={deletedUsers}
              setSelectedUser={setSelectedUser}
            />
            {selectedUser && (
              <UserCard
                user={user}
                selectedUser={selectedUser}
                toggleDeleteCardHandler={toggleDeleteCardHandler}
                selectUserHandler={selectUserHandler}
                component={component}
                key={'UserCard'}
              />
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Users;
