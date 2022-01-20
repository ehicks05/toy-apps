import React, { useMemo } from "react";
import * as R from "ramda";
import Select, { createFilter, components } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useLocalStorageValue } from "@react-hookz/web/esm";

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
    >
      {({ index, style }) => (
        <div
          key={index}
          style={{ ...style, color: "#ccc" }}
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
  return <components.Option {...newProps}>{children}</components.Option>;
};

const CountySelector = ({ counties }) => {
  const [UIDs, setUIDs] = useLocalStorageValue("UIDs");

  const countyOptions = useMemo(() => {
    return counties
      ? Object.values(counties).map((county) => ({
          value: county.UID,
          label: county.Combined_Key,
        }))
      : [];
  }, [counties]);

  const states = R.pipe(
    R.pluck("Province_State"),
    R.uniq,
    R.filter((o) => o),
    R.sort((o1, o2) => o1.localeCompare(o2))
  )(Object.values(counties));

  return (
    <>
      {/* <pre>{JSON.stringify(R.pluck("Province_State", counties), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(counties, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(states, null, 2)}</pre> */}
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
          console.log(newValue);
          setUIDs(newValue.map((v) => v.value || v));
        }}
      />
      {/* <select
        multiple
        className="text-blue-800"
        value={UIDs}
        onChange={(e) => {
          console.log(e.target.selectedOptions);
          setUIDs([...e.target.selectedOptions].map((o) => o.value));
        }}
      >
        {countyOptions.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select> */}
    </>
  );
};

export default CountySelector;
