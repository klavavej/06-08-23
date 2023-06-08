import { stream } from "@netlify/functions";
import { ReadableStream } from "node:stream/web";

export const handler = stream(async (event, context) => {
  const body = new ReadableStream({
    start(controller) {
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("Tears stream\n"));
      }, 1000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("down your face\n"));
      }, 2000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("i promise you\n"));
      }, 3000);
      setTimeout(() => {
        controller.enqueue(
          new TextEncoder().encode("I will learn from my mistakes\n")
        );
      }, 4000);
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode("  (Coldplay - Fix You)\n"));
        controller.close();
      }, 5000);
    },
  });

  return {
    statusCode: 200,
    body,
    headers: {
      "content-type": "text/lyrics",
    },
  };
});
