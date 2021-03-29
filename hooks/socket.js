import { useEffect } from 'react'

export default function useSocket (endpoint, messageSend) {
  useEffect(()=> {
    let socket = new WebSocket(endpoint);

    socket.onopen = function() {
      socket.send(JSON.stringify(messageSend));
    };

    socket.onmessage = function(res) {
      let response = JSON.parse(res.data);
      let feed, product_id, bids, asks;

      if (res && response) {
        feed = response.feed ? response.feed : ""
        product_id = response.product_id ? response.product_id : ""
        bids = typeof response.bids === "object" ? response.bids : []
        asks = typeof response.asks === "object" ? response.asks : []
      }

      let bidsList = bids.map(bid => {
        return `bid: ${bid}`
      })

      let asksList = asks.map(ask => {
        return `ask: ${ask}`
      })

      document.getElementById("bids").innerHTML = bidsList;
      document.getElementById("asks").innerHTML = asksList;
    }

    socket.onerror = function(error) {
      console.log("connection.onerror", error);
    };
  })
}


// sample data
// {
//   "feed":"book_ui_1",
//   "product_id":"PI_XBTUSD",
//   "bids":[
//     [53063.5,644048.0],
//     [53064.0,0.0],
//     [55224.5,32782.0],
//     [55475.0,471247.0],
//     [55669.5,0.0],
//     [55670.5,337900.0],
//     [55792.5,171733.0],
//     [55820.0,89456.0],
//     [55822.0,0.0],
//     [55822.5,21344.0],
//     [55833.0,0.0],
//     [55841.0,55731.0]
//   ],
//   "asks":[
//     [55875.0,29273.0],
//     [55889.0,1093.0],
//     [55891.5,0.0],
//     [55903.5,45343.0],
//     [55911.5,30020.0],
//     [55912.0,0.0],
//     [55924.5,85687.0],
//     [55946.5,168360.0],
//     [56075.5,351766.0],
//     [56077.0,0.0],
//     [56275.0,493995.0],
//     [56475.5,187298.0],
//     [58683.0,735117.0],
//     [58684.0,0.0]
//   ]
// }