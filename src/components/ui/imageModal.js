import Modal from "./Modal";

const ImageModal = ({ toggleModalHandler, src, alt }) => {
  return (
    <Modal onClick={toggleModalHandler}>
      <img
        src={src}
        alt={alt}
        className='max-w-screen-md object-center object-cover'
        onClick={toggleModalHandler}
      />
    </Modal>
  );
};

export default ImageModal;
