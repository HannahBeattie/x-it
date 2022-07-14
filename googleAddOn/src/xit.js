// Toggle if the user wants out from a calendar event
// If, after toggling, everyone wants out, then delete the event
function xit(evt) {
  // Send a request to the x-it server to toggle this user's 'wantsOut' value
  const { calendarId, id, isHomepage } = evt.parameters
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
    Calendar.Events.remove(calendarId, id, {
      sendNotifications: true,
      sendUpdates: 'all',
    })
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText('DELETED!'))
      .setNavigation(navUpdateCard(isHomepage))
      .setStateChanged(true)
      .build()
  }

  // Display a notification and update the UI
  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText(
        'Well done, socialising is the worst!'
      )
    )
    .setNavigation(navUpdateCard(isHomepage))
    .build()
}

function navUpdateCard(isHomepage) {
  if (isHomepage === 'true') {
    return CardService.newNavigation().updateCard(homepageCard())
  }
  return CardService.newNavigation().updateCard(
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
}
