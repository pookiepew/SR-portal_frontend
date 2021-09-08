import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Submenu from '../submenu/Submenu';
import SubmenuListItem from '../submenu/SubmenuListItem';
import SubmenuHeading from '../submenu/SubmenuHeading';
const ClientRegister = ({ sidebarIsOpen }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading
        setShowSubmenu={setShowSubmenu}
        sidebarIsOpen={sidebarIsOpen}
        showSubmenu={showSubmenu}
        usergroupIcon
      >
        Client Register
      </SubmenuHeading>
      <AnimatePresence>
        {showSubmenu && (
          <Submenu>
            <SubmenuListItem sidebarIsOpen={sidebarIsOpen}>
              <span className='pl-3'>Coming ...</span>
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

export default ClientRegister;
