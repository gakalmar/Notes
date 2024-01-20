# C#

## Resources:
- **Theorical:**
    - ✔️ Principles of OOP: https://journey.study/v2/learn/materials/oop-principles-1q2023
    - ✔️ What is .NET? https://journey.study/v2/learn/materials/pages/tools/about-dotnet.md
    - ✔️ C# vs JS: https://www.educba.com/c-sharp-vs-js/
    - ✔️ Overview of Classes, Structs abd Records: https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/
    - ❌ Compiled vs Interpreted lanugages: https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/
    - ❌ Type system in C#: https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/
    - ❌ Full list of C# types: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types
    - ❌ Numbers:
        - Integral types: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types
        - Floating-point types: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types
    - ❌ Strings: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/
    - ❌ Arrays: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays
    - ❌ Collections: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/collections
    - ❌ Nullable references: https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references
    
    - ❌ Properties: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties
    - ❌ Constructors: https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/constructors

    - ❌ Clean Code Principles: https://journey.study/v2/learn/materials/cc-csharp-1q2023
    - ❌ Architecture checklist: https://journey.study/v2/learn/materials/arch-checklist-csharp-1q2023
- **Tutorials:**
    - ✔️ Setting up a project in Rider: https://journey.study/v2/learn/materials/pages/tools/csharp-helloworld-rider                      
    - ❌ .NET tutorials: https://dotnet.microsoft.com/en-us/learn
    - ✔️ Step-by step tutorial inside browser: https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/hello-world?tutorial-step=1
    - ✔️ Microsoft basic tutorial: https://learn.microsoft.com/en-gb/shows/csharp-101/?wt.mc_id=educationalcsharp-c9-scottha
    - ✔️ Collection of tutorials: https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/
    - ❌ Another basic C# free tutorial on codeacademy: https://www.codecademy.com/learn/learn-c-sharp
    - ✔️ Classes and Objects bank account tuts:    https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/classes
                                                https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop
- ⏳ (LINQ part still not watched!) Full Microsoft video course: https://www.youtube.com/playlist?list=PLdo4fOcmZ0oVxKLQCHpiUWun7vlJJvUiN

- **Further reads (non-mandatory):**
    - 💭 Memory management: https://endjin.com/blog/2022/07/understanding-the-stack-and-heap-in-csharp-dotnet

## FUNDAMENTALS AND BASIC CONCEPTS:
- Introduction to C#:
    - In any kind of programming, there are 2 basic elements: DATA and OPERATIONS that are performed on the data (Youtube - Videos; Facebook - User data)
    - The programmer's role:
        - have an **algorithmic mind** to be able to define the steps that lead from the initial state of raw data to the desired outcome
        - they need to be able to define the data as information:
            - **abstraction:** coming up with a way to represent some concrete or abstract idea in a way that a computer could work with it (real world "things" represented as objects with properties)

