import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { fade } from '../variants';

import Moment from 'react-moment';

import {
  getTrailers,
  getTrailerType,
} from '../store/actions-creators/equipment-actions';

import { socket } from '../App';

import ArrowRight from '../components/ui/icons/Arrow-right';
import Card from '../components/ui/Card';

const Equipment = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState('Position-list');
  const { trailers, trailerType } = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth);

  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [addNewTrailer, setAddNewTrailer] = useState(false);

  useEffect(() => {
    document.title = 'SR Portal - Equipment';
    dispatch(getTrailers());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('path', '/equipment');
  }, []);

  useEffect(() => {
    setSelectedTrailer(trailers[0]);
  }, [trailers]);

  useEffect(() => {
    if (socket) {
      socket.on('trailer', (data) => {
        console.log(data);
      });
    }
    return () => {
      if (socket) {
        socket.off('trailer');
      }
    };
  }, []);

  const addNewTrailerHandler = () => {
    dispatch(getTrailerType());
    setSelectedTrailer(null);
    setAddNewTrailer(true);
  };

  const chooseTrailerClickHandler = (trailer) => {
    if (setAddNewTrailer) {
      setAddNewTrailer(false);
    }
    setSelectedTrailer(trailer);
  };

  if (!user.isAuthenticated) return <Redirect to='/login' />;

  return (
    <section className='w-full px-4 sm:pl-72'>
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
            <div
              className='absolute bottom-16 right-12 w-20 h-20 bg-primary flex items-center justify-center rounded-full hover:shadow-xl cursor-pointer'
              onClick={addNewTrailerHandler}
            >
              <p className='text-white text-6xl h-16 w-16 text-center transform-gpu duration-200 hover:rotate-180'>
                +
              </p>
            </div>
            <Card className='mt-5'>
              <p className='text-gray-600 text-sm mb-3'>
                Trailers: {trailers.length}
              </p>
              <ul className='mt-5 flex flex-col'>
                {trailers &&
                  trailers.map((trailer) => (
                    <li
                      className={
                        'bg-gray-50 hover:bg-gray-200 shadow mb-3 flex h-20 rounded-sm overflow-hidden w-96 cursor-pointer border-t border-b ' +
                        (selectedTrailer &&
                          selectedTrailer._id === trailer._id &&
                          'bg-gray-200')
                      }
                      key={trailer._id}
                    >
                      <img src={trailer.imgURL} alt='Trailer' />
                      <div className='h-full w-full flex'>
                        <div
                          className='h-full w-full flex flex-col px-4 py-1'
                          onClick={() => chooseTrailerClickHandler(trailer)}
                        >
                          <div className='flex items-center w-full'>
                            <p className='font-bold w-1/2'>
                              {trailer.regNumber}
                            </p>
                            <p className='text-sm pl-7'>{trailer.type.name}</p>
                          </div>

                          <div className='flex items-center w-full'>
                            <p className='text-sm flex items-center w-1/2'>
                              {trailer.currentLocation?.area}
                              {trailer.nextLocation && (
                                <span className='ml-auto'>
                                  <ArrowRight className='m-auto h-5 w-5' />
                                </span>
                              )}
                            </p>
                            {trailer.nextLocation?.area && (
                              <p className='text-sm pl-7'>
                                {trailer.nextLocation.area}
                              </p>
                            )}
                            {!trailer.nextLocation && (
                              <p className='text-sm'>{trailer.updatedAt}</p>
                            )}
                          </div>

                          <div className='flex items-center w-full'>
                            <p className='text-xs w-1/2 mt-1'>12.09.21</p>
                            <p className='text-xs pl-7 mt-1'>13.09.21</p>
                          </div>
                        </div>
                        <button className='text-xs px-2 block bg-primary text-white hover:bg-primaryHover'>
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
            {addNewTrailer && (
              <AnimatePresence exitBeforeEnter>
                <Card className='mt-5 min-w-max md:ml-10' key='addnewtrailer'>
                  <form>
                    <div className='flex mb-5 items-center'>
                      <input
                        className='font-heading font-semibold capitalize text-lg w-20 mr-10 outline-none border-b-2 border-primary'
                        placeholder='LUB 2021'
                        required
                      />

                      {trailerType.length > 0 && (
                        <select className='ml-auto text-xs text-gray-600 outline-none cursor-pointer'>
                          {trailerType.map((type) => (
                            <option value={type.name}>{type.name}</option>
                          ))}
                          <option value='add-new'>Add New</option>
                        </select>
                      )}
                    </div>
                  </form>
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
