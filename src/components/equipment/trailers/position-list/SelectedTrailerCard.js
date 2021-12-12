import Moment from "react-moment";

import Card from "../../../ui/Card";
import TruckBGIcon from "../../../ui/icons/Truck2-icon";

const SelectedTrailerCard = ({ selectedTrailer, toggleModalHandler }) => {
  return (
    <Card
      className='mt-6 min-w-max h-full md:ml-10'
      key={selectedTrailer.license}
    >
      <div className='flex h-24'>
        {selectedTrailer.imgURL ? (
          <img
            src={selectedTrailer.imgURL}
            alt={selectedTrailer.license}
            onClick={() => toggleModalHandler(selectedTrailer)}
            className='rounded shadow cursor-pointer transform transition-all hover:scale-300'
          />
        ) : (
          <TruckBGIcon className='w-16 h-16 m-auto' />
        )}
        <div className='px-8 h-full flex flex-col justify-center'>
          <h1 className='text-3xl text-primary font-bold'>
            {selectedTrailer.license}
          </h1>
          <p className='text-gray-400'>{selectedTrailer.type?.name}</p>
        </div>
        <div className='ml-20'>
          <button className='text-xs md:text-sm text-white bg-primary px-1 md:px-3 py-1 rounded hover:bg-primaryHover'>
            View details
          </button>
        </div>
      </div>
      <ul className='list-reverse mt-6'>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Current Location</span>
          <span className='text-sm'>
            {selectedTrailer.location.current?.areaCode?.code},{" "}
            {selectedTrailer.location.current?.area}
          </span>
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Next Location</span>
          <span className='text-sm'>
            {selectedTrailer.location?.next?.area ? (
              <p>
                {selectedTrailer.location?.next?.areaCode?.code},{" "}
                {selectedTrailer.location?.next?.area}
              </p>
            ) : (
              <p className='text-gray-400'>Not planned</p>
            )}
          </span>
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Team</span>
          <span className='text-sm capitalize text-blue-400 hover:text-blue-500 cursor-pointer'>
            {selectedTrailer.team?.name}
          </span>
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Last Updated</span>
          <Moment className='text-sm'>{selectedTrailer.updatedAt}</Moment>
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Updated By</span>
          {selectedTrailer.updatedBy ? (
            <span className='text-sm text-blue-400 hover:text-blue-500 cursor-pointer'>
              {selectedTrailer.updatedBy}
            </span>
          ) : (
            <span className='text-sm text-gray-400'>Never updated</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Creator</span>
          <span className='text-sm capitalize text-blue-400 hover:text-blue-500 cursor-pointer'>
            {selectedTrailer.creator?.name}
          </span>
        </li>
      </ul>
      <ul className='list mt-6'>
        <li className='h-9 px-5 flex items-center text-sm font-semibold'>
          <p className='w-48'>Specs</p>
          <p className='w-40'>Status</p>
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Container locks</span>
          {selectedTrailer.specs.containerlocks && (
            <span className='ml-4'>
              {selectedTrailer.specs.containerlocks === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.containerlocks === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Extendable</span>
          {selectedTrailer.specs.extendable && (
            <span className='ml-4'>
              {selectedTrailer.specs.extendable === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.extendable === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Lashings</span>
          {selectedTrailer.specs.lashings && (
            <span className='ml-4'>
              {selectedTrailer.specs.lashings === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.lashings === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Options for ramps</span>
          {selectedTrailer.specs.loadingramp && (
            <span className='ml-4'>
              {selectedTrailer.specs.loadingramp === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.loadingramp === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Winter tires</span>
          {selectedTrailer.specs.winterTires && (
            <span className='ml-4'>
              {selectedTrailer.specs.winterTires === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.winterTires === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Summer tires</span>
          {selectedTrailer.specs.summerTires && (
            <span className='ml-4'>
              {selectedTrailer.specs.summerTires === true ? "✔" : "❌"}
            </span>
          )}
          {selectedTrailer.specs.summerTires === null && (
            <span className='ml-4 text-sm text-gray-400'>❓</span>
          )}
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Axles</span>
          <span className='ml-4'>{selectedTrailer.specs.axles}</span>
          {/* <button className='ml-auto text-sm text-gray-400 hover:text-black'>
                          Edit
                        </button> */}
        </li>
      </ul>
    </Card>
  );
};

export default SelectedTrailerCard;
