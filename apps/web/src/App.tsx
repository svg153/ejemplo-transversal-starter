import { apiUrl } from "./config";

export function App() {
  return (
    <main>
      <h1>Task Tracker Pro</h1>
      <p>Base preparada para los ejercicios del curso.</p>
      <p>
        Endpoint de health del API: <code>{`${apiUrl}/health`}</code>
      </p>
    </main>
  );
}
