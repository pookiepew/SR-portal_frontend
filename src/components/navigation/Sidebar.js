import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { sidebarSlideIn } from '../../variants';

import { uiActions } from '../../store/slices/ui-slice';

import ChevronRight from '../ui/icons/Chevron-right';

import { rotate180 } from '../../variants';

import Nav from './Nav';

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);
  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };
  return (
    <motion.aside
      className='fixed top-0 left-0 w-screen md:w-64 h-screen bg-gray-800 p-3 z-40 overflow-y-scroll'
      variants={sidebarSlideIn}
      initial='hidden'
      animate={sidebarIsOpen ? 'visible' : 'hidden'}
      transition={{ duration: 0.2 }}
    >
      <div className='flex items-center justify-between'>
        <Link to='/'>
          <h1
            className='font-heading text-white text-2xl font-semibold tracking-wider pl-4'
            onClick={toggleSidebarHandler}
          >
            Dashboard
          </h1>
        </Link>
        <motion.button
          className='md:hidden'
          onClick={toggleSidebarHandler}
          initial={sidebarIsOpen}
          variants={rotate180}
          animate={sidebarIsOpen ? 'rotate180' : 'rotate0'}
          transition={{ duration: 0.5 }}
        >
          <ChevronRight className='h-9 w-full text-center z-20 text-white' />
        </motion.button>
      </div>
      <Nav
        toggleSidebarHandler={toggleSidebarHandler}
        sidebarIsOpen={sidebarIsOpen}
      />
    </motion.aside>
  );
};

export default Sidebar;
