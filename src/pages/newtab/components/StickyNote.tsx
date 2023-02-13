import { useState } from "react";

const StickyNote = ({ func, ...props }) => {
  const { id, title, widget, position, style, minimized, meta } = props;

  const onUpdateContent = (content) => {
    func.wUpdate({ ...props, meta: {
      content
    } });
  }

  return <div className="WidgetComponent StickyNote">
    <textarea onChange={(e) => onUpdateContent(e.target.value)}>
      {meta.content}
    </textarea>
  </div>
}

export default StickyNote;