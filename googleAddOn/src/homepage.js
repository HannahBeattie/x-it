function onHomepage(e) {
	// const hostApp = e['hostApp']
	const builder = CardService.newCardBuilder()

	const sect = CardService.newCardSection()
	// sect.addWidget(
	// 	CardService.newDecoratedText().setTopLabel('Go ahead').setText('be antisocial')
	// )

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
	for (const evt of events) {
		sect.addWidget(
			CardService.newDecoratedText()
				.setText(evt.summary)
				.setButton(
					CardService.newTextButton()
						.setText('Cancel')
						.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
						.setOnClickAction(
							CardService.newAction().setFunctionName('cancelEvent')
						)
				)
		)
	}

	builder.addSection(sect)
	return builder.build()
}

function cancelEvent() {
	return CardService.newActionResponseBuilder()
		.setNotification(
			CardService.newNotification().setText(
				'You have secretly indicated your intention to cancel'
			)
		)
		.build()
}

/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 * @see https://github.com/googleworkspace/apps-script-samples/blob/master/calendar/quickstart/quickstart.gs
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
		}
		return events
	} catch (err) {
		// TODO (developer) - Handle exception from Calendar API
		Logger.log('Failed with error %s', err.message)
	}
}
