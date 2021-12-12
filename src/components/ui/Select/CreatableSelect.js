import Creatable from "react-select/creatable";

const CreatableSelect = (props) => {
  return (
    <Creatable
      isClearable={props.isClearable || true}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      options={props.options}
      defaultValue={props.defaultValue}
    />
  );
};

export default CreatableSelect;
