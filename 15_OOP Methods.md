# SPECIFIC METHODS USED IN OOP:

### **Console methods:**
- Display information:
        Console.WriteLine();                        // Write something and jump to next line
        Console.WriteLine();                        // Write something and stay in the line

        Console.ReadLine();                         // Wait for input followed by the ENTER key (It stores values as strings! Conversion is needed for numbers)
        Console.ReadKey();                          // Wait for 1 key to be pressed

        Console.Clear()                             // Clears the console screen
        Console.Title                               // Sets the title of the console window

- Get information (eg user input):

        Console.Write("Enter your name: ");
        string name = Console.ReadLine();
        Console.WriteLine($"Hello {name}!");

- Appearance:

        Console.ForegroundColor = ConsoleColor.Green;       // Changes the text to green
        Console.BackgroundColor = ConsoleColor.White;       // Changes the background to white
        Console.ResetColor();                               // Reset to default colors

### **String formatting:**
- Specific characters in strings:  

        \t      // to add a tab
        \n      // to add a new line

- Create a table:

        Console.WriteLine("{0,-10} {1,-5} {2,-10}", "Name", "Age", "City");         // 2nd par represents min width (eg -10 or -5), negative value shows LEFT alignment
        Console.WriteLine("{0,-10} {1,-5} {2,-10}", "Alice", "23", "New York");
        Console.WriteLine("{0,-10} {1,-5} {2,-10}", "Bob", "30", "Los Angeles");

- Padding:

        string name = "Alice";
        Console.WriteLine(name.PadRight(10) + "23".PadRight(5) + "New York".PadRight(10));

- Formatting numbers:

        Console.WriteLine("{0:C2}", 123.456); // Currency format with 2 decimal places
        Console.WriteLine("{0:N0}", 1234567); // Number with thousands separator and no decimals

### **String methods:** *(link to string methods: https://learn.microsoft.com/en-us/dotnet/api/system.string.clone?view=net-8.0)*
- Trim:
        greeting.Trim();
        greeting.TrimStart();
        greeting.TrimEnd();

        // Add special characters:
        string.Trim(new char[] { ' ', '?' })        // Add as many as needed

- Substring():
        string name = "Codecademy"; 
        int start = 2;
        int length = 6;
        string substringName = name.Substring(start, length); // returns 'decade'

- Replace:
        string sayhello = "Hello World!"
        sayHello.Replace("Hello", "Greetings")      // "Hello World!" -> "Greetings World!" 
        sayHello.ToUpper()                          // "Hello World!" -> "HELLO WORLD!" 
        sayHello.ToLower()                          // "Hello World!" -> "hello world!"

- Search:
        string songLyrics = "You say goodbye, and I say hello";
        songLyrics.Contains("goodbye")              // True
        songLyrics.Contains("greetings")            // False

        songLyrics.StarsWith("You")                 // True
        songLyrics.EndsWith("Me")                   // False

        string plantName = "Cactaceae, Cactus"; 
        int charPosition = plantName.IndexOf("Cactus");                     // returns 11

- ToUpper(), ToLower():
        string shouting = "I'm not shouting, you're shouting".ToUpper();    // returns "I'M NOT SHOUTING, YOU'RE SHOUTING!"
        string whispering = "I'M WHISPERING NOW".ToLower();                 // returns "i'm whispering now"

- Convert:
        int num = Convert.ToInt32("45");            // Convert an stinrg into an integer

- `Split()`:
    - slightly different from JS:

            var words = text.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

### **Numbers methods:**
- Basic Math operations: + - / * %
- Math class methods:
        Math.PI
        int.MaxValue;
        int.MinValue;

### **Array-List-Collection methods:**  *(link to methods: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.add?view=net-8.0)*
- Indexing:
        names[0] -> refers to the first element
        names[names.Count - 1] -> refers to the last element
- Add/remove elements:
        names.Add("Bill");
        names.Remove("Ana");
- Length of a list:
        names.Count
