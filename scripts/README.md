# Country Data Update Scripts

This directory contains scripts for updating and maintaining country data in the globalism application.

## Overview

The scripts fetch data from reliable sources and update the TypeScript data files in `src/data/`. They handle:

- **Countries**: Basic country information (names, codes, currencies, languages)
- **Groups**: Political and economic group memberships (EU, NATO, OECD, etc.)
- **Languages**: Language definitions with native names and scripts

## Scripts

### Core Scripts

| Script | Description | Usage |
|--------|-------------|--------|
| `update-all.ts` | Master script that runs all updates | `npm run update-data` |
| `fetch-countries.ts` | Fetches country data from REST Countries API | `npm run update-countries` |
| `update-groups.ts` | Updates country group memberships | `npm run update-groups` |
| `update-languages.ts` | Updates language definitions | `npm run update-languages` |
| `validate-data.ts` | Validates all data for consistency | `npm run validate-data` |

### Data Sources

#### Primary Sources
- **REST Countries API** (https://restcountries.com/v3.1/all)
  - Country names, codes, currencies, languages
  - Phone codes, postal codes, flags
  - No rate limits, high reliability

#### Static Data
- **Political Groups**: EU, NATO, OECD, G7, G20, BRICS, etc.
- **Continents**: Continental groupings
- **Languages**: ISO 639-1 language codes with native names

## Usage

### Quick Start

```bash
# Update all data
npm run update-data

# Update specific components
npm run update-countries
npm run update-groups
npm run update-languages

# Validate data
npm run validate-data
```

### Command Line Options

```bash
# Update all data
tsx scripts/update-all.ts

# Update specific components only
tsx scripts/update-all.ts --countries-only
tsx scripts/update-all.ts --groups-only
tsx scripts/update-all.ts --languages-only

# Validate without updating
tsx scripts/update-all.ts --validate-only
tsx scripts/update-all.ts --no-validate

# Individual scripts
tsx scripts/fetch-countries.ts
tsx scripts/update-groups.ts update
tsx scripts/update-groups.ts validate
tsx scripts/update-languages.ts update
tsx scripts/update-languages.ts validate
```

## Automation

### GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/update-data.yml`) that:

- Runs monthly on the 1st of each month
- Can be triggered manually with different update types
- Creates a pull request with updated data
- Validates all changes before merging

### Manual Trigger

1. Go to the Actions tab in your GitHub repository
2. Select "Update Country Data"
3. Click "Run workflow"
4. Choose update type (all, countries-only, etc.)

## Data Validation

The validation system checks for:

### Countries
- ✅ Valid ISO alpha-2 and alpha-3 codes
- ✅ Required fields (name, codes, currency)
- ✅ No duplicates
- ✅ Proper code formatting
- ⚠️ Missing optional fields

### Groups
- ✅ Valid group IDs and names
- ✅ No duplicate groups
- ✅ Valid member country codes
- ⚠️ Empty groups

### Languages
- ✅ Valid ISO 639-1 codes
- ✅ Required names and native names
- ✅ No duplicates
- ⚠️ Code formatting

### Cross-References
- ✅ Language codes used in countries exist
- ✅ Group IDs used in countries exist
- ⚠️ Countries referenced in groups exist

## File Structure

```
scripts/
├── README.md              # This file
├── data-sources.md        # Data source documentation
├── update-all.ts          # Master update script
├── fetch-countries.ts     # Countries data fetcher
├── update-groups.ts       # Groups updater
├── update-languages.ts    # Languages updater
└── validate-data.ts       # Data validator
```

## Output Files

The scripts generate/update these files:

```
src/data/
├── countries.ts           # Country data array
├── countryGroups.ts       # Country groups array
├── languages.ts           # Languages array
└── types.ts              # TypeScript interfaces
```

## Development

### Prerequisites

```bash
npm install
npm install -g tsx  # For running TypeScript directly
```

### Adding New Data Sources

1. Create a new fetcher class in the appropriate script
2. Add data transformation logic
3. Update the master updater to include the new source
4. Add validation rules
5. Update documentation

### Adding New Groups

Edit the `staticGroups` array in `update-groups.ts`:

```typescript
{
  id: 'NEW_GROUP',
  name: 'New Group Name',
  type: GroupingType.EconomicUnion,
  description: 'Description of the group',
  members: ['US', 'CA', 'MX'], // ISO alpha-2 codes
  source: 'static'
}
```

### Error Handling

Scripts include comprehensive error handling:
- Network failures gracefully degrade
- Invalid data is reported with specific errors
- Validation failures prevent data corruption
- Detailed logging for debugging

## Troubleshooting

### Common Issues

1. **Network timeout**: REST Countries API may be slow
   - Solution: Retry or use cached data

2. **Invalid country codes**: New countries or code changes
   - Solution: Update static data or API mapping

3. **Type errors**: Data structure changes
   - Solution: Update TypeScript interfaces

4. **Validation failures**: Data inconsistencies
   - Solution: Check validation output and fix data

### Debug Mode

Run with extra logging:
```bash
DEBUG=1 npm run update-data
```

## Contributing

1. Test changes locally: `npm run validate-data`
2. Run type checking: `npm run build`
3. Update documentation if needed
4. Create PR with validation output

## License

Same as the main project license.