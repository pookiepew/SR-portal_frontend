import { motion } from 'framer-motion';
const Submenu = (props) => {
  return (
    <motion.ul
      layout
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.1 }}
      className='pl-12 pt-1'
    >
      {props.children}
    </motion.ul>
  );
};

export default Submenu;
