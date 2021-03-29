import { Component } from 'react'
import { endpoint, message } from './config'
import styles from './orderbook.module.css'

export default class Orderbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      bids: [],
      asks: []
    }
  }

  componentDidMount() {
    this.initiateSocket()
  }

  updateState(a, b) {
    this.setState({
      bids: a,
      asks: b
    })
  }

  initiateSocket() {
    let socket = new WebSocket(endpoint);

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (res) => {
      let response = JSON.parse(res.data);
      let feed, product_id, bids, asks;

      if (res && response) {
        feed = response.feed ? response.feed : ""
        product_id = response.product_id ? response.product_id : ""
        bids = typeof response.bids === "object" ? response.bids : []
        asks = typeof response.asks === "object" ? response.asks : []
      }

      this.updateState(bids, asks)

      let bidsList = bids.map(bid => {
        return `bid: ${bid}`
      })

      let asksList = asks.map(ask => {
        return `ask: ${ask}`
      })

      // document.getElementById("bids").innerHTML = bidsList;
      // document.getElementById("asks").innerHTML = asksList;
    }

    socket.onerror = (error) => {
      console.log("connection.onerror", error);
    };
  }

  render () {
    const {
      bids = [],
      asks = []      
    } = this.state

    return (
      <div className={styles.container}>
        <h2>Bids</h2>
        <div id="bids">{
          bids.map((bid, i) => {
            return (
              <div key={i}>
                {bid[0]}{" "}{bid[1]}
              </div>
            )
          })
        }</div>
        <br></br><br></br>
        <h2>Asks</h2>
        <div id="asks">{
          asks.map((ask, i) => {
            return (
              <div key={i}>
                {ask[0]}{" "}{ask[1]}
              </div>
            )
          })
        }</div>
      </div>
    )
  }
}
