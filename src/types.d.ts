type payments = "Cartão de Crédito" | "Boleto";
type status = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento" | "Estornada";

interface OrderAPI {
  Status: status;
  ID: number;
  Data: string;
  Nome: string;
  ["Forma de Pagamento"]: payments;
  Email: string;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}

interface Order {
  status: string;
  id: number;
  date: Date;
  name: string;
  payment_type: string;
  email: string;
  value: string;
  nValue: number | null;
  new_client: Boolean;
}

interface Statistics {
  total_value: number;
  count_card: number;
  count_bol: number;
  count_payed: number;
  count_declined: number;
  count_waiting: number;
  count_reversed: number;
  best_day: Day;
}

interface Day {
  name:
    | "segunda-feira"
    | "terça-feira"
    | "quarta-feira"
    | "quinta-feira"
    | "sexta-feira"
    | "sábado"
    | "domingo";
  count: number;
}
