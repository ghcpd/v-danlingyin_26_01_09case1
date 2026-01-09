/**
 * Represents a single fund record used by FundService.
 *
 * Fields
 * - id: unique identifier for the fund (string).
 * - name: human-readable fund name.
 * - riskLevel: discrete risk classification; allowed values are "Low", "Medium", "High".
 * - nav: net asset value (number). The type enforces a numeric value, but runtime validation
 *   (e.g. finiteness, non-negativity) is the caller's responsibility.
 */
export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};

/**
 * Lightweight in-memory service that provides read-only queries over an array of `Fund` objects.
 *
 * Responsibilities:
 * - Hold a reference to an array of `Fund` objects provided at construction.
 * - Provide simple lookup and aggregation helpers used by callers (find by id, filter by risk, average NAV).
 *
 * Note: the constructor stores the provided array by reference (no defensive copy). Mutating the
 * original array after constructing the service will be visible through this instance.
 */
export class FundService {
  private funds: Fund[];

  /**
   * Create a FundService operating on the given array of funds.
   *
   * @param funds - Array of `Fund` objects. The array is assigned by reference; it is not cloned.
   */
  constructor(funds: Fund[]) {
    this.funds = funds;
  }

  /**
   * Find a fund by its identifier.
   *
   * @param id - The fund `id` to search for.
   * @returns The first matching `Fund` if found, otherwise `undefined`.
   *
   * Example:
   * const f = svc.getFundById("fund-1");
   * if (f) console.log(f.name);
   */
  getFundById(id: string): Fund | undefined {
    return this.funds.find(f => f.id === id);
  }

  /**
   * Return all funds that match the provided risk level.
   *
   * @param level - One of "Low", "Medium", or "High".
   * @returns An array (possibly empty) of matching `Fund` objects.
   *
   * Example:
   * const lowRisk = svc.filterByRisk("Low");
   */
  filterByRisk(level: Fund["riskLevel"]): Fund[] {
    return this.funds.filter(f => f.riskLevel === level);
  }

  /**
   * Compute the arithmetic mean of the `nav` values for all funds.
   *
   * @returns The average NAV as a number. Returns 0 when the internal fund list is empty.
   *
   * Notes:
   * - The implementation uses a simple sum-and-divide approach; for very large arrays or when
   *   strict numerical stability is required, consider a numerically stable algorithm.
   * - If fund `nav` values may be non-finite (NaN, Infinity), sanitize inputs before constructing
   *   the service.
   */
  calculateAverageNav(): number {
    if (this.funds.length === 0) {
      return 0;
    }
    return (
      this.funds.reduce((sum, f) => sum + f.nav, 0) / this.funds.length
    );
  }
}