- Static vs Dynamic typing:
    - **Dynamic:** You create data and the tpye is defined later, based on it's content (Javascript, Python)
    - **Static:** You need to define the type of the data when you create it (C, C++, C#, Java)

- C# is an object-oriented programming language. The four basic principles of object-oriented programming contribute to writing more testable, flexible, and maintainable code, and they are:
    - **Abstraction**
        - Modeling the relevant attributes and interactions of entities as classes to define an abstract representation of a system. (Contract -> Concretion)
        - Representing the problem domain with a simplified model (The process of creating an `instance` is called **instantiation**.)
        - eg. creating a `Class` that represents a `car`

        - `abstract` is not the same as **Abstraction**! (see later with method Anatomy)

    - **Encapsulation**
        - The process of bundling related data and methods into a type is called encapsulation, and it makes code easier to organize and reuse. (?) ***Which definition is the correct one?***
        - eg.: Creating a `Class` with **members**, **properties** and **methods**
        
        - Hiding the internal state and functionality of an object and only allowing access through a public set of functions.
        - Allowing access to its properties through a public set of functions
        - eg.: `public` vs `private` access

    - **Inheritance**   
        - Ability to create new abstractions based on existing abstractions
        - eg.: `car` superclass is used to create `electricCar` sub-class:
            
    - **Polymorphism**  
        - Ability to implement inherited properties or methods in different ways across multiple abstractions
        - eg.: `Chef` class has a `virtual` function called `MakeSpecialDish()`, which its sub-class can `overwrite` and define a different function body for the same signature

- What is **.NET** ?
    - a framework (=a set of tools and libraries) developed & maintained by Microsoft
    - Besides the libraries that support these use cases, the platform also includes:
        - **.NET compilers (Roslyn)**
        - **Base Class Library (BCL)**
        - **Common Language Runtime (CLR)**
            - a virtual machine that handles the execution of applications
            - provides services like thread management, garbage collection, type-safety, exception handling
            - *common* refers to the support of multiple languages (C#, Visual Basic, F# -> these all run on the CLR)
                - an **IL** (Intermediate Language) is created from the code, which is a compressed format
                - Then the CLR translates it into machine code during execution, using **JIT** (Just-in-Time compilation)
    - The main **strength of .NET** versus other ecosystems comes from the fact that languages and the framework are **being developed by the same entity**
    - **.NET** vs **.NET Framework**:
        - **.NET** is multi-platform, while **.NET Framework** is the original Windows only version

- **C#** vs **JavaScript**:
    - Summary: 
        - C# is a strictly typed object-oriented programming language, and it’s used to develop console applications
        - Desktop applications and C# cannot run without the .NET framework
        - JavaScript is a client-side scripting language used primarily for making interactive effects in web applications. It can execute in any web browser.
    
    - The main **advantages of C#**:
        - Language-Integrated Query (LINQ) expressions make the strongly-typed query a first-class language construct.
        - Supports encapsulation, inheritance, and polymorphism because it’s an object-oriented language.
        - Supports inline XML documentation comments.
        - It is statically typed.
        - It has an operator and conversion overloading.
    
    - Journey article comparison:
        - JavaScript is a prototype-based language, but c# is not.
        - Javascript is a scripting language for web browsers. It also is known as New PHP, but C# doesn’t provide any feature like this.
        - JavaScript is dynamically and weakly typed, but C# is statically and strongly.
        - JavaScript’s primary programming paradigm is procedural, but C# primary programming paradigm is (class-based) object-oriented.
        - Javascript doesn’t have an Integer datatype, but C# has an integer data type. (?)
        - Javascript doesn’t have array datatype, but C# supports array data type. (?)
        - In JavaScript, we use “function [function name],” and in C#, we use “void [function name]” or other function types.
        - C# runs the .NET framework, and it is best for making Desktop Applications while Javascript runs in a browser, so for making games and quiz other applications, JavaScript is better.
        - C# is a compiled programming language. JavaScript is a scripting language. So, JavaScript can fail due to syntactic errors at runtime.
    
    ![Alt text](assets/C-vs-JavaScript-info.jpg.webp)

    - ChatGPT comparison:
        - Typing System:
            JavaScript is **dynamically** typed, meaning variable types are determined at runtime and can change.
            C# is **statically** typed, with explicit type declarations and type checking at compile time.
        - Execution Environment:
            JavaScript is **primarily used for web development, running on browsers**, but also on servers (Node.js).
            C# is a **general-purpose language mainly used in .NET framework**, often for desktop applications, server-side applications, and more recently, web development with Blazor.
        - Syntax and Language Features:
            JavaScript syntax is influenced by C, but it includes more **functional programming features**.
            C# syntax is similar to Java and C++, and it **supports both object-oriented** and increasingly more **functional programming** styles.
        - Memory Management:
            JavaScript uses **automatic memory management** (garbage collection) with limited direct control.
            C# also uses garbage collection but **offers more options for memory management** and optimization.
        - Concurrency Model:
            JavaScript **historically used a single-threaded, event-driven model**, but now supports concurrency with Web Workers and **async/await**.
            C# **supports multi-threading** and various advanced concurrency and parallelism models.
        - Community and Ecosystem:
            JavaScript has a vast **ecosystem mainly around web technologies and Node.js**.
            C# is **strongly associated with Microsoft and the .NET ecosystem**, with a focus on enterprise applications, gaming (Unity), and more recently, cross-platform development.
    
- **C# file system:**
    - NEW vs OLD template: https://learn.microsoft.com/en-gb/dotnet/core/tutorials/top-level-templates
        - New: 
            - As if we were writing everything inside the `Main` function 
            - All functions created here are local functions, so we can't add access modifiers to them(eg `private` or `public`), they will be `static` 
    - `using System;`:
        - imports System library, that we need to use the Console (same as writing System.Console.Writeline("") every time )
        - `using` is called the **Using directive**, that allows the import of **TYPES** (Classes, interfaces, structs) from a namespace
        - Whenever you want to use a class that is defined in another namespace than the current class, you need to import that namespace, or use the fully qualified name of the class.
    - `namespace ConsoleApp6` 
        - they are **collections of TYPEs**
        - groups and organizes code (in case of multiple classes, it's good to keep the ones together that belong together)
        - the default namespace of a project in Rider is the project's name (eg. "HelloWorld") and this is also the best practice
    - `class Program` 
        - classes are blueprints or schematics from which objects will be create at runtime
        - this is the class we are working in
        - class modifier (eg. `internal`) means where we can use this class. `public` would mean we can use it outside the project as well.
    - `static void Main(string[] args)` 
        - this is the method we are wokring in, the entry point of the application (void refers to the return value - void doesn't return anything)
        - The compiler looks for the method called exactly `Main` to run, so if we rename it, it won't run
        - Access modifier: `public` 
            - it's best practice to keep it `public`
            - this could also be `protected` or `private`
        - `static` (read more in **Anatomy of a method** section):
        - `void` is the return type, which means the method doesn't return anything.
        - `string[] args`:
            - an input parameter of a string array called args
            - used to pass parameters into the application from the command line

- **Build process and execution:**
    - **Build process:**
        - When clicking "Run", the **building** process is initialized:
            1.  The .NET **compiler** (called Roslyn) **performs static analysis to validate the syntax** and semantics of the code.<br>
                If any errors are found, the build process is halted.
            2.  The compiler **generates a compressed version** of the source code. The target language is called the **IL** or **CIL** (*Common Intermediate Language*).<br>
                This is a CPU- and platform-independent instruction set that can be executed in any environment that supports it.
            3.  The generated CIL code is written into `.dll` files called **assemblies**.<br>
                The generated assemblies (and any other third-party assemblies our code requires) are placed in the project's output directory, along with an executable (.exe) if our project is runnable (e.g. a console app.).<br>
                For Class Library type projects, no executables are generated.
                (Output directory path: *{SolutionName}{ProjectName}\bin\Debug\net8.0* // *HelloWorld\HelloWorld\bin\Debug\net8.0* )
    - **Program execution:**
        - If the build was successful, the app will be run
        - The execution is performed by a platform called `runtime`, which in .NET is called the **CLR** (*Common Language Runtime*)
            - "common" means it's used for all .NET languages (C#, Visual Basic, F#, Visual C++), as they all compile to the same CIL.
        - **C#** is a **managed language**, which means the memory management is done automatically by the runtime.
            - The CLR takes of the memory allocation when a new object is created
            - CLR has a component called **Garbage Collector**, that constatly looks for unused objects, that could free up space.
            - CLR also proveides services like *boundaries*, *reflection* and *type safety*
        - The CLR takes the generated CIL or IL code from the assemblies, and translates it into machine code (1s and 0s), and this code will be run in the end.

- **Memory management in C#:**
    - There are 2 types of memory in C# to store data:
        - **The stack:**
            - Its main purpose is to control the execution flow of the program by tracking the method calls
            - Local variables, specific to the executing method are also stored here.
            - These are short-lived variables that go out of scope once the method which declared them finished the execution.
            - Any `value types` by default will be allocated on the stack.
        - **The heap:**
            - Used to store data that needs to survive through the specific method calls.
            - This area of the memory is managed by the **Garbage Collector**.
            - By default, any `reference types` you create gets allocated on the heap.
    - **Equality overriding:**
        - By default, equality is checked by reference (so it checks if a variable and another variable point to the same reference in the memory), so:

                // When we create "card2", we only copy the reference:
                Card card1 = new Card("Ace", Suit.Spades);
                Card card2 = card1;

                Console.WriteLine(card1 == card2); // Prints True

                // The objects are identical, but point to a different place in the memory:
                Card card1 = new Card("Ace", Suit.Spades);
                Card card2 = new Card("Ace", Suit.Spades);

                Console.WriteLine(card1 == card2); // Prints False
        
        - If we want the equality to be *based on the attributes we define* (not on the references), we need to implement our own equality method.
            - This is a design choice that we need to think about when creating the model class:
                - Overwrite `Equals` & `GetHashCode` methods inherited from `Object` *base class* (see tutorial at the end)
                - After override, we should compare not with `==`, but with `obj1.Equals(obj2)` method

- **(Custom) TYPES - Classes, Structs and Records:**
    - the definition of a **type** is like a blueprint that specifies what the **type** can do (a **class**, **struct**, or **record**)
    - A class or struct can specify how accessible each of its members is to code outside of the class or struct:
        - Methods and variables that aren't intended to be used from outside of the class or assembly can be hidden
    - **Type MEMBERS:**
        - The members of a type include all fields, properties, methods, constructors and more
        - In C#, there are no global variables or methods as there are in some other languages:
            - Even a program's entry point, the Main method, must be declared within a class or struct
        - Members that may be declared in a class, struct, or record:
            - **Fields** (eg `public string name`)
                - a field stores a piece of data within an object (acts just like a variable)
                - can have a number of modifiers, including: `public`, `private`, `static`, and `readonly`
                - If no access modifier is provided, a field is `private` by `default`.
                - eg.: "name", "size" are typical fields

                - **Initialize** static fields either via **inline initialization** (directly where they are declared) or using a **static constructor:**
                    - **inline initialization:**
                        - `StaticValue` is a static field of `MyClass`, and it's assigned a value of `5` directly at its **declaration**
                        - The values are assigned **before** the constructor (so we could perform operations with these in the constructor?)
                                
                                public class MyClass
                                {
                                    public static int StaticValue = 5; // Inline initialization

                                    // Other members of the class...
                                }

                    - **static constructor:**
                        - A static constructor is used to initialize static fields or to perform a particular action that needs to be executed once for the type. 
                        - It's called automatically before the first instance is created or any static members are referenced.

                                public class MyClass
                                {
                                    public static int StaticValue;

                                    static MyClass() // Static constructor
                                    {
                                        StaticValue = 5;
                                    }

                                    // Other members of the class...
                                }

                    - **Combined use:**
                            
                            public class MyClass
                            {
                                // Inline initialization of static fields
                                public static int StaticValue1 = 5;
                                public static int StaticValue2 = 10;

                                // Static constructor
                                static MyClass()
                                {
                                    // You can use StaticValue1 and StaticValue2 here
                                    int sum = StaticValue1 + StaticValue2;

                                    // Perform operations
                                    Console.WriteLine($"Sum of static values: {sum}");
                                }

                                // Other members of the class...
                            }

            - **Properties** (eg `Name`, `Bank Account Number` or `Owner`)
                - a property is a member of an object that controls how one field may be accessed and/or modified
                - a way to define what values are valid and disallow those that are not
                - good practice to make **fields** `private` and **properties** `public` (part of the encapsulation process)
                - A property defines two methods: 
                    - a `get()` method that describes how a field can be accessed
                    - a `set()` method that describes how a field can be modified
                - We name it the same as the `field` we want to access/set value, but with a Capital letter:
                        
                        public class Freshman
                        {
                            private string firstName;           // note lowercase naming!

                            public string FirstName             // note Capitalized naming!
                            {
                                get { return firstName; }       // No ";" after setters/getters or method definitions!
                                set { firstName = value; }
                            }
                        }

                - Auto-Implemented property:
                    - Reads and writes to a private field, like other properties, but it does not require explicit definitions for the accessor methods nor the field
                    - Used with the `{ get; set; }` syntax:

                            public class HotSauce
                            {
                            public string Title
                            { get; set; }

                            public string Origin
                            { get; set; }
                            }
                
                - 

            - **Methods** (eg `MakeDeposit()` ):
                - They are functions attached to the object
                - Special methods: 
                    - `get;` and `set;` are methods to control access of the object's properties
                    - when we create a property and set it to `private`, we can specify a getter and a setter separately inside a property:
                            // Inside the class:
                            private int _age;

                            public int Age              // Create custom getter and setter for _age property
                            {
                                get { return _age; }    // `get` gets executed when we call the _age property
                                set { _age = value; }   // `set` gets executed when we try to assign a new value to _age
                            }

                            // or add complexity:
                                set {
                                    if (value > 0)
                                    { 
                                        _age = value;   // "value" is the placeholder for our input;
                                    }
                                    else
                                    {
                                        _age = 0;       // if the value we are trying to set is a negative number, the default will be 0
                                    }
                                }
                    - We then also have to update the initial "_age" property in the constructor to "Age", so the constructor calls the getter, and that sets the value

                            // Properties with auto-properties and mutable values:
                            public class Card {
                                public Suit Suit { get; set; }                  // use "init" instead of "set" if you want to make it immutable, or just remove "set"
                                public string Symbol { get; set; }
                            }

            - **Constructors** (has the same name as the class and assigns the initial values to a new object created from eg. the *BankAccount* type, using `new` keyword)
                - We can by default create a class without a constructor, by assigning values to it's properties later:
                        
                        // Book.cs class file:
                        class Book
                        {
                            public string title;
                            public string author;
                            public int releasDate;
                        }

                        // Program.cs file:
                        Book book1 = new Book();            // create an instance with empty parentheses
                        book1.title = "Lord of the Rings";
                        book1.author = "JRR Tolkien";
                        book1.releasDate = 1954;

                - Create book with constructor:
                        
                        // Add a method to the class with it's own name as the method's name:
                        class Book
                        {
                            public string title;
                            public string author;
                            public int releasDate;

                            public Book(string title, string author, int releaseDate)
                            {
                                this.title = title;                 // "this." can be omitted as it works without it as well
                                this.author = author;
                                this.releaseDate = releaseDate;
                            }
                        }

                - derived class constructor: If you want to create a derived class, you need to add a default constructor
                - `this`: The `this` qualifier is only required when a local variable or parameter has the same name as that field or property:
                        
                        // Inside the constructor, where name is an initial parameter:
                        this.Owner = name;
                        
                        // same as:
                        Owner = name

                        // But we can also use it to avoid duplication of code in overloading constructors:
                        public Forest(int area, string country)
                        { 
                            this.Area = area;
                            this.Country = country;
                        }

                        public Forest(int area)
                        { 
                            this.Area = area;
                            this.Country = "Unknown";
                        }

                        // Avoid writing "this.Area = area;" twice in the code:
                        public Forest(int area, string country)
                        { 
                            this.Area = area;
                            this.Country = country;
                        }

                        public Forest(int area) : this(area, "Unknown")     // using "this" we call the first constructor with name and "Unknown" arguments
                        { 
                            Console.WriteLine("Country property not specified. Value defaulted to 'Unknown'.");
                        }

                        // Or if possible, use default values instead:
                        public Forest(int area, string country = "Unknown")
                        {
                            this.Area = area;
                            this.Country = country;
                        }

            - Constants       
            - Events
            - Finalizers
            - Indexers
            - Operators
            - Nested Types
    - **Type ACCESSIBILITY:**
        - *Client code:* Meant to be accessed from outside the class or struct
        - By default, fields, properties, and methods are `private`, and classes are `public`.
        - Access modifiers:
            - public
            - protected
            - internal
            - protected internal
            - private
            - private protected
    - **Type INHERITANCE:**
        - To organize your classes and create class hierarchies:
            - We use it when we have a class with some functionality, and we need another class which is very similar but has some additional or slightly different behaviour (eg car -> electric car)
        - Classes (but not structs!) can "inherit"
        - Classes can inherit attributes (**properties**) and behaviour (**methods**) from other classes:
            - A class derived from a **Base class** will automatically get all the `public`, `protected` and `internal` members of the base class, **except its constructors and finalizers** (so `private` members are excluded!)
        - The class which inherits is called a *subclass*, *derived class*, or *child class* and the class from which we are inheriting is called the *superclass*, *base class* or *parent class* (in C# there can be only one base class!)
        - Abstract class: one or more of their methods have no implementation -> the derived class will provide the missing implementation
        - Sealed class: A class that doesn't allow inheriting
            
        - The **Object** base class:
            - It's a special built-in class located in `System` namespace
            - It's the base class of any new class created, so these 2 are equivalent:
                    
                    public class Card 
                    {
                        //...
                    }

                    public class Card : Object      // The ":" means the class in inheriting from "Object" class (but it's unnecessary, as this is the default)
                    {
                        //...
                    }
        - **Upcasting vs Downcasting:**
            - **upcasting:** creating an inherited superclass or implemented interface reference from a subclass reference:
                    
                    Laptop lap = new Laptop();
                    IPortable portable = lap;       // We create "portable" from another Class's instance

            - **downcasting:** creating a subclass reference from a superclass or interface reference
                    
                    Dog dog = new Dog();
                    Pet pet = dog;
                    Dog puppy = (Dog)pet;       // "Dog" type correctly

                    // can lead to runtime errors if the superclass cannot be cast to the specified subclass:
                    
                    // Dog inherits from Pet. An implicit downcast throws a compile-time error:
                    Pet pet = new Pet();
                    Dog dog = pet;

                    // Every downcast must be explicit, using the cast operator, like (TYPE). This fixes the compile-time error but raises a new runtime error.
                    Pet pet = new Pet();
                    Dog dog = (Pet)pet;         // "Pet" type instead of "Dog", so it won't work

    - **Type INTERFACE:**
        - An interface contains definitions for a group of related functionalities that a non-abstract class or a struct *must* implement
        - To implement from an interface means that the type implements *all the methods* defined in the interface
    - **Type CONVERSION:**
        - **implicit:** happens automatically, if there is no data loss (eg. `int` can be converted to `double`, but not the other way around)
        - **explicit:** requires operator to create transformation:

                // simple conversion:
                double myDouble = 3.2;
                int myInt = (int)myDouble;

                // using Convert class methods:
                string favNumber = Console.ReadLine();
                int favNum = Convert.ToInt32(favNumber);

    - **Generic types:** 
        - Classes, structs, and records can be defined with one or more type parameters
        - When creating an instance from the class `List<T>` by passing it a parameter: `List<string>` or `List<int>`
    - **Static types:** (ream more in **Anatomy of a method** section)
        - Classes (but not structs or records) can be declared as static
        - A static class can contain only static members and can't be instantiated with the new keyword
        - Classes, structs, and records can contain static members
    - **Nested types:**
        - Nested within another **type**
    - **Partial types:**
        - You can define part of a class, struct, or method in one code file and another part in a separate code file
    - **Anonymous tpyes:**
        - Anonymous types are defined by their named data members
        - In situations where it isn't convenient or necessary to create a named class you use anonymous types

    - **Object initializer:**
        - You can instantiate and initialize class or struct objects, and collections of objects, by assigning values to its properties
    - **Extension methods:**
        - You can "extend" a class without creating a derived class by creating a separate type.
        - That type contains methods that can be called as if they belonged to the original type.
    - **Implicitly Typed Local Variables:**
        - Within a class or struct method, you can use implicit typing to instruct the compiler to determine a variable's type at compile time
    
    - **RECORDS:** ***(=an immutable data type with value-based equality)***
        - You can add the record modifier to a `class` or a `struct` (`record class` or `record struct`)
        - Records are types with built-in behavior for value-based equality, with the following features:
            - Concise syntax for creating a reference type with immutable properties.
            - Value equality: Two variables of a record type are equal if they have the same type, and if, for every field, the values in both records are equal. 
              Classes use reference equality: two variables of a class type are equal if they refer to the same object.
            - Concise syntax for nondestructive mutation. A `with` expression lets you create a new record instance that is a copy of an existing instance but with specified property values changed.
            - Built-in formatting for display. The `ToString` method prints the record type name and the names and values of public properties.
            - Support for inheritance hierarchies in record classes. Record `classes` support inheritance. Record `structs` don't support inheritance.
            - You can add methods, properties and other members to a records just as you would to a class. You can even add mutable properties
    
    - **STRUCTS:**
        - They are "light-versioned" classes
        - They are value types and can be used to create objects that behave like built-in types
        - Characteristics & comparison:
            - Struct cannot have a default constructor (a constructor without parameters) or a destructor.
            - Structs are value types and are copied on assignments.
            - Structs are value types, while classes are reference types.
            - Structs can be instantiated without using a new operator.
            - A struct cannot inherit from another struct or class, and it cannot be the base of a class. All structs inherit directly from the System.ValueType, which inherits from System.Object.
            - Struct cannot be a base class. So, Struct types cannot abstract and are always implicitly sealed.
            - Abstract and sealed modifiers are not allowed, and struct members cannot be protected or protected internals.
            - Function members in a struct cannot be abstract or virtual, and the override modifier is allowed only to the override methods inherited from the System.ValueType.
            - Struct does not allow the instance field declarations to include variable initializers. However, static fields of a struct are allowed to include variable initializers.
            - A struct can implement interfaces.
            - A struct can be used as a nullable type and can be assigned a null value.
        - Comparison chart: </br>
        ![structs v classes](./assets/struct-vs-class.png)

        - Example code:
                
                struct Location
                {
                    public int x, y;

                    public Location(int x, int y)
                    {
                        this.x = x;
                        this.y = y;
                    }
                }

                class Program
                {
                    static void Main(string[] args)
                    {
                        Location a = new Location(20, 20);
                        Location b = a;
                        a.x = 100;

                        // Print the value of b.x
                        Console.WriteLine(b.x);

                        // Output: 20
                    }
                }

- **TYPES - REFERENCE vs VALUE:**
    - The **reason** we can store types differently is that it helps to reduce the occurrance of runtime exceptions:
        - a **value type** can never be `null` -> the will never throw a `NullReferenceException` (one of the most common exceptions in OOP languages)

    - **REFERENCE types:**
        - These **don't hold data directly**, but hold a *reference* or *pointer* to a **memory location** on the **heap**, where the actual object is stored
        - All **class types** are reference types (eg the `string` and `object` class is a reference type, but also `Arrays` and `Strings`, although the last one is special as it's immutable)
        - A `null` is also a reference type, but it has no value referenced (?)
        - Declaring multiple variables that point to the same object makes it possible to modify that object through multiple variables, if it's **mutable**.<br>
          (if it's set to **immutable**, like strings, we can't modify them, all modifications will create a new object):

                int[] numbers1 = {1,2,3};       // "Array" is a mutable reference type, so it is possible to change its elements after it's been created
                int[] numbers2 = numbers1;      // numbers1 is a variable that contains a reference to an int[] object, which is what will be copied to numbers2 as well! (so they reference the same memory location)

                numbers2[0] = 0;
                numbers1[1] = 0;

                Console.WriteLine(String.Join(",", numbers1)); //Prints 0,0,3
                Console.WriteLine(String.Join(",", numbers2)); //Prints 0,0,3

                Console.ReadKey();
        
        - Object reference:
            - we also refer to reference to a class's `superclass`:

                    // Woman inherits from Human, which inherits from Animal, and it implements IPerson:
                    class Human : Animal
                    class Woman : Human, IPerson

                    // All of these references are valid:
                    Woman eve = new Woman();
                    Human h = eve;
                    Animal a = eve;
                    IPerson p = eve;

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

                Console.ReadKey();
    
    - **Method parameters:**
        - When passing parameters into methods, de default behaviour is **pass by value**:
            - For **reference types** -> the reference is passed (because the reference type's value is the reference itself) -> we can make modifications to them inside the method:

                    int[] numbers = { 1, 2 };

                    PrintNumbers(numbers);      // Prints 1, 2

                    ChangeToZero(numbers);
                    PrintNumbers(numbers);      // Prints 0, 0 -> the modification was successful!

                    private void ChangeToZero(int[] arr)
                    {
                        arr[0] = 0;
                        arr[1] = 0;
                    }

                    private void PrintNumbers(int[] arr)
                    {
                        Console.WriteLine(String.Join(", ", arr));
                    }

            - For **value types** -> the actual value is passed -> we can't use it the same way:

                    int counter = 0;
            
                    Increment(counter);
                    
                    Console.WriteLine(counter);     // Prints 0, so the modification was unsuccessful (because we were trying to modify the original value)
                    Console.ReadKey();
                    
                    private static void Increment(int num)
                    {
                        num += 1;
                    }

                    // So we can modify the code with the "ref" keyword:

                    int counter = 0;
                    
                    Increment(ref counter);         // ref also needs to be specified by the caller
                    
                    Console.WriteLine(counter);     // Prints 1
                    Console.ReadKey();

                    private static void Increment(ref int num)
                    {
                        num += 1;
                    }

                    // But a more realistic scenario is to just return a value from the local method (which will be a new integer):

                    int counter = 0;

                    counter = Increment(counter);   // We assign it a new value, not try to modify the original
                    
                    Console.WriteLine(counter);     // Prints 1
                    Console.ReadKey();

                    private static int Increment(int num)
                    {
                        return num + 1;             // The returned value will be a new integer
                    }
- **TYPES - BASIC types:**
    - **Built-in types (*=primitives*):**
        - Numbers:
            - `int` - range from -2,147,483,648 to 2,147,483,648 (because it's stored on 32bits, so 2^31-1, or 4,294,967,295)
            - `short` - a 16-bit signed number, so it's range is -32,768 to 32,767
            - `long` - a 64-bit number, so the range is -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
            - `float` - A single precision floating point number
            - `double` - A double-precision floating point number (Double-precision is a relative term that describes the numbers of binary digits used to store the value)
            - `decimal` number type has a larger range as `int`, but not as big as `double`. In return, they store a lot more precision. There is also a letter `m` at the end of the number
        - Text: (implemented with an iterator, so it is possible to iterate a string like you would do with a collection)
            - `char`
            - `string` 
        - `bool`
        - `byte`
    - **Framework types:**
        - `Array`:
            - a simple data structure in which you can store multiple variables of the same type
            - They represent a contiguous area in the memory, where the elements are placed next to each other
            - The size of the array (the number of elements it holds) needs to be specified at creation (different from JS!), so it's **not dynamic**!
            - The base class they inherit from is `System.Array`
            - Declaration example:
                    int[] array1 = { 4, 8, 15, 16, 23, 42};     // Create instantly
                    int[] array2 = new int[5];                  // Create placeholder by specifying number of elements (eg. 5) , and add them later

                    // Or initialize, then fill:
                    string[] favSongs;
                    favSongs = new string[]
                    {
                        "item1",
                        "item2",
                        ...
                        "itemn"
                    };

        - `List<T>`:
            - It's an indexable collection
            - Very similar to arrays, but it's **dynamic**, so in most cases it's prefered to use a list
            - `<T>` refers to the type of items it stores
        - `Console`:
            - Derived from the `System.Console` class
            - It's a `static` class
            - All the functionality is realted to console in and output (since we will be working with Console Applications, the main user interactions happens through the console)
        - `DateTime`:
            - Anything date related can be created with it
        - `Random`:
            - Generates random numbers
        - `Thread`:
            - A `thread` is a unit of execution (in this module we are only working in a singlethreaded environment) -> so we will only have 1 thread, the **main thread**
            - `Thread.Sleep` method can be used to defer (delay?) the execution of the current thread by 'x' milliseconds

## DATA TYPES and BUILDING BLOCKS OF CODE:
- **BASICS:**
    - Output to console:
            Console.WriteLine("string text");

    - Create a variable:
            var container = "this is the value of the container";
    
    - Create regions to separate functionalities and structurize the file:

                #region User Input
                // CODE GOES HERE
                #endregion

- **STRINGS:**
    - Create variable and use `string literal` to display it's value:
            string myName = "Gabor";                    // Using value type to create variable(!)
            string aFriend = "Dori";
            Console.WriteLine($"Hello, my name is {myName}");
            Console.WriteLine("Hello " + aFriend);

    - Using `length` property:
            string myName = "Gabor"
            Console.WriteLine($"{myName} consists of {myName.Length} characters");
    
    - Parsing strings (full description here: https://journey.study/v2/learn/materials/parsing-strings-csharp-1q2023):
        - convert one data type into another (eg. read a `string` input from the console and output an `int`)
        - Methods used:
            - `Console.ReadLine() ?? "";` - we use this to read the input from the console (the `??` operator is called the **null-coalescing operator**)
            - `Int32.Parse(input);` - then we used this line to convert (parse) it to an `int` type
            - `Console.ReadKey();` - it's used to wait for an input from the user (it avoids closing the application after completion of the task)
            - Using the `TryParse` method:
                    
                    private static bool ParseInput(string input, out int number)
                    {
                        return Int32.TryParse(input, out number);
                    }

                    // Code breakdown:
                    1. The TryParse method will try to perform the parse operation on the input data, and if it's not successful, it will return false
                    2. It won't throw any exceptions, but it will still give you information that the operation has failed (the program execution can continue)
                    3. If the parse operation is successful, the method will return true, and the parsed value will be assigned to the out parameter, in our case called number
                    4. The "out" modifier is quite similar to the "ref" modifier, in that it causes the parameter to be passed by reference. The "out" variable however does not have to be initialized, as in the case of "ref".
- **NUMBERS:**
    - Creating numbers:
            int number = 6;                                     // Integer division always results in an integer! (So it only returns the whole part of the result)

    - All types are implemented to support all:
        - **arithmetic** (+, -, *, /, %)
        - **comparison** (<, >, <=, >=)
        - **equality operators** (==, !=)

    - Min and Max values that they can represent (based on PC memory):
            int max = int.MaxValue;                     // 2147483647
            int min = int.MinValue;                     // -2147483647

            // OVERFLOW: We flip at the ends, so if we add 1 to the max, we get the first possible negative value
            // We need different types from int to express larger or different numbers

    - `float` and `double`
            float number = 4.5                                  // A single precision floating point number
            double number = 4.5                                 // A double-precision floating point number (Double-precision is a relative term that describes the numbers of binary digits used to store the value)

            // double third = 1.0 / 3.0;                        // 0.333333333333333 -> There is a limit to the decimals the computer can store

    - `decimal` number type has a larger range as `int`, but not as big as `double`. In return, they store a lot more precision:

            // decimal c = 1.0M;
            // decimal d = 3.0M;
            // Console.WriteLine(c / d);                        // 0.3333333333333333333333333333 -> The limit increased (also note the letter 'M' at the end, saying that it's a decimal! Otherwise it would consider it a "double")
    
    - `long` and `short` are also number types

- **ARRAYS, COLLECTIONS & ENUM TYPE:**
    - **Arrays:**
        - Arrays are the most basic form of collection in C#.
        - They are fixed-size, zero-indexed, and strongly typed.
        - Syntax: int[] numbers = new int[5];

    - **Collections**
        - In general, Collections belong to the `System.Collections` or `System.Collections.Generic` namespace, and can be of different types:
        - **Lists:** 
            - `List<T>`
            - Create a **list** in online browser environment (or add `using System.Collections.Generic` to imports):
                    var names = new List<string> { "Juan", "Ana", "Felipe" };       // A "List" of "<string>"s
                    foreach (var name in names)
                    {
                        Console.WriteLine($"Hello {name.ToUpper()}!");
                    }
            
            - Create a **list** in your own environment:
                    List<string> names = ["Juan", "Ana", "Felipe"];
                    foreach (var name in names)
                    {
                        Console.WriteLine($"Hello {name.ToUpper()}!");
                    }
        - **Dictionaries:**
            - `Dictionary<TKey, TValue>`: A collection of key-value pairs.
        - **HashSet:**
            - `HashSet<T>`: A set of unique elements.
        - **Queue & Stack:**
            - `Queue<T>`:
                - follows the First-In-First-Out (FIFO) principle
                    - The **first item added** to the queue is the **first one to be removed**
                - Key Operations:
                    - `Enqueue(T item)`: Adds an item to the end of the queue.
                    - `Dequeue()`: Removes and returns the item at the beginning of the queue.
                    - `Peek()`: Returns the item at the beginning of the queue without removing it.
                    - `Count`: Gets the number of elements contained in the queue.

                    - Examples:

                            Queue<string> queue = new Queue<string>();
                            queue.Enqueue("Apple");
                            queue.Enqueue("Banana");
                            queue.Enqueue("Cherry");

                            string first = queue.Dequeue();  // Removes and returns "Apple"
                            string next = queue.Peek();      // Returns "Banana" without removing it


            - `Stack<T>`:  
                - follows the Last-In-First-Out (LIFO) principle:
                    - The **last item added** to the stack is the **first one to be removed**
                - Key Operations:
                    - `Push(T item)`: Adds an item to the top of the stack.
                    - `Pop()`: Removes and returns the item at the top of the stack.
                    - `Peek()`: Returns the item at the top of the stack without removing it.
                    - `Count`: Gets the number of elements contained in the stack.

                    - Examples:

                            Stack<string> stack = new Stack<string>();
                            stack.Push("Apple");
                            stack.Push("Banana");
                            stack.Push("Cherry");

                            string top = stack.Pop();  // Removes and returns "Cherry"
                            string next = stack.Peek(); // Returns "Banana" without removing it


        - `ICollection` interface:
            - Defines a collection of objects (part of .NET Framework's collection classes, included in the `System.Collections` namespace)
            - It also has a Generic and Non-Generic version (means **type** is sepcified or not)
            - `ICollection` extends the `IEnumerable` interface and provides additional functionality:
                - add/remove items
                - determining the numebr of items in the collection
                - check for a specific item
            - Some of the key members:
                - `Count`: Gets the number of items in the collection.
                - `IsReadOnly`: Gets a value indicating whether the collection is read-only.
                - `Add`: Adds an item to the collection.
                - `Clear`: Removes all items from the collection.
                - `Contains`: Determines whether the collection contains a specific item.
                - `CopyTo`: Copies the elements of the collection to an array, starting at a particular index.

    - **Enum:**
        - "Enumeration":
            - It's a **value type** that helps you define a group of named constants (*represent a fixed set of distinct values*)
            - Each constant in the enum representsan integral value (eg. `int`, `byte`, `long`) -> for readability these are raplaced with descriptive names
            - We use them when there is a set of options we can pick from, but these are not expandable (eg. card suits, days of the week, etc.)
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

                // Alternative declaration if we wnat any other type than "int":
                enum DayOfWeek : long
                {
                    Monday = 1,
                    ...
                }

                // Call it's values:
                DayOfWeek today = DayOfWeek.Wednesday;  // note the type here is the name of the enum!

                if (today == DayOfWeek.Wednesday)       // we use dot notation to express a value
                {
                    Console.WriteLine("It's Wednesday!");
                }

                // More operations:

                // If we have this enum:
                public enum Season
                {
                    Spring,     // 0
                    Summer,     // 1
                    Autumn,     // 2
                    Winter      // 3
                }

                // Save a specific into a variable of it's own type:
                Season a = Season.Autumn;
                or
                var a = (Season)2;
                Console.WriteLine(${a})             // will print "Autumn"
                Console.WriteLine(${(int)a})        // will print "2"

                var b = (Season)1;
                Console.WriteLine(b);               // output: Summer

                var c = (Season)4;
                Console.WriteLine(c);               // output: 4 (there's no 4th item in "Season" enum)

                // Determine the length of an enum:
                int numberOfSeasons = Enum.GetNames(typeof(Season)).Length      // Get the length of "Season" enum

        - `IEnumerable` interface:
            - provides a single unified access to any built-in collection in C# (so you can use it with any type of collection)
            - defines a standard way to iterate over a collection of items
            - perform operations such as filtering, sorting, and mapping
            
            - It has 2 versions:
                - **Non-generic IEnumerable:** represents a sequence of objects (no specific type)
                - **Generic IEnumerable:** represents a sequence of objects of a specific type (allows you to work with the `Type` rather than an `object`, which is much more flexible).

            - How it works:
                - `IEnumerator` interface -> has a single method `GetEnumerator()` -> returns an `IEnumerator` object -> use it to iterate through the collection
                - `IEnumerator` object (instance) -> has 2 methods:
                    - `MoveNext()`: moves the iterator to the next item in the collection and returns a bool value indicating whether there are more items to be traversed.
                    - `Reset()`: resets the iterator to its initial position
                - This is all built in into C# (so using foreach or a LINQ method means you are implicitly using `IEnumerable`):

                        List<int> numbers = new List<int> {1,2,3,4,5}; // List<T> implements `IEnumerable`

                        foreach (int number in numbers) // The compiler calls the `GetEnumerator` method 
                        {
                            Console.WriteLine(number);
                        }
            - **Best practices:**
                - IEnumerable in method parameters:
                    - generally a good idea to have the input parameter as `IEnumerable` (unless you need more specific properties)
                    - this method supports polymorphism (you can pass an Array or List or anything else that implements `IEnumerable` -> broad usage)

                            public void PrintNumbers(IEnumerable<int> numbers)
                            {
                                foreach (int number in numbers)
                                {
                                    Console.WriteLine(number);
                                }
                            }
                    
                - Return type:
                    - Generally you want to be more specific
                    - But for example if the return value is for an API, you are better off with `IEnumerable`, as you don't know the exact usage
                    - `yield return`:
                        - used in context of an iterator (return a sequence of values, one at a time):

                                public IEnumerable<int> GenerateEvenNumbers(int count)
                                {
                                    int i = 0;
                                    while (i < count)
                                    {
                                        yield return i * 2;     // This MUST be an IEnumerable type!
                                        i++;
                                    }
                                }

## CONDITIONALS / BRANCHES:
- Conditional `if` statemens:
        int a = 5;
        int b = 6;
        if (a + b > 10)
            {
            Console.WriteLine("The answer is greater than 10.");
            }
        else
            {
            Console.WriteLine("The answer is less or equal to 10.");
            }
        
        // we can combine conditions as in JS: if 
        if ((a + b + c > 10) && (a == b))
        if ((a + b + c > 10) || (a == b))
- Switch statements: (same as JS)
        switch (dayNum)                             // Condition to check in cases
        {
            case 0:                                 // Means if (dayNum == 0) is true
                dayName = "Sunday";
                break;                              // break is needed, otherwise the code would keep running
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            ...
            case 6:
                dayName = "Saturday";
                break;
            default:                                // "else" case, if none of the above is true
                dayName = "Invalid Day Number!";
                break;
        }

## LOOPS:
- `while` loop:
        int counter = 0;
        while (counter < 10)
        {
            Console.WriteLine($"Hello World! The counter is {counter}");
            counter++;
        }
- `do while` loop (the condition is executed first, then checked):
        int counter = 0;
        do
        {
            Console.WriteLine($"Hello World! The counter is {counter}");
            counter++;
        } while (counter < 10);
- `for` loop:
        for (int counter = 0; counter < 10; counter++)
        {
            Console.WriteLine($"Hello World! The counter is {counter}");
        }
- `foreach`:
        foreach (var name in names)
        {
            Console.WriteLine($"Hello {name.ToUpper()}!");
        }
- **Jump statements:**
    - Used to break out of the loop before it's finished (to save time and resources)
        - `break;` - end the loop and carry on with the code
        - `continue;` - end the current loop and carry on with the next one (skip code from within the loop)
        - `return` - break out of a method completely (not just loops!). If it's inside a loop, the loop will also end (even multiple loops!)
## METHODS:
- **Overview:**
    - In C# methods and functions are the same
    - They are the most basic **building blocks** of the code after the loops and conditionals
    - The main roles are:
        - Avoid code repetition by reusing code blocks
        - Make the code more readable for humans
- **Anatomy of a method/Modifyiers:** 
    - `private`, `static` and `void` are all additional keywords we use to describe the details of our method:
        - Access modifiers like `private`, `public` or `protected` control the access to the Class's data:
            - `private`: means that the method can only be invoked from within the `Program` class
            - `protected`: a protected member can be accessed by the current class and any class that inherits from it (any other class doesn't have access)
        - Return value:
            - `void` refers to what it returns 
            - it could also be `string` or `int`
        - `static`:
            - the method belongs to the class itself (and won't be created in objects created from the class) 
            - therefore it can't be invoked through an object reference, only by the class name (eg. `Program.method()`)
                - invoke it/ call it by specifying the class name: `Program.Main();` instead of calling it from the instance (eg. `Song.songCount` instead of `song1.songCount`);
                - if we want to call something from the `Main()` method, we need to make it `static` (because `Main` is also `static`, and it's the compiler's reqirement).
                - Since *inside static methods* we don't have an object reference of the enclosing type (in this case, Program), we can only call other static methods from it.
            - `static` **method**:
                - eg. `Math.Sqrt(144)` -> we can use it without creating a separate object ( `Math` is a static class - can't even create an instance of it!)
            - `static` **constructor**:
                - is run once per type, not per instance
                - must be parameterless
                - is invoked before the type is instantiated or a static member is accessed
                - eg.:
                        class Forest
                        {
                        static Forest()
                        { 
                            Console.WriteLine("Type Initialized");  // This will run every time we intialize a forest object, so we could count the number of objects created fro example with this
                        }
                        }

                        Forest f = new Forest();        // This line triggers the static method

        - `virtual` keyword indicates a method in the *base class*, that the *derived class* can overwrite (you can only change the content, not the signature or the return type!):
            - If a *base class* has a `virtual` method, it means it will check first if the *derived class* we are pointing to or referencing has that method, and implement that instead. If it doesn't, it will use the definition in the *base class*
            - These are the methods in `Object` class, that we can consider overwriting, when creating a derived class:
                - `Equals`: By default, equlaity is checked by reference, but we can override this to check for its attributes
                - `GetHashCode`: used when the object is placed in a hash map like collection, for example the `Dictionary`
                - `ToString`
                - (`Finalize`)
            - How to use it:
                - Parent class:

                        public virtual void Method()
                        {
                            // CODE
                        }

                - Derived class:

                        public override void Method()
                        {
                            // NEW CODE
                        }
        - `abstract` keyword (modifier) describes an incomple Class, that the subclass needs to complete it on implementation:
            - Use the `abstract` modifier in a class declaration to indicate that *a class is intended only to be a base class* of other classes, not instantiated on its own.
            - The complete implementation of an `abstract` member must be marked with `override`:

                    abstract class Shape
                    {
                        public abstract int GetArea();
                    }

                    class Square : Shape
                    {
                        int side;
                        public Square(int n) => side = n;

                        // GetArea method is required to avoid a compile-time error.
                        public override int GetArea() => side * side;
                    }
            
            - **Class** -> can't be instantiated
            - **Method** -> a function without a body (`abstract` MUST be overwritten in subclass! // vs. // `virtual` -> CAN be overwritten)
        - `interface`:
            - contains definitions for a group of related functionalities that a class can implement:
                - The Interface defines all the members that the class that implements it has (similar to a virtual method in a baseclass)
                - The implementing class defines how these members should behave (similar to an override of a virtual method) 
            - Benefits:
                - they guarantee how a class behaves and helps organize and modularize components of software (a class can implement multiple interfaces)
                - You can inherit multiple intefaces
                - extra security
            - It is best practice to start the name of an interface with “I”:

                    // The IAutomobile interface has three properties. Any class that implements this interface must have these three properties:
                    interface IAutomobile
                    {
                        string LicensePlate { get; }
                        double Speed { get; }
                        int Wheels { get; }
                    }

                    // The IAccount interface has three methods to implement:
                    public interface IAccount
                    {
                        void PayInFunds ( decimal amount );
                        bool WithdrawFunds ( decimal amount );
                        decimal GetBalance ();
                    }

                    // Implementation:
                    public class CustomerAccount : IAccount, IAutomobile
                    {
                        public void PayInFunds ( decimal amount )       // These will also become public!
                        {
                            // Implementation happens inside the Class
                        }
                        public bool WithdrawFunds ( decimal amount );
                        {
                            // Implementation happens inside the Class
                        }
                        public decimal GetBalance ();
                        {
                            // Implementation happens inside the Class
                        }

                        // If multiple interfaces are implemented, you should also implements all the members from that one!
                    }

    - **method signature:** 
        - the method's name and the parameters together `MethodName(parameters)` -> this is a unique identifier of the method (name is with Capital letter! *PascalCase*)
        - `void` is not part of it, which is important because of **member/method overloading** 
- **Method/member overloading:**
    - it means creating multiple elements with the same name, which only differ in the numbers of parameters
    - the return type **MUST** be the same for all members/methods!
    - This is beneficial, because we can create simple or more complex functions, based on the requirements (so we don't need to call the difficult one in all cases):
            
            // For example, we can add a single string parameter, or an array of strings as a parameter:
            private static void PrintMessage(string message)
            {
                Console.WriteLine(message); 
            }

            private static void PrintMessage(string[] messages)
            {
                foreach (string message in messages)
                {
                    Console.WriteLine(message);
                }
            }

            // In this case, the type of the argument will determine which method will be invoked
- **Instance vs. Static methods:**
    - `static` methods are the ones that are called inside `Main()`, or we have to specifiy the Class name as well:
        - Access them through the **CLASS**
        - Some string methods work like this:

                String.Join(", ", messages);    // messages is an array of strings, on which we perform the Join method

    - `instance` methods on the other hand, **require** an object reference to be invoked:
        - Access them through the **OBJECT reference**
        - Most of the string methods for example are `instance` methods:
                
                message.ToUpper()               // message has to be a string on which we can invoke the method

- **Local method**
    - it's a method within another method - these are only accessible from the enclosing method
    - This is very important in the new Rider template, where we can only work within the `Main()` method, so **all methods will be local methods!**

- `out`:
    - A method can only return one value, but sometimes you need to output two pieces of information
    - Calling a method that uses an `out` parameter is one way to **return multiple values**.
    - For example, the `Int32.TryParse()` method tries to parse its input as an integer. 
        - If it can properly parse the input, the method returns true and sets its out variable to the new value.
        - If it cannot properly parse the input, the method returns false and sets the out variable to 0.

                int result;                                                 // First we need to declare a variable for "result"
                public static bool TryParse (string s, out int result)      // This is what the signature should look like with the "out" keyword
                {   
                    // Parsing logic...
                    result = **the parsed result**;                         // we first add value to the "out" parameter
                    return true/false **based on success**;                 // then we return as normal with the return value
                }

                // Then we can call it like this:
                int number;
                bool success = Int32.TryParse("10602", out number);         // "success" will be "true", and "number" will get the parsed value

                int number2;
                bool success2 = Int32.TryParse(" !!! ", out number2);       // in this case the parsing can't be done, so "success2" will be false, and "number2" will be 0

- **Expression-bodied Definitions** (*=arrow function*)
    - can only be used when a method contains one expression
    - The classic way of defining a method:
            
            bool IsEven(int num)
            {
            return num % 2 == 0;
            }

    - Same with expression-bodied definition:

            bool isEven(int num) => num % 2 == 0;

- **Lambda expression:** same as an anonymous function written directly as a parameter of a method:

        // Traditional way:
        bool makesContact = Array.Exists(spaceRocks, HitGround);

        static bool HitGround(string s)
        {
        return s == "meteorite";
        }

        // Same with Lambda expression:
        bool makesContact = Array.Exists(spaceRocks, (string s) => s == "meteorite");

        // We can make it even shorter:
        bool hasEvenNumbers = Array.Exists(numbers, num => num % 2 == 0 );      // since % returns a number, the type can be omitted. Also if we only have 1 argument, we can also omit () 

- **Extension method:**
    - a language feature in C#, that lets you add functionality to a class, struct, enum, interface, or a record without modifying its original source code.
    - Let's see the process through an example:
        - A Method created to determine if a Date is between 2 other dates:

                public bool IsBetween(DateTime input, DateTime start, DateTime end)
                {
                    return (input > start && input < end);
                }

        - if you need this method to be widely available in different parts of the application, you could make it `static` to keep it in the `static class` (*=utility class*):

                public static class DateTimeUtils                                                   // the method is added to a static class
                {
                    public static bool IsBetween(DateTime input, DateTime start, DateTime end)      // static was added to the signature as well
                    {
                        return (input > start && input < end);
                    }
                }

        - This results in the method being available for use anywhere, using it's class:
                
                var input = DateTime.Now;
                var start = DateTime.Now.AddYears(-1);
                var end = DateTime.Now.AddYears(1);

                var isBetween = DateTimeUtils.isBetween(input, start, end);     // We call it using "DateTimeUtils" (the name of the class!)
        
        - Since utility classes introduce static references to the code (which causes problems during unit testing), we need to use extension methods:

                public static class DateTimeUtils                                                       // We still place it in a static class!
                {
                    public static bool IsBetween(this DateTime input, DateTime start, DateTime end)     // we add "this" keyword to the first parameter, so now we can call it from the inctance as well
                    {
                        return (input > start && input < end);
                    }
                }
        
        - Now we can invoke it using the instance of the class:
                
                var input = DateTime.Now;
                var start = DateTime.Now.AddYears(-1);
                var end = DateTime.Now.AddYears(1);

                var isBetween = input.IsBetween(start, end);        // We are calling it now on "input", not on "DateTimeUtils"

## CLASSES / PROCESS OF MODELING:
- Process of modeling (simplified summary):
    1. Analize object's attributes
    2. Filter these attributes to only include the relevant ones
    3. Decide which data types to use for the attributes
    4. Create Object from Class

- Creating Classes:
    0. Create enum if there will be a property that is restricted to certain values:
            
            // In separate "Model" folder:
            namespace Codecool.PlayingCards.Model;

            public enum Suit {
                Diamonds,
                Clubs,
                Hearts,
                Spades,
            }

    1. Add properties:
        - **Auto properties** are properties that don't require the old way of creating a private field, then using another public field to get/set these values, instead this process is automatically generated in the background

                // The old way:
                private int _age;

                public int Age              // Create custom getter and setter
                {
                    get { return _age; }    // `get` gets executed when we call the _age property
                    set { _age = value; }   // `set` gets executed when we try to assign a new value to _age
                }

                // Properties with auto-properties and mutable values:
                public class Card {
                    public Suit Suit { get; set; }                  // use "init" instead of "set" if you want to make it immutable, or just remove "set"
                    public string Symbol { get; set; }
                }

    2. Add a constructor:

            public class Card {

                public Suit Suit { get; init; }                 // gets values from the enum we created for it
                public string Symbol { get; init; }             // value needs to be specified on initialization as string value
                public string Title => $"{Symbol} of {Suit}"    // This is a computed property with the arrow syntax, but we could add it to the constructor instead

                public Card(string symbol, Suit suit)           // Add constructor
                {
                    Suit = suit;                                // We use capital letters here because of the getter and the setter
                    Symbol = symbol;
                }
            }

    3. Change default inherited method definitions `Equals` and `GetHashCode`, then also `ToString`:
        - `Alt + Insert` hotkey, or right *click + generate* in `Card.cs` Class file, to add the following:
                
                protected bool Equals(Card other)
                {
                    return Suit == other.Suit && Symbol == other.Symbol;
                }

                public override bool Equals(object? obj)            // "override" keyword is used to override a "virtual" class from the parent class
                {
                    if (ReferenceEquals(null, obj)) return false;
                    if (ReferenceEquals(this, obj)) return true;
                    if (obj.GetType() != this.GetType()) return false;
                    return Equals((Card)obj);
                }

                public override int GetHashCode()
                {
                    return HashCode.Combine((int)Suit, Symbol);
                }
        
        - After overwriting, we should check for equality with the following method, not the `==` operator (this would only call `ReferenceEquals` methods again):

                Card card1 = new Card("Ace", Suit.Spades);
                Card card2 = new Card("Ace", Suit.Spades);

                Console.WriteLine(card1.Equals(card2)); // Prints True    
        
        - Update `ToString` as well:

                public override string ToString()
                {
                    return Title;
                }

                // So now instead of printing "PlayingCards.Card", it will print the Title attribute's value "Ace of Spades"
                Card card1 = new Card("Ace", Suit.Spades);

                Console.WriteLine(card1); // Prints Ace of Spades

    4. Create single object from Class in Program.cs file:

            Card card = new Card("Ace", Suit.Spades);

            // Use or call its attributes:
            Console.WriteLine(card.Title);

            // If it's mutable, we can overwrite its attributes after initializeation:
            card.Symbol = "King"
            card.Suit = Suit.Hearts;
    
    5. Generate the full deck:
        - In `Program.cs` file we create a new method called `GenerateFrenchDeck`:
                
                static Card[] GenerateFrenchDeck()
                {   
                    // Create initial data for deck:
                    Card[] deck = new Card[52];
                    int index = 0;

                    // Iterate through the suits:
                    foreach (var suit in Enum.GetValues<Suit>())
                    {
                        AddNumberedCards(deck, ref index, suit);        // Note "ref" keyword! This is to avoid passing paramters into methods "by value", which means a new memory storage is created for each method call 
                        AddCourtCards(deck, ref index, suit);           // ref keyword!
                    }

                    return deck;
                }

                // Generate numbered cards:
                static void AddNumberedCards(Card[] deck, ref int index, Suit suit)     // ref keyword!
                {
                    for (int i = 2; i <= 10; i++)
                    {
                        Card card = new Card(i.ToString(), suit);
                        deck[index] = card;
                        index++;
                    }
                }

                // Generate court cards:
                static void AddCourtCards(Card[] deck, ref int index, Suit suit)        // ref keyword!
                {
                    string[] courtSymbols = { "Jack", "Queen", "King", "Ace" };

                    foreach (var courtSymbol in courtSymbols)
                    {
                        Card card = new Card(courtSymbol, suit);
                        deck[index] = card;
                        index++;
                    }
                }

                // Then we can add these lines to the `Main` method to actually generate the cards:
                Card[] deck = GenerateFrenchDeck();

                for (int i = 0; i < deck.Length; i++)
                {
                    Console.WriteLine($"{i + 1} - {deck[i]}");
                }

                Console.ReadKey();

        - The same code using `List` (to avoid dealing with `index` and `ref`):

                static List<Card> GenerateFrenchDeck()
                {
                    // Create initial data for deck:
                    List<Card> deck = new List<Card>();

                    // Iterate through the suits:
                    foreach (var suit in Enum.GetValues<Suit>())
                    {
                        AddNumberedCards(deck, suit);
                        AddCourtCards(deck, suit);
                    }

                    return deck;
                }

                // Generate numbered cards:
                static void AddNumberedCards(List<Card> deck, Suit suit)
                {
                    for (int i = 2; i <= 10; i++)
                    {
                        Card card = new Card(i.ToString(), suit);
                        deck.Add(card);
                    }
                }

                // Generate court cards:
                static void AddCourtCards(List<Card> deck, Suit suit)
                {
                    string[] courtSymbols = { "Jack", "Queen", "King", "Ace" };

                    foreach (var courtSymbol in courtSymbols)
                    {
                        Card card = new Card(courtSymbol, suit);
                        deck.Add(card);
                    }
                }

                // Then call it like this:
                List<Card> deck = GenerateFrenchDeck();

                for (int i = 0; i < deck.Count; i++)
                {
                    Console.WriteLine($"{i + 1} - {deck[i]}");
                }                
    
    6. Decide between **simplicity** or **robustness**:
        - **Robustness**:
            - using inheritance (or enums) by creating sub-classes and a base-class
            - better scalability
            - worse performance
            - more difficult to maintain
            - leaves less space fo incorrect use of class
        - **Simplicity**: (sample https://journey.study/v2/learn/materials/cards-german-deck-csharp-1q2023)
            - avoid inheritance, and create multiple independent classes instead of a base-class and subclasses 
            - worse for scalability
            - better performance
            - easier to maintain
            - might lead to incorrect use of class
    
    7. Add functionality (behaviour methods)

## PROCESS OF MODELING PART II
- Organize the code in 3 different layers:
    - **MODEL** or **DATA** for describing and getting the data
    - **SERVICE** that contains functinality to transform the data according to the business logic
    - **PRESENTATION** or **UI** has the role to handle user interactions and display the data

- **Composition vs Inheritance:**
    - When deciding between **composition** and **inheritance**, you can use the following paradigm:
        - If the relationship between the classes/objects can be described with the term **'is a(n)'**, it's probably an **inheritance**. For example, a car **is a** vehicle.
        - If the relationship between the classes/objects can be described with the term **'has a(n)'**, it's a **composition**. A car **has an** engine.

- **SOLID** Design Principles:
    - **S**: The Single Responsibility Principle (SRP)
        - A class should have only one reason to change, meaning it should have only one job or responsibility.
        - Apply also *inheritance vs. composition principles* (see above)
        - **Example:** A `User` class handles user `properties` but delegates logging user `activities` to a separate *UserActivityLogger* class.
    - **O**: The Open/Closed Principle (OCP)
        - Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
        - **Example:** A `ReportGenerator` class can be extended to support different report formats (CSV, PDF) without changing its existing code (eg. through the use of interfaces or abstract classes.)
    - **L**: The Liskov Substitution Principle (LSP)
        - Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.
        - Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.
        - **Example:**  If `Bird` is a superclass and `Duck` is a subclass, then you should be able to replace `Bird` with `Duck` without altering the program's behavior, assuming they share behaviors like `fly()`.
    - **I**: The Interface Segregation Principle (ISP)
        - Clients should not be forced to depend upon interfaces that they do not use.
        - An `interface` is an abstract type in C# that defines a contract:
            - Any class or struct that implements an interface must provide an implementation of the members defined in the interface.
            - The interface is then used to facilitate communication between objects.
            - Instead of using a reference of a concrete type, the objects talk to each other via this interface.
            - This will lead `Components` to depend on **abstractions** rather than **implementations**
            - We should rather have many smaller, more specific interfaces, as opposed to one huge interface with many operations. (very similar to SRP!)
                - But it doesn't mean that each interface should only have 1 method, but that the methods should be related to the same functionality
            - Create one by using `interface` keyword, and naming should be something like `ICardGenerator`:

                    public interface ICardGenerator
                    {
                        List<Card> Generate(int[] numbers, string[] symbols, string[] suits);
                    }

            - An interface can contain methods and properties, but they can not declare instance data such as fields, auto-implemented properties, or property-like events. 
            - They don't have any constructors, as interfaces are abstract types - they cannot be instantiated.
            - They can have default implementations, but the usual case for them is to only define the method signatures, and leave the actual implementation to classes that implement the interface.
        - **Example:** Instead of one large `IWorker` interface with methods like `Work`, `Eat`, and `Rest`, have separate interfaces like `IWorkable`, `IEatable`, and `IRestable`, and implement them as needed in *different worker classes*.
    - **D**: The Dependency Inversion Principle (DIP)
        - Depend upon abstractions, concretes:
            - High-level modules should not depend on low-level modules; both should depend on abstractions. 
            - Also, abstractions should not depend on details, but details (concrete implementations) should depend on abstractions.
        - In more detail:
            - Create an an architecture in which components can be easily swapped, should the need arise to do so, because they depend on abstractions rather than concrete implementations.
            - The specific mechanism through which it appears in code is called **Inversion of Control (IoC)** and its more specific version **Dependency Injection (DI)**.
                - **Inversion of Control (IOC)**: refers to transferring the control of objects and their dependencies from the main program to a container or framework.
                    - In this module we will not use a proper IoC container/framework, but simulate it by creating all dependencies in the `Program.cs` file
                - **Dependency Injection (DI)**: is a technique that allows objects to be separated from the objects they depend upon.
                    - Use *constructor injection*, which means to declare the dependencies in the class's constructor
                    - dependency injection is an instance-based technique - you can't really inject static members (technically you can, but it does not make sense architecturally).
        - **Example:** A `PaymentProcessor` class depends on an `IPaymentGateway` interface rather than a concrete `CreditCardPaymentGateway` class, allowing for different payment methods to be introduced without changing the `PaymentProcessor`'s code.

- In practice:
    1. Apply **SRP:**
        - `Program` class should only run the program, nothing more
        - Organize classes by role/layer:
            - **Service (Factories, Builders, Generators):**
                - They are used to manufacture objects.
                - Classes that perform operations
                - Create subfolder for loggers (?)
            - **Model:**
                - Data and Data representation should be here
            - **Presentation / UI:**
                - User interactions ? (eg `FineCalculatrUI.cs`)
            - **Utilities:**

            - All interfaces should go where the corresponding classes are!

            - Alternatively organize by functionality:
                - Group features together, or classes that perform certain tasks together, so the connections can be found easily

        - Base the architecure on inheritance vs. composition principles (see above)
    
    2. Apply **DIP:**
        - create all dependencies that are required for an object initialization in `Program.cs` (only in this module, later this should be a proper IoC container/framework)
        - Avoid hiding dependencies of classes by adding them (injecting) to their base constructor's parameters (this makes the class unit testable)
    
    3. Apply **ISP:**
        - Use `interface`s whenever possible! (it's an abstract type in C#, that defines a contract)
            - This will lead `Components` to depend on **abstractions** rather than **implementations**
            - Use as many interfaces as possible, separating them by their functionality
        - Make a **builder class** implement the **interface** (similar `:` used as with inheritance)
            - the class must implement all members of the interface, otherwise the code won't compile!
        - Change the original references of the builder class to the interface:
            - eg the `CardGenerator` references to `ICardGenerator` in the deck builders (french and german...)
        
        - Add a logger:
            - Create a single `ILogger` interface, that is able to handle all logging, and we can swap the implementations depending on the circumstances (eg. info, or error)
            - Create the implementing classes too! (`ConsoleLogger.cs` & `FileLogger.cs`)
            - Add logging capability to specific classes using constructor injection (eg CardGenerator class) - remove static from methods if you use dependency injection (?)
            - Create a logger instance in `Program.cs` file, so we can inject it into any other class that needs logging functionality

## EXCEPTION HANDLING:
- The basic logic:
    - **C#** *thorws exceptions* if it runs into an error, and then the program stops
    - We need it to keep going after it throws an exception, by **handling it**
- Using a `try-catch` block:

        try
        {
            // CODE
        }
        catch (Exception e)             // catching any exception
        {
            Console.WriteLine(e.Message);
        }

        // Specify exceptions in multiple catch blocks:
        try
        {
            // CODE
        }
        catch (DivideByZeroException e)
        {
            Console.WriteLine(e.Message);
        }
        catch (FormatException e)       // 2nd catch block
        {
            Console.WriteLine(e.Message);
        }

        // We can also add:
        finally
        {
            // CODE THAT GETS EXCECUTED IN ALL CASES
        }

## LINQ:
- Basics:
    - LINQ is a set of language and framework features for writing queries on collection types
    - useful for selecting, accessing, and transforming data in a dataset
    - import it with `using Syste.Linq;`
- Values are stored in `var`, because the type of an executed LINQ query is not always known:
        
        var custQuery = from cust in customers
                        where cust.City == "Phoenix"
                        select new { cust.Name, cust.Phone };

- Method & Syntax:
    - **Method syntax:** resembles most other C# method calls:

            var custQuery2 = customers.Where(cust => cust.City == "London");

    - **Query syntax:** resembles SQL syntax:

            var custQuery =  
                from cust in customers  
                where cust.City == "London"  
                select cust;

- `Where` operator:
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

- `From` operator (only used in query syntax):
    - declares a range variable that is used to traverse the sequence

            string[] names = { "Hansel", "Gretel", "Helga", "Gus" };

            var query =
                from n in names
                where n.Contains("a")
                select n;

            // Result: Hansel, Helga

- `Select` operator:
    - determines what is returned for each element in the resulting query

            string[] trees = { "Elm", "Banyon", "Rubber" };

            // Query syntax
            var treeQuery =
                from t in trees
                select t.ToUpper();

            // Method syntax
            var treeQuery2 = names.Select(t => t.ToUpper());

            // Result: ELM, BANYON, RUBBER

- Using `List` operations, if we create a `var` for the return query:

        var query = names.Where(n => n.Contains("a"));      // This will be a List or Array (?);

        query.Count();
        foreach(var item in query){};

# SPECIFIC METHODS:
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

### **String methods:** (link to string methods: https://learn.microsoft.com/en-us/dotnet/api/system.string.clone?view=net-8.0)
- Trim:
        greeting.Trim();
        greeting.TrimStart();
        greeting.TrimEnd();

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

### **Numbers methods:**
- Basic Math operations: + - / * %
- Math class methods:
        Math.PI
        int.MaxValue;
        int.MinValue;

### **Array-List-Collection methods:**  (link to methods: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.add?view=net-8.0)
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

### **DateTime:**
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
