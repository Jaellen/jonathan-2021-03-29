import useSocket from '../../hooks/socket'
import styles from './orderbook.module.css'

export default function Orderbook({ children, home }) {
  const endpoint = 'wss://www.cryptofacilities.com/ws/v1'
  const message = {
    "event": "subscribe",
    "feed": "book_ui_1",
    "product_ids": ["PI_XBTUSD"]
  }

  useSocket(endpoint, message);

  return (
    <div className={styles.container}>
      <div id="bids"></div>
      <div id="asks"></div>
      </div>
  )
}
