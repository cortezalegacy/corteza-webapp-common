# List filtering & sorting

API endpoints for resource set/lists support filtering, sorting
and paging of resources.

## Record filtering & sorting

Some limitations:
 - searches only within a one module and within a one namespace
 - has max limit of 100 records for perPage with 50 records as default

## Syntax

SQL syntax should be used for filtering (`WHERE <filter>`) and sorting (`ORDER BY <sort>`). API supports simple
arithmetics (`+`, `-`, `*`, `/`), boolean (`AND`, `OR`, `NOT`) and comparison operators (<, >, =, <=, >=)


## Record's module fields

Module fields are case-sensitive and can be used for filtering and sorting

## Record's system fields

 - `ownedBy`,   user (ID) that owns this module
 - `createdBy`, created by user (ID)
 - `updatedBy`, updated by user (ID)
 - `deletedBy`, deleted by user (ID)
 - `createdAt`, created on (date + time)
 - `updatedAt`, updated on (date + time)
 - `deletedAt`, deleted on (date + time)

## Functions

Functions that can be used with the fields:
 - `QUARTER(ts)`
 - `YEAR(ts)`
 - `DATE(ts)`
 - `NOW(ts)`
 - `DATE_ADD(ts)`
 - `DATE_SUB(ts)`
 - `DATE_FORMAT(ts)`

## Sorting:

- `someField`, 
   order by someField, ascending
- `someField DESC`, 
   order by someField, descending
- `YEAR(someDate) DESC, someOtherField`, 
   order by descending by year and everything inside one year, ascending by someOtherField
