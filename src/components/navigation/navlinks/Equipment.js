import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Submenu from '../submenu/Submenu';
import SubmenuHeading from '../submenu/SubmenuHeading';
import SubmenuListItem from '../submenu/SubmenuListItem';

import TruckIcon from '../../ui/icons/Truck-icon';

const Equipment = (props) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading setShowSubmenu={setShowSubmenu} showSubmenu={showSubmenu}>
        <TruckIcon className='h-5 w-5 sm:h-6 sm:w-6' />
        <span className='pl-6 text-sm sm:text-md sm:font-semibold'>
          Equipment
        </span>
      </SubmenuHeading>
      <AnimatePresence>
        {showSubmenu && (
          <Submenu>
            <SubmenuListItem>
              <NavLink
                to='/equipment'
                className='block'
                onClick={props.toggleSidebarHandler}
              >
                Trailers
              </NavLink>
            </SubmenuListItem>

            <SubmenuListItem>
              <span>Coming ...</span>
            </SubmenuListItem>

            <SubmenuListItem>
              <span>Coming ...</span>
            </SubmenuListItem>

            <SubmenuListItem>
              <span>Coming ...</span>
            </SubmenuListItem>
          </Submenu>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Equipment;
