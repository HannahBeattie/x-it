import { GraphQLClient, gql } from 'graphql-request'

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
