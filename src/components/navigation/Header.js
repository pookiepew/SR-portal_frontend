import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { rotate180 } from '../../variants';
import { uiActions } from '../../store/slices/ui-slice';

import ChevronRight from '../ui/icons/Chevron-right';

const Header = (props) => {
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);

  const dispatch = useDispatch();

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <header className='w-full h-14 bg-white border-b-2 sm:pl-72'>
      <motion.button
        className='h-full w-14 sm:hidden'
        onClick={toggleSidebarHandler}
        initial={sidebarIsOpen}
        variants={rotate180}
        animate={sidebarIsOpen ? 'rotate180' : 'rotate0'}
        transition={{ duration: 0.5 }}
      >
        <ChevronRight className='h-9 m-auto' />
      </motion.button>
      {props.children}
    </header>
  );
};

export default Header;
