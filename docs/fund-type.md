# Fund Type Documentation

## Overview

The `Fund` type represents an investment fund entity with essential attributes for fund identification, classification, and valuation. This type is the core data structure used throughout the fund management system.

## Type Definition

```typescript
export type Fund = {
  id: string;
  name: string;
  riskLevel: "Low" | "Medium" | "High";
  nav: number;
};
```

## Properties

### id: `string`
- **Description**: Unique identifier for the fund
- **Format**: Alphanumeric string (recommended format: fund ticker or ISIN code)
- **Constraints**: Must be unique within the fund database
- **Example**: `"VTSAX"`, `"VFIAX"`, `"FSKAX"`

### name: `string`
- **Description**: Human-readable name of the fund
- **Format**: String, typically including fund name and category
- **Constraints**: Non-empty string
- **Example**: `"Vanguard Total US Stock Market Index Fund"`, `"Fidelity International Index Fund"`

### riskLevel: `"Low" | "Medium" | "High"`
- **Description**: Risk classification of the fund
- **Valid Values**:
  - `"Low"` - Conservative funds with lower volatility (e.g., bond funds, money market funds)
  - `"Medium"` - Balanced funds with moderate volatility
  - `"High"` - Aggressive funds with higher volatility (e.g., small-cap, emerging market funds)
- **Purpose**: Used for portfolio risk assessment and filtering
- **Example**: `"Low"`, `"Medium"`, `"High"`

### nav: `number`
- **Description**: Net Asset Value (NAV) of the fund share
- **Unit**: Currency amount (typically USD or local currency)
- **Constraints**: Must be a non-negative number
- **Precision**: Typically represented with 2-4 decimal places
- **Example**: `45.67`, `123.45`, `1234.56`

## NAV (Net Asset Value) Explanation

NAV represents the value of one share of the fund, calculated by dividing the fund's total assets minus liabilities by the number of outstanding shares. This value fluctuates based on market conditions and fund performance.

**Reference**: [SEC - What is Net Asset Value (NAV)?](https://www.sec.gov/cgi-bin/glossary-search?action=getterm&term=NET%20ASSET%20VALUE)

## Usage Examples

### Creating a Fund Object

```typescript
const techFund: Fund = {
  id: "QQQ",
  name: "Invesco QQQ Trust",
  riskLevel: "High",
  nav: 342.85
};
```

### Creating Multiple Funds

```typescript
const funds: Fund[] = [
  {
    id: "BND",
    name: "Vanguard Total Bond Market Index Fund",
    riskLevel: "Low",
    nav: 78.92
  },
  {
    id: "VTI",
    name: "Vanguard Total Stock Market ETF",
    riskLevel: "Medium",
    nav: 218.54
  },
  {
    id: "QQQ",
    name: "Invesco QQQ Trust",
    riskLevel: "High",
    nav: 342.85
  }
];
```

## Constraints and Considerations

1. **Immutability**: The Fund type uses `readonly` properties implicitly; modifications should create new objects
2. **Unique IDs**: Ensure fund IDs are unique within your dataset
3. **NAV Updates**: NAV values change daily and should be regularly updated from financial data sources
4. **Risk Level Consistency**: Risk levels should follow a consistent classification scheme across your organization

## Related Documentation

- [FundService Class Documentation](./fundservice-class.md)
- [FundService Methods Reference](./fundservice-methods.md)

## References

- [TypeScript Handbook - Types](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Investopedia - Net Asset Value (NAV)](https://www.investopedia.com/terms/n/nav.asp)
- [SEC Office of Investor Education and Advocacy](https://www.sec.gov/investor)
