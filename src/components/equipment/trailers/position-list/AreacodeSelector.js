import MultiSelect from "../../../ui/Select/MultiSelect";

const AreacodeSelector = ({
  trailers,
  user,
  onChangeHandler,
  closeMenuOnSelect,
}) => {
  const createAreacodeOptions = (trailers) => {
    const options = [];
    const filtered = [];
    trailers.forEach((trailer) => {
      if (!filtered.includes(trailer.location.current.areaCode.code)) {
        filtered.push(trailer.location.current.areaCode.code);
      }
    });
    filtered.forEach((item) => {
      options.push({ value: item, label: item });
    });
    return options;
  };

  return (
    <MultiSelect
      options={createAreacodeOptions(trailers)}
      defaultValue={[
        {
          value: user.team.location.areacode.code || "NO-500",
          label: user.team.location.areacode.code || "NO-500",
        },
      ]}
      onChange={(newValue) => onChangeHandler("areacode", newValue)}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default AreacodeSelector;
