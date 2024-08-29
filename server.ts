import * as net from "net";

const getTime = () => {
  return JSON.stringify({ time: new Date().toISOString() });
};

const getData = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(JSON.stringify({ data: "Steven seagal" }));
    }, 1000);
  });
};

const verifyHeaders = (headers: string[]) => {
  const requiredHeaders = new Set(["host", "user-agent"]);
  return headers.every((value) => requiredHeaders.has(value));
};

const handleRequest = async (request: string, socket: net.Socket) => {
  const [requestLine, ...headers] = request.split("\r\n");
  const [method, path] = requestLine.split(" ");

  const verify = verifyHeaders(headers);
  if (!verify) {
    const response = `HTTP/1.1 400 Bad request\r\nContent-Type: application/json\r\n`;
    socket.write(response);
  }

  if (method === "GET" && path === "/time") {
    const timeJson = getTime();
    const response = `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: ${timeJson.length}\r\n\r\n${timeJson}`;
    socket.write(response);
  } else if (method === "GET" && path === "/data") {
    const dataJson = await getData();
    const response = `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: ${dataJson.length}\r\n\r\n${dataJson}`;
    socket.write(response);
  } else {
    const response = `HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n`;
    socket.write(response);
  }
};

// create server
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    handleRequest(request, socket);
  });

  socket.on("end", () => {
    socket.end();
  });
});

// listening on port 8080
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
