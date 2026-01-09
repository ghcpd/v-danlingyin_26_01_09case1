# Fund Type

## Description

The `Fund` type represents an investment fund entity with essential properties for identification, naming, risk assessment, and valuation. It serves as the primary data structure for fund information throughout the application.

## API Reference

```typescript
export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};
```

### Fields

- `id: string` - A unique identifier for the fund. Must be non-empty and unique within a collection.
- `name: string` - The human-readable name or title of the fund.
- `riskLevel: "Low" | "Medium" | "High"` - Categorical risk assessment with three predefined levels.
- `nav: number` - Net Asset Value representing the fund's current valuation per share/unit.

## Usage Example

```typescript
import { Fund } from './input';

const sampleFund: Fund = {
  id: "FUND-001",
  name: "Global Equity Fund",
  riskLevel: "Medium",
  nav: 125.75
};

// Using in an array
const funds: Fund[] = [sampleFund];
```

## Notes and Limitations

- The `riskLevel` is restricted to the three string literals; custom risk levels are not supported.
- The `nav` field should be a positive number, but this is not enforced by the type system.
- No validation is performed on the `id` uniqueness or format.

## References

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#object-types)
- [TypeScript Handbook: Union Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)