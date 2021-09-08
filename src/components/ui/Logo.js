import logo from '../../assets/svg/srg.svg';

const Logo = (props) => {
  return <img src={logo} alt='SR Group logo' className={props.className} />;
};

export default Logo;
