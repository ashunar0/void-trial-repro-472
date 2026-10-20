import { defineHandler, type InferProps } from "void";
import { db, desc } from "void/db";
import { todos } from "@schema";

export type Props = InferProps<typeof loader>;

export const loader = defineHandler(async () => {
  const rows = await db.select().from(todos).orderBy(desc(todos.id));
  return { todos: rows };
});