- Searching:
        var index = names.IndexOf("Felipe");        // Returns -1 if it doesn't find something

        // So it's a good practice to add an if statement, to do the action only if the item is found:
        if (index != -1)
        {
            Console.WriteLine($"The name {names[index]} is at index {index}");
        }
- Sort (modifies items in place, so modifies the original list):
        names.Sort();                               // Recognizes the data type, and uses Quicksort/Introsort to sort data (so numbers in an ascending order, strings alphabetically)
        foreach (var name in names)                 // This will go through the already sorted list
        {
            Console.WriteLine($"Hello {name.ToUpper()}!");
        }
- Find
        int[] plantHeights = { 3, 6, 4, 1, 6, 8 };
        int firstHeight = Array.Find(ArrayToSearch, bool Method());         // the first arg should be the array we are searching, then we add a function that should return a bool value
        int firstHeight = Array.Find(plantHeights, height => height > 5);   // Finds the first occurence of a plant height that is greater than 5 inches

### **DateTime struct:**
- `System.DateTime` in .NET
- Creating instances:

        DateTime now = DateTime.Now;                                            // Current date and time
        DateTime today = DateTime.Today;                                        // Current date with time set to midnight
        DateTime specificDate = new DateTime(2024, 1, 18);                      // Specific date (year, month, day)
        DateTime specificDateTime = new DateTime(2024, 1, 18, 14, 30, 0);       // Specific date and time (year, month, day, hour, minute, second)

- Properties  
    - Year, Month, Day, Hour, Minute, Second - Get individual components. (eg. today.Year -> 2024)
    - DayOfWeek - Day of the week (e.g., DayOfWeek.Monday).
    - DayOfYear - Day of the year (1-366).

- Methods:
    - Adding/Subtracting Time:
        - `AddDays`, `AddMonths`, `AddYears`, `AddHours`, `AddMinutes`, `AddSeconds` - Add time to a DateTime instance:

                date.AddDays(5);        // Adds 5 days

        - Subtracting is done by adding a negative amount:
                
                date.AddDays(-5)        // Subtracts 5 days
    
    - Comparison:
        - Compare two DateTime objects using `DateTime.Compare()`:
                    
                DateTime date1 = new DateTime(2024, 1, 18);
                DateTime date2 = new DateTime(2024, 1, 20);

                int result = DateTime.Compare(date1, date2);    // Returns an integer(-1, 0, 1), so we can determine if it's the same/earlier/after

                if (result < 0)
                    Console.WriteLine("date1 is earlier than date2");
                else if (result == 0)
                    Console.WriteLine("date1 is the same as date2");
                else
                    Console.WriteLine("date1 is later than date2");


        - `Equals` & `CompareTo`                                // Instance methods for comparison

                // Equals:
                date1.Equals(date2)                             // Returns bool value
                
                // CompareTo (same as Compare, but diff. syntax)
                date1.CompareTo(date2)                          // Returns an integer(-1, 0, 1)
    
    - Formatting:

            date.ToString()                                     // Convert to a string with default format
            date.ToString("yyyy-MM-dd")                         // Custom format (e.g., "2024-01-18")
    
    - Parsing and Converting

            DateTime.Parse(string)                              // Converts a string to a DateTime
            DateTime.TryParse(string, out DateTime result)      // Tries to parse a string, returns true if successful
    
    - Using `Timespan`:
        - Represents the duration between 2 dates:

                TimeSpan duration = endDate - startDate;
        
        - Properties/Components of TimeSpan:
            - `Days`, `Hours`, `Minutes`, `Seconds`:

                    DateTime start = new DateTime(2024, 1, 1);
                    DateTime end = new DateTime(2024, 1, 18);
                    TimeSpan duration = end - start;

                    Console.WriteLine($"Duration is {duration.Days} days");     // use properties to specify the time unit
        
        - Create a TimeSpan:
                
                new TimeSpan(1, 0, 0)       // it represents 1 hour (2nd par is min, 3rd is sec)
                TimeSpan.FromDays(1)        // represents 1 day
                TimeSpan.FromSeconds(30)    // represents 30 seconds

                interval.TotalHours         // gives you the TOTAL number of hours represented by the TimeSpan (eg. 1.5 h)
                interval.Hours              // gives you the WHOLE number of hours represented by the TimeSpan (eg. 1 h)

        - Example:

                DateTime now = DateTime.Now;
                DateTime inOneWeek = now.AddDays(7);
                DateTime startOfMonth = new DateTime(now.Year, now.Month, 1);
                TimeSpan duration = inOneWeek - startOfMonth;

