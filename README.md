# "Why you should stop Using ORMs" lecture code

## Getting started

#### Install the docker
```bash
$ npm i
$ npm run docker:start
```

#### Demonstrate Sequelize limitations
1. see that the query does a complex query, then add `required: false` to the include (see https://stackoverflow.com/questions/27561915/how-can-use-left-join-at-sequelize)
2. now see that the query does not work, and uncomment second query
3. now open up terminal and connect to postgres, then run each query with `explain analyze` prefix, for example:
  ```bash
  explain analyze
    SELECT
      category.name as "categoryName",
      category."allowComments" as "allowComments",
      "categoryItem".name AS "categoryItemName"
    FROM category
    LEFT JOIN "categoryItem" ON 
      "categoryItem"."categoryName" = category.name
    WHERE "categoryName" = 'category-50000';
  ```

#### Understanding Explain and Analyze
* **costs** is measured in arbitrary unit of computation.

  Formula for these unit:

  (disk pages read * `seq_page_cost`) + (rows scanned * `cpu_tuple_cost`)
  * `seq_page_cost` - Sets the planner's estimate of the cost of a disk page fetch that is part of a series of sequential fetches. The default is `1.0`. This value can be overridden for a particular tablespace by setting the tablespace parameter of the same name (see ALTER TABLESPACE).
  * `cpu_tuple_cost` - Sets the planner's estimate of the cost of processing each row during a query. The default is 0.01.
* **rows** - a little tricky because it is not the number of rows processed or scanned by the plan node. It is usually less, reflecting the estimated selectivity of any WHERE-clause conditions that are being applied at the node. Ideally the top-level rows estimate will approximate the number of rows actually returned, updated, or deleted by the query.
* **width** - total bytes of rows output by this plan node
* **analyze** keyword will allow to ms of a real use-case (and not just theoretical)
