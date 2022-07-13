// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createCalEvent, getCalEvent, updateCalEvent } from '../../lib/fauna'

const dbCreateEvent = (calEvt) => {
  const { self, id, attendees, summary } = calEvt
  const cleanAttendees = attendees.map((aa) => {
    const { email, organizer } = aa
    return { email, organizer, wantsOut: email === self.email }
  })
  return {
    id,
    summary,
    attendees: cleanAttendees,
    cancelled: false,
  }
}

// const dbCancel = (dbEvt, email) => {
//   const dbSelf = dbEvt.attendees.find((aa) => aa.email === email)
//   dbSelf.canceled = true
// }

const simpleCalEvent = (calEvt) => {
  const { id, attendees, summary } = calEvt
  const self = attendees.find((aa) => aa.self)
  return { id, attendees, summary, self }
}

export default async function handler(req, res) {
  const evt = simpleCalEvent(req.body)
  // const dbEvt = dbGetEvent(evt.id)
  const dbEvt = await getCalEvent(evt.id)
  if (!dbEvt) {
    // This is the first x-it cancellation, so we'll add a new event to the database
    const newDbEvt = dbCreateEvent(evt)
    console.log('Creating new x-it event:', JSON.stringify(newDbEvt))
    const faunaResp = await createCalEvent(newDbEvt)
    res.status(200).json(faunaResp)
    return
  }

  // Update dbEvt to indicate self wants out
  const dbSelf = dbEvt.attendees.find((aa) => aa.email === email)
  dbSelf.wantsOut = true
  const faunaResp = await updateCalEvent(dbEvt)
  res.status(200).json(faunaResp)
}
