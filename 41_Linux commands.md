# LINUX COMMANDS

- More Linux command line tuts:
    Basic commands are here: https://factorpad.com/tech/linux-essentials/outline.html
    Cheatsheets: 
        https://cheatography.com/davechild/cheat-sheets/linux-command-line/
        https://files.fosswire.com/2007/08/fwunixref.pdf
        https://files.fosswire.com/2008/04/ubunturef.pdf

    Basic tutorial: https://linuxsurvival.com/ (Completed Module 1 & 2)
    Command-line bootcamp: http://korflab.ucdavis.edu/bootcamp.html

    Extra:
    Linux tutorial: https://ryanstutorials.net/linuxtutorial/

    Shell tutorials:
    Complete first 6: https://linuxcommand.org/lc3_learning_the_shell.php

    Ubuntu usage:
    Pres with useful stuff at the end: https://docs.google.com/presentation/d/1HFJcVCXOBBgr7kGxwM1Uq-frl_7wwjESO7m35Hj7mjc/edit#slide=id.g1263a94a7d_0_46

- **Get OS info:**
    - `uname -a`: gets Linux verison
    - `cat /etc/os-release`: gets details about distro
    - `explorer.exe .`: opens current folder in the file explorer in windows

- **Set keyboard to UK:**
    1. `sudo nano /etc/default/keyboard`:
        - Change these lines:
            - `XKBLAYOUT="gb"`
            - `XKBVARIANT=""`
        - `Ctrl + O`, `Ctrl + X`
    2. Apply changes:
        - `sudo dpkg-reconfigure keyboard-configuration`
            - keep pressing `Enter` on the selected options (don't forget to check if it's `UK`!)
        - `sudo reboot` - Changes will only work after the reboot

- **Bash argument types:**
    - standard style arguments (with a dash e.g. ‘-e’) 
    - BSD-style arguments (without a dash)
    - GNU-style syntax (those preceded by two dashes)

- **Keyboard shortcuts:**
`UP arrow`: go back to previous commands in history
`Tab`: auto-complete file names
`Ctrl-D`/`exit`: exit the terminal
`Ctrl-C`: kill currently running program
`Ctrl-Shift-V`: paste (note the Shift!)

- **Basic commands in the console/shell/command line:**

`cat /etc/os-release`       | log the distro name
`sudo -i`                   | log in as `root` superuser, so you can avoid typing `sudo` every time
`ls --help` or `ls -h`      | Get help
`man ls`                    | read manual of "ls" or anything else ("Man pages")

`ls`                        | list contents of current folder
`ls -l`                     | list contents with long listing option `ls -la` (list all explicitly, even hidden folders/files starting with `.filename`)
                            | 1. type `-` for files and `d` for directory
                            | 2. security `rw-r--r--` (3 chars for each user/group/world eg `rwxrwxrwx` r - read, w - write, x - execute, - means permission revoked)
                            | 3. owner (userId)
                            | 4. group: the group owner of the file
                            | 5. size: size in bytes
                            | 6. last mod: last modified
                            | 7. filename
`ls -l file/folder`         | list details of just that one file
`lsblk`                     | list all mounted drives

`cd /foldername`            | switch directory
`cd ..`                     | switch to parent folder
`pwd`                       | "Print working directory" - shows where you are right now

`mkdir folder`              | create new folder
`mkdir -p folder`              | create new full path (even if the parent folders don't exist yet!)
`rmdir folder`              | remove/delete folder (if empty)
`rm -rf dir`                | remove a directory and all its contents
`rm filename`               | remove/delete a file
`cat filename`              | display contents of file (txt with utf-8 encoding)
`more filename`             | view the contents of a file
`less filename`             | view file: (scroll with arrow keys, PgUp, PgDn, quit with q, get more help with h)
`nano filename`             | edit file: (keyboard shortcuts are at the bottom of screen, save with Ctrl-O, quit with Ctrl-X)

`mv filname destination`    | move a file to a destination folder
`mv filname newname`        | rename file (so does this work only if there is no destination folder called like this?)
`cp filename destination`   | copy a file to a destination

`file filename`             | determine file type
`file -b filename`          | file type in brief mode
`file *`                    | display all file's type
`file -i filename`          | view mime type of the file

`readlink -f filename`      | get the file's absolute path
`realpath filename`

`touch file.txt`            | create myfile.txt if it does not exist or update its access and modification times to the current time if it does exist
`echo`                      | prints something to the console
`echo 'text' > file`        | prints something that is then passed (`>`) to the file we specify
`echo 'text' >> file`       | `>>` is used to append, while `>` overwrites it
`ls | xargs {command}`      | ls returns a list of the items in that folder, then command is executed on each one of them.
                              Eg if they are files, and we use `cat` command, the output of each file will be diplayed

`cat /etc/group`            | List all groups (they are stored in this file, so we read the file with `cat`)
`groups`                    | list the groups I'm in (access can be given to 1 group, that's set up by the admin - you can only assign 1 group
                              owner per file or directory - ACL (Access Control Lists) are solution to overcome this issue)
