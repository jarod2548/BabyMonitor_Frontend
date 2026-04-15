import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.post("/login", async () => {
    return HttpResponse.json({
      username: "test",
      role: "TEACHER",
      token: "fake-token"
    });
  })
);