### **Stopwatch**:
- `System.Diagnostics.Stopwatch`: Used to measure time:
    - Process:
        1. Create an instance:
        
                Stopwatch stopwatch = new Stopwatch();
        
        2. Start/Stop the stopwatch:

                stopwatch.Start();
                stopwatch.Stop();

                // Then you can continue measuring, if you start again:
                stopwatch.Start();

        3. Get elapsed time:
            - `Elapsed` returns a `TimeSpan` object:
                - `ElapsedMilliseconds`: returns milliseconds as `long`
                - `ElapsedTicks`: returns the total number of ticks (1 tick = 100 nanoseconds = )
                - Example:

                        Console.WriteLine($"Time elapsed: {stopwatch.ElapsedMilliseconds} ms.");
                        
        4. Reset stopwatch:

                // Reset to 0:
                stopwatch.Reset();

                // Reset to 0 and start immediately:
                stopwatch.Restart();

### **LINQ methods(operators):** *(LINQ cheatsheet: https://www.tutorialsteacher.com/linq )*:
- **Filtering operators:**
    - `Where` operator: (=FILTER)
        - used to select certain elements from a sequence:
            - It expects an expression that evaluates to a boolean value.
            - Every element satisfying the condition will be included in the resulting query.
            - It can be used in both method syntax and query syntax.

                    List<Customer> customers = new List<Customer>
                    {
                    new Customer("Bartleby", "London"),
                    new Customer("Benjamin", "Philadelphia"),
                    new Customer("Michelle", "Busan" )
                    };

                    // Query syntax
                    var custQuery =  
                        from cust in customers  
                        where cust.City == "London"  
                        select cust;

                    // Method syntax
                    var custQuery2 = customers.Where(cust => cust.City == "London");

                    // Result: Customer("Bartleby", "London")
    
    - `OfType`:

- **Projection operators:**
    - `Select` operator: (=MAP)
        - determines what is returned for each element in the resulting query

                string[] trees = { "Elm", "Banyon", "Rubber" };

                // Query syntax
                var treeQuery =
                    from t in trees
                    select t.ToUpper();

                // Method syntax
                var treeQuery2 = names.Select(t => t.ToUpper());

                // Result: ELM, BANYON, RUBBER
        
        - Example to compare with `SelectMany` (here we only use 1 list):

                List<int> numbers = new List<int> { 1, 2, 3, 4 };
                var squaredNumbers = numbers.Select(number => number * number).ToList();            // squaredNumbers will be { 1, 4, 9, 16 }            

    - `SelectMany` operator:
        - Filter multiple collections flattens out the sequence if there are any nestings (used to flatten collections of collections):

                List<List<int>> listOfLists = new List<List<int>>
                {
                    new List<int> { 1, 2, 3 },
                    new List<int> { 4, 5, 6 },
                    new List<int> { 7, 8, 9 }
                };

                var flattenedList = listOfLists.SelectMany(innerList => innerList).ToList();        // flattenedList will be { 1, 2, 3, 4, 5, 6, 7, 8, 9 }
                var flattenedList = listOfLists.SelectMany(innerList => innerList > 5).ToList();    // flattenedList will be { 6, 7, 8, 9 }

