function onHomepage(evt) {
  Logger.log('Homepage event: ' + JSON.stringify(evt))
  return homepageCard()
}

function homepageCard() {
  const builder = CardService.newCardBuilder().setName('X-it')
  const events = listUpcomingEvents()
  if (!events) {
    builder.addSection(noEventsSection())
    return builder.build()
  }
  // Add UI for each event
  Logger.log('Building widgets for events: %s', events)
  let addedWidgets = false
  for (const calEvt of events) {
    const sect = eventSection(calEvt, 'true')
    if (!sect) {
      continue
    }
    addedWidgets = true
    builder.addSection(sect)
  }
  if (!addedWidgets) {
    builder.addSection(noEventsSection())
  }
  return builder.build()
}

function noEventsSection() {
  return CardService.newCardSection().addWidget(
    CardService.newDecoratedText()
      .setTopLabel('Congratulations 🎉')
      .setText('Nothing to cancel, you are finally alone.')
  )
}

/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 * @see https://github.com/googleworkspace/apps-script-samples/blob/master/calendar/quickstart/quickstart.gs
 * @see https://developers.google.com/apps-script/reference/calendar/calendar-app?authuser=0#geteventsstarttime,-endtime
 */
function listUpcomingEvents() {
  const calendarId = 'primary'
  // Add query parameters in optionalArgs
  const optionalArgs = {
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime',
    // use other optional query parameter here as needed.
  }
  try {
    // call Events.list method to list the calendar events using calendarId optional query parameter
    const response = Calendar.Events.list(calendarId, optionalArgs)
    const events = response.items
    // const now = new Date()
    // const twoWeeksFromNow = new Date(+now + 14 * 24 * 60 * 60 * 1000)
    // const events = CalendarApp.getEvents(now, twoWeeksFromNow)
    if (events.length === 0) {
      Logger.log('No upcoming events found')
      return
    }
    // Print the calendar events
    for (const event of events) {
      let when = event.start.dateTime
      if (!when) {
        when = event.start.date
      }
      Logger.log('%s (%s)', event.summary, when)
      // Logger.log('%s (%s)', event.summary, event.getStartTime())
    }
    return events
  } catch (err) {
    // TODO (developer) - Handle exception from Calendar API
    Logger.log('Failed with error %s', err.message)
  }
}
