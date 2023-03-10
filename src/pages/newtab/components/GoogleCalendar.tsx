const GoogleCalendar = ({ func, ...props }) => {
  const { id, title, widget, position, style, minimized, meta } = props;

  return <div className="WidgetComponent GoogleCalendar"><iframe src={meta.embedLink} style={{ width: '100%', height: '100%' }} frameBorder="0" scrolling="no"></iframe></div>
}

export default GoogleCalendar;