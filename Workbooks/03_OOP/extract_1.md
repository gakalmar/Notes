# OOP Basics with C# questions

## .NET Framework

1. What is .NET?
    - It's a framework developed by Microsoft
    - It consists of a set of libraries, compilers and a CLR (common lanuguage runtime)
    - The main strength is that the lanuage and the framework are both by Microsoft

2. Can you describe the difference between .NET Framework and .NET Core?
    - .NET Framwork was developed first for Windows, but now it's in maintenance mode only.
    - .NET (Core) is now the primary framework, which is multi-platform
    - It's other advantages:
        - it's also open-source
        - optimized for performance and scalability
        - supports side-by-side versioning (different versions can be run on the same machine on different apps)

3. What project types do you know in Visual Studio/Rider?
    - Both have these types:
        - Console application
        - Unit Test Project
        - ASP.NET Web application
        - Class Library
        - Desktop App
    - Visual Studio
        - Support the same project types
        - It's more for Windows-specific apps, while Rider supports multi-platform environment

4. What is a solution?
    - a container used to organize one or more related projects in a single unit
    - it is represented with an .sln file that holds all the information about the projects in it (dependencies, configurations for the build, etc.)
    - we can build and deploy all projects together (all dependencies will stay resolved between projects)
    - provides shared context for the projects inside (manage settings, dependencies and versioning easily)

5. What is an assembly?
    - It is a compiled code library used for deployment and versioning, within a secure unit 
    - Contains:
        - executable code, that serves as the building blocks for .NET applications and libraries ("dll" for libraries or "exe" files for apps)
        - an assembly manifest that contains all the data that is needed to describes itself
        - classes and all the resource files

6. What is LINQ in .NET? How does it work?
    - What is it?
        - LINQ (Language Integrated Query) is a feature in .NET, that allows us to work efficiently with large datasets (using the IEnumerable interface)
        - it is used for selecting, accessing, and transforming data in a dataset (eg. a collection or a database)
        - import it with "using System.Linq;"
        - values are stored in "var", because the type of an executed LINQ query is not always known
    - Syntax types:
        - Method syntax: resembles most other C# method calls, with a lambda expression as a parameter
        - Query syntax: resembles SQL syntax:

7. What are some commonly used LINQ methods that you know?
    - "From" operator (only used in query syntax):
    - "Where" == filter
    - "Select" == map
    - "OrderBy" & "OrderByDescending"
    - "GroupBy"
    - "Any" (1 item is at least true), "all" (if all items are true)

    - "ToList" & "ToArray" (we need this because we work with IEnumerable)
    - We can also use "List" operations like "Count()", if we store the return value of the query in a "var" for the return query

8. Which .NET class would you use if you need to generate random numbers? Explain its usage briefly.
    - "System.Random" class is in "System", so there's no need to import anything
    - First we create an instance: 
        - Random random = new Random();
        - Or with a seed to always generate the same numbers, which would be useful in tests: Random random = new Random(123);
    - Then we can generate numbers like this: int randomNumber = random.Next(minValue, maxValue);
    - Random double (between 0 and 1): random.NextDouble();

9. Which .NET classes are used to read and write files in C#?
    - We can use `System.IO.File` to write into work with files: 
        - open a file for reading or writing -> operations -> close file
    - We can also use `System.IO.StreamReader` and `System.IO.StreamWriter` to work with files, but with more control:
        - Used for larger files, because they read/write data in a buffered manner (line-by-line) - similar benefits as LINQ
        - How to use:
            - we create an instance first, with the "using" keyword (to dispose it right after), then call the methods: 

                    // Write:
                    using (StreamWriter writer = new StreamWriter("example.txt"))
                    {
                        writer.WriteLine("Hello, world!");
                    }
                    // Read:
                    using (StreamReader reader = new StreamReader("example.txt"))
                    {
                        string line = reader.ReadLine();
                        Console.WriteLine(line);
                    }

10. Which .NET type is used for working with dates? Describe some of the functions related to this type.
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
        
        - Parsing and Converting

                DateTime.Parse(string)                              // Converts a string to a DateTime
                DateTime.TryParse(string, out DateTime result)      // Tries to parse a string, returns true if successful
        
11. Which .NET class can be used for measuring time?
    - **Timespan:** Represents the duration between 2 dates
    - `System.Diagnostics.Stopwatch`: Used to measure time:
        - Process:
            1. Stopwatch stopwatch = new Stopwatch();
            2. stopwatch.Start();
            3. perform tasks
            4. stopwatch.Stop();
            5. Console.WriteLine($"Time elapsed: {stopwatch.ElapsedMilliseconds} ms.");
            6. stopwatch.Reset(); (or stopwatch.Restart(); to restart after reset immediately)

12. What is NuGet?
    - **NuGet** is a package manager for .NET (similar to npm in VSCode), that lets you manage packages through a user interface or a command line interface
    - What it does:
        - lets you add, remove or update libraries and tools in your .NET projects (connects to an online repository of packages on nuget.org)
        - handles dependencies and their versions: when you add a package, it automatically downloads and references it in your project, along with any dependencies that the package requires
        - can restore packages automatically when you build a project (ensures that all necessary packages are downloaded, when you work on a team project)

13. What is the `IEnumerable` interface?
    - `IEnumerable` interface (within `System.Collections` namespace):
        - it unifies access to built-in collection types (it works as a parent, because all collections implpement this interface -> supports polymorphism)
        - saves memory with he way it works (reads items 1 by 1), with operations like filtering, sorting and mapping still being available
        
        - How it works (eg. when we use LINQ or a foreach loop, we implicitly use `IEnumerable` and `IEnumerator` interfaces):
            - `IEnumerable` interface -> has a single method `GetEnumerator()` -> returns an `IEnumerator` object -> uses it to iterate through the collection
            - `IEnumerator` object (instance) -> has 2 members:
                - `MoveNext()`: moves the iterator to the next item in the collection and returns a bool value indicating whether there are more items to be traversed.
                - `Current`: returns the current item in the collection
            - when saving the results of a LINQ operation, we create a `var` or an `IEnumerable` type

14. What does the term _deferred execution_ mean? How does it relate to `IEnumerable` and LINQ?
- It means that the actual execution of an operation gets delayed until it's actually needed.
- `IEnumerable` interface works like this:
    - the execution of the code happens when it's itarating, withing the foreach loop.
    - instead of loading all the items from the collection, it gets the items 1 by 1, using `IEnumerator`'s `MoveNext()` method
- Connection to LINQ:
    - most operators in LINQ also use "deferred execution", eg:
        - `Select`, `Where`, `OrderBy`
    - some others are forcing immediate execution:
        - `ToList()`, `ToArray()`, `Count()`, `Max()`