`chown user filename`       | Change user ownership of a file
`chown user:group filename` | Change user and group ownership of a file
`chgrp group filename`      | Change group ownership of a file
`chmod`                     | Change permissions ("change mode")
`chmod u+x filename`        | "u" for user, "g" for group, "o" for other/world. "+" means add, "-" revokes a right, then the letter means the right (r/w/x). And then the file's name
`chmod ugo rwx filename`    | revoke all rights from everyone

`find / -group groupname`   | list all files owned by group
`find / -group groupnum`    | list all files owned by group by group number
`find / -user username`     | list all files owned by a user

`who`                       | list all users currently logged in

`which -command`            | locates commands (where they are stored)

- **Frequently used with sudo:**
- Essentials:
`sudo poweroff`             | shut down 
`sudo reboot`               | restart the system

- Sudo access priviliges:
`sudo -s`                   | run the shell specified with elevated privileges, giving you the # prompt (you need to exit it as well!)
`sudo su`                   | makes you the root user and load your custom user environment variables
`su - username`             | switch to another user

- **Installing:**
`sudo apt-get install util` | Any utility which is not included in the Bash shell by default can be installed
`sudo apt-get install wget` | Eg. `wget` might not be installed by default

- **Give user access to shared folder:**
`sudo adduser {yourusername} vboxsf`    | Make sure to log in and out to make it work!

- **Create links:**
`ln target_file hardlink_name`      | Create a hard link
`ln -s target_file softlink_name`   | Create a soft link (also called symbolic link or symlink)

- **Creating archives:**
`zip -r archivename.zip Folder/*`       | Navigate to the folder first, to be able to simply use `./*` to include all files! Create a zip archive called archivename.zip (use an abs path if you want to save it elsewhere!) of the contents of "Folder" (-r is for recursive, including files in subdirectories)
`tar -cvf archive_name.tar -C Folder1 .`| The same using tar archives


- **Downloading:**
`wget [URL]`                        | download files from the web directly to your Unix-like operating system's terminal
`wget -b [URL]`                     | download in the BG
`wget -c [URL]`                     | resume interrupted download
`wget -P /path/to/directory [URL]`  | specify download location
`wget -O filename.zip [URL]`        | Capital O, not ZERO! Rename file after download to...

