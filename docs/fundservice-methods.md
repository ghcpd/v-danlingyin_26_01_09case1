# FundService Methods Reference

## Overview

This document provides detailed documentation for all public methods of the `FundService` class.

---

## getFundById(id: string): Fund | undefined

### Purpose

Retrieves a single fund from the service by its unique identifier. This is the primary method for individual fund lookups.

### Signature

```typescript
getFundById(id: string): Fund | undefined
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | The unique identifier of the fund to retrieve |

### Return Value

| Type | Description |
|------|-------------|
| `Fund \| undefined` | The Fund object if found; `undefined` if no fund with the given ID exists |

### Behavior

- Performs a linear search through the internal funds array
- Returns the first fund matching the provided ID
- Returns `undefined` if no matching fund is found
- Does not modify the service state

### Examples

#### Finding an Existing Fund

```typescript
const fundService = new FundService([
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
]);

const fund = fundService.getFundById("VTI");
// Result: Fund object with id "VTI"
console.log(fund?.name); // Output: "Vanguard Total Stock Market ETF"
```

#### Handling Not Found Cases

```typescript
const fund = fundService.getFundById("NONEXISTENT");

if (fund === undefined) {
  console.log("Fund not found");
} else {
  console.log(`Found fund: ${fund.name}`);
}

// Using optional chaining
console.log(fund?.nav ?? "Fund not available");
```

#### Defensive Programming Pattern

```typescript
function displayFundInfo(service: FundService, fundId: string): void {
  const fund = service.getFundById(fundId);
  
  if (!fund) {
    console.error(`Unable to find fund with ID: ${fundId}`);
    return;
  }
  
  console.log(`${fund.name} (${fund.id})`);
  console.log(`Risk Level: ${fund.riskLevel}`);
  console.log(`NAV: $${fund.nav}`);
}
```

### Edge Cases

1. **Empty Service**: Returns `undefined` if the service was initialized with an empty array
2. **Case Sensitivity**: The search is case-sensitive; ensure ID matching respects case
3. **Duplicate IDs**: Returns the first match if the internal array contains duplicate IDs

### Performance Considerations

- **Time Complexity**: O(n) where n is the number of funds
- **Space Complexity**: O(1)
- For large portfolios (>10,000 funds), consider implementing an index-based lookup

---

## filterByRisk(level: Fund["riskLevel"]): Fund[]

### Purpose

Returns all funds matching a specified risk level. Useful for portfolio composition and risk-based filtering.

### Signature

```typescript
filterByRisk(level: Fund["riskLevel"]): Fund[]
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `level` | `"Low" \| "Medium" \| "High"` | The risk level to filter by |

### Return Value

| Type | Description |
|------|-------------|
| `Fund[]` | Array of funds matching the specified risk level; empty array if no matches found |

### Valid Risk Levels

- `"Low"` - Conservative funds (bonds, money market)
- `"Medium"` - Balanced funds
- `"High"` - Aggressive funds (growth, small-cap)

### Behavior

- Filters the internal funds array by exact risk level match
- Returns a new array containing all matching funds
- Does not modify the service state
- Returns an empty array if no funds match the specified level

### Examples

#### Getting All Low-Risk Funds

```typescript
const fundService = new FundService([
  { id: "VTI", name: "Vanguard Total Stock Market ETF", riskLevel: "Medium", nav: 218.54 },
  { id: "BND", name: "Vanguard Total Bond Market", riskLevel: "Low", nav: 78.92 },
  { id: "QQQ", name: "Invesco QQQ Trust", riskLevel: "High", nav: 342.85 },
  { id: "TLT", name: "iShares 20+ Year Treasury Bond ETF", riskLevel: "Low", nav: 89.23 }
]);

const lowRiskFunds = fundService.filterByRisk("Low");
// Result: [BND, TLT]
```

#### Building a Diversified Portfolio

```typescript
const lowRiskFunds = fundService.filterByRisk("Low");
const mediumRiskFunds = fundService.filterByRisk("Medium");
const highRiskFunds = fundService.filterByRisk("High");

console.log(`Conservative options: ${lowRiskFunds.length}`);
console.log(`Balanced options: ${mediumRiskFunds.length}`);
console.log(`Aggressive options: ${highRiskFunds.length}`);
```

#### Portfolio Risk Analysis

```typescript
function analyzePortfolioRisk(
  fundService: FundService,
  selectedFundIds: string[]
): void {
  const selectedFunds = selectedFundIds
    .map(id => fundService.getFundById(id))
    .filter((f): f is Fund => f !== undefined);

  const byRisk = {
    Low: selectedFunds.filter(f => f.riskLevel === "Low").length,
    Medium: selectedFunds.filter(f => f.riskLevel === "Medium").length,
    High: selectedFunds.filter(f => f.riskLevel === "High").length
  };

  console.log("Portfolio composition:", byRisk);
}
```

### Edge Cases

1. **Empty Result**: Returns empty array `[]` if no funds match the risk level
2. **All Funds Match**: Returns array of all funds if entire portfolio is same risk level
3. **Empty Service**: Returns empty array if the service was initialized with no funds

### Performance Considerations

- **Time Complexity**: O(n) where n is the number of funds
- **Space Complexity**: O(m) where m is the number of matching funds
- For large portfolios, consider adding an index by risk level

---

## calculateAverageNav(): number

### Purpose

