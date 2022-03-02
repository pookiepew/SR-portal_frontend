import Select from "react-select";

const SingleSelect = (props) => {
  return (
    <Select
      classNamePrefix='filter'
      isClearable={props.isClearable || true}
      onChange={props.onChange}
      options={props.options}
      defaultValue={props.defaultValue}
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

export default SingleSelect;
