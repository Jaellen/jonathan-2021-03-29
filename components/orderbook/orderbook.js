import { Component } from 'react'
import { endpoint, message } from './config'
import styles from './orderbook.module.css'

export default class Orderbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      product_id: '',
      bids: [],
      asks: []
    }
  }

  componentDidMount() {
    this.initiateSocket()
  }

  updateSnapShot(status, product_id, bids, asks) {
    this.setState({
      status,
      product_id,
      bids,
      asks
    })
  }

  initiateSocket() {
    let socket = new WebSocket(endpoint);

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (res) => {
      let response = JSON.parse(res.data);
      let status = ''
      let feed, product_id, bids, asks

      if (res && response) {
        if (response.event) {
          status = response.event === 'subscribed' ? 'loaded' : ''
        }

        // snapshot event
        if (response.feed === 'book_ui_1_snapshot') {
          status = 'loaded'
          feed = response.feed ? response.feed : ''
          product_id = response.product_id ? response.product_id : ''
          bids = typeof response.bids === 'object' ? response.bids : []
          asks = typeof response.asks === 'object' ? response.asks : []

          this.updateSnapShot(status, product_id, bids, asks)
        } else {
        // update event

        }
      }
    }

    socket.onerror = (error) => {
      console.log("connection.onerror", error);
    };
  }

  render () {
    const {
      status = 'loading',
      bids = [],
      asks = []    
    } = this.state

    if (status === 'loading') {
      return (
        <div className={styles.container}>
          'Loading...'
        </div>
      )
    }
    else {

      /* Bids */

      var totalBids = 0
      if (bids.length > 0) {
        totalBids = bids.reduce((total, current, i) => {
          if (i === 1) {
            return current[1]
          }
          return total + current[1]
        })
      }

      let bidsList = bids.map((bid, i, arr) => {
        let total = totalBids

        total = total + (arr.reduce((total, current, j) => {
          if (j > i) {
            return total - current[1]
          }
          return total
        }, 0))

        return (
          <div className='row' key={i}>
            <div className='col-sm'>
              {bid[0]}
            </div>
            <div className='col-sm'>
              {bid[1]}
            </div>
            <div className='col-sm'>
              {total}
            </div>
          </div>
        )
      })

      /* Asks */

      var totalAsks = 0
      if (bids.length > 0) {
        totalAsks = bids.reduce((total, current, i) => {
          if (i === 1) {
            return current[1]
          }
          return total + current[1]
        })
      }

      let asksList = asks.map((ask, i, arr) => {
        let total = totalAsks

        total = total + (arr.reduce((total, current, j) => {
          if (j < i) {
            return total + current[1]
          }
          return total
        }, 0))

        return (
          <div className='row' key={i}>
            <div className='col-sm'>
              {ask[0]}
            </div>
            <div className='col-sm'>
              {ask[1]}
            </div>
            <div className='col-sm'>
              {total}
            </div>
          </div>
        )
      })

      return (
        <div className={styles.container}>
          <h2>Bids</h2>
          <br></br>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <h3>Price</h3>
              </div>
              <div className='col-sm'>
                <h3>Size</h3>
              </div>
              <div className='col-sm'>
                <h3>Total</h3>
              </div>
            </div>
            <div>
              {bidsList}
            </div>
          </div>

          <br></br><br></br>

          <h2>Asks</h2>
          <br></br>
          <div className='container'>
            <div className='row'>
              <div className='col-sm'>
                <h3>Price</h3>
              </div>
              <div className='col-sm'>
                <h3>Size</h3>
              </div>
              <div className='col-sm'>
                <h3>Total</h3>
              </div>
            </div>
            <div>
              {asksList}
            </div>
          </div>
        </div>
      )
    }
  }
}
