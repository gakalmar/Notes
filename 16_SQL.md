# SQL

## Requirements:
- install DB Browser for DQLite: https://sqlitebrowser.org/dl/
- NuGet package required: Microsoft.Data.Sqlite
- SQLite documentation: https://www.sqlite.org/docs.html
- Create `UserRepository` class with **Repository pattern** (example in `Codecool.Bruteforce` task; "repository" and "repository pattern" explained in introduction)

## Introduction & Definitions: *(SQLBolt: https://sqlbolt.com/lesson/introduction )*
- **SQL:**
    - *Structured Language Query* is a language that is used to work with **relational databases**
    - Supported by many databases (SQLite, MySQL, Postgres, Oracle, Microsoft SQL Server)
- **Relational database:**
    - represents a **collection**(!) of related tables (2D), that is similar to an Excel table (fixed number of named **columns/attributes** and **rows/data**)
    - a collection is like a `type` in C#, and each row represents an `object/instance`, and the columns are the common properties

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

                        col_name = "abc"
                
                - `!=` or `<>` case sensitive inequality comparison:

                        col_name != "abcd"
                
                - `LIKE` case insensitive exact string comparison:

                        col_name LIKE "ABC"         // "abc" will also be included
                
                - `NOT LIKE` case insensitive exact sting inequality comparison:

                        col_name NOT LIKE "ABCD"    // "abcd" will not be included either

                - `%` Used anywhere in a string to match a sequence of zero or more characters (only with `LIKE` or `NOT LIKE`):

                        col_name LIKE "%AT%"        // matches "AT", "ATTIC", "CAT" or even "BATS"
                
                - `_` Used anywhere in a string to match a single character (only with `LIKE` or `NOT LIKE`):

                        col_name LIKE "AN_"         // matches "AND", but not "AN"
            
            - `@` is a simplified `$`, because it's still a Verbatim string, but without parameter
    
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

                SELECT CustomerId, COUNT(OrderId) AS NumberOfOrders
                FROM Orders
                GROUP BY CustomerId;

                // Discards duplicate `CustomerId` entries and gives you the count of orders for each unique customer
    
    - `ORDER BY`:
        - Most data in relational databases is added in no particular order, so we need a way to be able to sort it by something:

                SELECT column, another_column, …
                FROM mytable
                WHERE condition(s)
                ORDER BY column ASC/DESC;       // Sorting happens alpha-numerically, based on the column's value

                // Collation: better sort data with international text

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
            
## MULTI-TABLE QUERIES: https://sqlbolt.com/lesson/select_queries_with_joins

## GUIDE TO CREATE A BASIC AUTHENTICATOR: (CONNECTION STRING METHOD)
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

## GUIDE TO CREATE A BASIC AUTHENTICATOR: (USING SQLITECONNECTION)
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




## Notes from workshop: (HeidiDQL)

- working on `northwind traders` -> PA excercise
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