15. Describe some collection types you know.
- In general, Collections belong to the `System.Collections` or `System.Collections.Generic` namespace, and can be of different types
- There's **generic** and **non-generic** collections, meaning they specify the type they contain or not
- **Lists:** 
    - `List<T>`: A list of items of type T, with a flexible length (as opposed to arrays)
            var names = new List<string> { "Juan", "Ana", "Felipe" };       // A "List" of "<string>"s
- **Dictionaries:**
    - `Dictionary<TKey, TValue>`: A collection of key-value pairs.
- **HashSet:**
    - `HashSet<T>`: A set of unique elements. Stores items like in a list, but checks for unique hash codes
- **Queue & Stack:**
    - `Queue<T>`:
        - follows the First-In-First-Out (FIFO) principle: The **first item added** to the queue is the **first one to be removed**
        - `Dequeue()` and `Peek()` methods
    - `Stack<T>`:  
        - follows the Last-In-First-Out (LIFO) principle: The **last item added** to the stack is the **first one to be removed**
        - `Pop()` and `Peek()` methods

16. Why does the `System.String` type implement the `IEnumerable` interface? What are the advantages of this?
- It's implemented, so it can be treated as an iterable. We can:
    - use `foreach` to iterate through the `char` items in it
    - use indexing on the string 
    - **LINQ** methods/queries can be used with them 

## Language features

17. What control statements are available in C#?
- Selection statements:
    - `if-else` statenents
    - `switch` statements
- Iteration statements / loops:
    - `for` loop
    - `foreach` loop
    - `while` loop
    - `do-while` loop
- Jump statements:
    - `break` - to break out early from loops
    - `continue` - skip the rest of the code in the current loop, but continue with the iteration
    - `return` - exit from a method/function and optionally return a value
    - `throw` - used with exception handling

18. What is the difference between a `for` loop and a `foreach` loop?
- `for` loop:
    - more control over the iterable:
        - specify iteration range/step (`i = 5`; `i += 2`)
        - refer to items relative to the current item (eg `[i+1]`)
- `foreach` loop:
    - iterate through all items of an iterable (simpler, but easier to read in the code)
        
19. What is a `while` loop?
- Used to run at an unspecified number of times (while a condition is true)
- `do-while` - used to execute first, then check condition (so the code runs at least 1 time)

20. What does the `yield` keyword do?
- Used in the context of an `IEnumerable`:
    - we can use this, if we want to return values 1-by-1 from a loop, but instead of finishing the loop, collecting them into an IEnumberable to be returned

            public IEnumerable<int> GenerateEvenNumbers(int count)
            {
                int i = 0;
                while (i < count)
                {
                    yield return i * 2;     // This MUST be an IEnumerable type!
                    i++;
                }
            }

            // The equivalent without the yield:
            public IEnumerable<int> GenerateEvenNumbers(int count)
            {
                List<int> evenNumbers = new List<int>();        // Here we return in 2 steps - we add it first to a list from the loop, then return the list 
                int i = 0;
                while (i < count)
                {
                    evenNumbers.Add(i * 2);
                    i++;
                }
                return evenNumbers;         // Returns a List item!
            }

21. How do you manually break out of a loop?
- Using jump statements:
    - `break` - to break out early from loops
    - `continue` - skip the rest of the code in the current loop, but continue with the iteration
    - `return` - exit from a method/function and optionally return a value
    - `throw` - used with exception handling

22. What does the `var` keyword mean?
- Used as a container of a value without specifying its type:
    - the compiler determines and assigns the most appropriate type to the variable based on the value it is initialized with
    - it must be initialized! (to be able to determine its type)
- It's specially useful when we don't know the return type we will get (eg. from an API)

23. What is the _primary constructor syntax_?
- Refers to the method that use use to instantiate your Class:

        public class MyClass
        {
            // This is the primary constructor for MyClass
            public MyClass(Type1 parameter1, Type2 parameter2, ...)
            {
                // Constructor logic here
            }
        }

