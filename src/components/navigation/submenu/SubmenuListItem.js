const SubmenuListItem = (props) => {
  return (
    <li
      className={
        !props.sidebarIsOpen
          ? 'text-gray-400 pl-24 mr-3 text-xs mb-1'
          : 'text-gray-400 text-sm w-4/5 mb-1 hover:bg-gray-700'
      }
    >
      {props.children}
    </li>
  );
};

export default SubmenuListItem;
