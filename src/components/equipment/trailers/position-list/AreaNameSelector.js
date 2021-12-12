import MultiSelect from "../../../ui/Select/MultiSelect";

const AreaNameSelector = ({
  filteredList,
  onChangeHandler,
  closeMenuOnSelect,
}) => {
  const createAreaNameOptions = (trailers) => {
    const options = [];
    const filtered = [];
    if (trailers?.length > 0) {
      trailers.forEach((trailer) => {
        if (!filtered.includes(trailer.location.current.area)) {
          filtered.push(trailer.location.current.area);
        }
      });
      filtered.forEach((item) => {
        options.push({ value: item, label: item });
      });
    }
    return options;
  };

  return (
    <MultiSelect
      options={createAreaNameOptions(filteredList)}
      defaultValue={[]}
      onChange={(newValue) => onChangeHandler("areaname", newValue)}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default AreaNameSelector;
