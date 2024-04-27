import fetchData from "./fetch.js";
import normalizeOrder from "./normalize.js";
import getStatistics, { populateStatistics} from "./statistics.js";
import { populateTable } from "./table.js";
import { Estatisticas } from "./models/Statistics.js";



async function getData() {
  const url = "https://api.origamid.dev/json/transacoes.json";
  const orders: OrderAPI[] | null = await fetchData(url);
  if (!orders) return;

  // else
  const normalizedOrders = orders.map(normalizeOrder);
  const statistics = getStatistics(normalizedOrders);
  populateTable(normalizedOrders);
  populateStatistics(statistics);
  console.log(new Estatisticas(normalizedOrders));
}

getData();
