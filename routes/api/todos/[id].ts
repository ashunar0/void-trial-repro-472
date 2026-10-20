import { z } from "zod";
import { defineHandler } from "void";
import { db, eq, sql } from "void/db";
import { todos } from "@schema";

export const GET = defineHandler.withValidator({
  params: z.object({ id: z.string() }),
})(async (c, { params }) => {
  const [row] = await db.select().from(todos).where(eq(todos.id, Number(params.id)));

  if (!row) {
    return new Response("Not found", { status: 404 });
  }
  return row;
});

export const PATCH = defineHandler.withValidator({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z.string().optional(),
    done: z.boolean().optional(),
  }),
})(async (c, { params, body }) => {
  const [row] = await db
    .update(todos)
    .set({ ...body, updatedAt: sql`(datetime('now'))` })
    .where(eq(todos.id, Number(params.id)))
    .returning();

  if (!row) {
    return new Response("Not found", { status: 404 });
  }
  return row;
});

export const DELETE = defineHandler.withValidator({
  params: z.object({ id: z.string() }),
})(async (c, { params }) => {
  const [row] = await db.delete(todos).where(eq(todos.id, Number(params.id))).returning();

  if (!row) {
    return new Response("Not found", { status: 404 });
  }
  return { deleted: true };
});
