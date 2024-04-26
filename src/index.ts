import fetchData from "./fetch.js";
import normalizeOrder from "./normalize.js";
import getStatistics, { populateStatistics } from "./statistics.js";

const keys: Array<keyof Order> = [
  "status",
  "id",
  "date",
  "name",
  "payment_type",
  "email",
  "value",
  "new_client",
];

function isOrder(obj: unknown): obj is Order {
  const check =
    obj && typeof obj === "object" && keys.every((key) => key in obj);

  if (check) {
    return true;
  }

  return false;
}

function createRow(order: Order) {
  const tbody = document.querySelector("tbody");
  if (tbody) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>R$ ${order.value}</td>
      <td>${order.payment_type}</td>
      <td>${order.status}</td>
    `;
    tbody.appendChild(row);
  }
}

function populateTable(orders: Array<unknown>) {
  orders.forEach((order) => {
    if (isOrder(order)) {
      createRow(order);
    }
  });
}

async function getData() {
  const url = "https://api.origamid.dev/json/transacoes.json";
  const orders: OrderAPI[] | null = await fetchData(url);
  if (!orders) return;

  // else
  const normalizedOrders = orders.map(normalizeOrder);
  const statistics = getStatistics(normalizedOrders);
  populateTable(normalizedOrders);
  populateStatistics(statistics);
}

getData();
