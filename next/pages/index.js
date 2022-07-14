import Head from 'next/head'
import { countCancelled } from '../lib/fauna'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const numCancelled = await countCancelled()
  return { props: { numCancelled } }
}

export default function Home({ numCancelled }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>X-it</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {numCancelled ? (
          <h1>{numCancelled} meetings avoided!</h1>
        ) : (
          <h1>...thinking...</h1>
        )}
      </div>
    </div>
  )
}
