// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const db = {}

export default function handler(req, res) {
  const evtInfo = req.body
  console.log('Got x-it request:', evtInfo)
  res.status(200).json(evtInfo)
}
