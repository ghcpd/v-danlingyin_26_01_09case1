# FundService (class) 🔧

## Overview
`FundService` is a lightweight utility class for working with an in-memory collection of `Fund` objects. It provides lookup, filtering, and aggregation utilities.

Source: `input.ts`

## Constructor
### Signature
```ts
constructor(funds: Fund[])
```

### Purpose
Initializes the service with an array of `Fund` objects.

### Parameters
- `funds: Fund[]` — An array of `Fund` objects to operate on. The constructor stores the *reference* to this array as-is (no defensive copy), so external mutation of the array will be visible to the service.

### Notes
- If you want to avoid external mutation affecting the service, pass a shallow copy (e.g., `new FundService([...funds])`).

## Methods (API reference)

### getFundById(id: string): Fund | undefined
- **Purpose:** Return the `Fund` whose `id` exactly matches `id`.
- **Parameters:** `id` — the fund identifier to search for.
- **Return value:** the matching `Fund`, or `undefined` if not found.
- **Behavior:** Uses `Array.prototype.find` to locate the fund.

**Example**
```ts
const service = new FundService(funds);
const f = service.getFundById('f-123');
if (f) console.log(f.name);
```

---

### filterByRisk(level: Fund["riskLevel"]): Fund[]
- **Purpose:** Returns the subset of funds whose `riskLevel` equals `level`.
- **Parameters:** `level` — one of `"Low" | "Medium" | "High"`.
- **Return value:** An array of matching funds (empty array if none match).

**Example**
```ts
const highRiskFunds = service.filterByRisk('High');
```

---

### calculateAverageNav(): number
- **Purpose:** Calculates the arithmetic mean of the `nav` values for all funds in the service.
- **Parameters:** none
- **Return value:** The average `nav` as a `number`. If the service has no funds, returns `0`.

**Edge cases & behavior**
- If `this.funds.length === 0`, the function returns `0` (explicitly handled in code).
- If any `fund.nav` is `NaN` or `Infinity`, the result may be `NaN`/`Infinity` because it uses numeric summation (`reduce`).

**Example**
```ts
const avg = service.calculateAverageNav();
console.log(`Average NAV: ${avg}`);
```

## Notes & limitations ⚠️
- The constructor does not clone the input array — external changes to the array after construction will affect the service state.
- Methods operate on in-memory data only and are synchronous.
- There is no input validation for values beyond TypeScript's static types (e.g., `nav` values are not validated at runtime).

## References
- TypeScript classes: https://www.typescriptlang.org/docs/handbook/2/classes.html
- MDN Array.prototype.find: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- MDN Array.prototype.reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
