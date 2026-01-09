export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};

export class FundService {
  private funds: Fund[];

  constructor(funds: Fund[]) {
    this.funds = funds;
  }

  getFundById(id: string): Fund | undefined {
    return this.funds.find(f => f.id === id);
  }

  filterByRisk(level: Fund["riskLevel"]): Fund[] {
    return this.funds.filter(f => f.riskLevel === level);
  }

  calculateAverageNav(): number {
    if (this.funds.length === 0) {
      return 0;
    }
    return (
      this.funds.reduce((sum, f) => sum + f.nav, 0) / this.funds.length
    );
  }
}