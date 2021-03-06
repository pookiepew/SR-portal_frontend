import Creatable from "react-select/creatable";

const CreatableSelect = (props) => {
  return (
    <Creatable
      classNamePrefix='filter'
      autoFocus={props.autoFocus}
      isDisabled={props.isDisabled}
      isClearable={props.isClearable || true}
      onChange={props.onChange}
      onCreateOption={props.onCreateOption}
      onInputChange={props.onInputChange}
      options={props.options}
      value={props.value}
      defaultValue={props.defaultValue}
      noOptionsMessage={() => props.noOptionsMessage}
      theme={(theme) => ({
        ...theme,
        borderRadius: "0",
      })}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderTop: "none",
          borderBottom: "none",
          borderRight: "none",
          backgroundColor: "transparent",
        }),
      }}
    />
  );
};

export default CreatableSelect;
