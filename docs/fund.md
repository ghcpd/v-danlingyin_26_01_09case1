# Fund (type)

## Feature description
`Fund` is a TypeScript type that describes the shape of a fund object used by the service. It is a plain data shape (no methods). Clear field meanings help consumers construct and validate `Fund` objects consistently.

## Type definition (from `input.ts`)
```ts
export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};
```

## Field reference
- `id: string` — Unique identifier for the fund. Used for lookups (e.g., `getFundById`).
- `name: string` — Human-readable name for the fund.
- `riskLevel: "Low" | "Medium" | "High"` — Literal union indicating the fund's risk category. Only these three values are accepted by the typed API.
- `nav: number` — Net Asset Value (NAV) of the fund represented as a number. The code treats it as a numeric value without additional validation (e.g., it may be negative if constructed so).

## Example usage
```ts
import { Fund } from './input';

const fund: Fund = {
  id: 'f-001',
  name: 'Global Equity Fund',
  riskLevel: 'Medium',
  nav: 123.45
};
```

## Notes & limitations
- The type does not enforce any invariants beyond TypeScript's type guarantees. The runtime code does not validate that `nav` is non-negative or that `id` is globally unique.
- `riskLevel` is restricted by the type to the three literal values; passing anything else will be a type error in TypeScript.

## References
- TypeScript types and type aliases: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Net Asset Value (NAV) definition (finance reference): https://www.investopedia.com/terms/n/netassetvalue.asp
