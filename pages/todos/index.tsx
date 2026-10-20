import { useState, type FormEvent } from "react";
import { useRouter } from "@void/react";
import { fetch } from "void/client";
import type { Props } from "./index.server";

type Todo = Props["todos"][number];

export default function TodosPage({ todos }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const add = async (event: FormEvent) => {
    event.preventDefault();
    await fetch("/api/todos", { method: "POST", body: { title, done: false } });
    setTitle("");
    router.refresh();
  };

  const toggle = async (todo: Todo) => {
    await fetch("/api/todos/:id", { method: "PATCH", params: { id: String(todo.id) }, body: { done: !todo.done } });
    router.refresh();
  };

  const remove = async (todo: Todo) => {
    await fetch("/api/todos/:id", { method: "DELETE", params: { id: String(todo.id) } });
    router.refresh();
  };

  return (
    <main>
      <h1>TODO</h1>
      <form onSubmit={add}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
        <button disabled={!title}>追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => toggle(todo)} />
            {todo.title}
            <button onClick={() => remove(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
