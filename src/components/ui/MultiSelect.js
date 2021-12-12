import Select from "react-select";
import makeAnimated from "react-select/animated";

const MultiSelect = (props) => {
  const animatedComponents = makeAnimated();

  return (
    <Select
      isMulti
      components={animatedComponents}
      closeMenuOnSelect={props.closeMenuOnSelect || false}
      options={props.options}
      defaultValue={props.defaultValue}
      isSearchable={props.isSearchable || true}
      onChange={(newValue) => props.onChange(newValue)}
    />
  );
};

export default MultiSelect;
