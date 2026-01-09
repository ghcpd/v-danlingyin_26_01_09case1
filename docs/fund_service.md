# FundService (class)

## Feature description
`FundService` is a lightweight in-memory service that stores an array of `Fund` objects and provides simple retrieval, filtering, and aggregation functions.

It is intended for use where an in-memory collection of funds is sufficient (e.g., tests, small apps, or as a wrapper around a pre-loaded dataset). It does not perform persistence, validation, or async I/O.

## Public API

### constructor(funds: Fund[])
- Purpose: Creates a `FundService` instance using the provided array of `Fund` objects.
- Parameters:
  - `funds` — An array of `Fund` objects to be stored by the instance.
- Behavior note: The constructor assigns the provided array directly to an internal field (`this.funds = funds`). It does not clone the array, so mutations to the input array after construction will be reflected in the service and vice-versa.

### getFundById(id: string): Fund | undefined
- Purpose: Returns the first `Fund` with a matching `id`.
- Parameters:
  - `id` — The fund identifier to search for.
- Returns:
  - The `Fund` object when found, or `undefined` if no fund matches the given `id`.
- Remarks:
  - The lookup uses `Array.prototype.find`, so it returns the first match.

### filterByRisk(level: Fund["riskLevel"]): Fund[]
- Purpose: Returns all funds that match the supplied risk level.
- Parameters:
  - `level` — Allowed values are the `riskLevel` literals: `'Low' | 'Medium' | 'High'`.
- Returns:
  - An array of matching `Fund` objects. Returns an empty array if no funds match.

### calculateAverageNav(): number
- Purpose: Computes the arithmetic mean of the `nav` values across all stored funds.
- Returns:
  - The average `nav` as a number. If there are no funds, the method returns `0`.
- Edge cases:
  - Empty funds list => returns `0`.
  - Values are summed with JavaScript numbers (IEEE 754 double); callers should be aware of floating-point rounding.

## Example usage
```ts
import { Fund, FundService } from './input';

const funds: Fund[] = [
  { id: 'a', name: 'Alpha', riskLevel: 'Low', nav: 100 },
  { id: 'b', name: 'Beta', riskLevel: 'High', nav: 200 },
  { id: 'c', name: 'Gamma', riskLevel: 'Low', nav: 300 }
];

const svc = new FundService(funds);

// lookup
const found = svc.getFundById('b');
if (found) {
  console.log(found.name); // "Beta"
}

// filter
const lowRisk = svc.filterByRisk('Low');
console.log(lowRisk.length); // 2

// average NAV
console.log(svc.calculateAverageNav()); // (100 + 200 + 300) / 3 = 200

// Note: Mutating `funds` after construction affects `svc` because the array is not cloned.
funds.push({ id: 'd', name: 'Delta', riskLevel: 'Medium', nav: 400 });
console.log(svc.calculateAverageNav()); // now recalculates including added fund
```

## Notes & limitations
- The service is synchronous and in-memory. It is not designed for large datasets without additional considerations for performance.
- No runtime validation of `Fund` contents is performed; invalid or unexpected `nav` values (e.g., NaN) may produce misleading results.
- `getFundById` returns `undefined` when no items match; callers must handle this case.

## References
- TypeScript classes and members: https://www.typescriptlang.org/docs/handbook/classes.html
- MDN: Array.prototype.find — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- MDN: Array.prototype.filter — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN: Array.prototype.reduce — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
