import Moment from "react-moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { io } from "socket.io-client";

import { getUser } from "./store/actions-creators/auth-actions";
import {
  getAreas,
  getAreacodes,
} from "./store/actions-creators/location-actions";

// import { backendSocketUrl } from "./api";

import Layout from "./components/Layout";
import Routes from "./Routes";

// let socket;

const App = () => {
  Moment.globalLocale = "no";
  Moment.globalFormat = "DD.MM.YYYY";
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(getUser());
      dispatch(getAreas());
      dispatch(getAreacodes());

      // socket = io(backendSocketUrl);
      // socket.on("connect", () => {
      //   console.log("Socket IO connected");
      // });
    }
  }, [dispatch]);

  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

// export { socket };

export default App;
