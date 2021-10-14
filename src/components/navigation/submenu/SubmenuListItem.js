const SubmenuListItem = (props) => {
  return (
    <li className='text-gray-400 text-sm w-4/5 mb-1 hover:text-white hover:font-semibold cursor-pointer select-none'>
      {props.children}
    </li>
  );
};

export default SubmenuListItem;
