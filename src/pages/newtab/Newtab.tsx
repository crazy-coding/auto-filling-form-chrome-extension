import React, { useEffect, useState } from "react";
import "@pages/newtab/Newtab.scss";
import WidgetLayout from "./components/WidgetLayout";
import BookmarkBar from "./components/BookmarkBar";
import NewWidgetForm from "./components/NewWidgetForm";
import { demoData } from "./demoData";

const Newtab = () => {
  const [widgets, setWidgets] = useState([]);
  const [maxZIndex, setMaxZIndex] = useState(0);

  useEffect(() => {
    setWidgets(JSON.parse(localStorage.getItem('widgets')) || demoData.widgets);
  }, []);

  useEffect(() => {
    setMaxZIndex(widgets.reduce((max, widget) => widget.style.zIndex > max ? widget.style.zIndex : max, 0));
    localStorage.setItem('widgets', JSON.stringify(widgets));
  }, [widgets])

  const wUpdate = (newWidget) => {
    console.log('update', newWidget)
    const exist = widgets.filter((widget) => widget.id === newWidget.id);
    if (exist.length > 0) {
      setWidgets(widgets.map((widget) => {
        if (widget.id === newWidget.id) {
          return { ...newWidget, style: { ...newWidget.style, zIndex: maxZIndex + 1 } };
        } else {
          return widget;
        }
      }))
    } else {
      setWidgets([...widgets, { ...newWidget, style: { ...newWidget.style, zIndex: maxZIndex + 1 }}]);
    }
  }

  const wDelete = (newWidget) => {
    console.log('delete', newWidget)
    setWidgets(widgets.filter((widget) => widget.id !== newWidget.id));
  }

  const addStickyNote = () => {
    wUpdate({
      id: Date.now(),
      title: "",
      widget: "sticky_note",
      position: { x: 150, y: 150 },
      style: { width: 300, height: 300 },
      minimized: false,
      meta: {}
    })
  }

  return (
    <div className="App">
      <div className="flexBetween">
        <BookmarkBar />
      </div>
      <div className="WidgetContainer">
        <div className="newWidgetButtons">
          <button className="AddStickyNoteButton" onClick={() => addStickyNote()}>+</button>
          <NewWidgetForm func={{ wUpdate }} />
        </div>
        {widgets.map((widget) => <WidgetLayout key={widget.id} {...widget} func={{ wUpdate, wDelete }} />)}
      </div>
    </div>
  );
};

export default Newtab;
