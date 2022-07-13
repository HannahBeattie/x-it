import { getCalEvent } from '../../../lib/fauna'

export default async function handler(req, res) {
  const { id } = req.query
  const dbEvt = await getCalEvent(id)
  if (!dbEvt) {
    res.status(200).json(null)
    return
  }
  res.status(200).json(dbEvt)
}
