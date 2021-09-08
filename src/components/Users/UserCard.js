import Moment from 'react-moment';

import Card from '../ui/Card';

const UserCard = ({
  user,
  selectedUser,
  toggleDeleteCardHandler,
  selectUserHandler,
  component,
}) => {
  return (
    <Card className='mt-10 w-96 min-w-max md:ml-10'>
      <h5 className='font-heading font-semibold mb-5 capitalize text-lg'>
        {selectedUser.name}
      </h5>
      <ul className='text-sm'>
        <li className='flex py-2'>
          <h6 className='font-bold w-24'>Email:</h6>
          <a
            href={'mailto:' + selectedUser.email}
            className='pl-3 text-blue-500 hover:text-secondary'
          >
            {selectedUser.email}
          </a>
        </li>
        <li className='flex py-2'>
          <p className='font-bold w-24'>Joined:</p>
          <Moment className='pl-3'>{selectedUser.createdAt}</Moment>
        </li>
        <li className='flex py-2'>
          <p className='font-bold w-24'>Last Updated:</p>
          <Moment className='pl-3'>{selectedUser.updatedAt}</Moment>
        </li>
        <li className='flex py-2'>
          <p className='font-bold w-24'>Invited By:</p>
          <p className='pl-3'>
            <button
              className='capitalize hover:text-black'
              onClick={() => selectUserHandler(selectedUser.invitedBy?.name)}
            >
              {selectedUser.invitedBy?.name}
            </button>
          </p>
        </li>
        <li className='flex items-center py-2'>
          <p className='font-bold w-24'>Roles:</p>
          <p className='pl-3 text-xs text-gray-600'>
            Create - Read - Update - Delete
          </p>
        </li>
        <ul className='flex flex-col mt-1'>
          {selectedUser.roles?.map((role) => (
            <li key={role._id} className='flex list px-3'>
              <span className='w-24 capitalize py-2'>{role.feature}</span>
              <span className='py-2'>{role.access}</span>
              {user.isAdmin && component === 'Active-users' && (
                <button className='ml-auto bg-primary px-3 tracking-wide text-white hover:bg-primaryHover'>
                  Edit
                </button>
              )}
            </li>
          ))}
          {user.isAdmin && component === 'Active-users' && (
            <button className='text-white rounded-sm bg-primary w-full py-1 mt-5 hover:bg-primaryHover'>
              Add role
            </button>
          )}
          {user.isAdmin && component === 'Active-users' && (
            <button
              className='text-white rounded-sm bg-red-600 w-full py-1 mt-1 hover:bg-red-700'
              onClick={toggleDeleteCardHandler}
            >
              Delete user
            </button>
          )}
        </ul>
      </ul>
    </Card>
  );
};

export default UserCard;
