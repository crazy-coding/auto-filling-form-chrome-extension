import { useEffect, useState } from "react";
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import GoogleCalendar from "./GoogleCalendar";
import StickyNote from "./StickyNote";
import SuggestedLinks from "./SuggestedLinks";
import WidgetMenu from "./WidgetMenu";
import WorldClock from "./WorldClock";

const WidgetComponent = (props) => {
  switch (props.widget) {
    case "google_calendar": return <GoogleCalendar {...props} />
    case "suggested_links": return <SuggestedLinks {...props} />
    case "world_clock": return <WorldClock {...props} />
    case "sticky_note": return <StickyNote {...props} />
    default: return <></>
  }
}

const WidgetLayout = ({ func, ...props }) => {
  const { id, title, position, style, minimized } = props;

  const [width, setWidth] = useState(style.width);
  const [height, setHeight] = useState(style.height);

  const onMinimize = () => {
    func.wUpdate({ ...props, minimized: !minimized })
  }

  const onBGChange = (newStyle) => {
    func.wUpdate({ ...props, style: { ...style, ...newStyle } })
  }

  const onDelete = () => {
    func.wDelete({ id });
  }

  const resizeHandler = (e, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  }

  const onMove = (e, { x, y }) => {
    func.wUpdate({ ...props, position: { x, y } })
  }

  const onResize = () => {
    func.wUpdate({ ...props, style: { ...style, width, height } })
  }

  const onTitleChange = (newTitle) => {
    func.wUpdate({ ...props, title: newTitle })
  }

  useEffect(() => {
    if (minimized) {
      setHeight(20);
    } else {
      setHeight(style.height);
    }
  }, [minimized])

  return <Draggable 
    handle=".WidgetMove"
    defaultPosition={position}
    bounds="parent"
    onStop={onMove}>
    <Resizable
      height={height}
      width={width}
      onResize={resizeHandler}
      onResizeStop={onResize}
      handle={!minimized && <span className="WidgetResize" />}>
      <div className="WidgetLayout box" id={id} style={{ ...style, width, height }}>
        <header className="WidgetHeader">
          <div className="WidgetTitleBar">
            <button className="WidgetHeaderButton" onClick={onMinimize}>-</button>
            <span className="WidgetMove">{title}</span>
          </div>
          <WidgetMenu opened={true} wTitle={title} wStyle={style} onTitleChange={onTitleChange} onBGChange={onBGChange} onDelete={onDelete} />
        </header>
        {!minimized && <WidgetComponent { ...props } func={func} />}
      </div>
    </Resizable>
  </Draggable>
}

export default WidgetLayout;