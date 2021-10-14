import Card from '../ui/Card';

import UserCircleIcon from '../ui/icons/UserCircle-icon';

const ActiveUsers = ({ users, setSelectedUser, baseURL }) => {
  return (
    <Card className='mt-6'>
      <ul className='list'>
        <li className='h-9 px-5 flex items-center text-sm font-semibold'>
          <p className='w-64'>Name</p>
          <p className='w-40'>Company</p>
          <p className='w-40'>Team</p>
          <p className='w-40'>Location</p>
        </li>
        {users.map((user) => (
          <li
            key={user.email}
            className='flex flex-col md:flex-row md:items-center w-full py-2 px-5  text-gray-600 text-sm font-semibold cursor-pointer hover:text-black'
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            {user.links?.profileImg ? (
              <img
                src={baseURL + user.links?.profileImg}
                className='h-10 w-10 rounded-full object-top object-cover transform transition-all hover:scale-150'
                alt={user.name}
              />
            ) : (
              <UserCircleIcon className='h-10 w-10 text-gray-500 transform transition-all hover:scale-150' />
            )}
            <div className='w-52 ml-2 flex flex-col h-full'>
              <p className='capitalize text-primary font-bold'>{user.name}</p>
              <p className='text-xs text-gray-500'>{user.email}</p>
            </div>
            {user.company ? (
              <p className='w-40'>
                {user.company?.name === 'sr group as' && 'SR Group AS'}
              </p>
            ) : (
              <p className='w-40'>Not selected</p>
            )}
            {user.team ? (
              <p className='capitalize w-40'>{user.team?.name}</p>
            ) : (
              <p className='w-40'>Not selected</p>
            )}
            {user.team ? (
              <p className='capitalize w-40'>
                {user.team?.location.postalarea}
              </p>
            ) : (
              <p className='w-40'>Not selected</p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ActiveUsers;
