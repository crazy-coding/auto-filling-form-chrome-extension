export const demoData = {
  widgets: [
    {
      id: 1,
      title: "My Schedule",
      widget: "google_calendar",
      position: { x: 0, y: 0 },
      style: { width: 400, height: 300, zIndex: 5 },
      minimized: false,
      meta: {
        // embedLink: 'https://calendar.google.com/calendar/embed?wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showTitle=0&showNav=0&showDate=1&mode=AGENDA&showTz=0&showCalendars=1&showTabs=1&showPrint=0&src=ZGV2amFtZXMyMTRAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZGV2amFtZXM0MjRAZ21haWwuY29t&color=%23039BE5&color=%2333B679&color=%23B39DDB'
      }
    },
    {
      id: 2,
      title: "Review Links",
      widget: "suggested_links",
      position: { x: 100, y: 100 },
      style: { width: 200, height: 300, zIndex: 2 },
      minimized: false,
      meta: {}
    },
    {
      id: 3,
      title: "EST Time",
      widget: "world_clock",
      position: { x: 200, y: 200 },
      style: { width: 500, height: 300, zIndex: 3 },
      minimized: false,
      meta: {}
    },
    {
      id: 4,
      title: "My Task",
      widget: "sticky_note",
      position: { x: 300, y: 300 },
      style: { width: 300, height: 300, zIndex: 4 },
      minimized: true,
      meta: {}
    }
  ],
  popup: {},
  formData: []
}