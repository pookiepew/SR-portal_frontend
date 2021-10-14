import { motion } from 'framer-motion';
import { rotate180 } from '../../../variants';

import ChevronDown from '../../ui/icons/Chevron-down';

const SubmenuHeading = (props) => {
  return (
    <motion.div
      layout
      className='h-10 flex items-center  z-10 cursor-pointer select-none hover:bg-gray-800'
      onClick={() => props.setShowSubmenu((state) => !state)}
    >
      {props.children}

      <motion.button
        className='h-10 w-10 ml-auto'
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
