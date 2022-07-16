function onEventOpen(evt) {
  return eventCard(evt)
}

function eventCard(evt) {
  if (!evt) {
    Logger.log('No event!')
    return
  }

  let calEvt
  try {
    calEvt = Calendar.Events.get(evt.calendar.calendarId, evt.calendar.id)
  } catch (e) {
    const builder = CardService.newCardBuilder()
    const sect = CardService.newCardSection()
    sect.addWidget(
      CardService.newDecoratedText()
        .setText("<i>Is this really the most productive use of everybody's time?</i>")
        .setWrapText(true)
    )
    builder.addSection(sect)
    return builder.build()
  }
  if (!calEvt) {
    Logger.log('Unable to find calendar event for ' + JSON.stringify(evt))
    return
  }
  Logger.log('Got calendar event: ' + JSON.stringify(calEvt))

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

  const builder = CardService.newCardBuilder().setName(calEvt.summary)
  builder.addSection(eventSection(calEvt, 'false'))
  return builder.build()
}

function eventSection(calEvt, isHomepage) {
  const btnText = fetchBtnText(calEvt)
  if (!btnText) {
    Logger.log('(eventSection) Skipping ' + calEvt.summary)
    return null
  }
  Logger.log('(eventSection) Adding event section with text: ' + btnText)

  const header = CardService.newTextParagraph().setText(
    `<b>${calEvt.summary}</b>`
  )

  const date = CardService.newTextParagraph().setText(
    `<time>${new Date(calEvt.start.dateTime).toLocaleString()}</time>`
  )

  // Create text for list of attendees
  let attTxt = '<i><font color="#666666">Attendees:</font></i>'
  for (const att of calEvt.attendees) {
    attTxt += `<br />• ${att.email}`
  }
  attTxt += '<br /> <br />'
  const attendees = CardService.newTextParagraph().setText(attTxt)

  // Create button
  const action = CardService.newAction().setFunctionName('xit').setParameters({
    calendarId: 'primary',
    id: calEvt.id,
    isHomepage: isHomepage,
  })

  const button = CardService.newTextButton()
    .setText(btnText)
    .setBackgroundColor('#4a5568')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(action)
  const buttonList = CardService.newButtonSet().addButton(button)

  const padBottom = CardService.newTextParagraph().setText('<br />')

  const section = CardService.newCardSection()
    .addWidget(header)
    .addWidget(date)
    .addWidget(attendees)
    .addWidget(buttonList)
    .addWidget(padBottom)
    .setCollapsible(false)

  return section
}
