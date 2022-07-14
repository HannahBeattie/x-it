function onEventOpen(evt) {
  if (!evt) {
    Logger.log('No event!')
    return
  }
  const calEvt = Calendar.Events.get(evt.calendar.calendarId, evt.calendar.id)
  if (!calEvt) {
    Logger.log('Unable to find calendar event for ' + JSON.stringify(evt))
    return
  }
  Logger.log('Got calendar event: ' + JSON.stringify(calEvt))
  const { calendar, ...extra } = evt
  Logger.log('Extra stuff available to us: ' + JSON.stringify(extra))

  // Handle case when no-one else is invited (and thus attendees array doesn't exist)
  const myself = calEvt.attendees?.find((aa) => aa.self)
  if (!myself) {
    const builder = CardService.newCardBuilder()
    const sect = CardService.newCardSection()
    sect.addWidget(
      CardService.newDecoratedText()
        .setText(
          'As much as we love cancelling meetings, ' +
            'nobody else is going to this...' +
            'feel free to delete it yourself.'
        )
        .setWrapText(true)
    )
    builder.addSection(sect)
    return builder.build()
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

  const builder = CardService.newCardBuilder()
  const sect = CardService.newCardSection()
  // sect.addWidget(
  //   CardService.newDecoratedText().setText('Secretly cancel, sneak sneak')
  // )
  sect.addWidget(
    CardService.newTextButton()
      .setText(btnText)
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(
        CardService.newAction().setFunctionName('xit').setParameters({
          calendarId: evt.calendar.calendarId,
          id: evt.calendar.id,
        })
      )
  )
  builder.addSection(sect)
  return builder.build()
}

function xit(evt) {
  // Send a request to the x-it server to toggle this user's 'wantsOut' value
  const { calendarId, id } = evt.parameters
  const calEvt = Calendar.Events.get(calendarId, id)
  // const calEvt = Calendar.Events.get(evt.calendar.calendarId, evt.calendar.id)
  // const calEvt = JSON.parse(evt.parameters.calEvtJson)

  const res = UrlFetchApp.fetch('https://x-it.vercel.app/api/x-it', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(calEvt),
  })
  const resJson = res.getContentText()
  Logger.log('Got response from x-it server: ' + resJson)

  // Check if everyone wantsOut and delete the event if they do
  const dbEvt = JSON.parse(resJson)
  let deleteIt = true
  for (const att of dbEvt.attendees) {
    if (!att.wantsOut) {
      deleteIt = false
      break
    }
  }
  if (deleteIt) {
    Calendar.Events.remove(evt.calendar.calendarId, evt.calendar.id, {
      sendNotifications: true,
      sendUpdates: 'all',
    })
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText('DELETED!'))
      .setStateChanged(true)
      .build()
  }

  // Display a notification and update the UI
  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText(res.getContentText())
    )
    .setNavigation(
      CardService.newNavigation().updateCard(
        CardService.newCardBuilder()
          .addSection(
            CardService.newCardSection().addWidget(
              CardService.newDecoratedText().setText(
                'Your intention has been secretly noted.'
              )
            )
          )
          .build()
      )
    )
    .build()
}
