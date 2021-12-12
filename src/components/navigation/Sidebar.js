import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { sidebarSlideIn } from "../../variants";

import { uiActions } from "../../store/slices/ui-slice";

import ChevronRight from "../ui/icons/Chevron-right";

import { rotate180 } from "../../variants";

import Nav from "./Nav";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);
  const { width } = useWindowDimensions();

  const toggleSidebarHandler = () => {
    if (width > 640) {
      return;
    }
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <motion.aside
      className='fixed top-0 left-0 w-screen sm:w-64 h-full bg-gray-900 px-5 py-3 z-20 overflow-y-scroll'
      variants={sidebarSlideIn}
      initial='hidden'
      animate={sidebarIsOpen ? "visible" : "hidden"}
      transition={{ duration: 0.2 }}
    >
      <div className='flex items-center justify-between'>
        <Link to='/' className='w-full '>
          <h1
            className='font-heading text-white text-2xl font-semibold tracking-wider'
            onClick={toggleSidebarHandler}
          >
            SR Portal
          </h1>
        </Link>
        <motion.button
          className='sm:hidden'
          onClick={toggleSidebarHandler}
          initial={sidebarIsOpen}
          variants={rotate180}
          animate={!sidebarIsOpen ? "rotate180" : "rotate0"}
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
