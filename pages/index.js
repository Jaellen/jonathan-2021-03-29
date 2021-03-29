import Head from 'next/head'
import Orderbook from '../components/orderbook/orderbook'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>XBT/USD Futures Order Book</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous"></link>
      </Head>

      <main className={styles.main}>
        <h1>XBT/USD Futures Order Book</h1>
        <Orderbook></Orderbook>
      </main>

      <footer className={styles.footer}>  
      </footer>
    </div>
  )
}
