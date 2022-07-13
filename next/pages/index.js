import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCalEvent, listCalEvents, updateCalEvent } from '../lib/fauna'
import { useEffect, useState } from 'react'

const testUpdate = async () => {
  const calEvt = {
    _id: '337040437342634579',
    id: '3tpbdmvrtle0efuhfihts0btrh',
    summary: 'Tedious breakfast :(',
    attendees: [
      {
        email: 'mikeylemmon@gmail.com',
        wantsOut: false,
      },
      {
        email: 'hannahdbeattie@gmail.com',
        wantsOut: false,
        organizer: true,
      },
    ],
  }
  const resp = await updateCalEvent(calEvt)
  console.log('Updated event:', resp)
}

export default function Home() {
  const [calEvents, setCalEvents] = useState([])
  const [calEvent, setCalEvent] = useState([])
  useEffect(() => {
    listCalEvents()
      .then((evts) => setCalEvents(evts))
      .catch((err) => console.error('Oh no! Cant get events', err.message))
    getCalEvent('3tpbdmvrtle0efuhfihts0btrh')
      .then((evts) => setCalEvent(evts))
      .catch((err) => console.error('Oh no! Unable to get event:', err.message))
    testUpdate()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>X-it</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Hello</h1>
        <pre>The event: {JSON.stringify(calEvent, null, '    ')}</pre>
        <br />
        <p>All events:</p>
        {calEvents.map((evt) => (
          <pre key={evt.id}>{JSON.stringify(evt, null, '    ')}</pre>
        ))}
      </div>
    </div>
  )
}
