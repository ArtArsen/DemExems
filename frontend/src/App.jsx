import { useEffect, useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function loadRequests() {
      const response = await fetch(
        "http://127.0.0.1:8000/requests"
      );

      const data = await response.json();

      setRequests(data);
    }

    loadRequests();
  }, []);

  return (
    <main>
      <h1>Заявки</h1>

      <section data-testid="req-list">
        <h2>Мои заявки</h2>

        {requests.length === 0 && (
          <p>У вас пока нет заявок</p>
        )}

        {requests.map((request) => (
          <article key={request.id}>
            <h3>{request.room}</h3>

            <p>
              Дата: {request.date}
            </p>

            <p>
              Способ оплаты: {request.payment}
            </p>

            <p>
              Статус: {request.status}
            </p>
          </article>
        ))}

      </section>
    </main>
  );
}

export default App;