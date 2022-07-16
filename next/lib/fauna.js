import { GraphQLClient, gql } from 'graphql-request'
import { useEffect, useState } from 'react'

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY ||
  process.env.FAUNA_CLIENT_SECRET ||
  process.env.NEXT_PUBLIC_FAUNA_CLIENT_SECRET
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql'

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
})

export const listCalEvents = () => {
  const query = gql`
    query CalEvents {
      allCalEvents {
        data {
          _ts
          id
          summary
          cancelled
          attendees {
            email
            wantsOut
            organizer
          }
        }
      }
    }
  `
  return graphQLClient.request(query).then(({ allCalEvents: { data } }) => data)
}

export const getCalEvent = (id) => {
  const query = gql`
    query GetCalEvent($id: String!) {
      calEventById(id: $id) {
        _id
        _ts
        id
        summary
        cancelled
        attendees {
          email
          wantsOut
          organizer
        }
      }
    }
  `
  return graphQLClient
    .request(query, { id })
    .then(({ calEventById }) => calEventById)
}

export const createBetaUser = (newBetaUser) => {
  const mutation = gql`
    mutation CreateBetaUser($input: BetaUserInput!) {
      createBetaUser(data: $input) {
        email
        name
      }
    }
  `
  return graphQLClient
    .request(mutation, { input: newBetaUser })
    .then(({ createBetaUser }) => createBetaUser)
}

export const createCalEvent = (newCalEvent) => {
  const mutation = gql`
    mutation CreateCalEvent($input: CalEventInput!) {
      createCalEvent(data: $input) {
        id
        summary
        cancelled
        attendees {
          email
          wantsOut
          organizer
        }
      }
    }
  `
  return graphQLClient
    .request(mutation, { input: newCalEvent })
    .then(({ createCalEvent }) => createCalEvent)
}

export const updateCalEvent = (calEvt) => {
  const { _id, _ts, ...data } = calEvt
  const mutation = gql`
    mutation UpdateCalEvent($id: ID!, $data: PartialUpdateCalEventInput!) {
      partialUpdateCalEvent(id: $id, data: $data) {
        id
        summary
        attendees {
          email
          wantsOut
          organizer
        }
        cancelled
      }
    }
  `
  return graphQLClient
    .request(mutation, { id: _id, data })
    .then(({ partialUpdateCalEvent }) => partialUpdateCalEvent)
}

export const countCancelled = () => {
  const query = gql`
    query CalEvents($cancelled: Boolean!) {
      calEventsByCancelled(cancelled: $cancelled) {
        data {
          cancelled
        }
      }
    }
  `
  return graphQLClient
    .request(query, { cancelled: true })
    .then(({ calEventsByCancelled: { data } }) => data.length)
}

//
// Hooks
//
export const useCountCancelled = () => {
  const [cancelled, setCancelled] = useState(null)
  useEffect(() => {
    countCancelled().then((count) => setCancelled(count))
  }, [])
  return cancelled
}
