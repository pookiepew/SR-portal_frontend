import Backdrop from "./Backdrop";
const Modal = (props) => {
  return (
    <>
      <Backdrop onClick={props.onClick} />
      <div
        className='fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center'
        onClick={props.onClick}
      >
        <div className='bg-white p-5 rounded shadow-md'>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
