# Fund and FundService — API documentation

## Purpose
This module models a simple in-memory representation of investment funds and provides read-only utilities to query and aggregate them. It is intentionally small and synchronous — suitable for unit tests, examples, or as a thin in-memory layer in a larger system.

## Feature scope / responsibilities
- Define the Fund data shape used across the codebase.
- Provide deterministic, synchronous operations for:
  - single-item lookup by identifier
  - filtering by risk-level
  - computing the arithmetic mean of NAV values

## Types and interfaces
### Fund (TypeScript type)
- Definition (from `input.ts`):
  - `id: string` — unique identifier for the fund
  - `name: string` — human-readable fund name
  - `riskLevel: "Low" | "Medium" | "High"` — allowed risk buckets
  - `nav: number` — net asset value (numeric)

Notes:
- `riskLevel` is a literal union; callers should only pass one of the three allowed strings.
- The codebase does not enforce non-negative NAV at runtime — validate upstream if required.

## Class: FundService
File: `input.ts`

Responsibility: provide read-only query and aggregation helpers over a provided array of `Fund` objects.

Constructor
- Signature: `constructor(funds: Fund[])`
- Behavior: stores a reference to the provided array. It does not clone or deep-copy the input (mutations to the array after construction will affect the instance).
- Expected input: an array of objects conforming to the `Fund` type.

Public methods

1) getFundById
- Signature: `getFundById(id: string): Fund | undefined`
- Purpose: return the first fund whose `id` strictly equals the provided `id`.
- Parameters:
  - `id` — string identifier to look up
- Returns:
  - `Fund` — the matching fund object if found
  - `undefined` — if no fund with the specified id exists
- Edge cases / notes:
  - Uses strict equality (===) for comparison.
  - Time complexity: O(n).

2) filterByRisk
- Signature: `filterByRisk(level: Fund["riskLevel"]): Fund[]`
- Purpose: return all funds whose `riskLevel` equals the provided level.
- Parameters:
  - `level` — one of `"Low" | "Medium" | "High"`
- Returns: array of matching `Fund` objects (empty array if none match)
- Edge cases / notes:
  - Returns a new array (does not mutate the stored array).
  - Time complexity: O(n).

3) calculateAverageNav
- Signature: `calculateAverageNav(): number`
- Purpose: compute the arithmetic mean of the `nav` property for all funds in the service.
- Parameters: none
- Returns:
  - A number representing the average NAV.
  - Returns `0` when the underlying fund list is empty.
- Formula used:
  - $$\text{average} = \frac{\sum_{i=1}^{N} nav_i}{N}$$ where N is `this.funds.length`.
- Edge cases / notes:
  - No protection against NaN or non-finite `nav` values — such values will affect the result.
  - Clients that require rounding should perform it themselves (the method returns a raw floating-point result).

## Example usage (TypeScript)

```ts
import { Fund, FundService } from './input';

const funds: Fund[] = [
  { id: 'f1', name: 'Global Equity', riskLevel: 'High', nav: 102.5 },
  { id: 'f2', name: 'Income Fund', riskLevel: 'Low', nav: 98.2 },
  { id: 'f3', name: 'Balanced', riskLevel: 'Medium', nav: 100.0 },
];

const svc = new FundService(funds);

// lookup
const f = svc.getFundById('f2'); // returns the Income Fund object or undefined

// filter
const lowRisk = svc.filterByRisk('Low'); // [{ id: 'f2', ... }]

// aggregation
const avg = svc.calculateAverageNav(); // (102.5 + 98.2 + 100.0) / 3
```

## Notes, limitations and recommended enhancements
- Mutation: because the constructor stores the provided array by reference, callers should avoid mutating the array after handing it to `FundService` or should pass a shallow copy.
- Validation: the module assumes callers provide well-formed `Fund` objects. Add runtime validation if inputs can be untrusted (e.g., from network or user input).
- Numeric safety: the implementation does not guard against non-finite `nav` values (NaN, Infinity). Consider sanitizing or validating `nav`.
- Concurrency / persistence: this is an in-memory, synchronous utility — not suitable as a persistence layer.

## References
- TypeScript handbook (types & interfaces): https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- MDN: Array.prototype.find — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- MDN: Array.prototype.reduce — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
- NAV (Net Asset Value) definition: https://www.investopedia.com/terms/n/netassetvalue.asp
