import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Submenu from '../submenu/Submenu';
import SubmenuListItem from '../submenu/SubmenuListItem';
import SubmenuHeading from '../submenu/SubmenuHeading';

import UsergroupIcon from '../../ui/icons/Usergroup-icon';

const ClientRegister = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <motion.li layout className='mb-3'>
      <SubmenuHeading setShowSubmenu={setShowSubmenu} showSubmenu={showSubmenu}>
        <UsergroupIcon className='h-5 w-5 sm:h-6 sm:w-6' />
        <span className='pl-6 text-sm sm:text-md sm:font-semibold'>
          Client Register
        </span>
      </SubmenuHeading>
      <AnimatePresence>
        {showSubmenu && (
          <Submenu>
            <SubmenuListItem>
              <span>Coming ...</span>
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

export default ClientRegister;
