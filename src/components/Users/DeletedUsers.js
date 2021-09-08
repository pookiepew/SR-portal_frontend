import Card from '../ui/Card';

import UserIcon from '../ui/icons/User-icon';
import MailIcon from '../ui/icons/Mail-icon';

const DeletedUsers = ({ users, setSelectedUser }) => {
  return (
    <Card className='mt-5 md:mt-10'>
      <div className='flex mb-5'>
        <h1 className='font-heading font-semibold text-lg'>Deleted Users</h1>
      </div>
      <p className='text-gray-600 text-sm mb-3'>
        Deleted users: {users.length}
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

export default DeletedUsers;
