// Type definition for API response structure
export type ApiTodo = { id: number; title: string; completed: boolean };

// Function to fetch todos from public API
export async function fetchTodosApi(): Promise<ApiTodo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}
