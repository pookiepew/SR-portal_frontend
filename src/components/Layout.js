import { useSelector, useDispatch } from 'react-redux';

import { motion } from 'framer-motion';

import { uiActions } from '../store/slices/ui-slice';

import Header from './navigation/Header';
import Footer from '../components/ui/Footer';

const Layout = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { sidebarIsOpen, userSubmenuIsOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const mainWindowClickHandler = () => {
    if (sidebarIsOpen) {
      dispatch(uiActions.toggleSidebar());
      return;
    }
    if (userSubmenuIsOpen) {
      dispatch(uiActions.toggleUserSubmenu());
      return;
    }
  };

  const sidebarSlideIn = {
    initial: {
      paddingLeft: 0,
    },
    right: {
      paddingLeft: '250px',
    },
  };

  return (
    <>
      {user.isAuthenticated && <Header />}
      <motion.main
        variants={sidebarSlideIn}
        initial='initial'
        animate={sidebarIsOpen ? 'right' : 'initial'}
        transition={{ duration: 0.2 }}
        onClick={mainWindowClickHandler}
      >
        {props.children}
        {user.isAuthenticated && <Footer />}
      </motion.main>
    </>
  );
};

export default Layout;
