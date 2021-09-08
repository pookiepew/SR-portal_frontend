import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { rotate180 } from '../../variants';
import { uiActions } from '../../store/slices/ui-slice';

import { moveHeaderContent } from '../../variants';

import Sidebar from './Sidebar';

import ChevronDown from '../ui/icons/Chevron-down';

import UserSubMenu from './submenu/UserSubMenu';

import ChevronRight from '../ui/icons/Chevron-right';

const Header = () => {
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);
  const userSubmenuIsOpen = useSelector((state) => state.ui.userSubmenuIsOpen);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toggleUserSubmenuHandler = () => {
    dispatch(uiActions.toggleUserSubmenu());
  };

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <header className='w-full h-14 bg-white border-b-2 md:pl-5'>
      <Sidebar />
      <motion.div
        className='w-full h-full flex items-center pr-5'
        variants={moveHeaderContent}
        initial='initial'
        animate={sidebarIsOpen ? 'right' : 'initial'}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          className='h-full w-14'
          onClick={toggleSidebarHandler}
          initial={sidebarIsOpen}
          variants={rotate180}
          animate={sidebarIsOpen ? 'rotate180' : 'rotate0'}
          transition={{ duration: 0.5 }}
        >
          <ChevronRight className='h-9 m-auto' />
        </motion.button>
        <div className='flex items-center justify-between w-full'>
          <Link to='/'>
            <h1 className='font-heading text-body text-xl md:text-2xl font-semibold tracking-wide'>
              SR Portal
            </h1>
          </Link>

          {user.isAuthenticated && (
            <div>
              <div
                className='flex items-center cursor-pointer'
                onClick={() => toggleUserSubmenuHandler()}
              >
                <h4 className='select-none capitalize'>{user.name}</h4>
                <motion.div
                  initial={userSubmenuIsOpen}
                  variants={rotate180}
                  animate={userSubmenuIsOpen ? 'rotate180' : 'rotate0'}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={'h-6 w-6 inline-block'} />
                </motion.div>
              </div>
              <AnimatePresence>
                {userSubmenuIsOpen && <UserSubMenu />}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