- Default constructor
    - It refers to the constructor, that constructs the instance without any parameters (you don't even need to specify it, it gets generated by the compiler)

24. What is the meaning of the `params` keyword? Where would you use it?
- Used to add an array of parameters to a method or class, with a varied length:

        public void PrintNumbers(params int[] numbers)      // The numbers array can be different each time
        {
            foreach (int number in numbers)
            {
                Console.WriteLine(number);
            }
        }

        // Call it in different ways:
        PrintNumbers(1, 2, 3);                  // Pass individual arguments as a sequence
        PrintNumbers(new int[] { 1, 2, 3 });    // Pass an array
        PrintNumbers();                         // Pass no arguments

- Key points:
    - `params` treats the passed arguments as an array
    - it must be the last argument
    - there can only be 1 `params`

25. What are _lambda expressions_? How are they used in C# development?
- **Lambda expression:** same as an anonymous function, written directly as a parameter of a method, using an `arrow operator`
- We commonly use them with higher order functions, that take a function as a parameter (eg. with LINQ operations)

        // Example:
        bool hasEvenNumbers = Array.Exists(numbers, num => num % 2 == 0 );      // since % returns a number, the type can be omitted. Also if we only have 1 argument, we can also omit ()

26. What is the difference between a jagged array and a multidimensional array?
- **Multidimensional Arrays:**
    - like a grid with rows and columns, typically represented as a matrix
        - 2 types:
            - **Rectangular arrays:** These have the same number of columns in each row. They are defined with a single set of square brackets and multiple lengths separated by commas:

                    int[,] matrix = new int[3, 4];          // 3 rows and 4 columns

            - **Multidimensional arrays:** These are extensions of rectangular arrays with more than two dimensions:

                    int[,,] threeD = new int[3, 4, 5];      // 3-Dimensional array
    - Characteristics:
        - it is a single block of memory (single entity)
        - operations are slower, because it needs to go through all indices
        - benefitial for data structures that are naturally matrixes (eg checkerboard or any kind of coordinate system)

- **Jagged Arrays:**
    - an "array of arrays" - each element is an array itself, and can be of different lengths:

            int[][] jaggedArray = new int[3][];
            jaggedArray[0] = new int[4];            // First row has 4 columns
            jaggedArray[1] = new int[5];            // Second row has 5 columns
            jaggedArray[2] = new int[3];            // Third row has 3 columns

    - Charasteristics:
        - the array itself is a block of memory and each array inside takes another block (each)
        - operations are much faster because of working wiht references
        - eg. cinemas array with each cinema having different capacity

27. What is the difference between `const` and `readonly` fields in C#?
- Both used to make fields immutable, but:
    - we can only assign a values to a const at declaration, while a readonly's value can be initialized at declaration or from a constructor (so we can add computed values, at runtime)
    - because of the above, const can only store primitive types (int, double, bool), while readonly can also hold reference types

## Type system

28. What are primitive types in C#? Give some examples.
- **Built-in types (*=primitives*):**
    - Numbers:
        - Integer types:
            - `byte` - 8-bit unsigned integer (unsigned: only positives and 0)
            - `int` - 32-bit signed number, range from -2,147,483,648 to 2,147,483,648 (because it's stored on 32bits, so 2^31-1, or 4,294,967,295)
            - `short` - a 16-bit signed number, so it's range is -32,768 to 32,767
            - `long` - a 64-bit number, so the range is -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
        - Float types:
            - `float` - A single precision floating point number (32 bit)
            - `double` - A double-precision floating point number (Double-precision is a relative term that describes the numbers of binary digits used to store the value) (64 bit)
            - `decimal` number type has a larger range as `int`, but not as big as `double`. In return, they store a lot more precision. There is also a letter `m` at the end of the number (128 bit)
    - Text:
        - `char` - 16-bit Unicode character
    - Boolean:
        - `bool`

29. What is the difference between value types and reference types?
- **REFERENCE types:**
    - These **don't hold data directly**, but hold a *reference* or *pointer* to a **memory location** on the **heap**, where the actual object is stored
    - All **class types** are reference types (`string` is also a reference type, but works differently as it's **immutable**)
    - Declaring multiple variables that point to the same object makes it possible to modify that object through multiple variables, if it's **mutable**.

            int[] numbers1 = {1,2,3};       // "Array" is a mutable reference type, so it is possible to change its elements after it's been created
            int[] numbers2 = numbers1;      // numbers1 is a variable that contains a reference to an int[] object, which is what will be copied to numbers2 as well! (so they reference the same memory location)

            numbers2[0] = 0;
            numbers1[1] = 0;

            Console.WriteLine(String.Join(",", numbers1)); //Prints 0,0,3
            Console.WriteLine(String.Join(",", numbers2)); //Prints 0,0,3

- **VALUE types:**
    - These **hold their data directly** and are **stored on the stack**
    - All built-in numeric types (`int`, `double`, `decimal`) and `bool`, `char`, `byte`, `enum` and even `DateTime` are value types.
    - To create a new `value` type, we need to use the `struct` keyword istead of `class` (the object reference will behave as a value type)
    - If you assign a value type variable to another, the value itself will be copied, and they both live on separately:

            int number1 = 0;
            int number2 = number1;          // number1's value gets copied as the value of number2, but they will live independently

            number1++;

            Console.WriteLine(number1); //Prints 1
            Console.WriteLine(number2); //Prints 0

- **Using them as method parameters:**
    - When passing parameters into methods, the default behaviour is **pass by value**:
        - For **reference types** -> the reference is passed (because the reference type's value is the reference itself) -> we can make modifications to them inside the method it will be updated outside correctly
        - For **value types** -> the actual value is passed -> we can't use it the same way. If we wanted, we could use "ref" keyword, but it's easier to just reassign the new value (hence int counter += 1; expression)

30. What is a class in C#?
- **Definition:** 
    - A class in C# is a **blueprint** from which objects/instances are created.
    - It defines a type by **encapsulating data and behavior** (members) that operate on the data.

31. What is a constructor?
- **Definition:**
    - A constructor is a special method in a class that is called when a new instance of the class (an object) is created.
    - Its primary purpose is to initialize the newly created object, typically by assigning values to its fields or performing any setup steps necessary for the object's initial state.
- **How they work:** (has the same name as the class and assigns the initial values to a new object created from it)
    - We can by default create a class without a constructor, by assigning values to it's properties later (the compiler creates the default constructor in this case)
    - Create class with constructor, that assigns its parameters when instantiated
    - Derived class constructor: If you want to create a derived class, you need to add a default constructor (a sub-class' constructor refers to it, even if it's a default constructor)

32. Is it possible to have multiple constructors in a class?
- Yes, with **constructor overloading:**
    - it means creating multiple constructors with the same name, which only differ in the numbers of parameters
    - the return type **MUST** be the same for all constructors!
    - the type and number of the argument(s) will determine which constructor/method will be invoked
    - This is beneficial, because we can create simple or more complex functions, based on the requirements (so we don't need to call the difficult one in all cases):

33. What are properties in C#?
- **Properties** (eg `Name`, `AccountNumber` or `Owner`)
    - a property is a member of an object that controls how one field may be accessed and/or modified
    - good practice to make **fields** `private` and **properties** `public` (part of the encapsulation process)
    - A property defines two methods: 
        - a `get()` method that describes how a field can be accessed
        - a `set()` method that describes how a field can be modified

35. What is the difference between an auto-property and a property with a backing field?
    - **Properties with backing fields:**
        - these are used for adding extra logic, to accept only certain values for example for that field
        - We name it the same as the `field` we want to access/set value, but with a Capital letter:
                
                public class Freshman
                {
                    private string firstName;           // note lowercase naming!

                    public string FirstName             // note Capitalized naming!
                    {
                        get { return firstName; }       // No ";" after setters/getters or method definitions!
                        set { firstName = value; }      // We can add more complex logic
                    }
                }

    - **Auto-Implemented properties:**
        - Reads and writes to a private field, like other properties, but it does not require explicit definitions for the accessor methods nor the field (the field is not evene needed, it automatically gets generated with priivate access)
        - Used with the `{ get; set; }` syntax:

                public class HotSauce
                {
                    public string Title { get; set; }       // We could even set `set` to private like this: { get; private set; }
                    public string Origin { get; set; }
                }

34. Describe the different types of properties: read-only, init-only, and computed properties.
- **Read-only:**
    - A property that can only be read, not set (except through the constructor at initialization).
    - It ensures that the property can't be modified with external code:

            public class Person
            {
                public string Name { get; }     // Notice no setter! This type of readonly is still changeable within the class, eg through a method that changes it
                OR
                public readonly string Name;

                public Person(string name)
                {
                    Name = name;                // We can assign value on instantiation
                }
            }

- **Init-only:**
    - allow properties to be settable at the time of object creation but immutable thereafter with the `init` accessor
    - more flexible way of read-only, because we can set the initial value at each object initialization, not restricting it to the use of the constructor:

            public class Person
            {
                public string Name { get; init; }
            }

            // Usage:
            var person1 = new Person { Name = "Alice" };            // We can add an initial value here, but it can't be changed later
            var person2 = new Person { Name = "Goeorge" };

            // This won't work:
            person1.Name = "Bob"; // This line would cause a compile-time error

- **Computed properties:**
    - They don't store a value directly, but a calculation, that returns a value (based on other fields' or propery values):

            public class Rectangle
            {
                public double Width { get; set; }
                public double Height { get; set; }

                // Computed property
                public double Area                      // This is a property, not a method! (it uses a setter!)
                {
                    get { return Width * Height; }      // The get method is modified to return a custom, "computed" value
                }
            }

36. What is an enum in C#?
- **Enum:**
    - "Enumeration":
        - It's a **value type** that helps you define a group of named constants (*represent a fixed set of distinct values*)
        - We use them when there is a fixed set of options we can pick from, but these are not expandable (eg. card suits, days of the week, etc.)
        - Each constant in the enum representsan integral value (eg. `int`, `byte`, `long`) -> for readability these are raplaced with descriptive names
        - By default, the underlying type of each element in the enum is `int`, and the first enumerator has the value `0`
    - Example:
            
            // Declare an enum:
            enum DayOfWeek
            {
                Sunday,     // value = 0
                Monday,     // value = 1
                Tuesday,
                Wednesday,
                Thursday,
                Friday,
                Saturday    // value = 6
            }

            // Call its values:
            DayOfWeek today = DayOfWeek.Wednesday;  // note the type here is the name of the enum!
            DayOfWeek today = (DaysOfWeek)3;        

            Console.WriteLine(today);           // Prints Wednesday
            Console.WriteLine((int)today);      // Prints 3

            // Determine length:
            int numberOfDays = Enum.GetNames(typeof(DaysOfWeek)).Lenght;

37. Explain the difference between a class and a struct.
- Structs are "light-versioned" classes that that behave like built-in types:
    - Structs are value types stored on the stack (or inline in their cintaining types), while classes are reference types stored on the heap
    - In structs the variables contain their own copy of the data, so changes in them won't affect the original (=built-in type behaviour) (except using ref or out keywords)
    - A struct cannot inherit from another struct or class, and it cannot be the base of a class. (so abstract and virtual keywords can't be used)
    - Struct cannot have a default constructor (a constructor without parameters) or a destructor. They are always initialized with parameters, but we can initialize them with or without the "new" keyword:

            public struct Coordinate
            {
                public int X;
                public int Y;
            }

            // Instantiate with `new` keyword:
            Coordinate p1 = new Coordinate(); // X and Y are initialized to 0

            // Or without:
            Coordinate p2;
            p2.X = 10;
            p2.Y = 20;      // p2 is only fully initialized at this point

38. Explain the difference between a class and a record.
- A record is just like a class, but with immutable properties:
    - It is also a reference type by default (unless using it as a modifier for a struct)
    - As opposed to classes, they use value based equality (so 2 record instances are the same if they are the same type and all their members' values are equal)
    - You can add methods, properties and other members to a records just as you would to a class. You can even add mutable properties (but that would be against the whole concept!)
    - You can also add the `record` modifier to a `class` or a `struct` (`record class` or `record struct`)
        - `record class` support inheritance (reference type) -> this is the default, when not specifying
        - `record struct` doesn't support inheritance (value type)

39. What are interfaces? Why should we use them?
- an interface is an **contract** that defines how different parts of a program (classes) communicate with each other:
    - the classes depend on abstractions (interfaces) rather than implementations (of a class) -> easier for testing
    - it defines the main public controls (methods and properties) of a class, that the implementing class MUST implement (=assign logic to them) (that's why ISP is important, to segregate interfaces based on functionlaity)
    - They don't have any constructors, as interfaces are abstract types - they cannot be instantiated (we can instantiate a class, then create a variable of the interface to store its instance)
    - a class can implement multiple interfaces, but can only have 1 base class
    
40. What is inheritance?
- It's a concept used to organize your classes and create class hierarchies:
    - We use it when we have a class with some functionality, and we need another class which is very similar but has some additional or slightly different behaviour (eg car -> electric car)
    - Classes and records can "inherit" (but not structs!)
    - When a derived class implements a base class:
        - it gets all the `public`, `protected` and `internal` members of the base class (all except `private`)
        - constructors and finalizers are not inherited (but we use them still to create a constructor in the derived class => a base class must have a default constructor)

- Special class types:    
    - Abstract class: one or more of their methods have no implementation (eg abstract method) -> the derived class MUST provide the missing implementation
    - Sealed class: A class that doesn't allow inheriting

41. Is multiple inheritance allowed in C#?
- A class can only inherit from 1 other class, but from multiple interfaces (a way to achieve polymorphism and reuse code from different sources):
- The reason why inheriting from only 1 class is allowed is the so called "diamond problem" where a class inherits from two classes that have a common base class, which could lead to conflicts in the code.
- **Multi-level inheritance** is fully supported on the other hand (baseclass -> another baseclass -> subclass, eg: `Animal` -> `Bird` -> `Duck`)

57. What is casting?
- In general:
    - Upcasting and downcasting are part of the polymorphism behaviour in OOP. 
    - **Upcasting** is straightforward and safe, allowing a derived class to be treated as its base class.
    - **Downcasting** is more risky, as it involves treating a general type as a more specific type

- **upcasting:** creating an inherited superclass/baseclass or implemented interface reference from a subclass reference (safe):

        Dog dog = new Dog();
        Animal animal = dog;            // We create "animal" from another Class's instance (a dog can be an IAnimal type, but an animal can't be a Dog type!)

- **downcasting:** creating a subclass reference from a superclass or interface reference (unsafe, as the object needs to be an instance of the base class we are casting into)
        
        Dog dog = new Dog();
        Animal animal = dog;            // we add a dog to the Animal type, so we can downcast it later
        Dog dog2 = (Dog)animal;         // Every downcast must be explicit, using the cast operator, like (TYPE)INSTANCE. This fixes the compile-time error but raises a new runtime error.

58. What is the difference between `is` and `as` operators in C#?"
- They are used for safe downcasting:
    - Using `is` operator: Checks if the object can be downcast to a specified type, by checking its underlying type:

            if (animal is Dog)
            {
                Dog dog = (Dog)animal;
                // Use dog
            }

    - Using `as` operator: Tries to downcast and returns null if the downcasting is not possible.

            Dog dog = animal as Dog;
            if (dog != null)
            {
                // Use dog
            }

42. What is a `static` class?
- A static class is a special type of class that cannot be instantiated (=you cannot create objects of a static class)
    - can't have constructors (because they can't be instantiated)
    - all its members should also be static (they belong to the class itself rather than to any specific object)
    - most commonly used as utility functions or to define extension methods for a class:
        - For example `Math` and `Console` are both static classes built-in into C#

43. What are the dangers of using static classes? How can we avoid them?
- Static classes hold **state** that is **global** and shared across the entire application (changes in one part of the application would also change other parts)
- They can cause **unit testing issues**, because they hold state during the lifetime of the app (and can't be mocked or substituted), which makes it hard to test classes that depend on them in isolation

- How to avoid these issues:
    - We should use **interfaces** and **dependency injection** for dependencies (in the constructor, as an instance)
    - We should use them as **utility classes** or classes with **extension methods** only, but not for data storage (for data storage we could use the `Singleton` pattern, that would achieve similar results)

44. What are _extension methods_?
- An **extension method** is a language feature in C#, that lets you add functionality to a class, struct, record, enum, or interface without modifying its original source code or inheriting from it.
- We use a static class for this:

        public static class DateTimeUtils                                                       // the method is added to a static class, to be available through the class globally
        {
            public static bool IsBetween(this DateTime input, DateTime start, DateTime end)     // static keyword was added to the method definition as well, and the extension is for the type of the first param ("DateTime")
            {                                                                                   // we add "this" keyword to the first parameter, so now we can call it from the inctance as well, not just the class
                return (input > start && input < end);
            }
        }
    
        // Invoke:
        var isBetween = input.IsBetween(start, end);            // We are calling it now on "input", not on "DateTimeUtils" -> the method became an extension for a "DateTime" type instance

46. What is _overloading_ in C#?
- Used with **static polymorphism**, **overloading** means creating multiple elements (methods or constructors) with the same name, which only differ in the numbers and type of parameters provided as the input
    - the return type MUST be the same for all members/methods!
    - This is beneficial, because we can create simple or more complex functions or constructors, based on the requirements

45. What does the `virtual` keyword mean in C#?
- Used with **dynamic polymorphism**, the `virtual` keyword (modifier) indicates a method in the *base class*, that the *derived class* COULD overwrite (you can only change the content, not the signature or the return type!):
- We need to use the `overwrite` keyword in the child class, to overwrite the method

55. What does the `abstract` keyword mean in C#? (see below)
56. What is an `abstract` class?	
- Used with **dynamic polymorphism** & OCP (Open-Closed principle), the `abstract` keyword (modifier) describes an incomple Class/method, that the subclass needs to complete on implementation:
    - Use the `abstract` modifier in a class declaration to indicate that *a class is intended only to be a base class* of other classes, not instantiated on its own.
    - If we add `abstract` to a method, the class also needs to become `abstract
    - We need to use the `overwrite` keyword in the child class, to overwrite the method
    
47. What are nullable value types?
- They are an extension of the basic value types that add `null` as the possible values of the item, because value types by default can't be `null` (they always have a `default` value)
- We use it by adding `?` at the end of the type: int? i = null;
- We can create conditionals by checking first if they have a value in 2 ways:
    - We can use `HasValue` method
    - Or a null-coalescing operator `??` (similar to React)

48. What is the `IDisposable` interface used for?
- The `IDisposable` interface in C# is used for implementing the `Dispose` pattern, that is used to free up used resources:
    - Objects that need explicit cleanup implement the `IDisposable` interface (eg. `SqliteConnection` -> `Dispose` method calls on `Close` method to close the connection)
    - You can put them in a `using` block or statement, and the `Dispose` method is automatically called on them when they go out of scope:

            using (var resourceHolder = new ResourceHolder())
            {
                // Use the resource
            }
            // Dispose is automatically called when exiting the using block

49. What does the `using` keyword do? When would you use it? (see below)
50. What is the difference between a using block and a using statement?
- `using` as a Directive (block):
    - used at the beginning of a C# file to import namespaces, eg.: `using System;`
    - lets you use these namespaces directly, without typing the whole "route" before calling a resource
- `using` as a Statement:
    - The `using` statement is used to **define a scope at the end of which an object will be disposed automatically**
    - a key practice in resource management and avoiding resource leaks in .NET applications (connections or streams)

            using (var streamReader = new StreamReader("file.txt"))     // StreamReader implements `IDisposable`
            {
                // Use streamReader here
            }
            // streamReader is automatically disposed here, even if an exception is thrown. (= streamReader.Dispose() method is called)

- **When to use it?**
    - Particularly useful for **managing the lifecycle** of objects that implement the `IDisposable` interface, such as **file streams**, **database connections**, etc.
    - When working with resources that need explicit cleanup (files, network connections, or database connections).
    - To ensure resources are disposed of properly, even in the case of an error or exception.

51. How is it possible to use functions as objects in C#? (see below)
52. What is a `delegate`? (see below)
53. Describe the `Func<TResult>` delegate. (see below)
54. Describe the `Action` delegate. 
- **Functions as objects:**
    - functions can be treated as objects by using `delegates`, `lambda expressions`, and the `Func<>` and `Action<>` delegate types (in support of functional programming)
        - `delegate`: 
            - a type that represents references to methods
            -  delegate instance can refer to any method that **matches its signature** (the params order, number and type):

                    public delegate void DisplayMessage(string message);        // We create a delegate

                    public class Program
                    {
                        public static void ShowMessage(string message)          // This is the method/function we will be using as an object (NOTE same signature!)
                        {
                            Console.WriteLine(message);
                        }

                        static void Main(string[] args)
                        {
                            DisplayMessage messageDelegate = ShowMessage;       // We create an instance of the delegate we defined previously by adding "ShowMessage" as its reference
                            messageDelegate("Hello, World!");                   // Calls ShowMessage
                        }
                    }
        - `Func<TResult>`:
            - a built-in generic `delgate` type, used for methods that **return a value**:

                    Func<int, int, int> add = (x, y) => x + y;      // param1 & param2 are the parameter types, the last is the return type (we are also using a lambda expression!)
                    int result = add(5, 10);
            
            - We can use it to pass functions as parameters to other functions, or to return functions from other functions:

                    // Pass Func<> as a param: (higher order functions)
                    public void ExecuteOperation(Func<int, int, int> operation, int a, int b)
                    {
                        var result = operation(a, b);
                        Console.WriteLine(result);
                    }

                    ExecuteOperation((x, y) => x + y, 5, 10); // Passes a lambda function

                    // Return a Func<>:
                    public Func<int, int> GetMultiplier(int factor)
                    {
                        return x => x * factor;
                    }

                    var multiplier = GetMultiplier(5);      // multiplier becomes Func<int, int> multiplier = x => x * 5;
                    Console.WriteLine(multiplier(3));       // then we call multiplier by adding "()", and 1 parameter (from <int, int>) => Outputs 15

        - `Action`:
            - a built-in generic `delgate` type, used for methods that **return void**

                    Action<string> greet = name => Console.WriteLine("Hello, " + name);     // Here we only use 1 param for the input, because there is no return type
                    greet("Alice");

## Architecture

59. Explain the Single Responsibility Principle.
- **The Single Responsibility Principle (SRP)**
    - **Definition:**
        - A class or method should have only one job or responsibility.
    - **In action:**  
        - Create classes and methods that are only responsible for 1 thing
        - Organize your code by functionality (Model, Service, UI, Utils)
        - *Inheritance* vs. *Composition* principles ("is a" vs "has a" - or "it can")
    - **Example:** 
        - A `User` class handles user `properties` (so just stores the base data), but delegates logging user `activities` to a separate `UserActivityLogger` class.

60. Explain the Interface Segregation Principle.
- **The Interface Segregation Principle (ISP):**
    - **Definition:** 
        - A class shouldn't be forced to implement methods they don't use
    - **In action:**
        - use interfaces for classes whenever possible and makes sense
        - subdivide interfaces by functionality if you implement them into multiple different classes (to avoid forcing a class to implement methods it doesn't use)
    - **Example:** 
        - Instead of one large `IWorker` interface with methods like `Work`, `Eat`, and `Rest`, have separate interfaces like `IWork`, `IEat`, and `IRest`, and implement them as needed in *different worker classes*.

64. Explain the Open/Closed principle.
- **The Open/Closed Principle (OCP)**
    - **Definition:** 
        - Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
    - **In action:**
        - We create `base-classes` for the classes we would need to update later, so instead of modifying a class, we leave the `base-class` untouched and we only create a new `sub-class` that uses it
    - **Example:** 
        - We have a class, that can calculate the area of a rectangle. If we later introduce other shapes as well, the `AreaCalculator` should still be able to work (so we create a `Shape` base `abstract`(!) class with `abstract` Calculation method, and each shape will have their own sub-class, with the Calculation method being `overwritten` for each shape)

65. Explain the Liskov Substitution Principle.
- **The Liskov Substitution Principle (LSP)**
    - **Definition:** 
        - objects of a superclass/baseclass should be replaceable with objects of its subclasses without affecting the flow of the program (eg. when we make a `List<IAnimal>`, we should be able to add any class that was based upon this (eg. `ICow`, `IDog`, `ICat`))
        - You learn how to drive a `Car`, not how to drive a `Ford`. This is the principle's main purpose
    - **In action:**
        - Whenever we create a model of something, we should see what else will we groping it with and create a baseclass for it first (eg. `Shape` -> `Circle`, `Rectangle`; `Animal` -> `Cow`, `Dog`, `Cat`) 
    - **Example:**  
        - If `Bird` is a base class and `Duck` is a subclass, then you should be able to replace `Bird` with `Duck` without altering the program's behavior (upcasting), assuming they share behaviors like `fly()`.
    
66. Explain the Dependency Inversion Principle.
- **The Dependency Inversion Principle (DIP)**
    - **Definition:**
        - the code's elements (modules) should depend on abstractions rather than concrete implementations (through the use of interfaces)
        - Consists of 2 sub elements:
            - **Inversion of Control (IOC)**: transfering the control of an object/instance to the program/container (all dependency instances should be instantiated in the Program class, and should be interface types)
            - **Dependency Injection (DI)**: a technique that helps to achieve IoC, by adding dependencies to a class's constuctor
    - **In action::**
        - Dependencies of a class should be instances of interfaces, and should be created in the Program class. (this means passing the control to the Program class or later an external IoC container or framework)
        - The dependencies should be added to their constuctors (constructor injection)        
    - **Example:** 
        - A `PaymentProcessor` class depends on an `IPaymentGateway` interface rather than a concrete `CreditCardPaymentGateway` class, allowing for different payment methods to be introduced without changing the `PaymentProcessor`'s code.
        - A `NotificationManager` class depends on an `INotificationService` interface rather than a concrete `EmailNotificationService` class, allowing for different message types to be introduced without changing the `NotificationManager`'s code. (see example in details)
        - `Car` class and `VehicleService` class both depend on `IVehicle` interface
        - If we have an `IVehicle` interface, we can use it to create multiple vehicles from it (eg `Car`, `Truck`). Then we can also create a `VehicleService` class, that also implements `IVehicle`, so it can be used with both `Car` and `Truck`. Also, we can expand this list by creating new vehicle classes, without modifying anything. 

61. What is _composition over inheritance_?
- **Composition vs Inheritance:**
    - When deciding between **composition** and **inheritance**, you can use the following paradigm:
        - If the relationship between the classes/objects can be described with the term **'is a(n)'**, it's probably an **inheritance**. 
            - Eg. a car **is a** vehicle: **Base class** is `Car` and **Sub-class** is `ElectricCar`
        - If the relationship between the classes/objects can be described with the term **'has a(n)'**, it's a **composition**.
            - Eg. a car **has an** engine: `Car` class will have a **Property** called `Engine`
            - Or a car **can** speed up -> implements a `SpeedUp` method (which can of course be from the base class, if it's shared)

62. What is a model class? (see below)
63. What is a service class?
- **Organize data in a layered Architecture as part of the SRP**
    - **Model/Data Layer:** 
        - Includes classes that represent **data** (like `Product`, `Order`) and **data access logic** (like `ProductRepository`).
    - **Service/Business Layer:**
        - Includes classes that process data, perform calculations, and create rules for the application's functionality (like `OrderService`).
    - **Presentation/UI Layer:**
        - Includes classes that handle **user interaction** and **display data**. It could be a web UI, desktop application, or even a console application in C#.

67. What do we mean by the Gang of Four (GoF) Design Patterns? Can you name some of these patterns?
- **The Gang of Four:**
    - refers to the four **authors** of the influential book *"Design Patterns: Elements of Reusable Object-Oriented Software"*, published in 1994
- The book collects and organizes design patterns into sub-categories:
    - **Cretional Patterns:**
        - Deal with object creation mechanisms, by controlling object creation
        - Examples:
            - **The Singleton**
            - **The Factory** and **Abstract Factory**
    - **Structural Patterns:**
        - These patterns are about class and object composition, by using interfaces and focusing on composiong objects to form larger structures
        - Examples:
            - **The Adapter**
    - **Behavioural Patterns:**
        - These patterns focus on how objects interact and communicate with each other
        - Examples:
            - **The Observer**
    - +1 learned: **The Repository Pattern** - used for establishing a connection to a database

68. What are the risks associated with using the GoF design patterns?
- **Risks:**
    - The risk is about the **misuse or overuse** of the patterns, as they are designed to be used in very specific conditions
    - The developer needs to **balance** between **simplicity/readibility** with the **use of these patterns** (using the patterns makes it more complex and difficult to read)
    - The use of these patterns makes the code more complex, reducing performance
    - Scalability issues can happen with patterns that are very strict on the structure of the code and what components they use
    - In some instances, we have to decide between the use SRP or using a Pattern (eg. Adapter -> 2 responsibilities (use const. inj. instead when possible)) 

69. What do we mean by YAGNI?
- It's a guideline that stands for "You aren't going to need it!"
- Advices against adding functionality until it's really needed
    
70. What do we mean by SLAP?
- It's a guideline that stands for "Single Level of Abstraction Principle"
- It means, that each piece of code (eg functinos) should operate a "single level of abstraction"
- Example: If there is a complex public method, each step should be a private method, that does 1 thing. Then the high level method just calls each function, as if it was a list of actions to be executed

71. What do we mean by KISS?
- It's a guideline that stands for "Keep It Simple, Stupid!"
- Emphasizes the importance of simplicity in design and implementation (avoid unnecessary complexity in software development)

72. What is the Repository Pattern?
- It's used to simulate a repository, that we can use to perform our database operations (eg. SQL queries)
- The primary goal is to create an abstraction layer between the **data layer** and the **business logic layer** of an application
- the **business logic layer** doesn't need to know whether the data is coming from a database, a web service, or another source
- Helps layered architecture and SRP, by separating this functionality into a separate class, that is responsible for the connection to the data layer
- Constists of methods to perform CRUD operations (we usually start with an interface)

73. What is a CRUD interface?
- CRUD stands for **Create**, **Read**, **Update**, and **Delete**
- A CRUD `interface` is an interface that lets user perform these operations
    - **Create:** (eg. `INSERT` in SQL languages used with `POST` HTTP method)
    - **Read:** (eg. `SELECT` in SQL languages used with `GET` HTTP method)
    - **Update:** (eg. `UPDATE` in SQL languages used with `PUT` or `PATCH` HTTP methods)
    - **Delete:** (eg. `DELETE` in SQL languages used with `DELETE` HTTP method)

## Unit testing
74. Why is unit testing a good practice?
- Importance of unit testing:
    - we can catch errors early in the development process, when they are cheaper and easier to fix
    - Ensures a software functions correctly and performs efficiently (CMM standards (levels 1-5))
    - Easier to refactor, by seeing if the code still performs as it's supposed to while refactoring
- Unit testing in general:
    - We create test for the smallest testable parts of an application (a **unit** is usually a method inside a class)
    - It needs to happen in isolation, so we can test each unit individually
- **FIRST guidelines:**
    - **F: Fast** - Tests should run quickly
    - **I: Isolated** - Each class should be testable independently, using techniqyes like mocking
    - **R: Repeatable & Stable:** - Tests must consistently yield the same results under the same conditions
    - **S: Self-checking** - Test should automatically detect whether the pass or fail
    - **T: Thorough** - Cover all edge cases, including a variety of input types like positive numbers, zero and negative numbers
        
75. What is NUnit?
- It's a **unit testing framework** for the .NET ecosystem
- How it works:
    - you write tests (arrange, act, assert), that make calls to the original source code's public methods and asserts that the result is what you expect (pass or fail)
    - `[Test]` attribute tells the framework, that the method is a unit test method, that needs to be executed by the `NUnit Test Runner`
    - A good unit test only has one assertion and only tests a single state of change!

76. What is a parameterized test? (see below)
77. What options do you have in NUnit to create parameterized tests?
- It's a test, where we can pre-define input parameters, so the test can run with different inputs. We use [TestFixture] before the class declaration to be tested
- In `NUnit` we have `TestCase` and `TestCaseSource` attributes for this:
    - Using `TestCase`:
        - We create the inputs with `[Testcase( params )]`, inline, also adding the `ExpectedResult` (outside the test methods):

                [TestCase(0, 50)]
                [TestCase(20, 21)]
                public void FunctionTest(int par1, int par2){...TEST};      // We return a void here, and assert within the test function!

                [TestCase(new[] { items1 }, new[] { items2 }, ExpectedResult = 12)]
                [TestCase(new[] { items3 }, new[] { items4 }, ExpectedResult = 82)]
                public int GenerateCardsReturnsExpectedNumberOfCards(int[] numbersA, int[] numbersB) {...TEST};     // If we use ExpectedResult, it checks the return value of that method for assertion (so it returns an int!)

    - Using `TestCaseSource`:
        - we use this to create an object with test cases, so we don't have to write each [TestCase()] line:

                private static readonly object[] TestCases =
                {
                    new object[] { new[] { items1 }, new[] { items2 }, 12 },        // We can't use ExpectedResult in this case, but still can add it as a parameter to be asserted
                    new object[] { new[] { items3 }, new[] { items4 }, 82 }
                };

                [TestCaseSource(nameof(TestCases))]
                public void GenerateCardsReturnsExpectedNumberOfCards(int[] numbers, string[] symbols, string[] suits, int expectedCardCount)       // we added the expected result as a param, the return also changed to void from int

78. What is _mocking_?
- A mock is a simulated object, that is used to replace a dependency of a class to test in isolation (without using the real dependecy of a method)
- Its behaviour can be controlled and can be programmed with expectations (eg. return a specific value when called with certain parameters)
- It's typically used to verify that certain methods or the dependencies have been called correctly

79. What is the difference between _mocking_, _stubbing_ and _faking_?
- **Test Doubles: Mocking vs Stubbing vs Faking:**
    - Test Doubles in general:   
        - They are all used to simulate the behaviour of real objects/systems in the application
        - The **purpose** of them is to be able to **test in isolation**
        - They differ mainly in their purpose and the level of functionality they provide
    
    - **Fakes / faking:**   (most complex)
        - `Fakes` are generally used to improve performance by avoiding external calls. 
        - objects that have working implementations (they implement the same interface as a real object but with shortcuts to improve performance)
        - used to test something that depends on an external service or API, and we don’t want to make actual calls to that service (e.g. by using an in-memory database)

    - **Mocks / mocking:**
        - `Mocks` are used to verify the behavior of our code. 
        - objects with predefined behaviour (we can call them, and define what they should return based on the parameters)
        - They don’t have working implementations, but they have pre-programmed expectations about how they will be used in the code.
        - used to test the interactions between a class and its dependencies, so it focuses on the behaviour

    - **Stubbs / stubbing:**    (least complex)
        - `Stubs` are used to provide data that our code needs to run.
        - objects that return predefined values
        - They don’t have working implementations and they are not programmed to expect specific calls either (simply return a value)
        - used to provide data that our code needs to run. This data can be hard-coded or generated dynamically.

## Databases

80. What are relational databases? What are their advantages and disadvantages?
- represents a **collection of related orthogonal tables**, that is similar to an Excel table (fixed number of named **columns/attributes** and **rows/records**)
- a collection is like a `class` in C#, and each row represents an `object/instance`, and the columns are the common attributes

- **Advantages:**
    - They use SQL language, which is widely used (complex queries can be written)
    - They use `primary` and `foreign keys` to manage data accross multiple tables consistently (database normalization):
        - minimize duplicate data
        - allow for data growth independently of each other
- **Disadvantages:**
    - Complex design process (multi-table design, definition of relationships)
    - Performance is slower, specially for very high volumes (multi-talbe storage, complex queries)
    - Rigid schema (eg adding a new column would require recreating the whole database)

81. How do you associate entities to each other in a relational database model?
- We use `primary` and `foreign keys` to reference items in differenct tables to each other
- **Relationship types:**
    - **1-to-1**
        - when a single record in one table is related to only one record in another table (marriage example)
        - One ->  `primary key`, One -> `unique foreign key`
    - **1-to-Many:**
        - a record in one table can relate to multiple records in another table (customer and their orders example)
        - One ->  `primary key`, Many -> `foreign key`
    - **Many-to-Many:**
        - multiple records in one table can relate to multiple records in another table (students-courses example)
        - It is implemented using a `junction table` (using `JOIN` command, a `foreign key` in one table that represents the `primary key` in the other).

82. What are tables in a relational database?
- A `Database` is a collection of **related Tables**:
    - A `Table` is a collection of **data**:
        - Data is represented in a 2D array, based on the table's schema (definition of the table, that the records must follow):
            - **Column (also called attribute):**
                - has a specific **data type**, such as `integer`, `decimal`, `date`, or `text`, which defines the nature of the data that can be stored in that column
            - **Row (also called a record):**
                - represents a single instance of the entity (for example in the customers table a row is the data of 1 specific customer)
                - each row in a table is unique, typically enforced by a primary key

83. What is a _primary key_?
- An attribute, that uniquely identifies each row/record in a database table
- When multiple fields are used as a `primary key`, they are called a `composite key`
- Each table has one and only one primary key
- How to define:

        // If PRIMARY KEY has only one column:
        CREATE TABLE table_name(
            column_1 INTEGER NOT NULL PRIMARY KEY,  // PK must also be NOT NULL (SQL standard)
            name TEXT NOT NULL
            ...
        );

84. What is a _foreign key_?
- A table is associated with another table using `foreign keys`:
    - A `foreign key` is a column (or set of columns) in one table that references the `primary key` of another table.
    - It is what the table checks for to combine data (so if the value of it is the same in Table A & B, it will be added the **JOINED TABLE**)

85. What does the SQL abbreviation stand for? (see below)
- **Structured Language Query** is a language that is used to work with **relational databases**
86. What are some of the SQL database providers that you’ve heard of?
- Supported by many databases (SQLite, MySQL, Postgres, Microsoft SQL Server)

87. What are SQL data types? Are there any differences in data types between different SQL databases?
- Data types refer to the data that can be stored in an SQL column:
    - SQL databases use **static typing** in general (the data MUST be of that type)
    - SQLite we use **dynamic typing** (recommended, but it's more flexible -> the data determines the column's type based on syntax - eg quotes mean text)
- Storage classes:
    - A collection of related types (eg. INTEGER consists of 6 different types in SQLite)
- The 5 storage classes in SQLite:
    - `NULL`: NULL values mean **missing information** or **unknown**.
    - `INTEGER`: Integer values are **whole numbers** (either positive or negative). An integer can have variable sizes such as 1, 2, 3, 4, or 8 bytes.
    - `REAL`: Real values are real **numbers with decimal values** that use 8-byte floats.
    - `TEXT`: TEXT is used to store **character data**. The maximum length of TEXT is unlimited. SQLite supports various character encodings.
    - `BLOB`: BLOB stands for a **binary large object** that can **store any kind of data**. The maximum size of BLOB is, theoretically, unlimited.
    
- Differences:
    - In **PostgreSQL** there are many more:
        - `BOOLEAN` - boolean type (`Bool` values are stored in SQLite as 0 or 1 numbers)
        - `VARCHAR` - variable length character sets
        - **Time & Date:** `DATE`, `TIME`, `TIMESTAMP`, `INTERVAL`

88. What are _constraints_ in SQL?
- We use them to define the properties of a table's columns (the rules enforced on the data)
    - These are used to limit the type of data that can go into a table
    - Ensures the accuracy and reliability of the data in the database

- These are the common constraints available:
    - `PRIMARY KEY`: unique identifier (+`FOREIGN KEY`) (Add `SERIAL PRIMARY KEY` if you want to auto-increment in postgres)
    - `UNIQUE`: Ensures that all values in a column are different
    - `NOT NULL`: Ensures that a column cannot have NULL value
    - `CHECK`: Ensures that all values in a column satisfies certain conditions: (eg. `column1 | REAL | CHECK(SALARY > 0)` )
    - `DEFAULT`: Provides a default value for a column when none is specified (eg. `column2 | REAL | DEFAULT 5000`)

89. How can we program different SQL databases in C#?
- We can use the `ADO.NET` specification (a set of libraries, that unifies access to relational databases)
    - We add eg `SQLite` NuGet package or `Npgsql` for PostgreSQL
- We can use the `Repository pattern` to make an abstract layer of the data, which will be responsible for:
    - reference the necessary databases
    - establish a connection
    - execute SQL commands
    - write parameterized queries
    - handle results
    - exception handling
    - dispose of resources

90. Which SQL statement is used to create tables? Describe the syntax briefly.
        
        CREATE TABLE contacts (
            contact_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE
        );

91. Which SQL statement can be used to insert values? Describe the syntax briefly.

        INSERT INTO tableName (column1,column2 ,..)
        VALUES( :value1, :value2 ,...);

92. Which SQL statement can be used to update values? Describe the syntax briefly.
        
        UPDATE tableName SET sold = true WHERE product_id = :productId;
            
93. Which SQL statement can be used to delete rows?. Describe the syntax briefly.
        
        DELETE FROM tableName;      // Deletes all data from table
        
        DELETE FROM tableName WHERE user_id = :id;     // Delete by condition

94. Which SQL statement can be used to create queries?. Describe the syntax briefly.
        
        SELECT [DISTINCT] * // OR // column, another_column        // Add AS if you also want to rename the column's name
        FROM mytable;

95. How can you join tables together in SQL? When should you do it?
- We should use it, if we would like to combine data from different tables

        SELECT table1.column1, table2.columnX
        FROM mytable
        INNER JOIN another_table 
            ON table1.column1 = table2.columnX

- **Join types:**
    - `(INNER) JOIN`: Returns records that have matching values in both tables
    - `LEFT JOIN`: Returns all records from the left table, and the matched records from the right table
    - `RIGHT JOIN`: Returns all records from the right table, and the matched records from the left table
    - `FULL JOIN`: Returns all records when there is a match in either left or right table



