import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Submenu from '../submenu/Submenu';
import SubmenuHeading from '../submenu/SubmenuHeading';
import SubmenuListItem from '../submenu/SubmenuListItem';
const Equipment = ({ sidebarIsOpen, toggleSidebarHandler }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading
        setShowSubmenu={setShowSubmenu}
        sidebarIsOpen={sidebarIsOpen}
        showSubmenu={showSubmenu}
        truckIcon
      >
        Equipment
      </SubmenuHeading>
      <AnimatePresence>
        {showSubmenu && (
          <Submenu>
            <SubmenuListItem sidebarIsOpen={sidebarIsOpen}>
              <NavLink
                to='/equipment'
                className='block pl-3'
                onClick={() => {
                  if (sidebarIsOpen) {
                    toggleSidebarHandler();
                  }
                }}
              >
                Trailers
              </NavLink>
            </SubmenuListItem>

            <SubmenuListItem sidebarIsOpen={sidebarIsOpen}>
              <span className='pl-3'>Coming ...</span>
            </SubmenuListItem>

            <SubmenuListItem sidebarIsOpen={sidebarIsOpen}>
              <span className='pl-3'>Coming ...</span>
            </SubmenuListItem>

            <SubmenuListItem sidebarIsOpen={sidebarIsOpen}>
              <span className='pl-3'>Coming ...</span>
            </SubmenuListItem>
          </Submenu>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Equipment;
