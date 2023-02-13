const GoogleCalendar = ({ embedLink }) => {
    return <div className="WidgetComponent GoogleCalendar"><iframe src={embedLink} style={{ width: '100%', height: '100%' }} frameBorder="0" scrolling="no"></iframe></div>
}

export default GoogleCalendar;