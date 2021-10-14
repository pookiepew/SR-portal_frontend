import { Link } from 'react-router-dom';

import AvatarIcon from '../ui/icons/Avatar-icon';

const ProfileLink = ({ user }) => {
  return (
    <Link to={'/profile'}>
      <div className='w-screen sm:w-64 h-20 fixed bottom-0 left-0 bg-gray-800 z-50 flex items-center border-t-2 border-primary text-white hover:bg-gray-700'>
        <AvatarIcon className='h-11 w-11 ml-3' />
        <div className='pl-2'>
          <p className='capitalize font-bold tracking-wide'>{user.name}</p>
          <p className='text-sm'>View Profile</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileLink;
