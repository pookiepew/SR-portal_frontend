const Backdrop = (props) => {
  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen z-40 bg-black bg-opacity-75'
      onClick={props.onClick}
    ></div>
  );
};

export default Backdrop;
