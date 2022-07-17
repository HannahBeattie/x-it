function checkForCancelled() {
  Logger.log('Checking for cancelled events')
  const calendarId = 'primary'
  const events = listUpcomingEvents()
  if (!events) {
    return
  }
  // Check each event to see if it has been cancelled and needs to be deleted
  let numDeleted = 0
  for (const calEvt of events) {
    const res = UrlFetchApp.fetch(
      `https://x-it.vercel.app/api/events/${calEvt.id}`
    )
    const dbEvt = JSON.parse(res.getContentText())
    if (dbEvt?.cancelled) {
      // This event has been cancelled, delete it!
      Logger.log('Deleting cancelled event: %s', calEvt.summary)
      Calendar.Events.remove(calendarId, calEvt.id, {
        sendNotifications: true,
        sendUpdates: 'all',
      })
      numDeleted++
    }
  }
  Logger.log(`Deleted ${numDeleted} cancelled events`)
}
