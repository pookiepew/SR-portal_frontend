const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 w-screen flex items-end'>
      <div className='h-4 md:h-5 w-full bg-primary'></div>
      <div className='h-8 md:h-9 bg-primary relative'>
        <div className='absolute top-0 left-0 footer-triangle'></div>
        <div className='w-60 md:w-80 h-full flex items-center justify-center'>
          <p className='text-white text-xs md:text-base tracking-widest font-body'>
            Your partner in logistics
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
