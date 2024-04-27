import Week from "./Week.js";

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
    this.best_day = { name: "segunda-feira", count: 0 };
  }
}

interface Count {
  [key: string]: number;
}

export class Estatisticas {
  private orders: Order[];
  public total: number;
  public countByType: Count;
  public countByStatus: Count;
  public week: Week;
  public betterDay: Day;

  constructor(orders: Order[]) {
    this.orders = orders;
    this.total = this.setTotal();
    this.countByType = this.setCountByType();
    this.countByStatus = this.setCountByStatus();
    this.week = this.setWeek();
    this.betterDay = this.setBetterDay();
  }

  private setTotal() {
    return this.orders.reduce(
      (acc, { nValue }) => (nValue ? acc + nValue : acc + 0),
      0
    );
  }

  private countBy(property: keyof Order) {
    const listOfProp = <string[]>this.orders.map((order) => order[property]);
    return listOfProp.reduce((acc: Count, key) => {
      if (acc[key] !== undefined) return { ...acc, [key]: acc[key] + 1 };
      else return { ...acc, [key]: 1 };
    }, {});
  }

  private setCountByType(): Count {
    return this.countBy("payment_type");
  }

  private setCountByStatus(): Count {
    return this.countBy("status");
  }

  private setWeek(): Week {
    const week = new Week();
    this.orders.forEach(({ date }) => {
      const indexOfDay = date.getDay();
      week.setDay(indexOfDay);
    });
    return week;
  }

  private setBetterDay() {
    return <Day>this.week.getDays().reduce(
      (previous, next) => {
        if (next.count >= previous.count) return next;
        else return previous;
      },
      { name: "segunda-feira", count: 0 }
    );
  }
}

export default Statistics;
