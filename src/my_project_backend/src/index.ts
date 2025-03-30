import { ic, nat, Opt, Record, StableBTreeMap } from 'azle';

type Todo = Record<{
  id: nat,
  title: string,
  completed: boolean,
}>;

const todos = new StableBTreeMap<nat, Todo>(0, 100);

export function addTodo(title: string): nat {
  const id = todos.size();
  const todo: Todo = { id, title, completed: false };
  todos.insert(id, todo);
  return id;
}

export function getTodos(): Todo[] {
  return todos.values();
}

export function toggleTodoCompletion(id: nat): Opt<Todo> {
  const todo = todos.get(id);
  if (!todo) {
    return null;
  }
  const updatedTodo = { ...todo, completed: !todo.completed };
  todos.insert(id, updatedTodo);
  return updatedTodo;
}

export function deleteTodo(id: nat): boolean {
  return todos.remove(id) !== null;
}

ic.id();