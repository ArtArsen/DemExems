import { useState } from "react";

function App() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      room: "Аудитория 101",
      date: "2026-10-20",
      status: "Новая"
    },
    {
      id: 2,
      room: "Кинозал",
      date: "2026-10-22",
      status: "Новая"
    },
    {
      id: 3,
      room: "Коворкинг",
      date: "2026-10-25",
      status: "Завершено"
    }
  ]);

  function deleteRequests(id) {
    const newRequests = requests.filter((request) => {
      return request.id !== id;
    });

    setRequests(newRequests);
  }

  return (
    <main>
      <h1>Помещения под сдачу</h1>

      <section data-testid="req-list">

        {requests.length === 0 && (
          <p>У вас пока нет заявок</p>
        )}

        {requests.map((request) => (
          <article key={request.id}>
            <h2>{request.room}</h2>

            <p>
              Дата: {request.date}
            </p>

            <p>
              Статус: {request.status}
            </p>

            <button
              onClick={() => deleteRequests(request.id)}
            >
              Удалить
            </button>
          </article>
        ))}

      </section>
    </main>
  );
}

export default App;