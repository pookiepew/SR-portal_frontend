import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { backendSocketUrl } from "../api";
import { io } from "socket.io-client";

import { uiActions } from "../store/slices/ui-slice";

import useWindowDimensions from "../hooks/useWindowDimensions";

import Footer from "../components/ui/Footer";
import ProfileLink from "./navigation/ProfileLink";
import Sidebar from "./navigation/Sidebar";

let socket;

const Layout = (props) => {
  const { user } = useSelector((state) => state.auth);
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  useEffect(() => {
    if (width > 640) {
      dispatch(uiActions.toggleSidebar(true));
    }
  }, [width, dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) {
      socket = io(backendSocketUrl);
      socket.on("connect", () => {
        console.log("Socket IO connected");
      });
    }
  }, [user]);

  return (
    <>
      {/* <main className='overflow-x-hidden'> */}
      <main>
        {user.isAuthenticated && <Sidebar />}
        {props.children}
        {user.isAuthenticated && <Footer />}
        {user.isAuthenticated && sidebarIsOpen && <ProfileLink user={user} />}
      </main>
    </>
  );
};

export { socket };

export default Layout;
