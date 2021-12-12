import Moment from "react-moment";

import Card from "../../../ui/Card";
import TruckBGIcon from "../../../ui/icons/Truck2-icon";

const PositionTable = ({
  trailers,
  selectedTrailer,
  chooseTrailerClickHandler,
  toggleModalHandler,
}) => {
  return (
    <Card className='mt-6 mb-10'>
      {trailers ? (
        <ul className='list'>
          <li className='h-9 px-5 flex items-center text-sm font-semibold'>
            <p className='w-40 ml-16 pl-1'>Trailer</p>
            <p className='w-40'>Current Location</p>
            <p className='w-40'>Next Location</p>
            <p className='w-40'>Last Updated</p>
          </li>
          {trailers?.map((trailer) => (
            <li
              key={trailer._id}
              className='flex flex-col md:flex-row md:items-center w-full h-16 py-2 px-5 text-gray-600 text-sm font-semibold cursor-pointer hover:text-black'
            >
              {trailer.imgURL ? (
                <img
                  src={trailer.imgURL}
                  alt='Trailer'
                  className='h-full w-14 object-center rounded-sm object-cover transform transition-all hover:scale-300'
                  onClick={() => toggleModalHandler(trailer)}
                />
              ) : (
                <div className='w-14'>
                  <TruckBGIcon className='h-10 w-10 m-auto' />
                </div>
              )}
              <div className='h-full w-full flex'>
                <div
                  className='h-full w-full flex'
                  onClick={() => chooseTrailerClickHandler(trailer)}
                >
                  <div className='flex flex-col justify-center h-full w-40 pl-2 pb-2 ml-2 mr-1'>
                    <p className='text-lg font-bold text-primary'>
                      {trailer.license}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {trailer.type?.type}
                    </p>
                  </div>

                  <div className='w-40 flex items-center'>
                    <p>{trailer.location?.current?.area}</p>
                  </div>

                  <div className='w-40 flex items-center'>
                    {trailer.location?.next?.area ? (
                      <p>
                        {selectedTrailer.location?.next?.areaCode?.code},{" "}
                        {selectedTrailer.location?.next?.area}
                      </p>
                    ) : (
                      <p className='text-gray-400'>Not planned</p>
                    )}
                  </div>

                  <div className='w-40 flex items-center'>
                    <Moment>{trailer.updatedAt}</Moment>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='w-96 mr-56'>No trailers to view</p>
      )}
    </Card>
  );
};

export default PositionTable;
