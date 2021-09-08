const Loader = (props) => {
  return (
    <div className='flex justify-center items-center'>
      <div
        className={
          'animate-spin rounded-full h-5 w-5 border-t-2  border-primary' +
          props.className
        }
      ></div>
    </div>
  );
};

export default Loader;
