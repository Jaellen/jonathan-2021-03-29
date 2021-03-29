## Questions

1. This is an incomplete project. With more time, the following are tasks to do:
- Fix calculation of total pricing and any outstanding bugs
- Add the updated state for new orders
- Add error handling and type checking with Typescript
- Add styling and responsiveness
- Add new features of React that improve performance and code readability
- clean up code for comprehension and quality
- Add the ability to read from different data streams of different cryptos
- Add a visual/chart line behind orders to display and compar bids and asks


2. A good fallback plan is needed in case the websocket stream is down. Perhaps serving a cached, most recent version of the order book from a cached server.

3. React "useState" and "useEffect" are super useful. I did not have time to implement them but I would make use of them in separating the websocket logic from the partent class module.

4. Chrome developer tools is a great friend in tracking performance with the ability to test low connection speeds as well. I also use BrowserStack if I want to test different devices with different browsers. Yes, I've had to do this.

6. As this is was a learning project, I have many questions including:

- First, why does the data stream for 'asks' only show results after every 4 server messages, yet the stream for bids is every message. Seems like a server bug to me but I'm curious to know why that occurs.
- As the data stream is running, does it make sense to use React state for all of the order book totals? Does it make sense to track the state of the previous price?
- It feels like it could be improved from a readability perspective, (ex. "product_ids" is far too similar to "product_id")
- Without slowing performance, I wonder if it's better to send some computed data from the server (ex. the recursive price total) instead of having to compute those on the front end. I also wonder if sending empty values (0) instead of no value would help the front end more quickly render price totals.