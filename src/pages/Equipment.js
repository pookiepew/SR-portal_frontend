import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { fade } from "../variants";

import { getTrailers } from "../store/actions-creators/equipment-actions";

import { socket } from "../components/Layout";

import TrailerNav from "../components/equipment/trailers/TrailerNav";
import PositionList from "../components/equipment/trailers/position-list/PositionList";

const Equipment = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState("Position-list");
  const { trailers } = useSelector((state) => state.equipment);
  const { user } = useSelector((state) => state.auth);

  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgDetails, setImgDetails] = useState({ src: null, alt: null });

  const [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    document.title = "SR Portal - Equipment";
    localStorage.setItem("path", "/equipment");
    dispatch(getTrailers());
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("trailer", (data) => {
        // console.log(data);
      });
    }
    return () => {
      if (socket) {
        socket.off("trailer");
      }
    };
  }, []);

  const chooseTrailerClickHandler = (trailer) => {
    setSelectedTrailer(trailer);
  };

  const toggleModalHandler = (trailer) => {
    if (imgDetails.src === null) {
      setImgDetails({ src: trailer.imgURL, alt: trailer.license });
      setShowImageModal(!showImageModal);
    } else {
      setImgDetails({ src: null, alt: null });
      setShowImageModal(!showImageModal);
    }
  };

  if (!user.isAuthenticated) return <Redirect to='/login' />;

  return (
    <>
      <TrailerNav component={component} setComponent={setComponent} />

      <section className='w-full px-4 sm:pl-72'>
        <AnimatePresence exitBeforeEnter>
          {component === "Position-list" && (
            <PositionList
              component={component}
              trailers={trailers}
              user={user}
              filteredList={filteredList}
              setFilteredList={setFilteredList}
              selectedTrailer={selectedTrailer}
              chooseTrailerClickHandler={chooseTrailerClickHandler}
              toggleModalHandler={toggleModalHandler}
              showImageModal={showImageModal}
              imgDetails={imgDetails}
            />
          )}
          {component === "Map" && (
            <motion.section
              className='flex flex-col lg:flex-row mt-6'
              variants={fade}
              initial='hidden'
              animate={component === "Map" ? "visible" : "hidden"}
              key={component}
            >
              <h1>Map</h1>
            </motion.section>
          )}
          {component === "Service" && (
            <motion.section
              className='flex flex-col lg:flex-row mt-6'
              variants={fade}
              initial='hidden'
              animate={component === "Service" ? "visible" : "hidden"}
              key={component}
            >
              <h1>Service</h1>
            </motion.section>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Equipment;
