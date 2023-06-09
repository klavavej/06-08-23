import { stream } from "@netlify/functions";
import type { ReadableStream } from "node:stream/web";

export const handler = stream(async (event, context) => {
  const body = new ReadableStream({
    start(controller) {
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("<p>First write</p>"));
      }, 1000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("<h1>Streaming h1</h1>"));
      }, 2000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("<h2>Streaming h2</h2>"));
      }, 3000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("<h3>Streaming h3</h3>"));
      }, 4000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("<p>DONE!</p>"));
        controller.close();
      }, 5000);
    },
  });

  return {
    statusCode: 200,
    body,
    headers: {
      "content-type": "text/html",
    },
  };
});
