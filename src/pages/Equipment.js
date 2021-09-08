import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { fade } from '../variants';

import Moment from 'react-moment';

import { getTrailers } from '../store/actions-creators/equipment-actions';

import ArrowRight from '../components/ui/icons/Arrow-right';
import Card from '../components/ui/Card';

const Equipment = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState('Position-list');
  const trailers = useSelector((state) => state.equipment.trailers);
  const { user } = useSelector((state) => state.auth);

  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    document.title = 'SR Portal - Equipment';
    dispatch(getTrailers());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('path', '/equipment');
  }, []);

  useEffect(() => {
    setSelectedTrailer(trailers.data[0]);
  }, [trailers.data]);

  if (!user.isAuthenticated) return <Redirect to='/login' />;

  return (
    <section className='w-full px-4 sm:px-6 md:px-8'>
      <ul className='flex items-center h-10 mt-3 text-sm sm:text-base'>
        <li
          className={
            component === 'Position-list'
              ? 'h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Position-list')}
        >
          Position-list
        </li>
        <li
          className={
            component === 'Map'
              ? 'h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Map')}
        >
          Map
        </li>
        <li
          className={
            component === 'Service'
              ? 'h-6 font-bold border-b-2 select-none border-primary hover:border-primary cursor-pointer'
              : 'h-6 font-bold border-b-2 select-none border-transparent hover:border-primary cursor-pointer'
          }
          onClick={() => setComponent('Service')}
        >
          Service
        </li>
      </ul>
      <AnimatePresence exitBeforeEnter>
        {component === 'Position-list' && (
          <motion.section
            className='flex flex-col lg:flex-row'
            variants={fade}
            initial='hidden'
            animate={component === 'Position-list' ? 'visible' : 'hidden'}
            key={component}
          >
            <Card className='mt-5'>
              <p className='text-gray-600 text-sm mb-3'>
                Trailers: {trailers.data.length}
              </p>
              <ul className='mt-5 flex flex-col'>
                {trailers.data &&
                  trailers.data.map((trailer) => (
                    <li
                      className={
                        'bg-gray-50 hover:bg-gray-200 shadow mb-3 flex h-16 rounded-sm overflow-hidden w-80 cursor-pointer border-t border-b ' +
                        (selectedTrailer &&
                          selectedTrailer._id === trailer._id &&
                          'bg-gray-200')
                      }
                      key={trailer._id}
                    >
                      <img src={trailer.imgURL} alt='Trailer' />
                      <div className='h-full w-full flex'>
                        <div
                          className='h-full w-full flex flex-col px-4'
                          onClick={() => setSelectedTrailer(trailer)}
                        >
                          <div className='flex items-center w-full'>
                            <p className='font-bold w-1/2'>
                              {trailer.regNumber}
                            </p>
                            <p className='text-sm pl-5'>{trailer.type.name}</p>
                          </div>

                          <div className='flex items-center w-full'>
                            <p className='text-sm flex items-center w-1/2'>
                              {trailer.currentLocation?.place}
                              {trailer.nextLocation && (
                                <span className='ml-auto'>
                                  <ArrowRight className='m-auto h-5 w-5' />
                                </span>
                              )}
                            </p>
                            {trailer.nextLocation?.place && (
                              <p className='text-sm pl-5'>
                                {trailer.nextLocation.place}
                              </p>
                            )}
                            {!trailer.nextLocation && (
                              <p className='text-sm'>{trailer.updatedAt}</p>
                            )}
                          </div>

                          <div className='flex items-center w-full'>
                            <p className='text-xs w-1/2'>12.09.21</p>
                            <p className='text-xs pl-5'>13.09.21</p>
                          </div>
                        </div>
                        <button className='text-xs w-16 bg-primary text-white hover:bg-primaryHover'>
                          SHIP IT
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </Card>
            {selectedTrailer && (
              <AnimatePresence exitBeforeEnter>
                <Card
                  className='mt-5 min-w-max md:ml-10'
                  key={selectedTrailer.regNumber}
                >
                  <div className='flex'>
                    <img
                      src={selectedTrailer.imgURL}
                      alt={selectedTrailer.regNumber}
                      className='hidden w-48 mr-5 lg:block'
                    />
                    <div>
                      <div className='flex mb-5 items-center'>
                        <h5 className='font-heading font-semibold capitalize text-lg'>
                          {selectedTrailer.regNumber}
                        </h5>
                        <p className='ml-auto text-xs text-gray-600'>
                          {selectedTrailer.type?.name}
                        </p>
                      </div>
                      <ul className='text-sm'>
                        <li className='flex py-2'>
                          <p className='font-bold w-40'>Current Location:</p>
                          <p>
                            {selectedTrailer.currentLocation?.areaCode?.name}
                            {', '}
                            {selectedTrailer.currentLocation?.place}
                          </p>
                        </li>
                        <li className='flex py-2'>
                          <p className='font-bold w-40'>Next Location:</p>
                          <p>
                            {selectedTrailer.nextLocation?.areaCode?.name}
                            {', '}
                            {selectedTrailer.nextLocation?.place || 'None'}
                          </p>
                        </li>
                        <li className='flex py-2'>
                          <p className='font-bold w-40'>Created:</p>
                          <Moment>{selectedTrailer.createdAt}</Moment>
                        </li>
                        <li className='flex py-2'>
                          <p className='font-bold w-40'>Updated:</p>
                          <Moment>{selectedTrailer.updatedAt}</Moment>
                        </li>
                        <li className='flex py-2'>
                          <p className='font-bold'>Created By:</p>
                          <p>
                            <button className='capitalize hover:text-black'>
                              {/* {selectedUser.invitedBy?.name} */}
                            </button>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatePresence>
            )}
          </motion.section>
        )}
        {component === 'Map' && (
          <motion.h1
            variants={fade}
            initial='hidden'
            animate={component === 'Map' ? 'visible' : 'hidden'}
            key={component}
          >
            Map
          </motion.h1>
        )}
        {component === 'Service' && (
          <motion.h1
            variants={fade}
            initial='hidden'
            animate={component === 'Service' ? 'visible' : 'hidden'}
            key={component}
          >
            Service
          </motion.h1>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Equipment;
