import { useState } from "react";
import ColorPicker from "./ColorPicker";

const WidgetMenu = ({ opened, wTitle, wStyle, onTitleChange, onBGChange, onDelete }) => {
  const [open, setOpen] = useState(false);

  const [titleForm, setTitleForm] = useState(false);
  const [bgForm, setBGForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const closeMenu = (callback) => {
    setTitleForm(false);
    setBGForm(false);
    setDeleteForm(false);
    setOpen(false);
    callback();
  }

  const TitleForm = () => {
    const [title, setTitle] = useState(wTitle);
    
    return titleForm && <div className="TitleForm widget-form">
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="submit-buttons">
        <button onClick={() => closeMenu(() => onTitleChange(title))}>Submit</button>
        <button onClick={() => setTitleForm(false)}>Cancel</button>
      </div>
    </div>
  }

  const BGForm = () => {
    const [bGColor, setBGColor] = useState(wStyle.background);
    const [txtColor, setTxtColor] = useState(wStyle.color);
    const [extStyle, setExtStyle] = useState(wStyle);

    return bgForm && <div className="BGForm widget-form">
      <label>Background:</label>
      <ColorPicker value={bGColor} onChange={setBGColor} />
      <label>Text Color:</label>
      <ColorPicker value={txtColor} onChange={setTxtColor} />
      <label>Extra Style:</label>
      <textarea onChange={(e) => setExtStyle(e.target.value ? JSON.parse(e.target.value) : {})} rows={6}>{JSON.stringify(extStyle)}</textarea>

      <div className="submit-buttons">
        <button onClick={() => closeMenu(() => onBGChange({...extStyle, background: bGColor, color: txtColor}))}>Submit</button>
        <button onClick={() => setBGForm(false)}>Cancel</button>
      </div>
    </div>
  }

  const DeleteForm = () => deleteForm && <div className="DeleteForm widget-form">
    <div>Delete?</div>
    <div className="submit-buttons">
      <button onClick={() => onDelete()}>Submit</button>
      <button onClick={() => setDeleteForm(false)}>Cancel</button>
    </div>
  </div>
  
  return (
    <div className="WidgetMenu">
      {opened && (
        <div className="WidgetMenuList">
          <button onClick={() => closeMenu(() => setTitleForm(true))}>/</button>
          <button onClick={() => closeMenu(() => setBGForm(true))} style={{ backgroundImage: 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)' }}></button>
          <button onClick={() => closeMenu(() => setDeleteForm(true))}>X</button>
        </div>
      )}
      {!opened && (
        <>
          <button onClick={() => setOpen(!open)}>...</button>
          {open && (
            <ul className="WidgetMenuList">
              <button onClick={() => closeMenu(() => setTitleForm(true))}>Title Change</button>
              <button onClick={() => closeMenu(() => setBGForm(true))}>Background</button>
              <button onClick={() => closeMenu(() => setDeleteForm(true))}>Delete</button>
            </ul>
          )}
        </>
      )}
      
      <TitleForm />
      <BGForm />
      <DeleteForm />
    </div>
  );
}

export default WidgetMenu;