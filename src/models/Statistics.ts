class Statistics {
  total_value: number;
  count_card: number;
  count_bol: number;
  count_payed: number;
  count_declined: number;
  count_waiting: number;
  count_reversed: number;
  best_day: Day;

  constructor() {
    this.total_value = 0;
    this.count_card = 0;
    this.count_bol = 0;
    this.count_payed = 0;
    this.count_declined = 0;
    this.count_waiting = 0;
    this.count_reversed = 0;
    this.best_day = {name: "segunda-feira", count: 0}
  }
}

export default Statistics;
