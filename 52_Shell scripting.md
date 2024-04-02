# SHELL SCRIPTING (BOURNE SHELL?)

- Cheatsheet: *( https://www.shellscript.sh/quickref.html )*
- Guide & Tutorial: *( https://www.shellscript.sh/ )*

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
    - 4 ways to end a function (return a value):
        - Change the state of a variable or variables
        - Use the `exit` command to end the shell script (=stops the program)
        - Use the `return` command to end the function, and return the supplied value to the calling section of the shell script (=returns control to the caller)
        - echo output to `stdout`, which will be caught by the caller just as c=`expr $a + $b` is caught

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
        -  there is no scoping, other than the parameters (`$1`, `$2`, `$@`, etc)
        - a variable within a function is a global variable for the whole script, there is no function scope
        - there is a different behaviour when **piping** (?)
        - Functions cannot change the values they have been called with, either, but we can change the values they have been called with (eg a parameter in the main script)
    
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
            - two user shell scripts, `function2.sh` and `function3.sh`, each sourceing the common library file `common.lib`, and using **variables** and **functions** declared in that file
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
        - `return`:
            - Well-behaved applications should return zero on success:
                - *"One of the main causes of the fall of the Roman Empire was that, lacking zero, they had no way to indicate successful termination of their C Programs. (Robert Firth)"*

## STEP-BY STEP TUTORIAL:
- https://journey.study/v2/learn/materials/pages/guides/hello-world--general.md
- Work with git bash:
    - clone repo, you can navigate to C:\ with `cd /c/`
    - then you can open the files with nano
    - you can run a script using `./sriptname.sh` 
    - paste something with `Shift + Insert`

- Useful basic commands:
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