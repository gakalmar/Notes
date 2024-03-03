# SQL

- FULL SQL interactive tutorial: https://sqlbolt.com/lesson/introduction
- Next chapter: https://sqlbolt.com/lesson/select_queries_with_expressions

## Requirements:
- install DB Browser for DQLite: https://sqlitebrowser.org/dl/
- NuGet package required: Microsoft.Data.Sqlite
- SQLite documentation: https://www.sqlite.org/docs.html
- Create `UserRepository` class with **Repository pattern** (example in `Codecool.Bruteforce` task; "repository" and "repository pattern" explained in introduction)

## Introduction & Definitions: *(SQLBolt: https://sqlbolt.com/lesson/introduction )*
- **SQL:**
    - *Structured Language Query* is a language that is used to work with **relational databases**
    - Supported by many databases (SQLite, MySQL, Postgres, Oracle, Microsoft SQL Server)
- **Relational databases:**
    - they represent a **collection**(!) of related **tables** (2D), that is similar to an Excel table (fixed number of named **columns/attributes** and **rows/data** - see more below!)
    - a collection is like a `type` (eg. `class`) in C#, and each row represents an `object/instance`, and the columns are the common properties
    
    - **Advantages:**
        - They use SQL language, which is widely used (complex queries can be written)
        - They use `primary` and `foreign keys`, relational databases ensure data integrity (which means that the accuracy and consistency of data are maintained across different tables).
        - The use of database normalization (storing data accross multiple orthogonal tables):
            - minimize duplicate data
            - allow for data growth independently of each other
    - **Disadvantages:**
        - Complex design process (multi-table design, definition of relationships)
        - Performance is slower (multi-talbe storage, complex queries)
        - Rigid schema (eg addint a new column would require altering the whole database)
        - Performance can also be an issue for very high volumes of data (noSQL is better in this case)
    
    - **Tables:**
        - A `Database` is a collection of **related Tables** -> A `Table` is a collection of **data** within the database:
            - Data is represented in a 2D array, with the following:
                - **Column (also called field or attribute):**
                    - represents a particular type of data field
                    - has a specific **data type**, such as `integer`, `decimal`, `date`, or `text`, which defines the nature of the data that can be stored in that column
                    - in SQLite, which uses **type affinity**, types are only recommendations
                - **Row (also called a record, or tuple):**
                    - represents a single record or instance of the entity (for example in the customers table a row is the data  of 1 specific customer)
                    - each row in a table is unique, typically enforced by a primary key
        - **Characteristics:**
            - **Structured Data:** 
                - Tables are a way of structurally organizing data into a format that is easy to understand and manipulate.
            - **Schema:**
                - The schema of a table defines its structure by specifying the columns and data types.
            - **Normalization:**
                - Tables in a relational database are often normalized, which means the data is organized in a way that reduces redundancy and improves data integrity, by storing it accross multiple tables.
            - **Relationships:**
                - Tables can be related to one another. These relationships are a key feature of relational databases, allowing for complex queries and data analysis.


- **Repository:** 
    - performs the tasks of an **intermediary** between the *domain model layers* and *data mapping*
    - encapsulates a set of objects stored in the database and operations that can be performed on them
