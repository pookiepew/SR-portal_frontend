import Moment from 'react-moment';

import Card from '../ui/Card';

import CheckIcon from '../ui/icons/Check-icon';
import MailIcon from '../ui/icons/Mail-icon';
import UserCircleIcon from '../ui/icons/UserCircle-icon';
import WorkplaceIcon from '../ui/icons/Workplace-icon';

const UserCard = ({
  user,
  selectedUser,
  toggleDeleteCardHandler,
  selectUserHandler,
  component,
  backendBaseUrl,
}) => {
  return (
    <Card className='mt-10 md:ml-10'>
      <header className='flex justify-between h-16 mb-10'>
        <div className='flex'>
          {selectedUser.links?.profileImg ? (
            <img
              src={backendBaseUrl + selectedUser.links?.profileImg}
              className='w-16 h-16 rounded-full object-top object-cover transform transition-all hover:scale-150'
              alt={selectedUser.name}
            />
          ) : (
            <UserCircleIcon className='w-16 h-16 text-gray-500 transform transition-all hover:scale-150' />
          )}
          <div className='ml-5 flex flex-col justify-center'>
            <h1 className='capitalize text-primary font-bold text-2xl'>
              {selectedUser.name}
            </h1>
            <p className='capitalize text-xs text-gray-500'>
              {selectedUser.team?.name}
            </p>
          </div>
        </div>
        <div className='h-full flex flex-col justify-between'>
          <a
            href={'mailto:' + selectedUser.email}
            className='flex items-center bg-primary text-white py-1 px-1 ml-auto rounded-sm max-w-max'
          >
            <MailIcon className='w-4 h-4' />
            <span className='text-xs font-semibold px-1 hover:bg-primaryHover'>
              Email
            </span>
          </a>
          {selectedUser.links?.workplace && (
            <a
              href={selectedUser.links?.workplace}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center bg-primary text-white py-1 px-1 rounded-sm'
            >
              <WorkplaceIcon className='w-4 h-4' />
              <span className='text-xs font-semibold px-1 hover:bg-primaryHover'>
                Workplace
              </span>
            </a>
          )}
        </div>
      </header>
      <ul className='list text-sm'>
        <li className='flex items-center py-2 px-5'>
          <p className='font-bold w-52'>Company</p>
          {selectedUser.company?.name === 'sr group as' && (
            <p className='w-72'>SR Group AS</p>
          )}
          {selectedUser.company?.name !== 'sr group as' && (
            <p className='capitalize'>{selectedUser.company?.name}</p>
          )}
          {!selectedUser.company && <p className='w-72'>Not Selected</p>}
          <button className='px-3 py-1 text-gray-500 font-semibold hover:text-gray-900'>
            Edit
          </button>
        </li>
        <li className='flex items-center py-2 px-5'>
          <p className='font-bold w-52'>Team</p>
          {selectedUser.team?.name && (
            <p className='w-72 capitalize'>{selectedUser.team?.name}</p>
          )}
          {!selectedUser.team && <p className='w-72'>Not Selected</p>}
          <button className='px-3 py-1 text-gray-500 font-semibold hover:text-gray-900'>
            Edit
          </button>
        </li>
        <li className='flex items-center py-2 px-5'>
          <p className='font-bold w-52'>Location</p>
          {selectedUser.team?.location && (
            <p className='w-72 capitalize'>
              {selectedUser.team?.location?.postalarea}
            </p>
          )}
          {!selectedUser.team?.location?.postalarea && (
            <p className='w-72'>Not Selected</p>
          )}
          <button className='px-3 py-1 text-gray-500 font-semibold hover:text-gray-900'>
            Edit
          </button>
        </li>
        <li className='flex items-center py-3 px-5'>
          <p className='font-bold w-52'>Joined</p>
          <Moment className="className='w-72'">{selectedUser.createdAt}</Moment>
        </li>
        <li className='flex items-center py-3 px-5'>
          <p className='font-bold w-52'>Last Updated</p>
          <Moment className="className='w-72'">{selectedUser.updatedAt}</Moment>
        </li>
        <li className='flex items-center py-3 px-5 border-b'>
          <p className='font-bold w-52'>Invited By</p>
          <div className='w-72'>
            <button
              className='text-left capitalize text-secondary hover:text-black'
              onClick={() => selectUserHandler(selectedUser.invitedBy?.name)}
            >
              {selectedUser.invitedBy?.name}
            </button>
          </div>
        </li>
        <ul className='flex flex-col mt-10'>
          <li className='flex items-center py-2 px-5 text-xs font-semibold'>
            <p className='w-32'>Role</p>
            <p className='w-20'>Create</p>
            <p className='w-20'>Read</p>
            <p className='w-20'>Update</p>
            <p className='w-32'>Delete</p>
          </li>
          {selectedUser.roles?.map((role) => (
            <li key={role._id} className='flex items-center py-2 px-5'>
              <span className='w-32 capitalize text-primary font-bold'>
                {role.feature}
              </span>
              <span className='w-20'>
                {role.access.includes('C') && (
                  <CheckIcon className='text-green-500 h-6 w-6' />
                )}
              </span>
              <span className='w-20'>
                {role.access.includes('R') && (
                  <CheckIcon className='text-green-500 h-6 w-6' />
                )}
              </span>
              <span className='w-20'>
                {role.access.includes('U') && (
                  <CheckIcon className='text-green-500 h-6 w-6' />
                )}
              </span>
              <span className='w-32'>
                {role.access.includes('D') && (
                  <CheckIcon className='text-green-500 h-6 w-6' />
                )}
              </span>
              <button className='px-3 py-1 text-gray-500 font-semibold hover:text-gray-900'>
                Edit
              </button>
            </li>
          ))}
          <div className='flex justify-around'>
            {user.isAdmin && component === 'Active-users' && (
              <button className='text-white rounded-sm bg-primary w-1/4 py-1 mt-5 hover:bg-primaryHover'>
                Add role
              </button>
            )}
            {user.isAdmin && component === 'Active-users' && (
              <button
                className='text-white rounded-sm bg-red-600 w-1/4 py-1 mt-5 hover:bg-red-700'
                onClick={toggleDeleteCardHandler}
              >
                Delete user
              </button>
            )}
          </div>
        </ul>
      </ul>
    </Card>
  );
};

export default UserCard;
