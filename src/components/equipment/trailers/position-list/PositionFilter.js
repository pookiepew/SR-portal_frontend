import { useEffect, useState } from "react";

import Card from "../../../ui/Card";

import AreacodeSelector from "./AreacodeSelector";
import AreaNameSelector from "./AreaNameSelector";

const PositionFilter = ({ trailers, user, filteredList, setFilteredList }) => {
  const [areacodeFilters, setAreacodeFilters] = useState([
    {
      value: user.team?.location?.areacode?.code || "NO-400",
      label: user.team?.location?.areacode?.code || "NO-400",
    },
  ]);
  const [areanameFilters, setAreanameFilters] = useState([]);

  const [closeMenuOnSelect, setCloseMenuOnSelect] = useState();

  const onChangeHandler = (type, newFilter) => {
    switch (type) {
      case "areacode":
        setAreacodeFilters(newFilter);
        break;
      case "areaname":
        setAreanameFilters(newFilter);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    let newTrailerList = [];
    let filteredByAreacodes = [];
    let filteredByAreanames = [];

    if (areacodeFilters.length > 0) {
      areacodeFilters.forEach((filter) => {
        trailers.forEach((trailer) => {
          if (filter.value === trailer.location.current.areaCode.code) {
            filteredByAreacodes.push(trailer);
          }
        });
      });
      newTrailerList = [...filteredByAreacodes];
    } else {
      filteredByAreacodes = [];
      newTrailerList = [];
    }

    if (areanameFilters.length > 0) {
      areanameFilters.forEach((filter) => {
        trailers.forEach((trailer) => {
          if (filter.value === trailer.location.current.area) {
            filteredByAreanames.push(trailer);
          }
        });
      });
      newTrailerList = [...filteredByAreanames];
    } else {
      filteredByAreanames = [];
    }

    if (areacodeFilters.length === 0 && areanameFilters.length === 0) {
      return setFilteredList(trailers);
    }

    setFilteredList(newTrailerList);
  }, [areacodeFilters, areanameFilters, setFilteredList, trailers]);

  useEffect(() => {
    const closeMenuOnSelectState = JSON.parse(
      localStorage.getItem("closeMenuOnSelect")
    );
    if (closeMenuOnSelectState === false || closeMenuOnSelectState === true) {
      setCloseMenuOnSelect(closeMenuOnSelectState);
    }
  }, []);

  const closeMenuOnSelectClickHandler = (e) => {
    localStorage.setItem("closeMenuOnSelect", JSON.stringify(e.target.checked));
    setCloseMenuOnSelect((prev) => e.target.checked);
  };

  return (
    <Card className='mt-6'>
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <label className='text-xs text-gray-500 block mb-1 ml-1'>
            Areacode
          </label>
          <AreacodeSelector
            trailers={trailers}
            user={user}
            onChangeHandler={onChangeHandler}
            closeMenuOnSelect={closeMenuOnSelect}
          />
        </div>
        <div className='w-1/2'>
          <label className='text-xs text-gray-500 block mb-1 ml-1'>Area</label>
          <AreaNameSelector
            trailers={trailers}
            filteredList={filteredList}
            onChangeHandler={onChangeHandler}
            closeMenuOnSelect={closeMenuOnSelect}
          />
        </div>
      </div>
      <div className='ml-1 mt-2 flex'>
        <input
          type='checkbox'
          className='cursor-pointer'
          defaultChecked={closeMenuOnSelect}
          onChange={closeMenuOnSelectClickHandler}
        />
        <span className='block text-xs ml-1 text-gray-500'>
          Close menus on select
        </span>
        <span className='ml-2 text-xs'>|</span>
        <p className='text-xs ml-2 text-gray-500'>
          Trailers found:{" "}
          <span className='text-primary font-bold'>
            {filteredList?.length || "0"}
          </span>
        </p>
      </div>
    </Card>
  );
};

export default PositionFilter;
