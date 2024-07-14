# PYTHON

## INTRODUCTION:
- **Boilerplate:**
    - Refers to the way we wrap the main method (similar to what we do in C#):
        - Typical Python file:

            ```{python3}
            # method declarations

            # main method, that runs all methods we want to use
            def main():
                # method calls

            # "boilerplate"
            if __name__ == '__main__':
                main()

## DATA TYPES
**1. Strings:**
-  `str` built-in class (same as a string literal):
    - encolsed with " or ' ( ' is more common)
    - `\` escape characters work similarly
    - use ''' or """ to do multi-line strings
    - indexing is done with `[]`, and uses traditional 0 indexing
    - it is immutable, but doesn't have a `char` sub-category
    - each line is treated as a separate statements, so very long string declarations should be enclosed in a set of extra parentheses:

        ```{python3}
        text = "This is a simple short text"
        textLong = (
            "We can create very long strings, "
            "that allow us to write into more lines "
            "like this")
    - **Common commands:**
        - `len(string)` 
        - concat with `+`
        - convert to sting value: 

            ```{python3}
            pi = 3.14
            text = 'The value of pi is ' + str(pi)
            ```
        
        - `print` - prints to console
        - using `r` prefix makes the string print as typed: `r'x\nx'` will print **x\nx**
        - **Slicing:**
            - done by `stringName[start:end]`

                ```{python3}
                s = 'hello'
                s[1:4]      // 'ell'
                s[1:]       // 'ello'
                s[:]        // 'Hello'
                s[1:100]    // 'ello'   // too big indices are truncated down to the string length
                s[-1]       // 'o'      // last char (1st from the end)
                s[:-3]      // 'He'
                s[-3:]      // 'llo'
                s[:n] + s[n:] == s      // This is always true, even with negative numbers
                ```
            - or using the `slice(str)` function:

                ```{python3}
                # using notation (as above):
                my_string = "Hello, World!"
                substring = my_string[7:12]

                # using `slice()` function:
                my_string = "Hello, World!"
                slice_object = slice(7, 12)

    - **Common methods:** *( All methods: https://docs.python.org/3/library/stdtypes.html#string-methods )*
        - `s.lower()`, `s.upper()`
            - returns the lowercase or uppercase version of the string
        - `s.strip()` 
            - returns a string with whitespace removed from the start and end
        - `s.isalpha()`/`s.isdigit()`/`s.isspace()`... 
            - tests if all the string chars are in the various character classes
        - `s.startswith('other')`, `s.endswith('other')` 
            - tests if the string starts or ends with the given other string
        - `s.find('other')` 
            - searches for the given other string (not a regular expression) within s, and returns the first index where it begins or -1 if not found
        - `s.replace('old', 'new')` 
            - returns a string where all occurrences of 'old' have been replaced by 'new'
            - Example:
                
                ``` {pyton3}
                txt = "one one was a race horse, two two was one too."
                x = txt.replace("one", "three")
                ```
                
        - `s.split('delim')` 
            - returns a list of substrings separated by the given delimiter.
            - The delimiter is not a regular expression, it's just text:
                    
                ```{python}
                'aaa,bbb,ccc'.split(',') -> ['aaa', 'bbb', 'ccc'].
                ```

            - As a convenient special case s.split() (with no arguments) splits on all whitespace chars.
        - `s.join(list)`    
            - opposite of split(), joins the elements in the given list together using the string as the delimiter. e.g. '---'.join(['aaa', 'bbb', 'ccc']) -> aaa---bbb---ccc

    - **String formatting / f-strings:** *( Format specs: https://docs.python.org/3/library/string.html#formatspec )*
        - We can add variables to the string literals like this, adding them into `{}`:

            ```{pyhton}
            car = {'tires':4, 'doors':2}
            print(f'car = {car}') # car = {'tires': 4, 'doors': 2}
            ```
        
        - Or do formatting operations, like rounding to 2 decimals:

            ```{pyhton}
            value = 2.791514
            print(f'approximate value = {value:.2f}')  # approximate value = 2.79
            ```
        
        - Create tables:

            ```{python}
            address_book = [{'name':'N.X.', 'addr':'15 Jones St', 'bonus': 70},
                {'name':'J.P.', 'addr':'1005 5th St', 'bonus': 400},
                {'name':'A.A.', 'addr':'200001 Bdwy', 'bonus': 5},]

            for person in address_book:
                print(f'{person["name"]:8} || {person["addr"]:20} || {person["bonus"]:>5}')

            # N.X.     || 15 Jones St          ||    70
            # J.P.     || 1005 5th St          ||   400
            # A.A.     || 200001 Bdwy          ||     5
            ```
        


**2. Numbers:**
- normal operations work, but not `++` or `--`
- we can still use `+=` or `-=`
- explicit integer division is done wiht `//`

- Arithmetic operations:
    - `+`, `-`, `*`, `/`, `%`, `**`, `//` (floor division)

- **Common methods:**
    - Convert string into a number:
        
        ```
        num_str = "123"
        num_int = int(num_str)
        ```
        
    - Add `n` number of arguments:

        ```
        def add(*args)
            return sum(args)
        ```
        
**3. Sequence types:**
- **List:**
    - A dynamic array that can hold elements of different types
    - Syntax:
        - create: `my_list = [1, 2, 3, 4, 5]`

- **Tuple:**
    - An immutable array
    - Syntax:
        - create: `my_list = (1, 2, 3, 4, 5)`

- **Array:**
    - More efficient, but has to be imported
    - Syntax:
        
        ```
        import array
        my_array = array.array('i', [1, 2, 3, 4, 5])  # 'i' is the type code for integers
        ```

- **NumPy array:**
    - Used for scientific computing with large datasets
    - Syntax:

        ```
        import numpy as np
        my_numpy_array = np.array([1, 2, 3, 4, 5])
        ```

- **Common methods:**
    - Lists:
        - Access an element by index: `my_list[0]` (gets the first element)
        - Slice a list: `my_list[1:3]` (gets elements from index 1 to 2)
        - Append an element: `my_list.append(6)`
        - Remove an element: `my_list.remove(3)`
        - Length of list: `len(my_list)`
    - Tuples:
        - Access an element by index: `my_tuple[0]`
        - Slice a tuple: `my_tuple[1:3]`
        - Length of tuple: `len(my_tuple)`
    - Arrays:
        - Access an element by index: `my_array[0]`
        - Append an element: `my_array.append(6)`
        - Remove an element: `my_array.remove(3)`
    
    - Conversion:
        - Convert a list into a string:

            ```
            char_list = ['h', 'e', 'l', 'l', 'o']
            result_string = ''.join(char_list)
            ```




## CONTROL STATEMENTS:
- In `Python` we don't need to enclose statements in `{}`, we use a `:` instead:
    
    ```{python}
    if time_hour >= 0 and time_hour <= 24:
        print('Suggesting a drink option...')
    if mood == 'sleepy' and time_hour < 10:
        print('coffee')
    elif mood == 'thirsty' or time_hour < 2:
        print('lemonade')
    else:
        print('water')

    ## We can also write things in one line, if the code is short:
    if time_hour < 10: print('coffee')
    else: print('water')
    ```
- **Comparison operators:**
    - ==, !=, <, <=, >, >=
    - `and`, `or`, `not` are used intead of `&&`, `||`, `!`

## FUNCTIONS
- Basic syntax and call:

    ``` {python}
    def my_function():
        print("Hello as a printed string")
        OR
        return "Hello as a value returned" # But not printed!

    my_function()
    ```

- Arguments:

    ```{python}
    def greet(name):
        print("Hello " + name + "!")
        OR
        return f"Hello, {name}!" #still needs to be printed!
    
    greet("Gabor")
    print(greet("Joska")) # for the return option
    ```