# System overview — FundService (mini)

## High-level summary
This repository contains a minimal TypeScript domain model for investment funds and a small service that performs common read-only operations over an in-memory fund collection.

Primary responsibilities:
- Define the Fund data shape (`Fund`).
- Provide a single service (`FundService`) that exposes lookup, filtering and simple aggregation (average NAV) operations over a provided array of funds.

Intended audience: developers who need to integrate, test, or extend fund-related utility logic.

## Documented features
- `Fund` (type) — shape and allowed values for fund records
- `FundService` (class) — responsibilities and lifecycle
  - `constructor(funds: Fund[])` — initialization behavior
  - `getFundById(id: string): Fund | undefined` — lookup by id
  - `filterByRisk(level: Fund["riskLevel"]): Fund[]` — filter by risk level
  - `calculateAverageNav(): number` — arithmetic mean of fund NAVs (returns 0 for empty list)

## Location of documentation
- High-level overview: `docs_overview.md` (this file)
- Detailed API documentation: `docs/fund_service.md`
- Missing-docs machine-readable report: `missing_docs_report.json`

## Quick next steps / recommendations
- Add runtime validation (if data may come from untrusted sources).
- Add unit tests that cover documented edge cases (empty arrays, unknown IDs, invalid nav values).

## References
- TypeScript: basic types — https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- NAV (Net Asset Value) definition — https://www.investopedia.com/terms/n/netassetvalue.asp
- MDN: Array.prototype.find / filter / reduce — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
