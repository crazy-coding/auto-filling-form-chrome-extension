import { useState } from "react";
import { SketchPicker } from 'react-color';

const ColorPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(value);

  const onChangeComplete = (color) => {
    setColor(color);
  }

  const closePickerForm = (callback) => {
    setOpen(false);
    callback();
  }

  return <>
    <div className="ColorPicker" style={{ background: color }}>
      <div style={{ height: '100%' }} onClick={() => setOpen(!open)}></div>
      {open && <div className="ColorPickerForm">
        <SketchPicker
          width={180}
          color={ value }
          onChange ={(color) => onChangeComplete(color.hex)}
        />
        <div className="submit-buttons">
          <button className="" onClick={() => closePickerForm(() => onChange(color))}>OK</button>
          <button className="" onClick={() => closePickerForm(() => setColor(value))}>Cancel</button>
        </div>
      </div>}
    </div>
  </>
}

export default ColorPicker;