- **Sorting operators**
    - `OrderBy` & `OrderByDescending`:
        - used to sort elements in a collection based on a specified key (ascending order by default)
        - Example (sort the list of Person objects by their names):

                // Person class (see at `GroupBy`)
                // Create a List<Person> people
                
                // Now we can use `OrderBy`:
                var sortedPeople = people.OrderBy(p => p.Name);     // sorts the people list by the Name property of each Person object
                                                                    // sortedPeople returns an IEnumerable<Person>, sorted in ascending order by name

    - `ThenBy`:
        - add more sorting parameters by simply chaining the methods:

                var sortedPeople = people
                    .OrderBy(p => p.Department)
                    .ThenBy(p => p.Name);

- **Aggregation/Statistical operators**
    - `Sum`
    - `Average`
        - Get the average value from a set of data:

                // Simple data:
                numbers.Average();                              // Should return the average of a List<int>
                _products.Average(p => p.Price);                // Get average price of products
    - `Min` & `Max`:
        - Find the smallest value in a collection: (To return the whole object, use `MinBy` & `MaxBy`)

                // Simple data:
                var minNum = products.Min();
                var minPrice = products.Min(p => p.Price);      // Returns only the price, not the whole object!
    
    - `MaxBy` & `MinBy`:
        - Get the first / last item of a sorted list, based on a specific condition:

                var cheapestItem = _products.MinBy(p => p.Price);

    - `Count`
    - `Aggregate`

- **Set operators**
    - `Distinct`
    - `Union`
    - `Intersect`
    - `Except`   

- **Quantifiers**
    - `Any`
        - Without any input parameters (predicate) - Check if the sequence is empty:

                List<int> numbers = new List<int> { 1, 2, 3 };
                bool hasAnyNumbers = numbers.Any(); // True, because the list is not empty
        
        - Checks if any of the elements satisfy the condition (returns true if at least 1 element satisfies the condition):

                bool hasEvenNumbers = numbers.Any(n => n % 2 == 0); // True, because there are even numbers in the list

    - `All`
    - `Contains`   

- **Partitioning operators**
    - `Take`
        - used to select the first N elements from a sequence:

                var numbers = new List<int> { 1, 2, 3, 4, 5 };
                var firstThree = numbers.Take(3); // Takes the first 3 elements: {1, 2, 3}

    - `Skip`
        - skips the first "n" elements of a list and returns the rest:

                var allButFirstThree = numbers.Skip(3); // Skips the first 3 elements: {4, 5}

    - `TakeWhile`
        - used to take elements from the start of a sequence, until a certain criteria is met:

                // With numbers:
                var firstUntilGreaterThanThree = numbers.TakeWhile(n => n <= 3); // {1, 2, 3}

                // With strings:
                List<string> words = new List<string> { "apple", "banana", "cherry", "date", "elderberry", "fig", "grape" };
                var wordsStartingWithAorB = words.TakeWhile(word => word.StartsWith('a') || word.StartsWith('b'));          // This will take "apple", "banana"
    
    - `SkipWhile`
        - bypaskips elements in a sequence as long as a specified condition is true and then returns the remaining elements:

                // With numbers:
                var skipUntilGreaterThanThree = numbers.SkipWhile(n => n <= 3); // {4, 5}

                // With strings:
                var longerWords = words.SkipWhile(word => word.Length < 6);     // This will skip "apple", "banana", "cherry", "date" and include "elderberry", "fig", "grape"

- **Element operators**
    - `First` / `Last`: returns the first / last element in a collection
        - Throws `InvalidOperationException` if there are no items in the collection
    
    - `FirstOrDefault` / `LastOrDefault`: returns the first / last element in a collection
        - we use it when the collection is OK to be empty
        - returns the default value of the `type`:
            - `null` for reference types
            - `0` for value types (if numbers)
            - `false` for value types (if bool)

    - `ElementAt`
    - `ElementAtOrDefault`
    - `Single`
    - `SingleOrDefault`  

