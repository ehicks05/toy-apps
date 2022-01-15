# covid charts

## todo

1. data comes in with a row/object per county, columns are metadata and a column-per-date
2. we want it in a format like:

```javascript
{
  2020-01-01: {
    county1: {
      ...countyMetadata,
      confirmed: 123,
      deaths: 123,
    },
    county2: {
      ...countyMetadata,
      confirmed: 123,
      deaths: 123,
    }
  },
  2020-01-02: {
    county1: {
      ...countyMetadata,
      confirmed: 123,
      deaths: 123,
    },
    county2: {
      ...countyMetadata,
      confirmed: 123,
      deaths: 123,
    }
  },
}
```
