import { useMemo } from "react";
import Select, { createFilter, components } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useLocalStorageValue } from "@react-hookz/web/esm";
import { getLocationDisplayName } from "./utils";

const MenuList = ({ options, children, maxHeight, getValue }) => {
  const height = 35;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
      className="bg-gray-100 dark:bg-gray-700"
    >
      {({ index, style }) => (
        <div
          key={index}
          style={style}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
          hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-800 hover:dark:text-gray-200"
        >
          {children[index]}
        </div>
      )}
    </List>
  );
};
const Input = (props) => (
  <components.Input
    {...props}
    className="dark:bg-gray-700 dark:text-gray-100"
  />
);
const MultiValue = (props) => (
  <components.MultiValue
    {...props}
    className="dark:bg-gray-700 dark:text-gray-100"
  />
);
const Control = (props) => (
  <components.Control {...props} className="dark:bg-gray-600" />
);
const IndicatorsContainer = (props) => (
  <components.IndicatorsContainer
    {...props}
    className="dark:bg-gray-600 dark:text-gray-100"
  />
);
const Option = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <components.Option
      {...newProps}
      className={`hover:bg-gray-200 dark:hover:bg-gray-600 ${
        props.isSelected ? "bg-gray-300 dark:bg-gray-500" : ""
      }`}
    >
      {children}
    </components.Option>
  );
};

const CountySelector = ({ counties }) => {
  const [UIDs, setUIDs] = useLocalStorageValue("UIDs");

  const countyOptions = useMemo(() => {
    return Object.values(counties)
      .map((county) => ({
        value: county.UID,
        label: getLocationDisplayName(county),
      }))
      .filter((o) => o.label)
      .filter((o) => o.label.indexOf("Unassigned") === -1)
      .filter((o) => o.label.indexOf("Out of") === -1);
  }, [counties]);

  return (
    <div>
      <h1 className="text-lg">Select Counties</h1>
      <Select
        isMulti
        value={UIDs.map((uid) => countyOptions.find((co) => co.value === uid))}
        options={countyOptions}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{
          MenuList,
          Input,
          MultiValue,
          Control,
          IndicatorsContainer,
          Option,
        }}
        onChange={(newValue) => {
          setUIDs(newValue.map((v) => v.value || v));
        }}
      />
    </div>
  );
};

export default CountySelector;
