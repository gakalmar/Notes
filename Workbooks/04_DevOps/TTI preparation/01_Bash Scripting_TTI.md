# BASH SCRIPTING

- When you write a script, it will be executed as if you would execute it from the command line in the directory your file is saved in 
    - eg. `ls` command in the script will list all the contents of the directory you're in

1. **Always start with:**
    - create a working folder `mkdir practice`, `cd practice`
    - nano `scriptfile.sh`:

            #!/bin/bash
            echo "test"

    - save (`Ctrl+X` / `Y`)
    - make it executable: `chmod +x scriptfile.sh`
    - execute script: `./scriptfile.sh` (don't forget the `./` in the beginning!)

2. **Adding variables:**
    - Declaring variables in the script:

            #!/bin/bash
            greeting="Hello"
            echo "$greeting World!"

    - Add input variable with `read` keyword:

            #!/bin/bash
            echo "Please enter your name:"
            read name       # name variable gets created from the input value
            echo "Hello, $name!"
    
    - Using external input (=parameters)
        - built-in varibles, that you can use, but can't reassign their values:
            - `$0 - $9` and `$#`
                - `$0` the basename of the program as it was called
                - `$1 - $9`: the first 9 additional params the script can be called with
                - `$@` means all parameters
                - `$*` all params, without whitespace or quoting
                - `$#` is the number of params the script was called with
                - `$?` contains the exit value of the last run command
            - example:

                    #!/bin/bash

                    if [ $# -ne 2 ]; then
                        echo "Please provide exactly two numeric arguments."
                        exit 1
                    fi

                    echo $(($1 + $2))

3. **Conditionals:**
    - Using an `if` statement:

            #!/bin/bash

            greeting="Welcome, "
            question="What's your name?"
            admin_name="Gabor"

            echo $question
            read name

            if [ "$name" == "$admin_name" ]; then
                echo "$greeting Admin!"
            else
                echo "$greeting $name!"
            fi

4. **Loops:**
    - Using a `for` loop:
            
            #!/bin/bash

            names=("Alice" "Bob" "Charlie" "Diana")

            for name in "${names[@]}"
            do
                echo "Hello, $name!"
            done

    - Using a `while` loop:

            #!/bin/bash

            echo "Enter the starting number for the countdown:"
            read count

            while [ $count -gt 0 ] # gt="greater than"
            do
                echo "Countdown: $count"
                count=$((count - 1))
            done

            echo "Blast off!"

5. **Functions:**
    - A simple greeting function:

            #!/bin/bash

            greet() {
                local name=$1  # $1 refers to the first argument passed to the function
                echo "Hello, $name!"
            }

            echo "Enter your name:"
            read user_name

            greet "$user_name"

6. **Formatting:**
    - Subshell/Command Substitution: `$()`
        - Use it to reuse the return value for something else:
                
                files=$(ls) # creates and array of the files
                echo "Files in directory: $files"
    
    - Arithmetic expansion: `$(())`
        - It's explicitly made for arithmetic operations:

                result=$((3 + 5))
                echo $result  # Outputs: 8
    
    - Pipe: `|`
        - Used to pass the output of one command as input to another command:
            - `cat file.txt | grep "search_term"`
                - `cat` outputs the content of `file.txt`, and `grep` searches this content for `search_term`
        
    - Redirect Output: `>`; `>>` 
        - Used to redirect the output of a command to a file:
            - `>` overwrite file completely:
                - `echo "Hello, world!" > output.txt`
            - `>>` append to end of file
                - `echo "This is a new line" >> output.txt`

    - Here Document: `<<`
        - Used to redirect multi-line input into a command:

                cat <<EOF > file.txt
                Line 1
                Line 2
                Line 3
                EOF     # "Line 1 Line 2 Line 3" will be redirected to file.txt

7. **Commands:**
    - `sed` = "Stream editor: *( https://www.howtogeek.com/666395/how-to-use-the-sed-command-on-linux/ )*
        - utility for processing text (a text editor without an interface)
        - reads input line by line (from a file or a pipeline)
        - **Features and examples:**
            - Text substitiution:
                - find and replace text:
                    - `sed 's/old/new/' file.txt`
            - Selective Printing
                - print specific lines based on a pattern match or line number:
                    - `sed -n '/pattern/p' file.txt`
            - In-place Editing
                - edit files in place using the -i option:
                    - `sed -i 's/old/new/g' file.txt`
            - Line Deletion:
                - delete lines from a file based on a pattern match or line number:
                    - `sed '/pattern/d' file.txt`
            - Multiline operations:
                - allowing complex patterns and substitutions spanning across line boundaries
            - Script Files:
                - `sed` commands can be stored in a script file and executed

    - `grep` *( https://www.howtogeek.com/496056/how-to-use-the-grep-command-on-linux/ )*
        - a command-line utility to filter text
        - **Features:**
            - allows pattern matching
            - can recursively search directories with `-r` or `-R`
            - displays line numbers with `-n`
            - count mathches with `-c`
            - invert mathch with `-v`
            - hoghlight matches with `--color`
        - **Examples:**
            - Basic Search:
                - `grep "example" sample.txt`
                - This command will print all lines from `sample.txt` that contain the word `example`.
            - Case Insensitive Search:
                - `grep -i "error" file.txt`
            - Recursive Search:
                - `grep -r "error" .`
            - Counting Occurrences:
                - `grep -c "error" file.txt`
            - Invert Match:
                - `grep -v "error" file.txt`
            - Regular Expression Search:
                - `grep "^error.*" file.txt`

    - `awk` *( https://www.howtogeek.com/562941/how-to-use-the-awk-command-on-linux/ )*
        - used as a powerful tool for data extraction and reporting
        - works by scanning a file line by line, splitting each line into fields, and processing it with patterns and actions defined in a script
        - **Features:**
            - automatically splits each line of input into fields (data is structured into columns)
            - has built-in variables, eg `NR` or `NF`
            - allows pattern matching
            - supports arithmetic string operations
            - supports conditional statements
        - **Examples:**
            - Print Specific Fields:
                - `awk '{print $1, $3}' file.txt`
            - Sum a Column of Numbers:
                - `awk '{sum += $1} END {print sum}' file.txt`
            - Filter Based on Condition:
                - `awk '$2 > 10' file.txt`
            - Formatting Output:
                - `awk '{print "Value:", $1}' file.txt`
    
    - `jq` *( https://www.baeldung.com/linux/jq-command-json )*
        - a lightweight and flexible command-line JSON processor
        - transform structured data in a similar way as the above, but work with JSON
        - uses a query language
        - **Examples:**
            - Pretty Print JSON: 
                - `cat file.json | jq .`
                - formats and prints the entire JSON file in a human-readable form
            - Extract a Specific Field:
                - `echo '{"name": "John", "age": 30}' | jq '.name'`
                - This would output "John".
            - Filter an Array Based on Condition:
                - `echo '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' | jq '.[] | select(.age > 25)'`
                - returns the object(s) in the array where age is greater than 25
            - Map an Array:
                - `echo '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' | jq 'map(.name)'`
                - produce an array of names
            - Modify and Add New Fields:
                - `echo '{"name": "John", "age": 30}' | jq '. + {"job": "Developer"}'`
                - adds a new "job" field to the JSON object
            - Combine `jq` with other commands:
                - eg use it with `curl` to fetch data from a web API and pipe it into `jq`:
                    - `curl 'https://api.example.com/data' | jq '.data'`
                    - fetch JSON data from the specified API and use jq to extract the .data portion of the response
            - Use `-r` flag so that it returns string data without ""s, eg:
                - `echo '{"name": "Harry Potter"}' | jq '.name'`
                    - returns `"Harry Potter"`
                - `echo '{"name": "Harry Potter"}' | jq -r '.name'` 
                    - returns `Harry Potter`
            - Using arrays:
                - Access specific elements from a list of items
                    - `echo '{"numbers": [1, 2, 3, 4, 5]}' | jq '.numbers[2]'`
                        - gets `3`
                - Slicing:
                    - `echo '{"numbers": [1, 2, 3, 4, 5]}' | jq '.numbers[1:4]'` 
                        - gets `[2, 3, 4]` # the first one included, the second excluded
                - Using map:
                    - `echo '{"numbers": [1, 2, 3, 4, 5]}' | jq '.numbers | map(. * 2)'`
                        - returns `[2, 4, 6, 8, 10]`
                - Create a unique list of items:
                    - `echo '{"numbers": [1, 2, 2, 3, 4, 4, 5, 1]}' | jq '.numbers | unique'`
                        - returns `[1, 2, 3, 4, 5]`

8. **Doing math:**
- We will need `bc` (basic calculator) for more complex operations:
    - `sudo apt update`
    - `sudo apt install bc`

- Exponential:

        #!/bin/bash

        echo "Enter the base:"
        read base
        echo "Enter the exponent:"
        read exponent
        result=$(echo "$base ^ $exponent" | bc)
        echo "The result of $base raised to the power of $exponent is $result"

- Square root:

        #!/bin/bash

        echo "Enter the number to get the square root of!"
        read number
        sqrt_result=$(echo "sqrt($number)" | bc)
        echo "The square root of $number is $sqrt_result"

9. Input validation:
- Check if there is an input provided:

        if [ -z "$1" ]; then
            echo "Error: No input provided."
            exit 1
        fi

- Check number of args:

        if [ $# -ne 1 ]; then
            echo "Error: Please provide exactly one numeric argument."
            exit 1
        fi

- Check if it's a float (2 steps!):

        is_number() {
            [[ $1 =~ ^-?[0-9]+(\.[0-9]+)?$ ]]
        }

        if ! is_number "$1"; then
            echo "Error: The provided argument is not a valid number."
            exit 1
        fi

- Check if it's an integer:
        
        is_integer() {
            [[ $1 =~ ^-?[0-9]+$ ]]
        }

        if ! is_integer "$1"; then
            echo "Error: The provided argument is not a valid integer."
            exit 1
        fi

- Check for string input: (everyhting is a string!)

        is_alphabetic() {
            [[ $1 =~ ^[a-zA-Z]+$ ]]
        }

        if is_alphabetic "$1"; then
            echo "The provided argument is a valid alphabetic string."
        else
            echo "Error: The provided argument is not a valid alphabetic string."
            exit 1
        fi

- Check for input length:

        if [ ${#1} -lt 8 ]; then
            echo "Error: The input must be at least 8 characters long."
            exit 1
        fi

- Range check (used in combination with integer check first!)

        if [ "$1" -lt 10 ] || [ "$1" -gt 100 ]; then
            echo "Error: Input must be between 10 and 100."
            exit 1
        fi

- Check if file exists:

        if [ ! -f "$1" ]; then
            echo "Error: File does not exist."
            exit 1
        fi
# SOME TYPICAL EXAMPLES:
1. Log File Analysis:
    - Task: Write a script to find and count the number of "ERROR" entries in a log file:

            #!/bin/bash

            # Check if the file path is provided
            if [ $# -eq 0 ]; then
                echo "Please provide the log file path."
                exit 1
            fi

            # Counting ERROR entries
            error_count=$(grep -c "ERROR" $1)

            # Output the result
            echo "Number of ERROR entries: $error_count"

2. Backup Script:
    - Task: Create a script to backup a directory to a specified location. The script should take two arguments: source directory and backup directory.

            #!/bin/bash

            # Check for correct number of arguments
            if [ $# -ne 2 ]; then
                echo "Usage: $0 <source-dir> <backup-dir>"
                exit 1
            fi

            # Create a backup
            cp -R "$1" "$2"

            # Verify and report success
            if [ $? -eq 0 ]; then
                echo "Backup completed successfully."
            else
                echo "Backup failed."
            fi

3. Replace pattern in text:
    - Replace every occurrence of "hello" with "hi".

            #!/bin/bash

            # File to modify
            file="example.txt"

            # Backup the original file before modification
            cp $file "${file}.bak"

            # Use sed to replace 'hello' with 'hi'
            sed -i 's/hello/hi/g' $file

4. Find occurrances of a word:
    - count the occurrences of a specified input parameter (a search pattern) within a text file:

            #!/bin/bash

            # Check if the correct number of arguments was given
            if [ $# -ne 2 ]; then
                echo "Usage: $0 <search_string> <filename>"
                exit 1
            fi

            # Assign command line arguments to variables
            search_string=$1
            filename=$2

            # Use grep to count the occurrences of the search string in the file
            count=$(grep -o -i "$search_string" "$filename" | wc -l)

            # Output the result
            echo "The string '$search_string' appears $count times in $filename."

    - `-o`: (only matching) This option tells grep to output only the parts of the line that match the search string. Without this, grep would output entire lines, making it difficult to count multiple occurrences within the same line.
    - `-i`: This makes the search case-insensitive
    - `wc -l`: This command counts the number of lines passed to it, which in this case corresponds to the number of matches found by grep

5. API retriever:
    - Get data from an API and do something with the data:
        - Pretty print the whole response:
            - `curl -s https://hp-api.onrender.com/api/characters | jq '.'`
                - `-s` means silent, it doesn't display search table
        - Select all characters from house Gryffindor:
            - `curl -s https://hp-api.onrender.com/api/characters | jq '[.[] | select(.house == "Gryffindor")]'`
                - `.[]` iterates through all elements when we get back an array
                - the additional `[ ... ]` is used for formatting, alternatively we can use `-r` flag (see last example)
        - Transform also the return data to list only the names:
            - `curl -s https://hp-api.onrender.com/api/characters | jq '[.[] | select(.house == "Gryffindor") | .name]'`
        - Or get the length of the list:
            - `curl -s https://hp-api.onrender.com/api/characters | jq '[.[] | select(.house == "Gryffindor")] | length'`
        - Combine search criteria:
            - `curl -s 'https://hp-api.onrender.com/api/characters' | jq '[.[] | select(.house == "Gryffindor" and (.name | test("Weasley"; "i")))]'`
            - `curl -s 'https://hp-api.onrender.com/api/characters' | jq -r '.[] | select(.house == "Gryffindor" and (.name | test("Weasley"; "i"))) | .name'`
    
    - In a script, with a parameter:

            #!/bin/bash

            # Check if the house name is provided as an argument (display instructions otherwise)
            if [ $# -eq 0 ]; then
                echo "Usage: $0 <house-name>"
                echo "Example: $0 Gryffindor"
                exit 1
            fi

            # Assign the first command line argument to a variable
            house="$1"

            # Fetch data using curl and filter it using jq
            data=$(curl -s 'https://hp-api.onrender.com/api/characters' | jq --arg house "$house" '[.[] | select(.house == $house) | .name]')

            # Check if data contains any characters
            if [ -z "$data" ]; then
                echo "No characters found in $house."
            else
                echo "Characters from $house:"
                echo "$data"
            fi
    
    - API request generic response:
        - curl -s "<URL>" | jq -r '.[].name'    # get the name key's value of the array

6. Simple calculator:
    - Write a script that takes any number of numerical arguments and calculates their sum:

            #!/bin/bash

            sum=0

            for num in "$@"
            do
                sum=$((sum + num))
            done

            echo "The sum is: $sum"


