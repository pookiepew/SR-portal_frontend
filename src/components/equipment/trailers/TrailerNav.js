import Header from "../../navigation/Header";

const TrailerNav = ({ component, setComponent }) => {
  return (
    <Header>
      <nav className='flex items-center h-full justify-between'>
        <ul className='hidden sm:flex items-center h-full text-sm sm:text-base'>
          <li
            className={
              component === "Position-list"
                ? "h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer"
                : "h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer"
            }
            onClick={() => setComponent("Position-list")}
          >
            Position-list
          </li>
          <li
            className={
              component === "Map"
                ? "h-6 font-bold mr-6 border-b-2 select-none border-primary hover:border-primary cursor-pointer"
                : "h-6 font-bold mr-6 border-b-2 select-none border-transparent hover:border-primary cursor-pointer"
            }
            onClick={() => setComponent("Map")}
          >
            Map
          </li>
          <li
            className={
              component === "Service"
                ? "h-6 font-bold border-b-2 select-none border-primary hover:border-primary cursor-pointer"
                : "h-6 font-bold border-b-2 select-none border-transparent hover:border-primary cursor-pointer"
            }
            onClick={() => setComponent("Service")}
          >
            Service
          </li>
        </ul>
        <button className='mr-10 text-xs md:text-sm text-white bg-primary ml-auto flex px-1 md:px-3 py-1 rounded hover:bg-primaryHover h-1/2'>
          Create new trailer
        </button>
      </nav>
    </Header>
  );
};

export default TrailerNav;