- **Bash built-ins:** (type help in the terminal the get these displayed)
    - programs built into bash shell, that we refer to as commands:
        - `cd` Changes the current directory
        - `echo` Displays a line of text/string that is passed as an argument (prints output to terminal)
        - `exit` Exits the current shell session
        - `export` Sets the export attribute for shell variables
        - `history` Displays the command history, allowing users to see a list of commands that have been executed in the current shell session
        - `pwd` Prints the current working directory
        - `read` Reads a line of input from standard input and assigns it to a variable
        - `set` Sets or unsets shell options and positional parameters
        - `source` or `.` Reads and executes commands from a file in the current shell session (  commonly used to run configuration scripts that set environment variables or define functions)
        - `type` It can tell you whether a command is a built-in, an external executable, or an alias, among other things
        - `alias` Defines or displays aliases. An alias is a shorthand for a longer command, which can save time and keystrokes 
        - `jobs` Lists the jobs running in the background, showing their status
        - `kill` Sends a signal to a job. Commonly used to stop a process that is running in the foreground or background
    - The other type is external commands (directories that are part of the system's path env variable, like `/bin` or `/usr/bin`)
        - `ls` Lists the contents of a directory
        - `ps` Shows information about active processes
        - `grep` Searches for patterns within text. It's used to find specific strings in files or output - use in combination with wildcards
            - `grep '^\.'` looks for all files that start wiht a `.` (secret files)
            - `^` caret character is used to express the start of a line
            - `\` is used as the escape character, to use `.` (otherwise it would mean "match any single character)
        - `find` Searches for files in a directory hierarchy based on various criteria like name, size, modification date
        - `awk` A powerful text processing and pattern matching programming language. It's commonly used for data extraction and reporting
        - `vi` or `vim` A text editor
        - `nano` Another text editor, known for its simplicity and ease of use
        - There's much more...

- **Some useful commands for data extract and monitoring:**
    - REGEX tutorials:
        - regex crossword
        - regex 101
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
                - `grep "error" file.txt`
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

    - `tail`: *( https://www.howtogeek.com/481766/how-to-use-the-tail-command-on-linux/ )*
        - displays data from the end of a file
        - most commonly used to view the most recent entries in files, such as logs or other text files that are frequently updated
        - particularly useful for real-time monitoring of files as they grow
        - **Examples:**
            - View the Last 10 Lines of a File:
                - `tail file.txt`
            - View the Last N Lines of a File:
                - `tail -n 20 file.txt`
            - Follow a File in Real Time:
                - `tail -f /var/log/syslog`
            - View the Last N Bytes of a File:
                - `tail -c 100 file.txt`
            - Follow Multiple Files:
                - `tail -f file1.txt file2.txt`
            - Combine with other commands:
                - often used in conjunction with other commands through piping `|` to process or filter the output
                - For example, to get the most recent entries in a log file and search for a specific error:
                    - `tail -f /var/log/syslog | grep "error"`
    
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
    
    - `source` *( https://linuxize.com/post/bash-source-command/ )*
        - reads and executes commands from the file specified as its argument
        - useful to load functions, variables, and configuration files into shell scripts
        - **Syntax:**
            ```{bash}
            source FILENAME [ARGUMENTS]
            . FILENAME [ARGUMENTS]
            ```
            - `source` and `.` are the same command
        - **Examples:**
            - Sourcing Functions:
                - extract common functions used by more of your scripts in a separate file and then source that file in your scripts
                - create a file that includes a bash function that checks whether the user running the script is the root:
                    ```{bash}
                    # this is in the functions.sh script:
                    check_root () {
                        if [[ $EUID -ne 0 ]]; then
                            echo "This script must be run as root" 
                            exit 1
                        fi
                    }
                    ```
                - Now in each script that needs to be run only by the root user, simply source the `functions.sh` file and call the function:
                    ```{bash}
                    #!/usr/bin/env bash

                    source functions.sh
                    check_root

                    echo "I am root"
                    ```
            
            - Bash config file:
                - you can also read variables from a file using `source`
                - variables must be set using the Bash syntax: `VARIABLE=VALUE`
                - `config.sh` file:
                    ```{bash}
                    VAR1="foo"
                    VAR2="bar"
                    ```
                - `bashscript`:
                    ```{bash}
                    #!/usr/bin/env bash

                    source config.sh    # read the config file

                    echo "VAR1 is $VAR1"
                    echo "VAR2 is $VAR2"

- **Compression tools:** *( https://www.computernetworkingnotes.com/linux-tutorials/how-to-use-gzip-and-bzip2-linux-commands-explained.html )*
    - Comparison:
        - `gzip` is faster, but can't achive such high compression as `bzip2`
        - Compression level:
            - both allow to specify compression level:
                - `-1` means the fastest compression (least compressed)
                - `-9` means the slowest compression (most compressed)
    - `gzip`:
        - Compress a File:
            - `gzip filename`
            - replaces the original file with a compressed version named filename.gz
        - To also keep the Original File:
            - `gzip -k filename`
        - Specify compression level:
            - `gzip -9 filename`
        - Decompress a File:
            - `gzip -d filename.gz`
    - `bzip`:
        - Compress a file:
            - `bzip2 filename`
            - replace the original file with a compressed version
        - To keep the Original File:
            - `bzip2 -k filename`
        - Decompress a File:
            - `bzip2 -d filename.bz2`
    - Compressing Directories: 
        - use `tar` in combination with `gzip` or `bzip2`:
            - `tar czvf archive_name.tar.gz directory_name` (gzip)
            - `tar cjvf archive_name.tar.bz2 directory_name` (bzip)
    - `tar`: *( https://www.tecmint.com/tar-command-examples-linux/ )*
        - used for archiving multiple files into a single archive file
        - it doesn't compress files directly
        - preserves attributes, like permissions, dates, and the directory structure
        - `.tar` format is widely supported across different operating systems and platforms.
        - **Examples:** 
            - Creating an Archive:
                - `tar -cvf archive_name.tar directory_to_archive/`
                    - `-c` option tells tar to create an archive
                    - `-v` enables verbose mode (lists files as they are added)
                    - `-f` specifies the filename of the archive
            - Extracting an Archive:
                - `tar -xvf archive_name.tar`
            - Viewing Contents of an Archive (without extracting):
                - `tar -tvf archive_name.tar`
            - Appending Files to an Archive:
                - `tar -rvf archive_name.tar new_file`
            - Excluding Files:
                - `tar -cvf archive_name.tar directory_to_archive/ --exclude='pattern'`

- **Find PID and kill a process in Linux:** https://www.linuxandubuntu.com/home/find-pid-and-kill-a-process-in-linux
    - if we want to kill a process, we need to find its ID first, using `ps` program (short for process state):
        - List all processes:
            - `ps -e`
            - `ps -e | less` to display by page (use `PgUp`/`PgDn`/`Space`/`q` controls)
        - Get also **PID (PID is process ID and PPID is Parent Process ID)**:
            - `ps -ef`
        - Or even more info:
            - `ps -eF`
        - Filter (eg. to list all processes belonging to a user called "root"):
            - `ps -u root -U root u`
        - View detailed information about a program (once you have the process ID)
            - `ps -lp <process-id>`
        - Show threads (The ID of the first thread will always be identical to the process ID it came from):
            - `ps -eLf`
        - Show threads from a particular process:
            - `ps -Lfp <PID>`
        - Find process ID by program name:
            - `ps -ef | grep chromium-browser`
        - List processes hierarchically:
            - `ps faux`
        - Choose what to be displayed:
            - `-o` parameter allows you to define your own output format (PID, PPID, user, and the command and its arguments)
            - `ps -eo pid,ppid,%cpu,%mem,uname,comm,args`
        - Find processes with `top`
            - instead of printing, it provides real-time view of the processes
            - `top` without arguments lists all processes by CPU usage
            - navigaet with `PgUp` and `PgDn` buttons (and `Home`, `End`)
        - Show all processes belonging to a user:
            - `top -u <UID or Username>`
        - Monitor a specific process by ID:
            - `top -p <PID>`
        - Choose what to be displayed wiht `top`:
            - Press `f` while it's running
            - Navigate with arrow keys, then press `Space` to select/deselect a column
            - Change sorting of the selected column with `s`
        - Showing threads:
            - `top -H`
            - `top -Hp <PID>` to show from a particular process
    - Now we can kill the process with the ID we found:
        - `kill <PID>`

- **Signals that `kill` can send:** (for full list use `kill -l`)
    - **NOTE:** We must use the kill command to issue signals that do not have key combinations assigned to them
    - **Common signals:**
        - `SIGHUP`: Signal 1. Automatically sent to a process when the terminal it is running in is closed.
        - `SIGINT`: Signal 2. Sent to a process you hit Ctrl+C. The process is interrupted and told to terminate.
        - `SIGQUIT`: Signal 3. Sent to a process if the user sends a quit signal Ctrl+D.
        - `SIGKILL`: Signal 9. The process is immediately killed and will not attempt to close down cleanly. The process does not go down gracefully.
        - `SIGTERM`: Signal 15. This is the default signal sent by kill. It is the standard program termination signal.
        - `SIGTSTP`: Signal 20. Sent to a process when you use Ctrl+Z. It stops the process and puts it in the background.
    - **Summary:**
        - `Ctrl+C`: Sends SIGINT, signal 2, to the process---if it is accepting input---and tells it to terminate.
        - `Ctrl+D`: Sends SISQUIT, signal 3, to the process---if it is accepting input---and tells it to quit.
        - `Ctrl+Z`: Sends SIGSTP, signal 20, to the process and tells it to stop (suspend) and become a background process.
        - `jobs`: Lists the background jobs and shows their job number.
        - `bg job_number: Restarts a background process. If you don't provide a job number the last process that was turned into a background task is used.
        - `fg job_number`: brings a background process into the foreground and restarts it. If you don't provide a job number the last process that was turned into a background task is used.
        - `commandline &`: Adding an ampersand & to the end of a command line executes that command as a background task, that is running.
        - `kill %job_number`: Sends SIGTERM, signal 15, to the process to terminate it.
        - `kill 9 %job_number`: Sends SIGKILL, signal 9, to the process and terminates it abruptly.

## GRUB startup keys:
`Shift`         | press this during boot to see the GRUB menu
`UP` or `DOWN`  | select between options, then hit `Enter` to select
`e`             | after selection a boot option, press `e`. Once finishes, press `Ctrl + X`
                  (eg to run a specific boot parameter, pass a kernel flag, adjust the run time level or set the frame buffer mode)
`c`             | enter GRUB command line (not a regular Linux shell like Bash - so only accepts GRUB-based commands)
                  (changing menu entry names, fixing a broken install, or booting into a custom kernel configuration)
`Esc`           | Return to the main GRUB menu screen without saving changes (eg from editor or command line)



