# SHELL SCRIPTING (BOURNE SHELL?)

- Cheatsheet: *( https://www.shellscript.sh/quickref.html )*
- Guide & Tutorial: *( https://www.shellscript.sh/ )*
- More complex operations: *( https://www.purdue.edu/hla/sites/varalalab/wp-content/uploads/sites/20/2018/02/Lecture_5.pdf )*

## SUBSHELLS

## SET DIRECTIVES
    - `

## BASICS 
- we always start with `#!/bin/sh` in the first line of the `.sh` file
- **Variables:**
    - a variable can only hold one value
    - values are stored as strings
    - we use all capitals, and separate the words with underscore
    - we add no space between the expression, just `=` sign:
        - `MY_MESSAGE="Hello World!"`
    - refer to a variable:
        - we need to use the `$` sign, otherwise it will try to look for a command with this name
        - when we assign a value, we don't need the `$`, because of the `=`
        - Example:
            - `echo "$MY_MESSAGE"` or `echo $MY_MESSAGE`
            
    - **Scope:**
        - undeclared variables return an emtpy string, not an error - this can lead to bugs, if there's a typo
        - if we declare a variable in the interactive shell (outside a script), we need to export it, to use it inside a shell, otherwise it will be considered a different variable:
            
            - `myvar.sh`:
                ```{bash}
                #!/bin/sh
                echo "MYVAR is: $MYVAR"
                MYVAR="hi there"
                echo "MYVAR is: $MYVAR"
                ```
                
                - interactive terminal:
                ```{bash}
                MYVAR=hello     # we assigned "hello" outside the script
                ./myvar.sh      # will print the first value as ""
                ```

                - interactive terminal using `export`:
                ```{bash}
                MYVAR=hello     # we assigned "hello" outside the script
                export MYVAR    # we used export, so we can see it inside the script
                ./myvar.sh      # will print the first value as ""
                ```

        - the script temporarily changes the value of `MYVAR` later, but once the script runs, the value goes back to the original "hello"
            - If we don't want this behaviour, we need to source the script, using `.` (this means to receive environment changes back from the script):
                ```{bash}
                $ MYVAR=hello
                $ echo $MYVAR
                hello
                $ . ./myvar2.sh     # Note we used `.` to call the script
                MYVAR is: hello     # Note that in this case, we don't need to export MYVAR!
                MYVAR is: hi there
                $ echo $MYVAR       # when we call it again outside the script, the updated value will be called
                hi there
                ```
            - `.profile` or `.bash_profile` file works also on this basis
        
        - using curly brackers to suffix a value:
            ```{bash}
            #!/bin/sh
            echo "What is your name?"
            read USER_NAME
            echo "Hello $USER_NAME"
            echo "I will create you a file called ${USER_NAME}_file"    # we use the curly brackets here to
            touch "${USER_NAME}_file"                                   # separate from _file
            ```

            - another example:
            ```{bash}
            foo=sun
            echo $fooshine     # $fooshine is undefined
            echo ${foo}shine   # displays the word "sunshine"
            ```
        
        - More on curly brackets: `{}`:
            - prompt the user for input, but accepts defaults:
                ```{bash}
                #!/bin/sh
                echo -en "What is your name [ `whoami` ] "      // `-en` means don't add linebreak
                read myname
                if [ -z "$myname" ]; then
                myname=`whoami`
                fi
                echo "Your name is : $myname"
                ```
            
            - we can also use `:-` or `:=` to set default values like this:
                - using `:-`:
                    - `echo "Your name is : ${myname:-John Doe}"`
                - using `:=`:
                    - `echo "Your name is : ${myname:=John Doe}"`
                - or with variables:
                    ```{bash}
                    echo -en "What is your name [ `whoami` ] "
                    read myname
                    echo "Your name is : ${myname:-`whoami`}"
                    ```

    - **Preset variables:**
        - built-in varibles, that you can use, but can't reassign their values
            - `$0 - $9` and `$#`
                - `$0` the basename of the program as it was called
                - `$1 - $9`: the first 9 additional params the script can be called with
                - `$@` means all parameters
                - `$*` all params, without whitespace or quoting
                - `$#` is the number of params the script was called with
                - `$?` contains the exit value of the last run command
            - `$$` and `$!` process numbers
                - `$$` is a PID (process identifier number) of the currently running shell
                - `$$` is a PID (process identifier number) of the last run background process
            - `IFS` (Internal Field Separator)
                - default value is `SPACE TAB NEWLINE`
            - `shift`
                - removes the first argument from the all arguments list:
                    - we have 3 args
                    - we then write `shift` in our script
                    - if we list all arguments again, we will have only the last 2 

- **Functions:**
    - **Procedure vs function:**
        - Function: it returns a single value, and does not output anything
        - Procedure: does not return a value, but may produce output
    - **2 main approaches:**
        - **Create in place:**
            - with a simple script, the function is simply declared in the same file as it is called
        - **Import functions:**
            - when writing a suite of scripts, it is often easier to write a "library" of useful functions, and source that file at the start of the other scripts
            - in this case we add this to the first line of the script, where we want to use the funtion:
                - `. ./library.sh`
    - Syntax:
        ```{bash}
        function func_name () {
            commands
        }

        # OR we can just omit the "function" keyword:
        func_name () {
            commands
        }
        ```

    - 4 ways to end a function (return a value):
        - Change the state of a variable or variables
        - Use the `exit` command to end the shell script (=stops the program)
        - Use the `return` command to end the function, and return the supplied value to the calling section of the shell script (=returns control to the caller)
        - echo output to `stdout`, which will be caught by the caller just as c=`expr $a + $b` is caught
    
    - Key points:
        - The function definition must be placed before any calls to the function
        - It must be called to be executed
        - When using single line “compacted” functions, a semicolon ; must follow the last command in the function:
            - `function_name () { commands; }`

    - A sample of a script using a function:
            ```{bash}
            #!/bin/sh
            # A simple script with a function...

            add_a_user()        # function declaration, because of `()` ending, then code in `{}`
            {
            USER=$1
            PASSWORD=$2
            shift; shift;
            # Having shifted twice, the rest is now comments ...
            COMMENTS=$@
            echo "Adding user $USER ..."
            echo useradd -c "$COMMENTS" $USER
            echo passwd $USER $PASSWORD
            echo "Added user $USER ($COMMENTS) with pass $PASSWORD"
            }

            ###
            # Main body of script starts here
            ###
            echo "Start of script..."
            add_a_user bob letmein Bob Holness the presenter
            add_a_user fred badpassword Fred Durst the singer
            add_a_user bilko worsepassword Sgt. Bilko the role model
            echo "End of script..."
            ```
        - Note that for this example the `useradd` and `passwd` commands have been prefixed with `echo` - this is a useful debugging technique to check that the right commands would be executed. It also means that you can run the script without being root or adding dodgy user accounts to your system
        - the function add_a_user is read in and checked for syntax, but not executed until it is explicitly called
        - parameters are passed using `$1`, `$2` and `$@` for rest (=shift command)
        - So within that function, `$1` is set to `bob`, regardless of what `$1` may be set to outside of the function:
            - So if we want to refer to the "original" `$1` inside the function, we have to assign a name to it such as: `A=$1` before we call the function. Then, within the function, we can refer to `$A`.
    
    - **Scope rules for shell functions:**
        - In Bash, all variables by default are defined as global, even if declared inside the function
        - there is no scoping, other than the parameters (`$1`, `$2`, `$@`, etc)
        - there is a different behaviour when **piping** (?)
        - Functions cannot change the values they have been called with, either, but we can change the values they have been called with (eg a parameter in the main script)
        - Local variables can be declared within the function body with the `local` (these will only live inside the funtion's scope)
    
    - **Recursion:** (?)
        - Functions can be recursive, eg:
            ```{bash}
            #!/bin/sh

            factorial()
            {
            if [ "$1" -gt "1" ]; then
                i=`expr $1 - 1`
                j=`factorial $i`
                k=`expr $1 \* $j`
                echo $k
            else
                echo 1
            fi
            }


            while :
            do
            echo "Enter a number:"
            read x
            factorial $x
            done
            ```
    
    - **Using libraries between shell scripts:**
        - can also be used to define common variables
        - How to use example:
            - two user shell scripts, `function2.sh` and `function3.sh`, each sourcing the common library file `common.lib`, and using **variables** and **functions** declared in that file
            - `common.lib`
                ```{bash}
                # common.lib
                # Note no #!/bin/sh as this should not spawn 
                # an extra shell. It's not the end of the world 
                # to have one, but clearer not to.
                #
                STD_MSG="About to rename some files..."

                rename()
                {
                # expects to be called as: rename .txt .bak 
                FROM=$1
                TO=$2

                for i in *$FROM
                do
                    j=`basename $i $FROM`
                    mv $i ${j}$TO
                done
                }
                ```
            - `function2.sh`
                ```{bash}
                #!/bin/sh
                # function2.sh
                . ./common.lib
                echo $STD_MSG
                rename .txt .bak
                ```
            - `fucntion3.sh`
                ```{bash}
                #!/bin/sh
                # function3.sh
                . ./common.lib
                echo $STD_MSG
                rename .html .html-bak
                ```
    
    - **Return codes:**
        - All exit codes here: *( https://www.shellscript.sh/exitcodes.html )*
        - Bash functions don’t allow you to return a value when called:
            - When a bash function completes, its return value is the status of the last statement executed in the function:
                - `0` for `success` and non-zero decimal number in the `1 - 255` range for `failure`
                - return status can be specified by using the `return` keyword, and it is assigned to the variable `$?`:
                    - example:
                        ```{bash}
                        #!/bin/bash

                        my_function () {
                        echo "some result"
                        return 55
                        }

                        my_function
                        echo $?
                        
                        # output will be "some result", then "55"
                        ```

                - Well-behaved applications should return zero on success:
                    - *"One of the main causes of the fall of the Roman Empire was that, lacking zero, they had no way to indicate successful termination of their C Programs. (Robert Firth)"*
                - We can still return values from functions like this:
                    ```{bash}
                    #!/bin/bash

                    my_function () {
                    local func_result="some result"     ## note this is local now!
                    echo "$func_result"
                    }

                    func_result="$(my_function)"        # here we call the function while assigning it to func_results with $""
                    echo $func_result
                    ```

- **Arrays:**
    - 2 types:
        - **indexed array:** (=JS array)
            - information is stored in an indexed way (the keys are ordered integers)
        - **associative array:** (=JS object)
            - arrays in which the keys are represented by strings
    - **Create an array:**
        - Declare syntax:
            - `declare -a my_array` (`-a` for indexed array)
            - `declare -A my_array` (`-A` for associative array)
        - Create and assign:
            - `my_array=(foo bar)`
        - Insert just one value to an index:
            - `my_array[0]=foo`
        - Create from command:
            - `SKEL_CONTENTS=$(ls /etc/skel)`
    - **Array operations:**
        - Print the values of an array:
            - `echo ${my_array[@]}` (creates individula elements - use this with loops!)
            - `echo ${my_array[*]}` (creates a single output, with all values joined together)
        - Loops:
            - `for index in "${my_array[@]}"; do echo "$index"; done`
        - Print the keys of a bash array:
            - `for index in "${!my_array[@]}"; do echo "$index"; done` (identical syntax, just added `!`)
            - when using this on indexed arrays, we will see the index numbers
    - **Getting the size of an bash array:**
        - `echo ${#my_array[@]}`
    - **Adding elements:**
        - Indexed array:
            - `my_array+=(baz)`
            - `my_array+=(baz foobar)` (add multiple elements at the time)
        - To add elements to an associative array, we need to specify the keys also
            - `my_array+=([baz]=foobar [foobarbaz]=baz)`
    - **Deleting an element from the bash array:**
        - Delete by index:
            - `unset my_array[1]`
        - Delete by key:
            - `unset my_array[foo]`
        - Delete the whole array:
            - `unset my_array`

- **Conditionals:**
    - **syntax:**
        ```{bash}
        if [ condition ]; then
            command1
        else
            command2
        fi
        ```
    - **Conditions (test operators):**
        - Files:
            - `-e FILE`: True if FILE exists.
            - `-f FILE`: True if FILE exists and is a regular file.
            - `-d DIRECTORY`: True if DIRECTORY exists and is a directory.
            - `-s FILE`: True if FILE exists and is not empty.
            - `-r FILE`: True if FILE exists and is readable.
            - `-w FILE`: True if FILE exists and is writable.
            - `-x FILE`: True if FILE exists and is executable.
            - `-L FILE`: True if FILE exists and is a symbolic link.
        - Strings:
            - `STRING1 = STRING2`: True if the strings are equal.
            - `STRING1 != STRING2`: True if the strings are not equal.
            - `-z STRING`: True if the string is empty.
            - `-n STRING`: True if the string is not empty (i.e., has a length greater than 0).

        - Arithmetic:
            - `NUM1 -eq NUM2`: True if NUM1 is equal to NUM2.
            - `NUM1 -ne NUM2`: True if NUM1 is not equal to NUM2.
            - `NUM1 -lt NUM2`: True if NUM1 is less than NUM2.
            - `NUM1 -le NUM2`: True if NUM1 is less than or equal to NUM2.
            - `NUM1 -gt NUM2`: True if NUM1 is greater than NUM2.
            - `NUM1 -ge NUM2`: True if NUM1 is greater than or equal to NUM2.
        
        - Logical:
            - `! EXPRESSION`: True if EXPRESSION is false.
            - `EXPRESSION1 -a EXPRESSION2`: True if both EXPRESSION1 and EXPRESSION2 are true (-a is logical AND).
            - `EXPRESSION1 -o EXPRESSION2`: True if either EXPRESSION1 or EXPRESSION2 is true (-o is logical OR).

        - Using `[[ ]]` for More Features:
            - When using `[[ ]]` for conditionals in Bash, you get access to additional features like pattern matching with `==` and `!=`, and regular expressions with `=~`.
        
        - Examples:

            ```{bash}
            if [ -f "$file" ]; then
                echo "$file exists and is a regular file."
            fi

            if [[ "$str1" = "$str2" ]]; then
                echo "The strings are equal."
            fi

            if [[ "$num1" -gt "$num2" ]]; then
                echo "$num1 is greater than $num2."
            fi
            ```

## DATABASES
- **Connect to Postgres Database in Unix Shell Script:** *( https://www.folkstalk.com/2014/05/connect-to-postgres-database-in-unix-shell-script.html )*
    - The `postgres` command line utility, `psql`, can be used to connect to a database and run queries.
    - Syntax: `psql [option] [dbname[username]]`
        - Flags:
            - `-h` the host to connect to
            - `-U` the user to connect with
            - `-p` the port to connect to (default is 5432)
            - eg `psql -h localhost -U username databasename`
    
    - The following shell **script** connects to the postgres database, runs the select query and prints the result:
        ```{bash}
        #!/bin/sh
        DATABASE=pg_database_name
        USERNAME=pg_username
        HOsTNAME=pg_hostname
        export PGPASSWORD=pg_db_password

        psql -h $HOSTNAME -U $USERNAME $DATABaSE << EOF
        select * from table_name
        EOF
        ```
        - the password is exported to `PGAPASSWORD` variable in the shell script
        - If you dont want your password (hide password) to be in the script file, then put that export statment in the `.bash_profile` file, or use the `.pgpass` file where you can save your postgres connection details (see below)

    - `pgpass` File to Store Connection Details:
        - lines should be in this format: `hostname:port:database:username:password`
        - Place the `pgpass` file in the users home directory
            - If you want to place the `pgpass` file in any other directory, then reference the path of the file by `PGPASSFILE` variable.
        - In the shell script, you can skip all the connection details and simply use the psql command as shown in the following script:
            ```{bash}
            #!/bin/sh
            psql << EOF
            select * from table_name
            EOF
            ```
    
    - Once you’ve connected you can begin querying immediately ( https://www.postgresguide.com/utilities/psql/ )
        - `\?` will give you a list of all available commands
        - Some key commands:
            - Turn query timing on:
                - `\timing`
            - List tables in database (with additional info):
                - `\d` / `\d+`
            - Describe a table (with additional info)
                - `\d tablename` / `\d+ tablename`
            - List all databases (with additional info)
                - `\l` / `\l+`
            - List all schemas (with additional info)
                - `\dn` / `\dn+`
            - List all functions (with additional info)
                - `\df` / `\df+`
            - Connect to another database
                - `\c dbname`
            - quit from postgres shell:
                - `\q`
            - text editor inside psql:
                - `\e`
        - The commands can be given a regex for eg. `\df *to_array*` lists all functions that contain to_array in its name.

    

## COMMANDS:
- Work with git bash:
    - clone repo, you can navigate to C:\ with `cd /c/`
    - then you can open the files with nano
    - you can run a script using `./sriptname.sh` 
    - paste something with `Shift + Insert`

    - use `$` to call a variable, eg `$name`
    - use `funcname` to call a function (note no parentheses!)
    - `echo` 
        - print out something
        - you can have multiple variables, just add "" to specify which words belong together:
            - `echo "Some message" $variable "some other message"`
    - `read` "question" variable - logs something, then stores the response in a variable
        - **Sanitizing:**
            - means to check data right after input, and clean or transform it

    - Syntax:
        - Create a function:

                funcname() {
                    # FUNC BODY
                }
            
            - refer to a local variable in it using it's name
            - refer to an external variable (an argument), using `$1` - `$9` or `$@`

        - If-else statement:

                if [ condition ]        // eg [ -z "$name" ] check if "$name" is empty or not
                then
                    # command
                else
                    # command
                fi

## WORKFLOWS:
### Bash Scripting task: https://journey.study/v2/learn/courses/252/modules/29404/units/0/TEAM/15139
1. Create script that lists all hidden files and folders:
    ```{bash}
    #!/bin/bash
    find_hidden_files ()  {
        local directory=$1 # the directory is added as a parameter
        if [[ -d "$directory" ]];
        then
            echo "Hidden files in $directory:"
            # ls -A "$directory" | grep '^\.'
            find "$directory" -mindepth 1 -maxdepth 1 -type f -name ".*" -print
        else
            echo "Directory does not exist: $directory"
        fi
    }

    find_hidden_directories ()  {
        local directory=$1 # the directory is added as a parameter
        if [[ -d "$directory" ]];
        then
            echo "Hidden directories in $directory:"
            find "$directory" -mindepth 1 -maxdepth 1 -type d -name ".*" -print #depth means only look on this level
        else
            echo "Directory does not exist: $directory"
        fi
    }


    directory=$1
    find_hidden_files "$directory"
    find_hidden_directories "$directory"
    ```

2. Check if /etc/skel files match user's files:
    ```{bash}
    #!/bin/bash
    check_skel_files() {
        local home_dir=$HOME # get home directory of user
        local skel_contents=$(ls -A /etc/skel)

        echo "Checking '$home_dir':"

        for item in $skel_contents; do
        if [ -e "$home_dir/$item" ]; then
            echo "$item exists in home directory."
        else
            echo "$item doesn't exist in home directory."
        fi
        done
    }

    check_skel_files
    ```

### Text and File Manipulation https://journey.study/v2/learn/courses/252/modules/29404/units/0/TEAM/14990
1.  - replace the first three octets of the IP address with XXX.XXX.XXX:
        - `sed 's/^[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\./XXX.XXX.XXX./' access.log` (this ran into an error)
        - `sed -E 's|([0-9]{1,3}\.){3}|XXX.XXX.XXX.|' access.log` (this worked!)
    - print the information inside the first double quotes:
        - `awk -F'"' '{print $2}' access.log` # use double quote as field separator (-F'"'); then {print $2} means print the second field
    - filter the output to include only the POST requests (using grep)
        - `awk -F'"' '{print $2}' access.log | grep "^POST"`
    - print the lines between line 11 and line 20 of the file access.log:
        - `head -n 20 access.log | tail -n 10`

2.  - Install `jq` first, as it's not available: (`jq` is not available in bash, so I did this in the VM)
        - `sudo apt-get update`
        - `sudo apt-get install jq`
    - Print the First Name of Each Employee: 
        - `jq '.employees[].firstName' employees.json`
    - Print the First Name of Each Employee Followed by Their Phone Number(s):
        - `jq '.employees[] | .firstName + " " + (.phoneNumbers[] | .number)' employees.json`
    - Print the First Name of Each Employee and Only Their Mobile Phone Number(s):
        - `jq '.employees[] | .firstName + " " + (.phoneNumbers[] | select(.type == "mobile") | .number)' employees.json`

3.  - Create a New Directory and Copy Files:
        - `mknew_directory`
        - `cp access.log employees.json new_directory/`
        - `cd new_directory`
        - `ls -lh`
    - Compress Files:
        - `gzip access.log`
        - `bzip2 employees.json`
        - `ls -lh`
    - Decompress the Files:
        - `gunzip access.log.gz`
        - `bunzip2 employees.json.bz2`
    - Compress with best compression:
        - `gzip -9 access.log`
        - `bzip2 -9 employees.json`
    - (Decompress again)
    - Compress the Entire Directory:
        - go back to the parent folder
        - `tar -zcvf compressed_folder.tar.gz new_directory/`ls
        - where was I supposed to use `-r`?

4. More compressing:
    - Create a New Directory and Copy Files:
        - `mkdir new_archive_dir`
        - `cp access.log employees.json new_archive_dir/`
    - Create a Tar Archive:
        - `tar -cvf new_archive_dir.tar new_archive_dir/`
    - Compare the Size of the Tar File and the Directory:
        - `ls -lh new_archive_dir.tar`
        - `du -sh new_archive_dir`
    - Remove the Tar File:
        - `rm new_archive_dir.tar`
    - Create a Tar.gz Compressed Archive:
        - `tar -czvf new_archive_dir.tar.gz new_archive_dir/`
    - Compare the Size of the Compressed Archive and the Directory:
        - `ls -lh new_archive_dir.tar.gz`
        - `du -sh new_archive_dir`
    - Remove the Tar.gz File
        - `rm new_archive_dir.tar.gz`

## TodoDB.sh https://journey.study/v2/learn/courses/252/modules/29404/units/0/TEAM/15086
0. Setup VM and Postgres process in Linux file!
1. Create new database (schema, then fill with provided data):
    - Create a new database: `CREATE DATABASE "user-todo";` (Don't forget semicolons!)
    - Switch to it: `\c user-todo` (no semicolon here, as this isn't a query!)
    - Create the `user` and `todo` tables:

            CREATE TABLE "user" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL
            );

            CREATE TABLE "todo" (
                id SERIAL PRIMARY KEY,
                task VARCHAR(100) NOT NULL,
                user_id INTEGER REFERENCES "user"(id),
                done BOOLEAN DEFAULT FALSE NOT NULL
            );

            # REFERENCES keyword creates a foreign key that references the id column of the "user" table (to establish one-to-many relationship)
    - Fill it up with the provided data, eg:
        - `INSERT INTO "user" (name) VALUES ('Dominic');`
        - `INSERT INTO "todo" (task,user_id,done) VALUES ('Take out the thrash',5,TRUE);`
        - Test if it was added with a SELECT query: `SELECT * FROM "user";`
2. List script:
    - update sripts in `list.sh` script file:

            list_users() {
                local query="SELECT * FROM \"user\";"
                psql -d user-todo -c "$query"
            }

            list_todos() {
                local query="SELECT * FROM \"todo\";"
                psql -d user-todo -c "$query"
            }
            
            list_user_todos() {
                local userName="$1"   # This is a different $1, than the one in the script! (it's the paramtere of the function!)
                local query="SELECT * FROM \"user\" JOIN \"todo\" ON \"user\".id = \"todo\".user_id WHERE \"user\".name = '$name';"
                # local query="SELECT * FROM \"user\" JOIN \"todo\" ON \"user\".id = \"todo\".user_id WHERE \"user\".name = '$"userName"';"
                psql -d user-todo -c "$query"
            }

    - Debugging:
        - Issue with `root`: since I cloned the repo to my shared folder, I had to copy it to the /home/ubuntu/ folder, to be able to access it as "ubuntu" user. I can't run the script as root
            - I also updated ownerships to ubuntu:ubuntu
        - I had to change the sript because of "line endings issue":
            - `sed -i 's/\r$//' list.sh` - run this, when you're in the folder
3. Add script
    - Functions added to script:

            add_user() {
                local userName="$1"
                local query="INSERT INTO \"user\" (name) VALUES ('$userName');"
                psql -d user-todo -c "$query"
            }

            add_todo() {
                local userName="$1"
                local todoTask="$2"
                local query="INSERT INTO \"todo\" (task, user_id) SELECT '$todoTask', id FROM \"user\" WH$
                psql -d user-todo -c "$query"
            }

4. Mark script
    - Functions added:

            mark() {
                local todoId="$1"
                local query="UPDATE \"todo\" SET done = TRUE WHERE id = '"$todoId"';"
                psql -d user-todo -c "$query"
            }

            unmark() {
                local todoId="$1"
                local query="UPDATE \"todo\" SET done = FALSE WHERE id = '"$todoId"';"
                psql -d user-todo -c "$query"
            }

    - Also had to update `main()` function:

            main() {
                if [[ "$1" == "mark-todo" ]]
                then
                    mark "$2"
                elif [[ "$1" == "unmark-todo" ]]
                then
                    unmark "$2"
                fi
            }
5. Delete script
    - Wholde script file had to be updated:

            #!/bin/bash

            delete_todo() {
                local todoId="$1"
                local query="DELETE FROM \"todo\" WHERE id = '"$todoId"';"
                psql -d user-todo -c "$query"
            }

            delete_done() {
                local query="DELETE FROM \"todo\" WHERE done = TRUE;"
                psql -d user-todo -c "$query"
            }

            main() {
                if [[ "$1" == "delete-todo" ]]
                then
                    delete_todo "$2"
                elif [[ "$1" == "delete-done" ]]
                then
                    delete_done
                fi
            }

            if [[ "${BASH_SOURCE[0]}" == "${0}" ]]
            then
                main "$@"
            fi

## Widgets.sh
1. **SOLUTION 1 - Everything in `widgets.sh` file**:
    - `widgets.sh`:

        #!/bin/bash
        ./mem.sh
        ./proc.sh
        ./user.sh
        ./disk.sh

        show_mem() {
            echo "Memory Stats:"
            free -h
        }

        show_cpu() {
            echo "CPU Stats:"
            lscpu | grep "Model name"
            vmstat 1 5
        }

        show_proc() {
            echo "Process Stats:"
            ps -e | wc -l
        }
        
        show_user() {
            echo "User Stats:"
            who
        }

        show_disk() {
            echo "Disk Usage:"
            df -h
        }

        display_stats() {
            if [ -z "$WIDGET_CONTROL" ]; then
                WIDGET_CONTROL="mem,cpu"
            fi

            IFS=',' read -ra CONTROLS <<< "$WIDGET_CONTROL"
            for i in "${CONTROLS[@]}"; do
                case $i in
                    mem) show_mem ;;
                    cpu) show_cpu ;;
                    proc) show_proc ;;
                    user) show_user ;;
                    disk) show_disk ;;
                    *) echo "Invalid option: $i" ;;
                esac
            done
        }

        main() {
            display_stats
        }

        main "$@"

    - Set environmental variable and tun command:
        - `WIDGET_CONTROL="mem,disk" ./widgets.sh` (setting it inline, to only affect that 1 execution)
2. **SOLUTION 2 - Writing commands in separate scripts and importing to `widgets.sh`:**
    - `widgets.sh` file:

            #!/bin/bash

            display_stats() {
                if [ -z "$WIDGET_CONTROL" ]; then
                    ./mem.sh
                    ./cpu.sh
                else
                    IFS=',' read -ra CONTROLS <<< "$WIDGET_CONTROL"
                    for i in "${CONTROLS[@]}"; do
                        case $i in
                            mem) ./mem.sh ;;
                            cpu) ./cpu.sh ;;
                            proc) ./proc.sh ;;
                            user) ./user.sh ;;
                            disk) ./disk.sh ;;
                            *) echo "Invalid option: $i" ;;
                        esac
                    done
                fi
            }
    - `cpu.sh`:

            #!/bin/bash

            show_cpu() {
                echo "CPU Information:"
                lscpu | grep "Model name"
                lscpu | grep "^CPU(s):"
                lscpu | grep "MHz"
            }

            show_cpu

    - `disk.sh`:

            #!/bin/bash

            show_disk() {
                echo "Disk Information:"
                lsblk -o NAME,SIZE -d | grep -v "loop"
                df -h | awk 'NR>1 {print $1, $2, $4, $5}'
            }

            show_disk
    
    - `mem.sh`:

            #!/bin/bash

            show_mem() {
                echo "Memory Usage Information:"
                free -h | awk 'NR==2{print "Total Memory: "$2"\nFree Memory: "$4}'
            }

            show_mem

    - `proc.sh`:

            #!/bin/bash

            show_proc() {
                echo "Running Processes:"
                ps -e --no-headers | wc -l
            }

            show_proc

    - `user.sh`:

            #!/bin/bash

            show_user() {
                echo "Users and Groups:"
                echo "Non-system user accounts:"
                awk -F':' '{ if ($3 >= 1000) print $1}' /etc/passwd | wc -l
                echo "Number of groups:"
                cat /etc/group | wc -l
            }

            show_user


















