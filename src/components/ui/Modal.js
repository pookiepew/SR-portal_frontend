import Backdrop from './Backdrop';
const Modal = (props) => {
  return (
    <>
      <Backdrop onClick={props.onClick} />
      <div className='fixed top-0 left-1/2 transform -translate-x-1/2 mt-20 bg-white z-50 w-96 min-w-max p-5 rounded shadow-md'>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
