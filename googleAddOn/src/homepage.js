function onHomepage(e) {
  Logger.log('Homepage event: ' + JSON.stringify(e))
  return homepageCard()
}

function homepageCard() {
  const builder = CardService.newCardBuilder()
  const sect = CardService.newCardSection()

  const events = listUpcomingEvents()
  if (!events) {
    sect.addWidget(
      CardService.newDecoratedText()
        .setTopLabel('All clear!')
        .setText('Nothing to cancel')
    )
    builder.addSection(sect)
    return builder.build()
  }

  Logger.log('Building widgets for events: %s', events)

  // Add UI for each event
  let addedWidgets = false
  for (const evt of events) {
    const btnText = fetchBtnText(evt)
    Logger.log('Adding widget with text: ' + btnText)

    if (!btnText) {
      continue
    }
    addedWidgets = true

    sect.addWidget(
      CardService.newDecoratedText()
        .setText(evt.summary)
        .setButton(
          CardService.newTextButton()
            .setText(btnText)
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setOnClickAction(
              CardService.newAction().setFunctionName('xit').setParameters({
                calendarId: 'primary',
                id: evt.id,
                isHomepage: 'true',
              })
            )
        )
    )
  }

  if (!addedWidgets) {
    sect.addWidget(
      CardService.newDecoratedText()
        .setTopLabel('Congratulations 🎉')
        .setText('Nothing to cancel, you are finally alone.')
    )
  }

  builder.addSection(sect)
  return builder.build()
}

function fetchBtnText(calEvt) {
  const myself = calEvt.attendees?.find((aa) => aa.self)
  if (!myself) {
    return null
  }

  let btnText = 'I want out'

  // Check to see if there's already an x-it event saved on the server
  const res = UrlFetchApp.fetch(
    `https://x-it.vercel.app/api/events/${calEvt.id}`
  )
  const dbEvt = JSON.parse(res.getContentText())
  if (dbEvt) {
    // Find current user in list of attendees
    Logger.log('Event already exists in database' + JSON.stringify(dbEvt))
    const { wantsOut } = dbEvt.attendees.find((aa) => aa.email === myself.email)
    if (wantsOut) {
      btnText = 'Wait, I want back in'
    }
  }
  return btnText
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
