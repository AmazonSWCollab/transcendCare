import { test } from "tap";
import { build } from "../helper";

test("default root route", async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: `/user/1`,
  });
  t.same(JSON.parse(res.payload), {
    user: {
      id: 1,
      fullName: "Oscar Cisneros",
      phone: "5562139515",
      role: "user",
      cityId: 1,
      createdAt: "2023-04-24T23:52:24.000Z",
      updatedAt: "2023-04-24T23:52:24.000Z",
    },
  });
});
