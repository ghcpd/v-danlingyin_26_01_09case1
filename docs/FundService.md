# FundService Class

## Description

The `FundService` class encapsulates business logic for managing a collection of investment funds. It provides methods for querying, filtering, and analyzing fund data, serving as the main interface for fund-related operations in the application.

## Constructor

```typescript
constructor(funds: Fund[])
```

Initializes a new FundService instance with an array of Fund objects.

### Parameters

- `funds: Fund[]` - Array of fund objects to manage. The service stores a reference to this array internally.

### Example

```typescript
import { FundService, Fund } from './input';

const funds: Fund[] = [
  { id: "1", name: "Fund A", riskLevel: "Low", nav: 100 },
  { id: "2", name: "Fund B", riskLevel: "High", nav: 200 }
];

const service = new FundService(funds);
```

## Public APIs

### getFundById

```typescript
getFundById(id: string): Fund | undefined
```

Retrieves a specific fund by its unique identifier.

#### Parameters

- `id: string` - The fund identifier to search for.

#### Returns

- `Fund | undefined` - The fund object if found, or `undefined` if no fund with the given ID exists.

#### Usage Example

```typescript
const fund = service.getFundById("1");
if (fund) {
  console.log(`Found fund: ${fund.name}`);
} else {
  console.log("Fund not found");
}
```

#### Edge Cases

- Returns `undefined` for non-existent IDs.
- Case-sensitive ID matching.

### filterByRisk

```typescript
filterByRisk(level: Fund["riskLevel"]): Fund[]
```

Filters the funds collection to return only those matching a specific risk level.

#### Parameters

- `level: "Low" | "Medium" | "High"` - The risk level to filter by.

#### Returns

- `Fund[]` - Array of funds with the specified risk level. Returns empty array if no matches found.

#### Usage Example

```typescript
const lowRiskFunds = service.filterByRisk("Low");
console.log(`Found ${lowRiskFunds.length} low-risk funds`);
```

#### Notes

- Supports all three predefined risk levels.
- Returns a new array; does not modify the original collection.

### calculateAverageNav

```typescript
calculateAverageNav(): number
```

Calculates the arithmetic mean of Net Asset Values across all funds in the collection.

#### Parameters

- None

#### Returns

- `number` - The average NAV value. Returns 0 if the funds collection is empty.

#### Usage Example

```typescript
const averageNav = service.calculateAverageNav();
console.log(`Average NAV: ${averageNav.toFixed(2)}`);
```

#### Edge Cases

- Returns 0 for empty fund collections to avoid division by zero.
- Includes all funds regardless of risk level.

## Notes and Limitations

- The service maintains a reference to the input funds array; changes to the original array will affect the service.
- No internal validation of fund data integrity.
- Methods are synchronous and suitable for in-memory operations.
- Not thread-safe for concurrent modifications.

## References

- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [MDN Web Docs: Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN Web Docs: Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN Web Docs: Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)