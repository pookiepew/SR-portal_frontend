import Card from '../ui/Card';

import UserIcon from '../ui/icons/User-icon';
import MailIcon from '../ui/icons/Mail-icon';
import UserAddIcon from '../ui/icons/User-add-icon';

const InvitedUsers = ({ users, toggleInviteCardHandler, setSelectedUser }) => {
  return (
    <Card className='mt-5 md:mt-10'>
      <div className='flex mb-5'>
        <h1 className='font-heading font-semibold text-lg'>Invited Users</h1>
        <button
          className='text-xs md:text-sm text-white bg-primary ml-auto flex px-1 md:px-2 py-1 rounded-sm hover:bg-primaryHover'
          onClick={toggleInviteCardHandler}
        >
          <UserAddIcon className='h-4 md:h-5 w-3 md:w-4 mr-1 md:pb-1' />
          Invite User
        </button>
      </div>
      <p className='text-gray-600 text-sm mb-3'>
        Invited users: {users.length}
      </p>
      <ul>
        {users.map((user) => (
          <li
            key={user.email}
            className='flex flex-col md:flex-row w-full py-2 px-5 list text-gray-600 text-sm cursor-pointer hover:text-black'
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            <div className='flex'>
              <UserIcon className='h-4 w-4 mr-1' />
              <span className='w-52 capitalize'>{user.name}</span>
            </div>
            <div className='flex'>
              <MailIcon className='h-5 w-4 mr-1' />
              <span>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default InvitedUsers;
