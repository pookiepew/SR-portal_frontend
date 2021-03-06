import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAreas } from "../../../../store/actions-creators/location-actions";

import Moment from "react-moment";

import Card from "../../../ui/Card";

import SingleSelect from "../../../ui/Select/SingleSelect";
import CreatableSelect from "../../../ui/Select/CreatableSelect";

import CheckIcon from "../../../ui/icons/Check-icon";
import Cogwheel from "../../../ui/icons/Cogwheel";
import TruckBGIcon from "../../../ui/icons/Truck2-icon";

const SelectedTrailerCard = ({ selectedTrailer, toggleModalHandler }) => {
  const dispatch = useDispatch();
  const { areas, areacodeSelectOptions } = useSelector(
    (state) => state.location
  );

  const [editingNextLocation, setEditingNextLocation] = useState(false);

  const [areacode, setAreacode] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [newAreaOption, setNewAreaOption] = useState(null);

  const [readyToSaveChanges, setReadyToSaveChanges] = useState(false);

  /* TODO: 
      When areacode is selected, filter out areaOptions based on areacode
  */

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch, selectedTrailer]);

  useEffect(() => {
    if (areacode?.value && newAreaOption?.value) {
      setReadyToSaveChanges(true);
      return;
    }
    setReadyToSaveChanges(false);
  }, [areacode, newAreaOption]);

  const areacodeChangeHandler = (newValue) => {
    console.group("areacodeChangeHandler");
    console.log(newValue);
    console.groupEnd();
    setAreacode(newValue);
    if (areas.length > 0) {
      // setAreaOptions === areacode arr
    }
  };

  const areaChangeHandler = (newValue) => {
    console.group("areaChangeHandler");
    console.log(newValue);
    console.groupEnd();
    if (!newValue) {
      setNewAreaOption(null);
      setAreaOptions([]);
      return;
    }
    setAreaOptions([newValue]);
    setNewAreaOption(newValue);
  };

  const onCreateNewHandler = (newValue) => {
    console.group("onCreateNewHandler");
    console.log(newValue);
    console.groupEnd();
    if (!newValue) return;
    setAreaOptions([{ label: newValue.trim(), value: newValue.trim() }]);
    setNewAreaOption({ label: newValue.trim(), value: newValue.trim() });
  };

  const submitChanges = () => {
    if (areacode?.value && newAreaOption?.value) {
      console.group("submitChanges");
      console.log(areacode?.value);
      console.log(newAreaOption?.value);
      console.groupEnd();
    }
  };

  return (
    <Card className='mt-6 md:ml-10' key={selectedTrailer._id}>
      <div className='flex justify-between h-20'>
        {selectedTrailer.imgURL ? (
          <img
            src={selectedTrailer.imgURL}
            alt={selectedTrailer.license}
            onClick={() => toggleModalHandler(selectedTrailer)}
            className='rounded shadow cursor-pointer transform transition-all hover:scale-300'
          />
        ) : (
          <TruckBGIcon className='w-14 h-14 mt-auto mb-auto' />
        )}
        <div className='px-8 h-full flex flex-col '>
          <h1 className='text-2xl text-primary font-bold'>
            {selectedTrailer.license}
          </h1>
          <p className='text-sm text-gray-400'>{selectedTrailer.type?.type}</p>
        </div>
        <div className='flex flex-col'>
          <button className='text-xs md:text-sm text-white bg-primary px-1 md:px-3 py-1 rounded hover:bg-primaryHover'>
            View details
          </button>
          <div className='flex items-center justify-between mt-4'>
            <span className='text-xs text-gray-500'>
              {!readyToSaveChanges ? "Edit details" : "Save changes"}
            </span>
            <button onClick={submitChanges}>
              {!readyToSaveChanges ? (
                <Cogwheel className='h-6 w-6 text-primary transform-gpu transition-transform hover:rotate-180' />
              ) : (
                <CheckIcon className='h-6 w-6 text-primary transform-gpu transition-transform hover:text-green-700' />
              )}
            </button>
          </div>
        </div>
      </div>

      {!editingNextLocation && (
        <ul className='list-reverse mt-6 text-sm'>
          <li className='h-9 px-4 flex items-center'>
            <span className='w-48 font-semibold'>Current Location</span>
            <div className='flex items-center'>
              <span className='mr-1'>
                {selectedTrailer.location.current?.areaCode?.code}
              </span>
              {" - "}
              <span className=''>{selectedTrailer.location.current?.area}</span>
            </div>
          </li>
          <li className='h-10 pl-4 flex items-center'>
            <span className='w-48 font-semibold'>Next Location</span>
            <button onClick={() => setEditingNextLocation(true)}>
              Set next location
            </button>
          </li>
          <li className='h-9 px-4 flex items-center'>
            <span className='w-48 font-semibold'>Team</span>
            <span className='capitalize text-blue-400 hover:text-blue-500 cursor-pointer'>
              {selectedTrailer.team?.name}
            </span>
          </li>
          <li className='h-9 px-4 flex items-center'>
            <span className='w-48 font-semibold'>Last Updated</span>
            <Moment className=''>{selectedTrailer.updatedAt}</Moment>
          </li>
          <li className='h-9 px-4 flex items-center'>
            <span className='w-48 font-semibold'>Updated By</span>
            <span className='capitalize text-blue-400 hover:text-blue-500 cursor-pointer'>
              {selectedTrailer.updatedBy || selectedTrailer.creator?.name}
            </span>
          </li>
          <li className='h-9 px-4 flex items-center'>
            <span className='w-48 font-semibold'>Creator</span>
            <span className='capitalize text-blue-400 hover:text-blue-500 cursor-pointer'>
              {selectedTrailer.creator?.name}
            </span>
          </li>
        </ul>
      )}

      {editingNextLocation && (
        <ul className='list-reverse mt-6 text-sm'>
          <li className='h-10 pl-4 flex items-center'>
            <span className='w-40 mr-2 font-semibold'>Next Area</span>
            <div className='w-52'>
              <SingleSelect
                onChange={areacodeChangeHandler}
                defaultValue={[]}
                options={areacodeSelectOptions}
                isClearable
              />
            </div>
          </li>
          <li className='h-10 pl-4 flex items-center'>
            <span className='w-40 mr-2 font-semibold'>Next Location</span>
            <div className='w-52'>
              <CreatableSelect
                onChange={areaChangeHandler}
                onCreateOption={onCreateNewHandler}
                defaultValue={[]}
                options={areaOptions}
                value={newAreaOption}
                noOptionsMessage={"No options, try creating one"}
                isDisabled={areacode ? false : true}
                isClearable
              />
            </div>
          </li>
          <li className='h-10 pl-4 flex items-center'>
            <span className='w-40 mr-2 font-semibold'>Shipping date</span>
            <input
              type='date'
              name='date'
              id='date'
              className='outline-none h-full px-2 w-52 border-l'
            />
          </li>
          <li className='h-14 flex items-center justify-evenly'>
            <button
              className='w-1/3 h-2/4 font-semibold rounded text-white bg-red-600'
              onClick={() => setEditingNextLocation(false)}
            >
              Cancel
            </button>

            <button
              className='w-1/3 h-2/4 font-semibold rounded text-white bg-green-600'
              onClick={() => setEditingNextLocation(false)}
            >
              Save
            </button>
          </li>
        </ul>
      )}

      {/* <motion.ul
            className='list-reverse mt-6 text-sm overflow-hidden'
            variants={fade}
            initial='visible'
            animate={editingNextLocation ? "hidden" : "visible"}
            key={"kjfklsdjfsdf"}
          >
            <li className='h-9 px-4 flex items-center'>
              <span className='w-48 font-semibold'>Current Location</span>
              <div className='flex items-center'>
                <span className='mr-1'>
                  {selectedTrailer.location.current?.areaCode?.code}
                </span>
                {" - "}
                {selectedTrailer.location.current?.area}
              </div>
            </li>

            <li className='h-10 pl-4 flex items-center'>
              <span className='w-48 font-semibold'>Next Location</span>
              <button onClick={() => setEditingNextLocation(true)}>
                Set next location
              </button>

              <div className='w-56'>
                 <SingleSelect
          onChange={areacodeChangeHandler}
          defaultValue={[]}
          options={areacodeSelectOptions}
          isClearable
          /> *
              </div>
            </li>

            <li className='h-10 pl-4 flex items-center'>
              <span className='w-44 mr-2 font-semibold'>Send to Area</span>
              <div className='w-56'>
                 <CreatableSelect
              onChange={areaChangeHandler}
              onCreateOption={onCreateNewHandler}
              defaultValue={[]}
              options={areaOptions}
              value={newAreaOption}
              noOptionsMessage={"No options, try creating one"}
              isDisabled={areacode ? false : true}
              isClearable
            /> 
              </div>
            </li> */}

      <ul className='list mt-6 text-sm'>
        <li className='h-9 px-5 flex items-center font-semibold'>
          <p className='w-48'>Specs</p>
          <p className='w-40'>Status</p>
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Container locks</span>
          {selectedTrailer.specs.containerlocks && (
            <span className='ml-4'>
              {selectedTrailer.specs.containerlocks === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.containerlocks === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Extendable</span>
          {selectedTrailer.specs.extendable && (
            <span className='ml-4'>
              {selectedTrailer.specs.extendable === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.extendable === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Lashings</span>
          {selectedTrailer.specs.lashings && (
            <span className='ml-4'>
              {selectedTrailer.specs.lashings === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.lashings === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Options for ramps</span>
          {selectedTrailer.specs.loadingramp && (
            <span className='ml-4'>
              {selectedTrailer.specs.loadingramp === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.loadingramp === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Winter tires</span>
          {selectedTrailer.specs.winterTires && (
            <span className='ml-4'>
              {selectedTrailer.specs.winterTires === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.winterTires === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Summer tires</span>
          {selectedTrailer.specs.summerTires && (
            <span className='ml-4'>
              {selectedTrailer.specs.summerTires === true ? "???" : "???"}
            </span>
          )}
          {selectedTrailer.specs.summerTires === null && (
            <span className='ml-4 text-gray-400'>???</span>
          )}
        </li>
        <li className='h-11 px-4 flex items-center'>
          <span className='w-48 font-semibold'>Axles</span>
          <span className='ml-4'>{selectedTrailer.specs.axles}</span>
        </li>
      </ul>
    </Card>
  );
};

export default SelectedTrailerCard;
