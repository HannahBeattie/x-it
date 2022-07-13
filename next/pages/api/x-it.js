// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = [
  {
    id: '3tpbdmvrtle0efuhfihts0btrh',
    summary: 'Tedious breakfast :(',
    attendees: [
      {
        email: 'mikeylemmon@gmail.com',
        canceled: true,
      },
      {
        organizer: true,
        email: 'hannahdbeattie@gmail.com',
        canceled: false,
      },
    ],
  },
]

const simpleCalEvent = (calEvt) => {
  const { id, attendees, summary } = calEvt
  const self = attendees.find((aa) => aa.self)
  return { id, attendees, summary, self }
}

const dbGetEvent = (id) => {
  return db.find((evt) => evt.id === id)
}

const dbCreateEvent = (calEvt) => {
  const { self, id, attendees, summary } = calEvt
  const cleanAttendees = rest.attendees.map((aa) => {
    const { email, organizer } = aa
    return { email, organizer, canceled: email === self.email }
  })
  return {
    id,
    attendees: cleanAttendees,
    summary,
  }
}

const dbCancel = (dbEvt, email) => {
  const dbSelf = dbEvt.attendees.find((aa) => aa.email === email)
  dbSelf.canceled = true
}

export default function handler(req, res) {
  const evt = simpleCalEvent(req.body)
  const dbEvt = dbGetEvent(evt.id)
  if (!dbEvt) {
    // This is the first x-it cancellation, so we'll add a new event to the database
    const newDbEvt = dbCreateEvent(evt)
    db.push(newDbEvt)
    console.log('Created new x-it event:', JSON.stringify(newDbEvt))
    res.status(200).json(newDbEvt)
    return
  }

  const updatedEvt = dbCancel(dbEvt, evt.self.email)
  console.log('Updated cancellations for event:', updatedEvt)
  res.status(200).json(calEvt)
}
