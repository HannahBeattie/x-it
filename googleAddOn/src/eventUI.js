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

  const builder = CardService.newCardBuilder()
  const sect = CardService.newCardSection()
  sect.addWidget(
    CardService.newDecoratedText().setText('Secretly cancel, sneak sneak')
  )
  sect.addWidget(
    CardService.newTextButton()
      .setText('Cancel')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(CardService.newAction().setFunctionName('xit'))
  )
  builder.addSection(sect)
  return builder.build()
}

function xit() {
  const res = UrlFetchApp.fetch("https://x-it.vercel.app/api/x-it", {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      guessWhat: 'you cancelled'
    })
  })
  Logger.log(res.getContentText());

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification().setText(
        // 'You have secretly indicated your intention to cancel'
        res.getContentText()
      )
    )
    .build()
}
