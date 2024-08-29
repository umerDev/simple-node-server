# simple-node-server

A simple HTTP server in nodeJS that:

1. Uses only the built in nodes modules
2. Does not use the HTTP, HTTP/2 or HTTPS modules
3. Implements a GET /time route that returns the time in
   JSON
4. Implements a GET /data route that returns any data after 1 second
5. Uses correct HTTP headers
6. Holds up to any industry standard HTTP traffic generator tool
   Not every HTTP feature is required, only as needed to implement the route. Describe any thought processes as required.

## Start

1. `npm i`
2. `npm run start`

## Endpoints

```
http://localhost:8080/time
http://localhost:8080/data
```

#### 8. Demonstrate a nodes function that increases the major garbage collection

```Typescript

function createLargeBuffers(sizeInMB, numBuffers) {
  const buffers = [];
  for (let i = 0; i < numBuffers; i++) {
    const buffer = Buffer.alloc(sizeInMB * 1024 * 1024);
    buffers.push(buffer);
  }

  return buffers;
}
```

#### 9. Write a jest mock of a class having a function

'fetchAllRecords', that will return a resolved promise immediately to array '[1, 2, 3]'.

```Typescript
const database = mockDeep<Database>(); // mock to interface
const mocked = database.fetchAllRecords.mockReturnValue(
    Promise.resolve([1,2,3])
);
```
