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
      .setNavigation(navUpdateCard(isHomepage, evt))
      .setStateChanged(true)
      .build()
  }

  // Display a notification and update the UI
  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText(
        'Your intention has been secretly noted!'
      )
    )
    .setNavigation(navUpdateCard(isHomepage, evt))
    .build()
}

function navUpdateCard(isHomepage, evt) {
  if (isHomepage === 'true') {
    return CardService.newNavigation().updateCard(homepageCard())
  }
  return CardService.newNavigation().updateCard(eventCard(evt))
}
