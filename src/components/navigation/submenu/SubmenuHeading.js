import { motion, AnimatePresence } from 'framer-motion';
import { rotate180 } from '../../../variants';
import OfficeBuildingIcon from '../../ui/icons/Office-Building-Icon';
import OpenBookIcon from '.././../ui/icons/Open-Book-Icon';
import UsergroupIcon from '../../ui/icons/Usergroup-icon';
import UsersIcon from '.././../ui/icons/Users-Icon';
import TruckIcon from '../../ui/icons/Truck-icon';
import DocumentIcon from '../../ui/icons/Document-icon';
import ExternalLinkIcon from '../../ui/icons/External-link-icon';
import ChevronDown from '../../ui/icons/Chevron-down';
const SubmenuHeading = (props) => {
  return (
    <motion.div
      layout
      className='h-10 flex items-center justify-end bg-gray-800 z-10 cursor-pointer hover:bg-gray-700 pl-3'
      onClick={() => props.setShowSubmenu((state) => !state)}
    >
      {props.officeIcon && (
        <OfficeBuildingIcon className='h-5 w-5 sm:h-6 sm:w-6' />
      )}
      {props.openBookIcon && <OpenBookIcon className='h-5 w-5 sm:h-6 sm:w-6' />}
      {props.usersIcon && <UsersIcon className='h-5 w-5 sm:h-6 sm:w-6' />}
      {props.usergroupIcon && (
        <UsergroupIcon className='h-5 w-5 sm:h-6 sm:w-6' />
      )}
      {props.truckIcon && <TruckIcon className='h-5 w-5 sm:h-6 sm:w-6' />}
      {props.documentIcon && <DocumentIcon className='h-5 w-5 sm:h-6 sm:w-6' />}
      {props.externalLinkIcon && (
        <ExternalLinkIcon className='h-5 w-5 sm:h-6 sm:w-6' />
      )}
      <AnimatePresence>
        {props.sidebarIsOpen && (
          <motion.span
            className='pl-6 text-sm sm:text-md sm:font-semibold'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {props.children}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        className={props.sidebarIsOpen ? 'h-10 w-10 ml-auto' : 'h-10 w-10 ml-3'}
        initial={props.showSubmenu}
        variants={rotate180}
        animate={props.showSubmenu ? 'rotate180' : 'rotate0'}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className={'h-6 w-6 inline-block'} />
      </motion.button>
    </motion.div>
  );
};

export default SubmenuHeading;
