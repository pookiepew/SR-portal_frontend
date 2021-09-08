import { useSelector } from 'react-redux';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Submenu from '../submenu/Submenu';
import SubmenuHeading from '../submenu/SubmenuHeading';
import SubmenuListItem from '../submenu/SubmenuListItem';
const PDF = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const sidebarIsOpen = useSelector((state) => state.ui.sidebarIsOpen);
  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading
        setShowSubmenu={setShowSubmenu}
        sidebarIsOpen={sidebarIsOpen}
        showSubmenu={showSubmenu}
        documentIcon
      >
        PDF
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

export default PDF;
