import Head from 'next/head'
import Orderbook from '../components/orderbook/orderbook'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>XBT/USD Futures Orderbook</title>
      </Head>

      <main className={styles.main}>
        <h1>XBT/USD Futures Orderbook</h1>
        <Orderbook></Orderbook>
      </main>

      <footer className={styles.footer}>  
      </footer>
    </div>
  )
}
