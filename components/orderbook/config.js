const endpoint = "wss://www.cryptofacilities.com/ws/v1"

const message = {
  "event": "subscribe",
  "feed": "book_ui_1",
  "product_ids": ["PI_XBTUSD"]
}

export {
  endpoint,
  message
}
