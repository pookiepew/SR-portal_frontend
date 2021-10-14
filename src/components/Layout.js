import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from '../store/slices/ui-slice';

import useWindowDimensions from '../hooks/useWindowDimensions';

// import Header from './navigation/Header';
import Footer from '../components/ui/Footer';
import ProfileLink from './navigation/ProfileLink';
import Sidebar from './navigation/Sidebar';

const Layout = (props) => {
  const { user } = useSelector((state) => state.auth);
  // const { userSubmenuIsOpen } = useSelector((state) => state.ui);
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  // const mainWindowClickHandler = () => {
  //   if (userSubmenuIsOpen) {
  //     dispatch(uiActions.toggleUserSubmenu());
  //     return;
  //   }
  // };

  useEffect(() => {
    if (width > 640) {
      dispatch(uiActions.toggleSidebar(true));
    }
  }, [width, dispatch]);

  return (
    <>
      {/* {user.isAuthenticated && <Header />} */}
      <main
        className='overflow-x-hidden'
        // onClick={mainWindowClickHandler}
      >
        {user.isAuthenticated && <Sidebar />}
        {props.children}
        {user.isAuthenticated && <Footer />}
        {user.isAuthenticated && sidebarIsOpen && <ProfileLink user={user} />}
      </main>
    </>
  );
};

export default Layout;