Calculates the average Net Asset Value (NAV) across all funds in the portfolio. Useful for portfolio valuation and performance analysis.

### Signature

```typescript
calculateAverageNav(): number
```

### Parameters

None

### Return Value

| Type | Description |
|------|-------------|
| `number` | The average NAV of all funds; `0` if the portfolio is empty |

### Behavior

- Sums all fund NAV values
- Divides by the total number of funds
- Returns `0` for empty portfolios
- Does not modify the service state

### Calculation Formula

$$\text{Average NAV} = \frac{\sum_{i=0}^{n-1} \text{fund}_i.\text{nav}}{n}$$

where $n$ is the number of funds (returns 0 if $n = 0$)

### Examples

#### Basic Average Calculation

```typescript
const fundService = new FundService([
  { id: "VTI", name: "Vanguard Total Stock Market ETF", riskLevel: "Medium", nav: 218.54 },
  { id: "BND", name: "Vanguard Total Bond Market", riskLevel: "Low", nav: 78.92 },
  { id: "QQQ", name: "Invesco QQQ Trust", riskLevel: "High", nav: 342.85 }
]);

const avgNav = fundService.calculateAverageNav();
// Calculation: (218.54 + 78.92 + 342.85) / 3 = 213.43666...
console.log(`Average NAV: $${avgNav.toFixed(2)}`); // Output: "Average NAV: $213.44"
```

#### Portfolio Valuation Analysis

```typescript
function analyzePortfolioValue(
  fundService: FundService,
  shareCount: number
): void {
  const avgNav = fundService.calculateAverageNav();
  const totalValue = avgNav * shareCount;
  
  console.log(`Average NAV: $${avgNav.toFixed(2)}`);
  console.log(`Shares Held: ${shareCount}`);
  console.log(`Portfolio Value: $${totalValue.toFixed(2)}`);
}

analyzePortfolioValue(fundService, 100);
// Output:
// Average NAV: $213.44
// Shares Held: 100
// Portfolio Value: $21344.00
```

#### Monitoring Portfolio Performance

```typescript
function comparePerformance(
  previousService: FundService,
  currentService: FundService
): void {
  const previousAvg = previousService.calculateAverageNav();
  const currentAvg = currentService.calculateAverageNav();
  const change = currentAvg - previousAvg;
  const percentChange = (change / previousAvg) * 100;
  
  console.log(`Previous Average NAV: $${previousAvg.toFixed(2)}`);
  console.log(`Current Average NAV: $${currentAvg.toFixed(2)}`);
  console.log(`Change: $${change.toFixed(2)} (${percentChange.toFixed(2)}%)`);
}
```

#### Handling Empty Portfolios

```typescript
const emptyService = new FundService([]);
const avgNav = emptyService.calculateAverageNav();

console.log(avgNav); // Output: 0
console.log(`Average NAV: ${avgNav}`); // Output: "Average NAV: 0"
```

### Edge Cases

1. **Empty Portfolio**: Returns `0` when no funds are present
2. **Single Fund**: Returns the NAV of that single fund
3. **High Precision**: The returned number may have floating-point precision issues

### Precision Considerations

- JavaScript numbers use 64-bit IEEE 754 floating-point format
- For financial calculations, consider rounding to 2 decimal places
- Example: `avgNav.toFixed(2)` for currency display

### Performance Considerations

- **Time Complexity**: O(n) where n is the number of funds
- **Space Complexity**: O(1)
- Method performs single pass through the array

---

## Method Usage Summary

| Method | Purpose | Input | Output | Complexity |
|--------|---------|-------|--------|-----------|
| `getFundById()` | Find fund by ID | Fund ID (string) | Fund \| undefined | O(n) |
| `filterByRisk()` | Filter by risk level | Risk level string | Fund[] | O(n) |
| `calculateAverageNav()` | Calculate average NAV | None | number | O(n) |

---

## Common Patterns and Best Practices

### Error Handling

```typescript
function safeFundLookup(
  fundService: FundService,
  fundId: string
): Fund {
  const fund = fundService.getFundById(fundId);
  if (!fund) {
    throw new Error(`Fund not found: ${fundId}`);
  }
  return fund;
}
```

### Chaining Operations

```typescript
function getRiskLevelOfFund(
  fundService: FundService,
  fundId: string
): string | undefined {
  const fund = fundService.getFundById(fundId);
  return fund?.riskLevel;
}
```

### Portfolio Summary

```typescript
function generatePortfolioSummary(fundService: FundService): void {
  console.log("=== Portfolio Summary ===");
  console.log(`Low Risk Funds: ${fundService.filterByRisk("Low").length}`);
  console.log(`Medium Risk Funds: ${fundService.filterByRisk("Medium").length}`);
  console.log(`High Risk Funds: ${fundService.filterByRisk("High").length}`);
  console.log(`Average NAV: $${fundService.calculateAverageNav().toFixed(2)}`);
}
```

## Related Documentation

- [Fund Type Documentation](./fund-type.md)
- [FundService Class Documentation](./fundservice-class.md)

## References

- [TypeScript Handbook - Methods](https://www.typescriptlang.org/docs/handbook/2/classes.html#methods)
- [Array Methods - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [IEEE 754 Floating Point - Wikipedia](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)
- [Financial Calculations Best Practices](https://en.wikipedia.org/wiki/Decimal_floating_point)
