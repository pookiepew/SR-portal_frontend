import Card from '../ui/Card';

import UserCircleIcon from '../ui/icons/UserCircle-icon';

const InvitedUsers = ({ users, setSelectedUser, backendBaseUrl }) => {
  return (
    <Card className='mt-6'>
      <ul className='list'>
        <li className='h-9 px-5 flex items-center text-sm font-semibold'>
          <p className='w-64'>Name</p>
          <p className='w-64'>Email</p>
          <p className='w-32'>Status / Action</p>
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
                src={backendBaseUrl + user.links?.profileImg}
                className='h-10 w-10 rounded-full object-top object-cover transform transition-all hover:scale-150'
                alt={user.name}
              />
            ) : (
              <UserCircleIcon className='h-10 w-10 text-gray-500 transform transition-all hover:scale-150' />
            )}

            <div className='w-52 ml-2 flex flex-col h-full'>
              <p className='capitalize text-primary font-bold'>{user.name}</p>
            </div>

            <p className='w-64'>{user.email}</p>
            {user.accepted && (
              <p className='w-32 text-gray-700 text-center py-2 rounded bg-green-300'>
                Invite accepted
              </p>
            )}
            {!user.accepted && (
              <button className='w-32 py-2 text-secondary text-sm hover:text-primaryHover'>
                Resend invitation
              </button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default InvitedUsers;