- **Grouping operators**
    - `GroupBy`
        - group elements in a collection based on a specified key
        - result of the `GroupBy` operation is a collection of groups, where each group is represented by an `IGrouping<TKey, TElement>` object
        - Example (group the persons by their department):

                // Person class:
                public class Person
                {
                    public string Name { get; set; }
                    public string Department { get; set; }

                    public Person(string name, string department)
                    {
                        Name = name;
                        Department = department;
                    }
                }

                // Now we create a list of Person instnaces (objects):
                List<Person> people = new List<Person>
                {
                    new Person("Alice", "HR"),
                    new Person("Bob", "HR"),
                    new Person("Charlie", "IT"),
                    new Person("David", "IT"),
                    new Person("Eve", "Marketing")
                };

                // Now we can group them by "Department":
                var groupedByDepartment = people.GroupBy(p => p.Department);        // will be an IEnumerable<IGrouping<string, Person>>

                // Now we can iterate over each group and its items:
                foreach (var group in groupedByDepartment)
                {
                    Console.WriteLine($"Department: {group.Key}");
                    foreach (var person in group)
                    {
                        Console.WriteLine($" - {person.Name}");
                    }
                }
        
        - `GroupBy` into personalized categories:

                List<Product> products = // ... your list of products ...

                var categorizedProducts = products.GroupBy(product =>
                {
                    if (product.Price < 20) return "Cheap";
                    if (product.Price >= 20 && product.Price < 100) return "Average";
                    return "Expensive";
                });

- **Join operators**
    - `Join`
    - `GroupJoin`

- **Conversion operators**
    - `.ToList` & `.ToArray`
        - If the query returns with a bool value, but we still want to store the values in a variable, we need to use `.ToList` to be able to do this (eg with `Select` method):

                List<int> numbers = new List<int> { 1, 2, 3, 4 };
                var squaredNumbers = numbers.Select(number => number * number).ToList();            // squaredNumbers will be { 1, 4, 9, 16 }

    - `ToDictionary`:
        - convert a collection into a `Dictionary<TKey, TValue>`:
                
                // Sample collection:
                List<Person> people = new List<Person>
                {
                    new Person { Name = "Alice", Age = 30 },
                    new Person { Name = "Bob", Age = 25 },
                    new Person { Name = "Charlie", Age = 35 }
                };

                // Conversion:
                var dictionary = people.ToDictionary(
                    person => person.Name,  // The Name property is the key
                    person => person.Age    // The Age property is the value
                );

                // Result:
                {
                    ["Alice"] = 30,
                    ["Bob"] = 25,
                    ["Charlie"] = 35
                }

        - combining it with `GroupBy`:

                Dictionary<string, double> productNameAvg = products
                    .GroupBy(p => p.Name)                           // Create a collection of groups
                    .ToDictionary(
                        g => g.Key,                                 // The product's name
                        g => g.Average(p => p.Price)                // The avg price of the products with this name
                    );

    - `AsEnumerable`   
- **Concatenation operators**
    - `Concat`   
- **Generation operators**
    - `Range`
    - `Repeat`
    - `Empty` 
- **Equality operators**
    - `SequenceEqual`   
- **Exception Handling operators**
    - `Catch`
    - `Finally`   
- **Other:**
    - `From` operator (only used in query syntax to determine what the initial sequence is):
        - declares a range variable that is used to traverse the sequence

                string[] names = { "Hansel", "Gretel", "Helga", "Gus" };

                var query =
                    from n in names             // In queries we always use this to refer to our original element (here it's string[] names)
                    where n.Contains("a")
                    select n;

                // Result: Hansel, Helga

## NUnit
- Assertiong methods:
    - `Assert.That(expected, Is.EqualTo(actual));`
        - checks if the values are equal
        - Collections: checks if the elements AND the order are the same
    - `Assert.That(expected, Is.EquivalentTo(actual));`
        - Collections: checks if the elements are the same (order doesn't matter!)
    - `CollectionAssert.AreEqual(expected, actual);`
        - checks if 2 collection contain exactly the same items
    - `CollectionAssert.IsEmpty(actual); `
        - check if a collection is empty

    - `Assert.That(collection, Does.Contain(item));`
        - check if an **item** is inside a **collection**
- Annotations (eg. `[TEST]`): *(link: https://www.blazemeter.com/blog/nunit-annotations)*


