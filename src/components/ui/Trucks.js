import trucks from '../../assets/img/trucks.jpg';

const Trucks = (props) => {
  return (
    <img src={trucks} alt='Parked semi trucks' className={props.className} />
  );
};

export default Trucks;
