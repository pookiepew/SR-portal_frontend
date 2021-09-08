import Modal from '../ui/Modal';

const DeleteUserModal = ({
  user,
  toggleDeleteCardHandler,
  deleteUserHandler,
}) => {
  return (
    <>
      <Modal onClick={toggleDeleteCardHandler}>
        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-red-500 text-xl mb-5'>Delete user</h3>
          <p>
            You are about to delete{' '}
            <span className='capitalize font-bold'>{user.name}</span> from the
            system!
          </p>
          <p>This action is not reversable!</p>
          <p className='my-5'>Are you sure?</p>
          <div>
            <button
              className='bg-red-600 text-white font-semibold px-4 py-1 rounded-sm mr-5 hover:bg-red-700'
              onClick={deleteUserHandler}
            >
              Delete
            </button>
            <button
              className='bg-green-600 text-white font-semibold px-4 py-1 rounded-sm hover:bg-green-700'
              onClick={toggleDeleteCardHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
