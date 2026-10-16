import { useEffect, useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);

  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");

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

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/requests",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          room,
          date,
          payment
        })
      }
    );

    const newRequest = await response.json();

    setRequests([
      ...requests,
      newRequest
    ]);

    setRoom("");
    setDate("");
    setPayment("");
  }

  return (
    <main>
      <h1>Заявки</h1>

      <section>
        <h2>Создать заявку</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Помещение

            <input
              data-testid="req-room"
              type="text"
              value={room}
              onChange={(event) =>
                setRoom(event.target.value)
              }
            />
          </label>

          <label>
            Дата

            <input
              data-testid="req-date"
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
            />
          </label>

          <label>
            Оплата

            <select
              data-testid="req-payment"
              value={payment}
              onChange={(event) =>
                setPayment(event.target.value)
              }
            >
              <option value="">
                Выберите способ
              </option>

              <option value="cash">
                При посещении
              </option>

              <option value="sbp">
                СБП
              </option>
            </select>
          </label>

          <button
            data-testid="req-submit"
            type="submit"
          >
            Создать заявку
          </button>
        </form>
      </section>

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
              Оплата: {request.payment}
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