import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import Submenu from '../submenu/Submenu';
import SubmenuListItem from '../submenu/SubmenuListItem';
import SubmenuHeading from '../submenu/SubmenuHeading';

import ShieldIcon from '../../ui/icons/Shield-icon';

const Admin = (props) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading setShowSubmenu={setShowSubmenu} showSubmenu={showSubmenu}>
        <ShieldIcon className='h-5 w-5 sm:h-6 sm:w-6' />
        <span className='pl-6 text-sm sm:text-md sm:font-semibold'>Admin</span>
      </SubmenuHeading>
      <AnimatePresence>
        {showSubmenu && (
          <Submenu>
            <SubmenuListItem>
              <NavLink
                to='/users'
                className='block'
                onClick={props.toggleSidebarHandler}
              >
                Users
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

export default Admin;
