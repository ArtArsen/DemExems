import { useState } from "react";

function App() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      room: "Аудитория 101",
      date: "2026-10-20",
      payment: "cash",
      status: "Новая"
    },
    {
      id: 2,
      room: "Кинозал",
      date: "2026-10-22",
      payment: "sbp",
      status: "Новая"
    },
    {
      id: 3,
      room: "Коворкинг",
      date: "2026-10-25",
      payment: "cash",
      status: "Завершено"
    }
  ]);

  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newRequest = {
      id: Date.now(),
      room,
      date,
      payment,
      status: "Новая"
    };

    const newRequests = [
      ...requests,
      newRequest
    ];

    setRequests(newRequests);

    setRoom("");
    setDate("");
    setPayment("");
  }

  function changeStatus(id, newStatus) {

    const newRequests = requests.map((request) => {

      if (request.id === id) {

        return {
          ...request,
          status: newStatus
        };
      }

      return request;
    })

    setRequests(newRequests)
  }

  function deleteRequest(id) {
    const newRequests = requests.filter((request) => {
      return request.id !== id;
    });

    setRequests(newRequests);
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
            Способ оплаты
            <select
              data-testid="req-payment"
              value={payment}
              onChange={(event) =>
                setPayment(event.target.value)
              }
            >
              <option value="">
                Выберите способ оплаты
              </option>

              <option value="cash">
                При очном посещении
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
            Отправить
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
              Способ оплаты: {request.payment}
            </p>

            <p>
              Статус: {request.status}
            </p>

            <button
              onClick={() =>
                deleteRequest(request.id)
              }
            >
              Удалить
            </button>
          </article>
        ))}
      </section>

      <section>
        <h2>Админ панель</h2>

        {requests.map((request) => (
          <article
            key={request.id}
            data-testid="admin-row"
          >
            <h2>{request.room}</h2>

            <p>
              Статус: {request.status}
            </p>

            <select
              data-testid="admin-status"
              value={request.status}
              onChange={(event) =>
                changeStatus(
                  request.id,
                  event.target.value
                )
              }
            >
              <option value="Новая">
                Новая
              </option>

              <option value="Мероприятие назначено">
                Мероприятие назначено
              </option>

              <option value="Завершено">
                Завершено
              </option>
            </select>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;