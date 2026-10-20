import { z } from "zod";
import { defineHandler } from "void";
import { db, eq } from "void/db";
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
