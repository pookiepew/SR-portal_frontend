// import { motion } from 'framer-motion';
// import { fade } from '../../variants';
const Card = (props) => {
  return (
    <div
      className={'p-5 bg-white h-full rounded shadow-md ' + props.className}
      // variants={fade}
      // initial='hidden'
      // animate={'visible'}
    >
      {props.children}
    </div>
  );
};

export default Card;
