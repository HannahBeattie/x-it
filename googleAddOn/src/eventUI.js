function onEventOpen(evt) {
  if (!evt) {
    Logger.log('No event!')
    return
  }
  Logger.log('Event opened: ' + JSON.stringify({ evt }))
  const calEvt = Calendar.Events.get(evt.calendar.calendarId, evt.calendar.id)
  Logger.log("Got calendar event? " + JSON.stringify(calEvt))

  const builder = CardService.newCardBuilder()
  const sect = CardService.newCardSection()
  sect.addWidget(
    CardService.newDecoratedText()
      .setTopLabel(calEvt?.summary || ':(')
      .setText('be antisocial')
  )
  builder.addSection(sect)
  return builder.build()
}

function onEventUpdated(evt) {
  if (!evt) {
    Logger.log('No event!')
  } else {
    Logger.log('Event opened: ' + JSON.stringify({ evt }))
  }
  const builder = CardService.newCardBuilder()
  const sect = CardService.newCardSection()
  sect.addWidget(
    CardService.newDecoratedText()
      .setTopLabel(evt?.summary || ':(')
      .setText('be antisocial')
  )
  builder.addSection(sect)
  return builder.build()
}
