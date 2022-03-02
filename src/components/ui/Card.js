const Card = (props) => {
  return (
    <div
      className={"p-5 bg-white rounded shadow-md " + props.className}
      style={{ height: "fit-content" }}
    >
      {props.children}
    </div>
  );
};

export default Card;
