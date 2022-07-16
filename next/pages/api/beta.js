export default async function handler(req, res) {
  const newBetaUser = req.body
  console.log('Creating a new beta user with', newBetaUser, '(UserInput)')
  const faunaResp = await createBetaUser(newBetaUser)
  res.status(200).json(faunaResp)
  return
}
