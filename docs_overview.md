
## High-level description
This repository contains a small TypeScript model representing investment funds and a service that provides simple retrieval and aggregation operations over an in-memory list of funds.

Key concepts:
- `Fund` — TypeScript type describing the properties of a fund.
- `FundService` — Lightweight service class that stores an array of `Fund` objects and exposes methods to lookup, filter, and compute statistics (average NAV).

---

## Documented features
- `Fund` (type) — description of fields, allowed values, and example usage.
- `FundService` (class) — constructor behavior and public methods:
  - `getFundById(id: string): Fund | undefined`
  - `filterByRisk(level: Fund["riskLevel"]): Fund[]`
  - `calculateAverageNav(): number`

---

## Notes
This documentation strictly reflects the behavior in `input.ts` and does not introduce or assume additional functionality. For relevant language and runtime behavior, see the reference links in each detailed document under `docs/`.
