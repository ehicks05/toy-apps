import React, { useMemo } from "react";
import * as R from "ramda";
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
      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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
    inputClassName="bg-gray-700 text-gray-100"
    className="bg-gray-700 text-gray-100"
  />
);
const MultiValueContainer = (props) => (
  <components.MultiValueContainer
    {...props}
    className="bg-gray-700 text-gray-100"
  />
);
const MultiValue = (props) => (
  <components.MultiValue {...props} className="bg-gray-700 text-gray-100" />
);
const MultiValueLabel = (props) => (
  <components.MultiValueLabel
    {...props}
    className="bg-gray-600 text-gray-100"
  />
);
const Control = (props) => (
  <components.Control {...props} className="bg-gray-600 text-gray-100" />
);
const ValueContainer = (props) => (
  <components.ValueContainer {...props} className="bg-gray-600 text-gray-100" />
);
const IndicatorsContainer = (props) => (
  <components.IndicatorsContainer
    {...props}
    className="bg-gray-600 text-gray-100"
  />
);
const Option = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <components.Option
      {...newProps}
      className={`hover:bg-gray-600 focus:bg-gray-600 ${
        props.isSelected ? "bg-gray-600" : ""
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

  const states = R.pipe(
    R.pluck("Province_State"),
    R.uniq,
    R.filter((o) => o),
    R.sort((o1, o2) => o1.localeCompare(o2))
  )(Object.values(counties));

  return (
    <Select
      isMulti
      value={UIDs.map((uid) => countyOptions.find((co) => co.value === uid))}
      options={countyOptions}
      filterOption={createFilter({ ignoreAccents: false })}
      components={{
        MenuList,
        Input,
        MultiValueContainer,
        MultiValue,
        MultiValueLabel,
        Control,
        ValueContainer,
        IndicatorsContainer,
        Option,
      }}
      onChange={(newValue) => {
        setUIDs(newValue.map((v) => v.value || v));
      }}
    />
  );
};

export default CountySelector;