- **Repository pattern:** *(More on the repository pattern: https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30) (more detailed: https://deviq.com/design-patterns/repository-pattern )*
    - provides an abstraction of data
    - uses SOLID principles
    - 2 main purposes:
        - abstraction of the data layer
        - centralising the handling of the domain objects
- **Definition reminders from WEB module:**
    - CRUD operations: `CREATE`, `READ`, `UPDATE`, `DELETE`
    - Restful APIs: `GET`. `PUT`. `PATCH`, `POST`, `DELETE`

## QUERIES:
- **QUERY:**
    - a statement that declares:
        - the data we are looking for (`SELECT` + column name)
        - where to find it (`FROM` + database/collection name)
        - how to transform it before it's returned (eg. `WHERE` + condition, `ORDER BY` + criteria)

- **Specify location and what you are looking for:**
    - `SELECT` & `FROM`
        - Used to retieve data from a database (a `SELECT` statement is basically a query):

                // Select all the data in a table:
                SELECT *
                FROM mytable;

                // Select a range only:
                SELECT column, another_column       // these refer to the name of the column
                FROM mytable;

                // Result:
                2D set of rows and columns with the specified range (a copy of the original table)

                // Select and assign a new name for the return data:
                SELECT ship_country AS ship_country_97 FROM orders

                // Select unique items only: (also see this below, in more filtering section!)
                SELECT DISTINCT columname1, columname2
                    FROM tableA
                LEFT JOIN tableB
                    ON commonKeyA = commonKeyB  // Primary Key, that it uses to join the tables with

- **Apply initial filters:**
    - `WHERE`
        - Used for filtering through the rows:

                SELECT column, another_column, …
                FROM mytable
                WHERE condition
                    AND/OR another_condition        // eg.: `num_wheels >= 4 AND doors <= 2`
                    AND/OR …;
        
        - **Commonly used operators in SQL:**
            - Standard numerical operators:
                - `=`, `!=`, `<`, `<=`, `>`, `>=`
                - Example: 
                
                        col_name != 4

            - Ranges:
                - `BETWEEN ... AND ... `, `NOT BETWEEN ... AND ... `
                - Example:      

                        col_name BETWEEN 1.5 AND 10.5
                        col_name NOT BETWEEN 1 AND 10
            
            - Exists/doesn't exist in a list:
                - `IN (...)`, `NOT IN (...)`
                - Example:

                        col_name IN (2, 4, 6)
                        col_name IN ("A", "B", "C")         // Strings must be quoted!

                        col_name NOT IN (1, 3, 5)
                        col_name NOT IN ("D", "E", "F")     // Strings must be quoted!
            
            - Case insensitive comparison & wild-card matching (?):

                - `=` case sensitive "exact string" comparison:

                        col_name = 'abc'        // Always use single quotes for strings!
                
                - `!=` or `<>` case sensitive inequality comparison:

                        col_name != 'abcd'
                
                - `LIKE` (`ILIKE` in postgreSQL!) case insensitive exact string comparison:

                        col_name LIKE 'ABC'         // "abc" will also be included
                
                - `NOT LIKE` case insensitive exact sting inequality comparison:

                        col_name NOT LIKE 'ABCD'    // "abcd" will not be included either

                - `%` Used anywhere in a string to match a sequence of zero or more characters (only with `LIKE` or `NOT LIKE`):

                        col_name LIKE '%AT%'        // matches "AT", "ATTIC", "CAT" or even "BATS"
                
                - `_` Used anywhere in a string to match a single character (only with `LIKE` or `NOT LIKE`):

                        col_name LIKE 'AN_'         // matches "AND", but not "AN"
            
            - `@` is a simplified `$`, because it's still a Verbatim string, but without parameter

            - **Dates:**
                - Check if a dete is between 2 dates:

                        WHERE order_date >= '1997-01-01' AND order_date <= '1997-12-31'

                        // Or like this:
                        WHERE EXTRACT(YEAR FROM orders.order_date) = 1997

- **More filtering to refine return data:**
    - `DISTINCT`:
        - Used to filter unique elements only (eg we filter the movies release years, but we only want each year to be included once)

                SELECT DISTINCT column, another_column, …
                FROM mytable
                WHERE condition(s);
        
    - `GROUP BY`:
        - Suppose you have a table named **Orders** with the following columns: 
                
                OrderId | CustomerId | OrderDate | Amount
        
        - If you want to get a list of *unique customers* who have placed orders, along with the *count* of their orders, you might use a query like this:

                SELECT CustomerId, COUNT(OrderId) AS NumberOfOrders     // COUNT is just like a column, that's why the comma is needed. We can write more columns after or we can write the "COUNT" as the first columns as well!
                FROM Orders
                GROUP BY CustomerId;

                // Discards duplicate `CustomerId` entries and gives you the count of orders for each unique customer
        
        - A more complex example:

                SELECT categories.category_name AS category, COUNT(products) AS number_of_products
                    FROM products
                JOIN categories 
                    ON products.category_id = categories.category_id
                GROUP BY categories.category_name
                ORDER BY number_of_products DESC, category; 
        
        - We can also use `SUM` keyword, if we want to add the result of multiple rows:

                SELECT product_name, SUM(quantity * order_details.unit_price * (1 - order_details.discount)) AS sum_price 
                    FROM products
                JOIN order_details
                    ON products.product_id = order_details.product_id
                JOIN orders
                    ON order_details.order_id = orders.order_id
                WHERE EXTRACT(YEAR FROM orders.order_date) = 1997
                GROUP BY product_name
                ORDER BY sum_price DESC;
    
    - `ORDER BY`:
        - Most data in relational databases is added in no particular order, so we need a way to be able to sort it by something:

                SELECT column, another_column, …
                FROM mytable
                WHERE condition(s)
                ORDER BY column ASC/DESC;               // Sorting happens alpha-numerically, based on the column's value
                ORDER BY column1 ASC, column2 DESC      // Sort with secondary criteria (as if it was `THEN BY`, but there's no such command )
                
                // Collation: better sort data with international text
                SELECT name
                FROM international_data
                ORDER BY name COLLATE "hu_HU";
                // OR
                ORDER BY name COLLATE "de_DE";
                
                // All available collations:
                SELECT * FROM pg_collation;
                

    - `LIMIT`
        - We could also restrain the number of columns returned:

            SELECT column1, column2, ...
            FROM table_name
            LIMIT number;
    
    - `OFFSET`
        - used with `LIMIT`, determines where the limited return should start (like a page number)

                SELECT column, another_column, …
                FROM mytable
                WHERE condition(s)
                ORDER BY column ASC/DESC
                LIMIT num_limit OFFSET num_offset;  // Generally `LIMIT` and `OFFSET` are the last in the query

- **Furhter operations:**
    - `COALESCE` (=CONCAT columns)
        - used to join the values from different columns into 1, eg "first_name" and "last_name" as "full_name":

                SELECT first_name || '#' || last_name AS full_name      // # is the join character, swap it to what you need
                    FROM myTable;
                
                SELECT COALESCE(first_name, '') || ' ' || COALESCE(last_name, '') AS full_name      // Use COALESCE with nullable columns! (NULL values will be empty strings '')
                    FROM myTable;
    
    - **Arithmetic operations:**
        - We can do arithmetic operations with the columns' values before returning them, or combining them into a new column:

                SELECT (price + tax) * quantity AS total_cost
                FROM sales;


## MULTI-TABLE QUERIES:
- **Creating JOINs:** *( https://sqlbolt.com/lesson/select_queries_with_joins / https://www.w3schools.com/sql/sql_join.asp )* 
    - **Database normalization:**
        - means storing data accross multiple orthogonal tables
        - **Benefits:**
            - minimize duplicate data
            - allow for data growth independently of each other
        - **Disadvantages:**    
            - more complex queries
            - slower performance because of different storage locations
    - **Relationship types:**
        - **1-to-1**
            - when a single record in one table is related to only one record in another table (marriage example)
            - **Implementation:**
                - It is typically implemented by adding a `primary key` from one table as a `unique foreign key` in the other table.
                - For example, if you have a `Users` table and a `UserProfiles` table, each user record in `Users` corresponds to exactly one profile in `UserProfiles`.

        - **1-to-Many:**
            - a record in one table can relate to multiple records in another table (customer and their orders example)
            - **Implementation:**
                - It is implemented by adding a `foreign key` in the 'many' table that references the `primary key` of the 'one' table. 
                - For example, in a `Customers` and `Orders` scenario, each customer in the `Customers` table can have multiple orders in the `Orders` table, but each order is associated with only one customer.

        - **Many-to-Many:**
            - multiple records in one table can relate to multiple records in another table (students-courses example)
            - **Implementation:**
                -  It is implemented using a `junction table` (also called a linking or associative table = `JOIN`).
                - The `junction table` contains `foreign keys` referencing the `primary keys` of the two tables it is linking.
                - For example, in a `Students` and `Courses` scenario, a student can enroll in many courses, and each course can have many students. The `junction table`, say `Enrollments`, would have `foreign keys` referencing the `Students` and `Courses` tables.

    - **Requirements:**
        - If we want to use `JOIN`, we need to make sure there is a a **PRIMARY KEY**, that identifies that entity uniquely accross databases
        - Using this key, we can combine row data across two separate tables 
    - **Join types:**
        - `INNER JOIN` or simply `JOIN`:
            - Match rows from Table A and Table B if they have the same key (defined by the `ON` constraint)
            - The result is a combined table, on which the previously learned clauses will be applied on
            - **Structure:**

                    SELECT column, another_table_column, …      // we can be specific like this: tableA.name, tableB.id etc.
                    FROM mytable
                    INNER JOIN another_table 
                        ON mytable.id = another_table.id
                    WHERE condition(s)
                    ORDER BY column, … ASC/DESC
                    LIMIT num_limit OFFSET num_offset;

                    // EXAMPLE:
                    SELECT * FROM movies    // we can list here columns from either table
                    JOIN boxoffice          // name of Table B = boxoffice
                        ON id = movie_id
                    ORDER BY rating DESC;   // rating column is from Table B
        
        - `LEFT-`, `RIGHT-` and `FULL JOIN`:
            - All SQL `JOIN` types:![alt text](assets/sqljoins.png)
            - used when the tables have asymmetric data:
                - `(INNER) JOIN`: Returns records that have matching values in both tables
                - `LEFT JOIN`: Returns all records from the left table, and the matched records from the right table
                - `RIGHT JOIN`: Returns all records from the right table, and the matched records from the left table
                - `FULL JOIN`: Returns all records when there is a match in either left or right table

                - `NULL`: Additional logic is required to handle `NULL` values:

                        SELECT column, another_column, …
                        FROM mytable
                        WHERE column IS/IS NOT NULL
                        AND/OR another_condition
                        AND/OR …;
                
            - **Structure:**

                    ...
                    INNER/LEFT/RIGHT/FULL JOIN another_table 
                        ON mytable.id = another_table.matching_id
                    ...
        
## SQLITE *( Detailed SQLite processes: https://zetcode.com/csharp/sqlite/ )*
- **INTRODUCTION:**
    - an embedded relational database engine
    - It is a *self-contained*, *serverless*, *zero-configuration* and *transactional SQL database engine*
    - `ADO.NET`:
        - It is a specification that unifies access to relational databases, XML files, and other application data
        - It is a set of libraries and classes to work with database and other data sources
        - After adding `SQlite` package through `NuGet`, we get access to:
            - `SQLiteConnection` **creates a connection** to a specific data source
            - `SQLiteCommand` object **executes an SQL statement** against a data source
            - `SQLiteDataReader` **reads streams of data** from a data source
            - `SQLiteDataAdapter` is an **intermediary** between the `DataSet` and the data source. It populates a `DataSet` and resolves updates with the data source.
            - `DataSet` object:
                - a disconnected data representation that can hold data from a variety of different sources
                - used for offline work with a mass of data

- **DATA TYPES:** *( https://www.sqlitetutorial.net/sqlite-data-types/ )*
    - SQL databases use **static typing** in general (declare a column with a type!), but in SQLite we use **dynamic typing** (the data stored determines the type)
    - **Storage classes:**
        - They describe the format the data is stored in
        - a **storage class** is more general than a **data type** (eg. INTEGER class consists of 6 different types of integers)
        - **The 5 storage classes:**
            - `NULL`	
                - NULL values mean **missing information** or **unknown**.
            - `INTEGER` 
                - Integer values are **whole numbers** (either positive or negative). An integer can have variable sizes such as 1, 2, 3, 4, or 8 bytes.
            - `REAL`
                - Real values are real **numbers with decimal values** that use 8-byte floats.
            - `TEXT`
                - TEXT is used to store **character data**. The maximum length of TEXT is unlimited. SQLite supports various character encodings.
            - `BLOB`
                - BLOB stands for a **binary large object** that can **store any kind of data**. The maximum size of BLOB is, theoretically, unlimited.
        
        - How the data type is determined in **dynamic typing**:
            - If a literal has **no enclosing quotes and decimal point or exponent**, SQLite assigns the `INTEGER` storage class.
            - If a literal is **enclosed by single or double quotes**, SQLite assigns the `TEXT` storage class.
            - If a literal **does not have quote nor decimal point nor exponent**, SQLite assigns `REAL` storage class.
            - If a literal is `NULL` **without quotes**, it assigned `NULL` storage class.
            - If a literal has the `X ’ABCD’` or `x ‘abcd’`, SQLite assigned `BLOB` storage class. (?)
        
        - `typeof()`:

                SELECT
                    typeof(100),        // INTEGER
                    typeof(10.0),       // REAL
                    typeof('100'),      // TEXT
                    typeof(x'1000'),    // BLOB
                    typeof(NULL);       // NULL
        
        - Supporting multiple data types in the same column:
            - Insert data into a database's table:

                    INSERT INTO test_datatypes (val)
                    VALUES
                        (1),
                        (2),
                        (10.1),
                        (20.5),
                        ('A'),
                        ('B'),
                        (NULL),
                        (x'0010'),
                        (x'0011');
                
            - Now get the type of each:

                    SELECT
                        id,
                        val,
                        typeof(val)
                    FROM
                        test_datatypes;

                    // RESULT:
                    <val>       <typeof(val)>
                    (1),        // INTEGER
                    (2),        // INTEGER
                    (10.1),     // REAL
                    (20.5),     // REAL
                    ('A'),      // TEXT
                    ('B'),      // TEXT
                    (NULL),     // NULL
                    (x'0010'),  // BLOB
                    (x'0011');  // BLOB
            
            - Rules for sorting various types of data (when using `ORDER BY` - first groups by type, then sorts within groups):
                - `NULL` storage class has the **lowest value**. It is lower than any other values. Between `NULL` values, there is no order.
                - The next higher storage classes are `INTEGER` and `REAL`. SQLite compares `INTEGER` and `REAL` **numerically**.
                - The next higher storage class is `TEXT`. SQLite uses the collation of `TEXT` values when it compares the `TEXT` values. (?)
                - The highest storage class is the `BLOB`. SQLite uses the `C` function `memcmp()` to compare `BLOB` values.
        
        - **Other important concepts:**
            - **Manifest typing:**
                - A `data type` is a **property of a value** stored in a column, *not the property of the column* in which the value is stored. SQLite uses manifest typing to store values of any type in a column.
            - **Type affinity:**
                - The **recommended(!)** type for data stored in a column. Note that the data type is *recommended*, not *required*, therefore, a column can store any type of data.

- **CONSTRAINTS:**
    - Constraints are the different properties a column can have (the rules enforced on the data in a column of a table)
        - These are used to limit the type of data that can go into a table
        - Ensures the accuracy and reliability of the data in the database

    - These are the available constraints in SQLite:
        - `PRIMARY KEY`: *( https://www.sqlitetutorial.net/sqlite-primary-key/ )*
            - Uniquely identifies each row/record in a database table
            - A `primary key` is a column or group of columns used to identify the uniqueness of rows in a table
            - When multiple fields are used as a `primary key`, they are called a `composite key`
            - Each table has one and only one primary key
            - How to define:

                    // If PRIMARY KEY has only one column:
                    CREATE TABLE table_name(
                        column_1 INTEGER NOT NULL PRIMARY KEY,  // PK must also be NOT NULL (SQL standard)
                        ...
                    );

                    // In case primary key consists of two or more columns
                    CREATE TABLE table_name(
                        column_1 INTEGER NOT NULL,
                        column_2 INTEGER NOT NULL,
                        ...
                        PRIMARY KEY(column_1,column_2,...)
                    );
            
            - When you create a table without specifying the `WITHOUT ROWID` option, SQLite adds an implicit column called `rowid` that stores 64-bit signed integer:
                - The `rowid` column is a key that uniquely identifies the rows in the table
                - Tables that have rowid columns are called **rowid tables**.
                - If a table has the `primary key` that consists of **one column**, and that column is defined as `INTEGER` then this **primary key column becomes an alias for the rowid column**
            
            - Example:

                    // Define the primary key that consists of one column
                    CREATE TABLE countries (
                        country_id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL
                    );

                    // For tables that the primary keys consist of more than one column
                    CREATE TABLE country_languages (
                        country_id INTEGER NOT NULL,
                        language_id INTEGER NOT NULL,
                        PRIMARY KEY (country_id, language_id),
                        FOREIGN KEY (country_id) REFERENCES countries (country_id) 
                            ON DELETE CASCADE ON UPDATE NO ACTION,
                        FOREIGN KEY (language_id) REFERENCES languages (language_id) 
                            ON DELETE CASCADE ON UPDATE NO ACTION
                    );

        - `UNIQUE`
            - Ensures that all values in a column are different
        - `NOT NULL`
            - Ensures that a column cannot have NULL value
        - `CHECK`
            - Ensures that all values in a column satisfies certain conditions:

                    CREATE TABLE COMPANY1(
                        ID INT PRIMARY KEY     NOT NULL,
                        NAME           TEXT    NOT NULL,
                        AGE            INT     NOT NULL,
                        ADDRESS        CHAR(50),
                        SALARY         REAL    CHECK(SALARY > 0)
                    );

        - `DEFAULT`
            - Provides a default value for a column when none is specified:

                    CREATE TABLE COMPANY2(
                        ID INT PRIMARY KEY     NOT NULL,
                        NAME           TEXT    NOT NULL,
                        AGE            INT     NOT NULL,
                        ADDRESS        CHAR(50),
                        SALARY         REAL    DEFAULT 50000.00
                    );

- **SQLITE STATEMENTS:**
    - **Create Table:** *( https://www.sqlitetutorial.net/sqlite-create-table/ )*
        - Used to create a new table in a database
        - This is the main scheme:
                
                // SCHEME:
                CREATE TABLE [IF NOT EXISTS] [schema_name].table_name (
                    column_1 data_type PRIMARY KEY,         // Each column has a name, data type, and the column constraint
                    column_2 data_type NOT NULL,
                    column_3 data_type DEFAULT 0,
                    table_constraints
                ) [WITHOUT ROWID];

                // [] are optional
                // [IF NOT EXISTS]: create a new table if it does not exist
                // [schema_name]: specify the schema_name to which the new table belongs
                // Constraints can be: PRIMARY KEY, UNIQUE, NOT NULL, and CHECK
                // [WITHOUT ROWID]: if you don't want a row Id to be created

        - Example:
            
                CREATE TABLE contacts (
                    contact_id INTEGER PRIMARY KEY,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    phone TEXT NOT NULL UNIQUE
                );

    - **Insert:** *( https://www.sqlitetutorial.net/sqlite-insert/ )*
        - Used to insert new rows into a table
        - Insert a single row into a table:

                INSERT INTO table (column1,column2 ,..)
                VALUES( value1,	value2 ,...);

                // The length of the lists must be the same
        
        - Insert multiple rows into a table:

                INSERT INTO table1 (column1,column2 ,..)
                VALUES 
                    (value1,value2 ,...),       // Each list is a row that will be inserted into the table
                    (value1,value2 ,...),
                        ...
                    (value1,value2 ,...);
        
        - Insert default values or `Null` if there's no default:

                INSERT INTO artists DEFAULT VALUES;
        
        - Copying/creating a backup (insert values after a Select query):

                // Create new table for the backup:
                CREATE TABLE artists_backup(
                    ArtistId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Name NVARCHAR
                );

                // Insert the queried data:
                INSERT INTO artists_backup 
                SELECT ArtistId, Name
                FROM artists;

    - **Select:** *( https://www.sqlitetutorial.net/sqlite-select/ )*
        - query data from a single table
        - similar structure to general SQL:

                SELECT DISTINCT column_list
                FROM table_list
                    JOIN table ON join_condition
                WHERE row_filter
                ORDER BY column
                LIMIT count OFFSET offset
                GROUP BY column
                HAVING group_filter;
        
        - The basic syntax:

                SELECT column_list  // specify the columns you want to retrieve (or * for all columns)
                FROM table;         // specify the table where you want to get data from

                // For example:
                SELECT
                    trackid,
                    name,
                    composer,
                    unitprice
                FROM
                    tracks;

    - **Limit:** *( https://www.sqlitetutorial.net/sqlite-limit/ )*
        - Used to constrain the number of rows returned by a query
        - It's an optional part of the `SELECT` query:

                SELECT
                    trackId,
                    name
                FROM
                    tracks
                LIMIT 10;
        
        - We can also `OFFSET` the results (similar to a website's pages):

                SELECT
                    trackId,
                    name
                FROM
                    tracks
                LIMIT 10 OFFSET 10;
        
        - Always use it with `ORDER BY`:

                // Select the top 10 biggest tracks by size
                SELECT
                    trackid,
                    name,
                    bytes
                FROM
                    tracks
                ORDER BY
                    bytes DESC
                LIMIT 10;           

                // Last line can be changed to this if you want the nth biggest/smallest:
                LIMIT 1 OFFSET n

    - **Inner Join:** *( https://www.sqlitetutorial.net/sqlite-inner-join/ )*
        - Used to query data from multiple tables:
            - A table is associated with another table using `foreign keys`:
                - A `foreign key` is what the table checks for to combine data (so if the value of it is the same in Table A & B, it will be added the **JOINED TABLE**)
            - The `INNER JOIN` clause combines columns from correlated tables, so we can query from the temporary combined table
        - **Tracks and albums** example:
            - They are 2 separate tables, but both have `AlbumId` column (in tracks it is a `foreign key`, but in albums it's the `primary key`)
            - To query data from both tables:

                    SELECT
                        trackid,
                        name,
                        title
                    FROM
                        tracks
                    INNER JOIN albums ON albums.albumid = tracks.albumid;

                    // we can add a line to filter results:
                    WHERE
                        artists.artistid = 10;

    - **Altering a table:**
        - In SQLite, `ALTER TABLE` is only partially supported:
            - **Allowed:** 
                - rename a table 
                - add a new column to an existing table
            - **Not allowed:**
                - rename a column
                - remove a column
                - add or remove constraints from a table

## GENERAL DATABASE SETUP GUIDE USING 'DB BROWSER FOR SQLITE':
0. Nuget - install Microsoft.Data.Sqlite
1. Create a DB in the build folder: `\bin\Debug\net6.0` // maybe add a DB folder also
    - copy to project folder too:
        - RClick - "Content" type, "Copy if newer" // newer so the older versions also get updated!
2. Create a Repository using the **Repository Pattern** (create an interface as well!)
    - add path line to class:

            private readonly string _dbFilePath;
    
    - create constructor with this as a dependency:

            public ExplorationRepository(string dbFilePath)
            {
                _dbFilePath = dbFilePath;
            }

    - add connection methods
    - implement interface methods

3. Create an instance of the repository class, and call the methods from it to make it work

## CREATING AN AUTHENTICATOR: (2 ways):
### GUIDE TO CREATE A BASIC AUTHENTICATOR: (CONNECTION STRING METHOD)
1. **Set Up the SQLite Database:**
    - Name it eg. `authenticator.db`
    - Create a `Users` table in it with the following parameters:

            CREATE TABLE Users (
                UserID INTEGER PRIMARY KEY,
                Username TEXT NOT NULL,
                PasswordHash TEXT NOT NULL,
                Email TEXT,
                CreationDate DATE
            );

2. Set up project:
    - Install NuGet packages:
        - `Microsoft.Data.Sqlite`
    - Establish data connection in `Program` class `Main` function: (this is also in step 4, where it's summarized!)

            string workDir = AppDomain.CurrentDomain.BaseDirectory;         // There was also a step here, where we had to add this file to the build (?)
            var dbFile = $"{workDir}Resources\\authenticator.db";

            IUserRepository userRepository = new UserRepository(dbFile);    // Initialize with `dbFile` if the connection is created within for each query


3. Create `UserRepository` class and add basic user operations:
    - This class will handle database operations related to users, such as creating new users, validating existing users, etc:
    - Start with the interface:

            using Codecool.BruteForce.Users.Model;

            namespace Codecool.BruteForce.Users.Repository;

            public interface IUserRepository
            {
                void Add(string userName, string password);
                void DeleteAll();
                void CreateTable(string tableName);

                User Get(int id);
                IEnumerable<User> GetAll();
            }

    - Then with the implementation:

            public class UserRepository : IUserRepository
            {
                // CONSTRUCTOR AND BASIC PROPERTIES

                private readonly string _dbFilePath;        

                public UserRepository(string dbFilePath)    
                {
                    _dbFilePath = dbFilePath;               
                }

                // ESTABLISH CONNECTION:

                private SqliteConnection GetPhysicalDbConnection()      
                {
                    var dbConnection = new SqliteConnection($"Data Source ={_dbFilePath};Mode=ReadWrite");
                    dbConnection.Open();        
                    return dbConnection;
                }

                private static SqliteCommand GetCommand(string query, SqliteConnection connection)
                {
                    return new SqliteCommand
                    {
                        CommandText = query,
                        Connection = connection,
                    };
                }

                private void ExecuteNonQuery(string query)
                {
                    using var connection = GetPhysicalDbConnection();       // We make use of IDisposable (auto-integrated in SqliteConnection) using the keyword "using"
                    using var command = GetCommand(query, connection);      // We make use of IDisposable (auto-integrated in SqliteCommand) using the keyword "using"
                    command.ExecuteNonQuery();
                }

                // MAIN FUNCTIONALITY

                public void CreateTable(string tableName)
                {
                    // tableName should be first made valid (remove any invalid characters)
                    var safeTableName = new Regex(@"\W").Replace(tableName, "");

                    var query = $@"
                        CREATE TABLE IF NOT EXISTS {safeTableName} (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            Column1 TEXT NOT NULL,
                            Column2 INTEGER NOT NULL
                        );
                    ";

                    ExecuteNonQuery(query);
                }

                public void Add(string userName, string passwordHash)       
                {
                    var query = $"INSERT INTO Users (Username, PasswordHash) VALUES ('{userName}', '{passwordHash}')";      // Passwords should be hashed before adding them to the database!
                    ExecuteNonQuery(query);
                }

                public void DeleteAll()
                {
                    var query = "DELETE FROM Users";
                    ExecuteNonQuery(query);
                }

                public bool ValidateUser(string username, string passwordHash)          // In the original task this was a separate class called `AuthenticateUser` with an `Authenticate` method
                {
                    var command = _connection.CreateCommand();
                    command.CommandText =
                    @"
                        SELECT COUNT(*)
                        FROM Users
                        WHERE Username = $username AND PasswordHash = $passwordHash;
                    ";

                    command.Parameters.AddWithValue("$username", username);
                    command.Parameters.AddWithValue("$passwordHash", passwordHash);

                    var result = Convert.ToInt32(command.ExecuteScalar());
                    return result > 0;
                }

                // PRIVATE METHODS

                public User Get(int id)
                {
                    var query = @$"SELECT * FROM users WHERE id = {id}";
                    using var connection = GetPhysicalDbConnection();
                    using var command = GetCommand(query, connection);

                    using var reader = command.ExecuteReader();
                    return new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                }

                public IEnumerable<User> GetAll()
                {
                    var users = new List<User>();
                    var query = "SELECT * FROM users";
                    using var connection = GetPhysicalDbConnection();
                    using var command = GetCommand(query, connection);

                    using var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                    }

                    return users;
                }
            }

4. Add logic to `Main` method to only enter after the user was successfully logged in:

        // ALREADY CREATED IN STEP 2:
        string workDir = AppDomain.CurrentDomain.BaseDirectory;         // There was also a step here, where we had to add this file to the build (?)
        var dbFile = $"{workDir}Resources\\authenticator.db";

        IUserRepository userRepository = new UserRepository(dbFile);    // Initialize with `dbFile` if the connection is created within for each query

        // LOGIC ADDED FROM HERE:
        while (true)
        {
            Console.WriteLine("Please enter your username:");
            string username = Console.ReadLine();

            Console.WriteLine("Please enter your password:");
            string password = Console.ReadLine();

            // In a real application, you should hash the password before validation    (?)
            string passwordHash = HashPassword(password); // Assume HashPassword is a method that hashes the password

            if (userRepository.ValidateUser(username, passwordHash))
            {
                Console.WriteLine("Authentication successful!");
                break; // Exit the loop if the user is authenticated
            }
            else
            {
                Console.WriteLine("Invalid username or password. Please try again.");
            }
        }

        // Continue with the rest of your application logic
        Console.WriteLine("Welcome to the application!");

### GUIDE TO CREATE A BASIC AUTHENTICATOR: (USING SQLITECONNECTION)
1. **Set Up the SQLite Database:**
    - Name it eg. `authenticator.db`
    - Create a `Users` table in it with the following parameters:

            CREATE TABLE Users (
                UserID INTEGER PRIMARY KEY,
                Username TEXT NOT NULL,
                PasswordHash TEXT NOT NULL,
                Email TEXT,
                CreationDate DATE
            );

2. Set up project:
    - Install NuGet packages:
        - `Microsoft.Data.Sqlite`
    - Establish data connection in `Program` class `Main` function:

            // USE SQLITECONNECTION TYPE TO ESTABLISH CONNECTION: (This is also in step 4, showing the complete code)

            var connectionString = "Data Source=C:\\path\\to\\your\\folder\\authenticator.db";      // A better way is to store the information as an environment variable, and the call it from there (more advanced topic!)
            using var connection = new SqliteConnection(connectionString);
            connection.Open();                                              

            IUserRepository userRepository = new UserRepository(connection); // proper connection

3. Create `UserRepository` class and add basic user operations:
    - This class will handle database operations related to users, such as creating new users, validating existing users, etc:
    - Start with the interface:

            using Codecool.BruteForce.Users.Model;

            namespace Codecool.BruteForce.Users.Repository;

            public interface IUserRepository
            {
                void Add(string userName, string password);
                void DeleteAll();
                void CreateTable(string tableName);

                User Get(int id);
                IEnumerable<User> GetAll();
            }

    - Then with the implementation:

            public class UserRepository : IUserRepository
            {
                // CONSTRUCTOR AND BASIC PROPERTIES (make sure you use either a connection string or a SqliteConnection type, but don't mix them!)

                private SqliteConnection _connection;

                public UserRepository(SqliteConnection connection)
                {
                    _connection = connection;
                }

                // ESTABLISH CONNECTION:

                // The connection is established in Main method (outside!)
                
                // MAIN FUNCTIONALITY

                public void CreateTable(string tableName)
                {
                    // tableName should be first made valid (remove any invalid characters)
                    var safeTableName = new Regex(@"\W").Replace(tableName, "");

                    var query = $@"
                        CREATE TABLE IF NOT EXISTS {safeTableName} (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            Column1 TEXT NOT NULL,
                            Column2 INTEGER NOT NULL
                        );
                    ";

                    ExecuteNonQuery(query);
                }

                public void Add(string username, string passwordHash)
                {
                    var command = _connection.CreateCommand();
                    command.CommandText =
                    @"
                        INSERT INTO Users (Username, PasswordHash)
                        VALUES ($username, $passwordHash);
                    ";

                    command.Parameters.AddWithValue("$username", username);
                    command.Parameters.AddWithValue("$passwordHash", passwordHash);
                    
                    command.ExecuteNonQuery();
                }

                public void DeleteAll()
                {
                    var query = "DELETE FROM Users";
                    ExecuteNonQuery(query);
                }

                public bool ValidateUser(string username, string passwordHash)          // In the original task this was a separate class called `AuthenticateUser` with an `Authenticate` method. The class had 
                {
                    var command = _connection.CreateCommand();
                    command.CommandText =
                    @"
                        SELECT COUNT(*)
                        FROM Users
                        WHERE Username = $username AND PasswordHash = $passwordHash;
                    ";

                    command.Parameters.AddWithValue("$username", username);
                    command.Parameters.AddWithValue("$passwordHash", passwordHash);

                    var result = Convert.ToInt32(command.ExecuteScalar());
                    return result > 0;
                }

                // PRIVATE METHODS

                public User Get(int id)
                {
                    var query = @$"SELECT * FROM users WHERE id = {id}";
                    using var connection = GetPhysicalDbConnection();
                    using var command = GetCommand(query, connection);

                    using var reader = command.ExecuteReader();
                    return new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                }

                public IEnumerable<User> GetAll()
                {
                    var users = new List<User>();
                    var query = "SELECT * FROM users";
                    using var connection = GetPhysicalDbConnection();
                    using var command = GetCommand(query, connection);

                    using var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                    }

                    return users;
                }
            }

4. Add logic to `Main` method to only enter after the user was successfully logged in:

        // THIS WAS ADDED IN STEP 2 ALREADY!

        var connectionString = "Data Source=C:\\path\\to\\your\\folder\\authenticator.db";
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        IUserRepository userRepository = new UserRepository(connection);

        while (true)
        {
            Console.WriteLine("Please enter your username:");
            string username = Console.ReadLine();

            Console.WriteLine("Please enter your password:");
            string password = Console.ReadLine();

            // In a real application, you should hash the password before validation
            string passwordHash = HashPassword(password); // Assume HashPassword is a method that hashes the password

            if (userRepository.ValidateUser(username, passwordHash))
            {
                Console.WriteLine("Authentication successful!");
                break; // Exit the loop if the user is authenticated
            }
            else
            {
                Console.WriteLine("Invalid username or password. Please try again.");
            }
        }

        // Continue with the rest of your application logic
        Console.WriteLine("Welcome to the application!");

## GUIDE TO WORKING WITH TABLES (A MORE COMPLEX WAY OF THE REPOSITORY PATTERN):
- When creating a `DatabaseManager` class, we can use an `abstract base class` called `SqliteConnetor` to handle simple base logic (Inside Service/Persistence folder):

        public abstract class SqLiteConnector
        {
            private readonly string _dbFile;
            protected readonly ILogger Logger;

            // Constructor:
            protected SqLiteConnector(string dbFile, ILogger logger)
            {
                _dbFile = dbFile;
                Logger = logger;
            }

            // Setting up the connection:
            protected SqliteConnection GetPhysicalDbConnection()
            {
                var dbConnection = new SqliteConnection($"Data Source ={_dbFile};Mode=ReadWrite");
                dbConnection.Open();
                return dbConnection;
            }

            protected static SqliteCommand GetCommand(string query, SqliteConnection connection)
            {
                return new SqliteCommand
                {
                    CommandText = query,
                    Connection = connection,
                };
            }

            // Executing methods for single an multi-queries:
            protected bool ExecuteNonQuery(string query)
            {
                try
                {
                    using var connection = GetPhysicalDbConnection();
                    using var command = GetCommand(query, connection);
                    Logger.LogInfo($"{GetType().Name} executing query: {query}");
                    command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    Logger.LogError(e.Message);
                    return false;
                }

                return true;
            }

            protected bool ExecuteNonQuery(IEnumerable<string> queries)
            {
                using var connection = GetPhysicalDbConnection();
                using var transaction = connection.BeginTransaction();  // This is used with multi-queries
                
                try
                {
                    foreach (var query in queries)
                    {
                        using var command = GetCommand(query, connection);
                        command.Transaction = transaction;
                        Logger.LogInfo($"{GetType().Name} executing query: {query}");
                        command.ExecuteNonQuery();
                    }
                    
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    Logger.LogError(e.Message);
                    return false;
                }
                return true;
            }
        }
- Now create the actual class from it called `DataBaseManager`:
    - First the interface `IDataBaseManager`:

            public interface IDatabaseManager
            {
                bool CreateTables();
            }

    - Then the class itself, implementing both `IDataBaseManager` interface and `SqliteConnector` base abstract class:

            public class DatabaseManager : SqLiteConnector, IDatabaseManager
            {
                public const string ProductsTableName = "products";
                public const string UsersTableName = "users";
                public const string TransactionsTableName = "transactions";

                private const string ProductsTableStatement = 
                    @$"CREATE TABLE IF NOT EXISTS {ProductsTableName} (
                                product_id INTEGER PRIMARY KEY,
                                name TEXT NOT NULL,
                                color TEXT NOT NULL,
                                season TEXT NOT NULL,
                                price REAL NOT NULL,
                                sold INTEGER NOT NULL CHECK(sold IN (0, 1))
                    )";

                private const string UsersTableStatement = 
                    @$"CREATE TABLE IF NOT EXISTS {UsersTableName} (
                                user_id INTEGER PRIMARY KEY,
                                username TEXT NOT NULL UNIQUE,
                                password TEXT NOT NULL
                    )";

                private const string TransactionsTableStatement =
                    @$"CREATE TABLE IF NOT EXISTS {TransactionsTableName} (
                                id INTEGER PRIMARY KEY,
                                date TEXT NOT NULL,
                                user_id INTEGER NOT NULL,
                                product_id INTEGER NOT NULL,
                                price_paid REAL NOT NULL,
                                FOREIGN KEY (user_id) REFERENCES {UsersTableName}(user_id),
                                FOREIGN KEY (product_id) REFERENCES {ProductsTableName}(product_id)
                    )";

                private readonly string[] _tableStatements;

                // Constructor:
                public DatabaseManager(string dbFile, ILogger logger) : base(dbFile, logger)
                {
                    _tableStatements = new[]
                    {
                        ProductsTableStatement,
                        UsersTableStatement,
                        TransactionsTableStatement,
                    };
                }

                // The public method from the interface:
                public bool CreateTables()
                {
                    return ExecuteNonQuery(_tableStatements);
                }
            }

    - Now we can start creating the repositories that will be used to fill up our tables:
        - eg. `ProductRepository`:

                // Interface:
                public interface IProductRepository
                {
                    IEnumerable<Product> AvailableProducts { get; }
                    bool Add(IEnumerable<Product> products);
                    bool SetProductAsSold(Product product);
                }

                // Sample implementation:
                public class ProductRepository : SqLiteConnector, IProductRepository
                {
                    private readonly string _tableName;

                    public IEnumerable<Product> AvailableProducts => GetAvailableProducts();

                    public ProductRepository(string dbFile, ILogger logger) : base(dbFile, logger)
                    {
                        _tableName = DatabaseManager.ProductsTableName;
                    }

                    private IEnumerable<Product> GetAvailableProducts()
                    {
                        var query =
                            @$"SELECT * FROM {_tableName}
                            WHERE sold = 0;";
                        
                        var ret = new List<Product>();

                        try
                        {
                            using var connection = GetPhysicalDbConnection();
                            using var command = GetCommand(query, connection);
                            using var reader = command.ExecuteReader();
                            Logger.LogInfo($"{GetType().Name} executing query: {query}");

                            while (reader.Read())
                            {
                                var id = TypeConverters.ToInt(reader["product_id"]);
                                var name = TypeConverters.ToString(reader["name"]);
                                var color = TypeConverters.GetColorEnum(TypeConverters.ToString(reader["color"]));
                                var season = TypeConverters.GetSeasonEnum(TypeConverters.ToString(reader["season"]));
                                var price = TypeConverters.ToDouble(reader["price"]);
                                var sold = TypeConverters.ToInt(reader["sold"]) == 1;

                                var product = new Product((uint)id, name, color, season, price, sold);
                                ret.Add(product);
                            }
                        }
                        catch (Exception e)
                        {
                            Logger.LogError(e.Message);
                            throw;
                        }

                        return ret;
                    }

                    public bool Add(IEnumerable<Product> products)
                    {
                        var query = $"INSERT INTO {_tableName} (product_id, name, color, season, price, sold) VALUES (@ProductId, @Name, @Color, @Season, @Price, @Sold)";      // Parameterized queries are used, to avoid SQL injection issue, which means causing an error if accidentally one of the values is an SQL command, and would modify the code. That's why we use this method instead

                        try
                        {
                            using var connection = GetPhysicalDbConnection();
                            using var command = GetCommand(query, connection);

                            foreach (var product in products)
                            {
                                command.Parameters.Clear();
                                command.Parameters.AddWithValue("@ProductId", product.Id);
                                command.Parameters.AddWithValue("@Name", product.Name);
                                command.Parameters.AddWithValue("@Color", product.Color.ToString());
                                command.Parameters.AddWithValue("@Season", product.Season.ToString());
                                command.Parameters.AddWithValue("@Price", product.Price);
                                command.Parameters.AddWithValue("@Sold", product.Sold ? 1 : 0);
                                command.ExecuteNonQuery();
                            }

                            return true;
                        }
                        catch (Exception e)
                        {
                            Logger.LogError($"Error adding products: {e.Message}");
                            return false;
                        }
                    }


                    public bool SetProductAsSold(Product product)
                    {
                        var query = $"UPDATE {_tableName} SET sold = 1 WHERE product_id = {product.Id};";
                        try
                        {
                            return ExecuteNonQuery(query);
                        }
                        catch (Exception e)
                        {
                            Logger.LogError($"Error setting product as sold: {e.Message}");
                            return false;
                        }
                    }
                }

                // Here is the typeConverter class we used to convert data (stored in the Utilities folder!):
                public static class TypeConverters
                {
                    public static Color GetColorEnum(string s) => Enum.Parse<Color>(s);
                    public static Season GetSeasonEnum(string s) => Enum.Parse<Season>(s);

                    public static int ToInt(object obj) => Convert.ToInt32(obj);
                    public static double ToDouble(object obj) => Convert.ToDouble(obj);
                    public static string ToString(object obj) => obj.ToString() ?? "";
                    public static DateTime ToDateTime(string s) => DateTime.Parse(s);
                }

## Notes from workshop: 

- working on `northwind traders` -> PA excercise (Denes used HeidiDQL)
- SQL: structured query language; the language of relational database operations
- relational databases:
    - relational: there is a relationship between the data
        - relationship types:
            - 1-1 (marriage: 1 husband - 1 wife)
            - 1-many ()
            - many-many
        - retionship description:
            - primary key: the unique identifier of a record in the table
            - foreign key: value that refers to the primary key of another table (we can use these to describe connections)

    - rows = records
    - columns = fields

- CRUD operations:
    - Create: `CREATE/INSERT`
    - Read: `SELECT`
    - Update: `ALTER/UPDATE`    (don't forget to use WHERE! Otherwise everything gets deleted)
    - Delete: `DROP/DELETE`     (don't forget to use WHERE! Otherwise everything gets deleted)

- Operations:

        SELECT * FROM order_details;                                                // Get all properties (*) of all records from order_details
        SELECT * FROM order_details WHERE quantity >= 10;                           // Apply `WHERE` to filter results (`WHERE` filters for the data in the table)
        SELECT * FROM order_details WHERE quantity >= 10 ORDER BY quantity DESC;    // Add an ordering methodology (ASC or DESC)

        // Formatting:
        SELECT * FROM order_details
        WHERE quantity >= 10
        ORDER BY quantity DESC;

        // Add more complex filtering:
        SELECT 
            category_id,                            // only get this property
            COUNT(*) AS product_count               // it only counts after GROUP BY category
        FROM
            products
        WHERE
            discontinued = 0
            AND quantity_per_unit LIKE '%ml%'       // Include if q_p_u contains the "ml" string
        GROUP BY
            category id                             // Only show how many of each category exist in the table
            // this is the point, where the "COUNT" starts counting 
        HAVING      // A filter that is based on calculated data (COUNT -> this doesn't exist in the Table)
            product_count > 1       // This doesn't work yet, it runs before "SELECT"
            COUNT(*) > 1            // We need to write COUNT again, in order to make it work
        ORDER BY
            product_count DESC      // Here we can refer to it as "product_count", because here it already exists (because of order of execution)
        LIMIT 1;

- Aggreagate functions (many inputs - one output, eg `COUNT`)

- How to create a new table:
        
        conn;
        var adapter = new NpgsqlDataAdapter("SQL command", conn);
        
        adapter.Fill()
        adapter.ExecuteNonQuery()

        // OR

        ORM
        Object Relational Mapping
        EntityFramework

## PSQL-PGADMIN PROCESS:
1. **SQL Shell (psql):**
- Hit [Enter] to go through all initial queries, until you reach password. There type in the password `postgres` // This should initialize a connection, so now we can use **PgAdmin**

2. **PgAdmin:**
- Create new DBL `RClick` on Databases -> `Create` -> enter name
- Now `RClick` on the database -> `Query tool` -> Write a query and execute it (no need to save if it was successfully executed!)
    - Create a TABLE:

            CREATE TABLE dinos (
                name TEXT PRIMARY KEY,
                height INTEGER,
                weight INTEGER
            );

    - Insert DATA to the TABLE:

            INSERT INTO dinos (name, height, length)
            VALUES
                ('Allosaurus', 5, 12),
                ('Velociraptor', 1, 2);

3. **SQL Shell (psql):**
- Now we can check the status from `psql`:               
    - Type `\c dbname` to connect now to the database (change db name to yours!)
        - This also refreshes the connection
        - type `\conninfo` for information on the connection if needed

- Now we can check:
    - If the Table was created: `\d tablename;`     // If you don't add the semincolon, you need to close the statement in the next line! (or full refresh with `\c dbname`)
    - If the Records were added: `SELECT * FROM tablename;`

4. **PgAdmin:**
- It's easier to just write the queries in PgAdmin directly, by `RClick`-ing on the DB and selecting the `Query tool`