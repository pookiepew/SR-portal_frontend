import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../../../../variants";

import ImageModal from "../../../ui/imageModal";

import PositionFilter from "./PositionFilter";
import PositionTable from "./PositionTable";
import SelectedTrailerCard from "./SelectedTrailerCard";

const PositionList = ({
  component,
  trailers,
  user,
  filteredList,
  setFilteredList,
  selectedTrailer,
  chooseTrailerClickHandler,
  toggleModalHandler,
  showImageModal,
  imgDetails,
}) => {
  return (
    <motion.section
      className='flex flex-col lg:flex-row'
      variants={fade}
      initial='hidden'
      animate={component === "Position-list" ? "visible" : "hidden"}
      key={component}
    >
      <div className='flex flex-col'>
        <PositionFilter
          trailers={trailers}
          user={user}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
        />
        <PositionTable
          trailers={filteredList}
          selectedTrailer={selectedTrailer}
          chooseTrailerClickHandler={chooseTrailerClickHandler}
          toggleModalHandler={toggleModalHandler}
        />
      </div>
      {showImageModal && (
        <AnimatePresence exitBeforeEnter>
          <ImageModal
            toggleModalHandler={toggleModalHandler}
            src={imgDetails.src}
            alt={imgDetails.alt}
          />
        </AnimatePresence>
      )}
      {selectedTrailer && (
        <AnimatePresence exitBeforeEnter>
          <SelectedTrailerCard
            selectedTrailer={selectedTrailer}
            toggleModalHandler={toggleModalHandler}
          />
        </AnimatePresence>
      )}
    </motion.section>
  );
};

export default PositionList;
