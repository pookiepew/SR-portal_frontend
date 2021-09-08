import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../store/actions-creators/auth-actions';

import { uiActions } from '../../../store/slices/ui-slice';

import { motion } from 'framer-motion';

import UserIcon from '../../ui/icons/User-icon';
import UsersIcon from '../../ui/icons/Users-Icon';
import LogoutIcon from '../../ui/icons/Logout-icon';

const UserSubMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const userSubmenuIsOpen = useSelector((state) => state.ui.userSubmenuIsOpen);

  const dispatch = useDispatch();

  const userSubMenuClickHandler = () => {
    if (userSubmenuIsOpen) {
      dispatch(uiActions.toggleUserSubmenu());
      return;
    }
  };

  return (
    <motion.div
      className='absolute right-5 md:right-16 top-10 bg-white border rounded z-10 w-32 min-w-max flex flex-col z-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <nav className='flex flex-col pt-3 pb-2 text-sm'>
        <NavLink
          to='/profile'
          className='hover:bg-primary hover:text-white py-1'
          onClick={userSubMenuClickHandler}
        >
          <div className='flex items-center pl-4'>
            <UserIcon className='h-5 w-5 mr-2' /> Profile
          </div>
        </NavLink>
        {(user.hasUserPermission || user.isAdmin) && (
          <NavLink
            to='/users'
            className='hover:bg-primary hover:text-white py-1 my-1'
            onClick={userSubMenuClickHandler}
          >
            <div className='flex items-center pl-4'>
              <UsersIcon className='h-5 w-5 mr-2' /> Users
            </div>
          </NavLink>
        )}
        <hr className='my-2' />
        <button
          className='hover:bg-red-600 hover:text-white flex pl-4 py-1'
          onClick={() => dispatch(logoutUser())}
        >
          <LogoutIcon className='h-4 w-4 mr-2' /> Sign Out
        </button>
      </nav>
    </motion.div>
  );
};

export default UserSubMenu;
