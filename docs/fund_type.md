# Fund (type)

## Description 🔧
The `Fund` type defines the shape of a fund object used throughout the codebase. It captures an identifier, human-readable name, risk level, and a net asset value (NAV).

## Type definition
```ts
export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};
```

## Fields (API reference)
- `id: string` — Unique identifier for the fund. Used for lookups.
- `name: string` — Human-friendly name of the fund.
- `riskLevel: "Low" | "Medium" | "High"` — Allowed set of risk-level strings.
- `nav: number` — Net asset value as a numeric value (floating-point allowed).

## Example usage
```ts
const fund: Fund = {
  id: "f-123",
  name: "Conservative Income",
  riskLevel: "Low",
  nav: 12.34,
};
```

## Notes & limitations ⚠️
- The type allows only the three enumerated `riskLevel` values. TypeScript enforces this at compile time.
- `nav` is a plain `number` — if callers provide `NaN` or `Infinity`, methods that aggregate `nav` (e.g., averages) may produce `NaN` or `Infinity` results.

## References
- TypeScript: Type aliases — https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
- MDN Number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
