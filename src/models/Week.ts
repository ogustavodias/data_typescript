class Week {
  private days: Day[];

  constructor() {
    this.days = [
      {
        name: "domingo",
        count: 0,
      },
      {
        name: "segunda-feira",
        count: 0,
      },
      {
        name: "terça-feira",
        count: 0,
      },
      {
        name: "quarta-feira",
        count: 0,
      },
      {
        name: "quinta-feira",
        count: 0,
      },
      {
        name: "sexta-feira",
        count: 0,
      },
      {
        name: "sábado",
        count: 0,
      },
    ];
  }

  getDays() {
    return this.days;
  }

  setDay(index: number) {
    this.days[index].count++;
  }
}

export default Week;
