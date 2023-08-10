import { useEffect, useState } from "react";
import { Switch } from "antd";



export const ToggleSwitch = ({ value, name, onChange, error }) => {
  const [toggleValue, setToggleValue] = useState(value[name]);

  const handleToggle = (variables) => {
    onChange(variables);
    setToggleValue(variables[name]);
  };

  useEffect(() => {
    if (error) {
      setToggleValue(value[name]);
    }
  }, [error]);

  return (
    <Switch
      size="small"
      checked={!!toggleValue}
      onClick={(_, e) => e.stopPropagation()}
      onChange={(val) => handleToggle({ ...value, [name]: val })}
    />
  );
}
