import { z } from "zod";
import { defineHandler } from "void";
import { db } from "void/db";
import { todos } from "@schema";

export const GET = defineHandler(async () => {
  return db.select().from(todos);
});

export const POST = defineHandler.withValidator({
  body: z.object({
    title: z.string(),
    done: z.boolean(),
  }),
})(async (c, { body }) => {
  await db.insert(todos).values({ title: body.title, done: body.done });
  return { created: true };
});
