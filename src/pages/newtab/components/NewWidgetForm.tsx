import { useState } from "react";

const NewWidgetForm = ({ func }) => {
  const [open, setOpen] = useState(false);

  const [widget, setWidget] = useState('google_calendar');
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState({});

  const createNewWidget = () => {
    setOpen(false);
    func.wUpdate({
      id: Date.now(),
      title,
      widget,
      position: { x: 150, y: 150 },
      style: { width: 300, height: 300 },
      minimized: false,
      meta
    });
    setTitle('');
    setMeta({});
  }

  return <>
    <button className="AddWidgetButton" onClick={() => setOpen(true)}>++</button>
    {open && <div className="NewWidgetForm">
      <label>Widget:</label>
      <select value={widget} onChange={(e) => setWidget(e.target.value)}>
        <option value="google_calendar">Google Calendar</option>
        <option value="suggested_links">Suggested Links</option>
        <option value="world_clock">World Clock</option>
        <option value="sticky_note">Sticky Note</option>
      </select>
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Meta:</label>
      <textarea onChange={(e) => setMeta(JSON.parse(e.target.value))} rows={6}>{JSON.stringify(meta)}</textarea>

      <div className="submit-buttons">
        <button onClick={createNewWidget}>Submit</button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>}
  </>
}

export default NewWidgetForm;