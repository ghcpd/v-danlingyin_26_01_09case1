# FundService Class Documentation

## Overview

`FundService` is the primary service class for managing and querying fund data. It provides methods for retrieving individual funds, filtering by risk level, and calculating portfolio statistics.

## Purpose and Responsibilities

The FundService class is responsible for:
- **Fund Retrieval**: Fetching individual funds by their unique identifier
- **Portfolio Filtering**: Filtering funds based on risk characteristics
- **Portfolio Analytics**: Computing aggregate statistics such as average NAV
- **Data Management**: Maintaining an in-memory collection of fund objects

## Class Definition

```typescript
export class FundService {
  private funds: Fund[];

  constructor(funds: Fund[]) {
    this.funds = funds;
  }

  // Methods detailed in fundservice-methods.md
}
```

## Constructor

### Signature

```typescript
constructor(funds: Fund[])
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `funds` | `Fund[]` | Array of Fund objects to initialize the service with |

### Purpose

Initializes the FundService with a collection of funds. The provided array is stored internally and used for all subsequent operations.

### Behavior

- Accepts an array of Fund objects of any size, including empty arrays
- Stores the funds array internally for later retrieval and analysis
- Does not perform validation or sorting of the input array

### Examples

#### Basic Initialization

```typescript
const funds: Fund[] = [
  {
    id: "VTI",
    name: "Vanguard Total Stock Market ETF",
    riskLevel: "Medium",
    nav: 218.54
  },
  {
    id: "BND",
    name: "Vanguard Total Bond Market Index Fund",
    riskLevel: "Low",
    nav: 78.92
  }
];

const fundService = new FundService(funds);
```

#### Empty Initialization

```typescript
// Create service with no initial funds
const emptyService = new FundService([]);
```

#### With Multiple Funds

```typescript
const largePortfolio = new FundService([
  // ... array of many Fund objects
]);
```

## State Management

- **Internal State**: The `funds` array is stored as a private property and is not directly accessible
- **Immutability**: The original array passed to the constructor should not be modified externally; create a new service instance if the fund list changes
- **Thread Safety**: This implementation is not thread-safe; synchronize access if used in concurrent environments

## Properties

### funds: `Fund[]` (private)

Stores the internal collection of Fund objects. This property is private and should only be accessed through the public methods of the class.

## Integration Example

```typescript
// Step 1: Create fund data
const fundData: Fund[] = [
  {
    id: "QQQ",
    name: "Invesco QQQ Trust",
    riskLevel: "High",
    nav: 342.85
  },
  {
    id: "VTI",
    name: "Vanguard Total Stock Market ETF",
    riskLevel: "Medium",
    nav: 218.54
  },
  {
    id: "BND",
    name: "Vanguard Total Bond Market Index Fund",
    riskLevel: "Low",
    nav: 78.92
  }
];

// Step 2: Initialize the service
const fundService = new FundService(fundData);

// Step 3: Use service methods (see fundservice-methods.md)
```

## Best Practices

1. **Single Instance**: Create one FundService instance per fund database
2. **Data Updates**: If fund data changes, create a new FundService instance
3. **Error Handling**: Implement error handling when constructing with external data sources
4. **Type Safety**: Always ensure the input array contains properly typed Fund objects

## Related Documentation

- [Fund Type Documentation](./fund-type.md)
- [FundService Methods Reference](./fundservice-methods.md)

## References

- [TypeScript Classes - Official Documentation](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Design Pattern: Service Layer](https://martinfowler.com/eaaCatalog/serviceLayer.html)
