# Advanced Module - DevOps Workbook

`QUESTIONS I'M NOT SURE ABOUT MARKED WITH (?)`
`NEEDS TO BE UPDATED: (!)`
==



==
## Linux
### What kind of virtualization technologies are you familiar with?
- **Virtualization:**
    - the process of creating a software based or virtual version of something (compute, storage, networking, servers or applications)

    - The **hypervisor** makes it feasible:
        - Also called Virtual Machine Monitors (VMMs)
        - It's a piece of software, that runs above the physical server/host
        - It pulls the resources from the physical server/host and allocate them to the virtual environment
    
    - Once the hypervisor is installed, we can create **VMs** (Virtual Machines):
        - A VM is a software based computer, that behaves like a separate computer (it has it's own OS and storage, etc.)
        - We can run multiple VMs on a hypervisor (they each can have different OSs)
        - The hypervisor manages the resources that are allocated to these virtual environments
        - They are **portable**, so we can move a VM from 1 hypervisor to another hypervisor
    
    - **Benefits:**
        - Reduce costs by reducing infrastructure -> Running multiple environments in 1 physical machine
        - Agility and speed: setting up a VM and transfering it to another machine is very simple and quick
        - Lower downtime: if a host goes down, we can just quickly move the VM to another machine that works

- **Technologies:**
    - **Hardware / platform virtualization:**
        - Hardware virtualization or platform virtualization refers to the creation of a virtual machine that acts like a real computer with an operating system. 
        - Software executed on these virtual machines is separated from the underlying hardware resources. For example, a computer that is running Arch Linux may host a virtual machine that looks like a computer with the Microsoft Windows operating system
        - a `hypervisor` sits between the physical hardware and the operating system to allocate resources
        - Uses `snapshots`, that can be moved and copied easily

        - **Type 1 - Bare metal / Native virtualization:**
            - runs a hypervisor directly on the physical hardware without the need for a host operating system
            - offers better performance compared to hosted virtualization because it eliminates the overhead of running a host operating system underneath the hypervisor
            - provides more direct control over hardware resources since the hypervisor interacts directly with the physical hardware
            - often preferred for enterprise environments and production workloads where performance and resource isolation are critical
            - Examples of bare-metal virtualization hypervisors include `VMware vSphere/ESXi`, `Microsoft Hyper-V` (when installed in standalone mode), and `Xen`

        - **Type 2 - Hosted/nested virtualization:**
            - runs a hypervisor on top of a host operating system
            - involves a **HOST OS** and a **GUEST OS**:
                - host operating system runs on hardware and guest operating system runs on a virtual machine
            - It uses:    
                - the existing operating system (host operating system),
                - third-party virtualization software,
                - a variety of guest operating systems (each guest OS operates using shared resources with its host)
            - Examples of hosted virtualization hypervisors include `VMware Workstation`,` Oracle VirtualBox`, and `Parallels Desktop`

            - **Host OS:**
                - works with the underlying hardware
                - With **virtualization**, a single physical server can become multiple virtual machines (pieces of hardware with plenty of processing, memory, storage, and network capacity)
                - Host OS also use **container-based virtualization** (helps to partition the application in a server):
                    - allows the use of containers for each application and doesn’t require the use of the entire OS

            - **Guest OS:**
                - the guest operating system is software installed onto and running on the virtual machine
                - provides another OS for applications
                - The guest OS shares resources with the host OS, but the two operate independently of one another (host needs to be started first of course!)

            - **Advantages of a guest OS:**
                - the ability to run programs and applications that don’t work with the host OS
                - Run more than one application requiring different OS on the same hardware
                - Be used for testing purposes
                - there can only be 1 host, but multiple guest OS-s
                - virtual OS-s can be restored (backup)

    - **Desktop virtualization (VDI):**
        - the concept of separating the logical desktop from the physical machine
        - a more advanced form of hardware virtualization
        - the user interacts with the host computer using another desktop computer:
            - the host computer in this scenario becomes a server computer capable of hosting multiple virtual machines at the same time for multiple users
        - this means a more centralized, efficient client environment that is easier to maintain
    
    - **Containerization:**
        - Instead of virtualizing the entire operating system, containers virtualize at the application level
        - Each container shares the host system's kernel but has its own filesystem, CPU, memory, and process space
        - Docker and Kubernetes are popular containerization technologies.
    
    - **Other:**
        - **Network Virtualization:**
            - decouples network resources from hardware, allowing the creation of virtual networks that operate independently of the underlying physical network
            - eg. Software-defined networking (SDN) and virtual LANs (VLANs)
        - **Storage Virtualization:**
            - abstracts physical storage from logical storage, allowing for more efficient storage management, data protection, and scalability
            - eg.  SAN (Storage Area Network) and NAS (Network Attached Storage)
        - **Application Virtualization:**
            - encapsulates individual applications from the underlying operating system, allowing them to run in isolated environments
            - simplifies application deployment and management
        - **Memory Virtualization:**
            - pools the memory resources of multiple servers into a single virtual memory pool
            - allows for more efficient memory utilization and better performance
        - **GPU Virtualization:**
            - allows multiple virtual machines or containers to share a single physical GPU
            - eg NVIDIA GRID and AMD MxGPU

### What command line text manipulation tools are you familiar with?
- `sed` = "Stream editor"
    - Stream editor is used for text transformations. It can perform tasks like search and replace, insertion, deletion, and more, based on patterns or regular expressions
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

- `awk`
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

- `grep`
    - Used for searching text patterns within files or input streams (a command-line utility to filter text)
    - **Features:**
        - allows pattern matching using `regex` (regular expressions)
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

- `tail`:
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

- `jq`
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

- `source`
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

### How would you schedule a command to run every Sunday at midnight?
- Using `cron`:
    - It is a command-line utility that schedules jobs (repetitive tasks mostly - for one-time jobs we use `at`)
    - Users who set up and maintain software environments use `cron` to schedule `cron jobs` (commands or shell scripts)
    - It's commonly set to run periodically (automates system maintenance or administration)
    - `crontab`:
        - cron table (a config file), that specifies shell commands to run periodically on a given schedule
        - Users can have their own individual crontab files and often there is a system-wide crontab file (`/etc`)
        - Looks like this:
            ```{bash}
            # ┌───────────── minute (0–59)
            # │ ┌───────────── hour (0–23)
            # │ │ ┌───────────── day of the month (1–31)
            # │ │ │ ┌───────────── month (1–12)
            # │ │ │ │ ┌───────────── day of the week (0–6) (Sunday to Saturday;
            # │ │ │ │ │                                   7 is also Sunday on some systems)
            # │ │ │ │ │
            # │ │ │ │ │
            # * * * * * <command to execute>
            ```
        - Execution happens when the specifies time matches the current time, eg:
            - `1 0 * * * printf "" > /var/log/apache/error_log`
            - `45 23 * * 6 /home/oracle/scripts/export_dump.sh`
            - `*/5 1,2,3 * * * echo hello world` (`*/n` to run for every n-th interval of time; `1,2,3` for specific times eg here "every first, second and third hour"):   
                - `*` means every
                - comma separated values for multiple choices eg. day: `0,6` (Sunday and Saturday)
                - day: `*/2` for every day that's divisible by 2 (every other day) (it works for all units)
                - */10 means for minutes for example, "run every 10 minutes"
                - hour: `3-6` between these hours, so between 3-6 AM
        - Edit configuration file for a user: `crontab -e` (regardless of where it's stored)
        - Some preset examples:
            ```{bash}
            Entry	                Description	                                                Equivalent to
            @yearly (or @annually)	Run once a year at midnight of 1 January	                0 0 1 1 *
            @monthly	            Run once a month at midnight of the first day of the month	0 0 1 * *
            @weekly	                Run once a week at midnight on Sunday	                    0 0 * * 0
            @daily (or @midnight)	Run once a day at midnight	                                0 0 * * *
            @hourly	                Run once an hour at the beginning of the hour	            0 * * * *
            @reboot	                Run at startup	                                            —
            ```
    - `crond`
        - The cron Daemon (system process) that runs in the background
    - **Permissions:**
        - `/etc/cron.allow` – If this file exists, it must contain the user's name for that user to be allowed to use cron jobs
        - `/etc/cron.deny` - If the other file does not exist, we can use this file to exclude users (so all not included can use cron jobs)
    - **Common commands:**
        - `crontab -e`: edit crontab file
        - `crontab -l`: list existing cronjobs
        - `crontab -r -i`: remove default crontab
        - `crontab -u`: specify a different user's crontab

    - **EXAMPLES:**
        - **Schedule a command to run every Sunday at midnight:**
            1. check if you used it already:
                - `crontab -l` - if it wasn't, then:
                - `sudo crontab -e` - select to open it with nano
            2. Add this line to the `crontab` file (each line that is a new task):
                - `0 0 * * 0 echo "Linux is Cool!" >> ~/crontab_log.txt` (`>>` appends to the file. `>` would overwrite)
                - We could also use a script to be executed instead, so we can include multiple or more complex commands:
                    - `0 0 * * 0 /path/to/script.sh`:
                        - you need to create the file first (`nano /path/to/script.sh`)
                        - you need to make it executable first (`chmod +x /path/to/script.sh`)
            3. Check if it was added with `crontab -l`

            - Handling users:
                - `crontab -u username -e`: edits another user's crontab, not yours
                - `crontab -r` remove crontab file (resets to default)

        - **Task from first excercise:**
            1. Create a script to fetch the weather:
                - `nano ~/fetch_weather.sh`
                - Add this:
                    
                        #!/bin/bash
                        /usr/bin/curl http://wttr.in/Budapest?format=3 > /etc/motd
                        
                - Make it executable:
                    - `chmod +x ~/fetch_weather.sh`
            2. Create the cron job:
                - `crontab -e`:
                    - Add: `0 8 * * * /bin/bash /home/your_username/fetch_weather.sh`
            3. Test it manually:
                - `~/fetch_weather.sh`, then log in again

### How would you check the available resources (memory, disk space, CPU)?
- **Memory (RAM) Usage:**
    - `free -h`:
        - Displays the amount of free and used memory in the system, including total, used, and free memory, as well as memory buffers and cache
    - `htop`: 
        - Interactive process viewer that also displays memory usage along with CPU and other system information in a real-time, interactive interface.
- **Disk Space:**
    - `df -h`: 
        - Displays disk space usage for all mounted filesystems, including total, used, and available space, as well as the filesystem type and mount point.
    - `du -h /path/to/directory`:
        - Displays disk usage for specific directories and files
- **CPU Usage**:
    - `top`: 
        - Displays real-time information about processes, including CPU usage, memory usage, and more. Press `q` to quit
    - `htop`:
        - Similar to top but with a more user-friendly and interactive interface, displaying CPU usage, memory usage, and other system information
- **Resource monitoring tools:**
    - `sar`:
        - Collects, reports, and saves system activity information such as CPU, memory, disk I/O, and network statistics
        - Requires the `sysstat` package to be installed.

### What are hard links and symbolic links?
- **Hard Links**
    - A hard link is like a new file (takes up the same memory space), that points to the same inode as the original file (so when the file changes, the inode gets updated, and the link pointing to it also gets updated - similar to reference types in C#). When deleting the original file, the hard link is still pointing to the original inode
    - **What They Are:**
        - A hard link is essentially an additional name for an existing file on the same filesystem. When you create a hard link, you create a new directory entry for the file. The hard link and the original file entry point to the same inode (the filesystem's internal data structure that stores information about a file).
    - **Characteristics:**
        - Hard links cannot span across filesystems; they must reside within the same filesystem as the original file.
        - Deleting the original file does not remove the data on the disk as long as a hard link pointing to it exists.
        - Hard links do not have their own metadata (like timestamps). Since hard links and the original file share the same inode, any changes to the file content or permissions affect all names linked to that inode.
        - You can't create a hard link for a directory
    - **Usage:**
        - Hard links can be used to create backups of files within the same filesystem.
        - They help in scenarios where multiple references to a file are needed without duplicating the file's content.
        
- **Soft Links (=Symbolic Links =Symlinks)**
    - A soft link points to the original file's name, not it's inode on the hard-drive, so when the file is deleted, the link breaks. It takes up much less memory, because it just points to the name, like shortcut
    - **What They Are:**
        - A symbolic link, or soft link, is a special file that points to another file or directory. It's essentially a shortcut to another file.
    - **Characteristics:**
        - Symbolic links can point to files or directories on different filesystems since they store the path to the target file as text.
        - If the original file is moved, renamed, or deleted, the symbolic link breaks and becomes a "dangling" link, as it still points to the original path.
        - Symbolic links have their own metadata, so modifying the link does not affect the original file, and vice versa.
    - **Usage:**
        - Soft links are versatile for creating shortcuts, organizing files and directories without duplicating data, and maintaining compatibility (e.g., linking to different versions of libraries or files).

- **Key points:**
    - **File Management:** Understanding how to create and use hard and soft links allows for more efficient file management and organization without unnecessary duplication of data.
    - **System Navigation:** Links, especially symbolic ones, are widely used in Unix-like systems for everything from linking libraries to providing shortcuts to commonly used directories.
    - **Scripting and Automation:** When writing scripts or automating tasks, knowing when and how to use hard and soft links can significantly affect the performance and efficiency of your scripts.

### What are services in the context of Linux?
- **Service**:
    - refers to a program or application that runs in the background and provides specific functionality or performs certain tasks
    - often designed to start automatically when the system boots and continue running in the background, waiting for requests or events to occur
    
    - **Key points:**
        - **Daemon:** 
            - Services in Linux are commonly referred to as `daemons`. A `daemon` is a background process that runs independently of the user session and performs specific tasks or provides services to other applications or users.
        - **Init System:** 
            - Services are managed by the `init system`, which is responsible for starting, stopping, and managing processes during system boot and shutdown.
            - Different Linux distributions use different init systems, such as `Systemd`, `Upstart`, or `SysV` init.
        - **Service Management:** 
            - Linux provides commands and utilities for managing services, such as starting, stopping, restarting, enabling (automatically starting at boot), disabling (preventing automatic start at boot), and checking the status of services.
            - Common commands for managing services include `systemctl`, `service`, and `chkconfig`.
        **Service Configuration:** 
            - Each service typically has its own configuration file located in directories like `/etc/init.d/`, `/etc/systemd/system/`, or `/etc/init/`
            - These configuration files specify how the service should behave, including startup options, dependencies, and other settings.
        - **Types of Services:**
            - Services in Linux can serve various purposes, such as:
                - network services (e.g., web servers, DNS servers)
                - system services (e.g., logging, time synchronization)
                - background tasks (e.g., backups, monitoring)
            - The most common ones:
                - `SSH` (Secure Shell):
                    - Provides secure remote access to a system over a network, that allows users to log in and execute commands on a remote machine securely.
                - `HTTP Server` (e.g., Apache HTTP Server, Nginx):
                    - Enables serving web pages and content over the HTTP protocol.
                    - These servers are widely used for hosting websites and web applications.
                - `DNS` (Domain Name System):
                    - Resolves domain names to IP addresses and vice versa. 
                    - DNS servers are essential for translating human-readable domain names into machine-readable IP addresses
                - `FTP` (File Transfer Protocol) Server:
                    - Facilitates file transfers between systems over a network
                    - FTP servers allow users to upload, download, and manage files remotely
                - `Syslog`: 
                    - Collects and logs system messages and events generated by various components of the operating system and applications
                    - Syslog servers are used for monitoring and troubleshooting system issues.
        - **Logging and Monitoring:**
            - Services often generate log files to record events, errors, and other information
            - Monitoring tools like `systemctl`, `journalctl`, and third-party monitoring solutions can be used to monitor service status, resource usage, and performance metrics.
        - **Security:**
            - Services running on a Linux system should be properly configured and secured to prevent unauthorized access and ensure system integrity. This includes configuring firewalls, access controls, authentication mechanisms, and regular software updates to address security vulnerabilities.

### Describe the permission model of Linux! How would you make a file only readable and writable by its owner?
- **Permissions:**
    - Because Linux is a multi-user OS, which can be accessed by many users, and is also commonly used with servers, Linux has a solid **authorization system**, divided into 2 levels:
        - **Ownership**
            - Every file or folder in linux has 3 owner types:
                - **User:** 
                    - the person who creates the file becomes the owner (a User can also be called an Owner)
                    - `root` is the **superuser** (has complete access to the operating system and its configuration, for admin purposes only!)
                - **Group:**
                    - contains multiple users
                    - all users belonging to the group will have access to the file/folder
                - **Other/World:**
                    - any other user not listed above (external users)
        - **Permission**
            - Used to distinguish, what can different users do with the file/folder:
                - **Read:**
                    - permission to open or read a file
                    - on a directory it means you can list its contents
                - **Write:**
                    - permission to modify a file
                    - permission to add/remove/rename files in a directory
                - **Execute:**
                    - executable files can have executable permission (eg `.exe`)
                    - permission to run/execute a file
                    - in directory context it means that we can enter a dir and gain possible access to sub-dirs
            - Further permissions (to be covered later!)

    - The above creates a system of 9 characters for each file (we can see this using `ls -l`):
        - `-`/`d` + 3 x `rwx`:
            - the `-` means it's a file, `d` means directory
            - `r` for read, `w` for write, `x` for execute, `-` for no permission
            - the first 3 chars are for the User, then for the Group, then for Other/World

    - **Changing permissions:**
        - using `chmod` command (=change mode)
        - **Absolute mode:**
            - In this mode, we use pre-defined numberic values to set permissions:

                Number	    Permission Type	        Symbol
                0	        No Permission	        --- 
                1	        Execute	                --x
                2	        Write	                -w-
                3	        Execute + Write	        -wx
                4	        Read	                r--
                5	        Read + Execute	        r-x
                6	        Read + Write	        rw-
                7	        Read + Write + Execute	rwx
            
            - Example:
                - `chmod 764 filename` =>  User: `rwx` (7) / Group: `rw-` (6) / Other (4) `r--`
        - **Symbolic mode:**
            - We can make smaller tweaks and modify each user type individually:
                - Operators:
                    - `+` add permission
                    - `-` remove permission
                    - `=` set permission and override previous
                - User denotations:
                    - `u` user
                    - `g` group
                    - `o` other/world
                    - `a` all
            - Example:
                - `chmod o=rwx filename`    // set "other" users permissions to `rwx`
                - `chmod g+x filename`      // add "execute" permission to "group"
                - `chmod u-r filename`      // remove "read" permission from "user"
        
        - **Special permissions:**
            - a fourth access level in addition to user, group, and other:
                - **SUID:** (User)
                    - A file with `SUID` always executes as the user who owns the file, regardless of the user passing the command
                    - The `x` in the permission is replaced with an `s` or `S` (if the owner doesn't have excecute permission)
                - **SGID:** (Group)
                    - If set on a `file`, it allows the file to be executed as the group that owns the file (similar to SUID)
                    - If set on a `directory`, any files created in the directory will have their group ownership set to that of the directory owner
                    - example permission: `drwxrws---` (not `s` now in the group permissions, and `d` for directory)
                    - if the owning group does not have execute permissions, then an uppercase `S` is used.
                - **sticky bit:**
                    - This permission does not affect individual files, but at directory level it restricts file deletion
                    - Only the owner (and root) of a file can remove the file within that directory.
                    - A common example of this is the `/tmp` directory: `drwxrwxrwt` (note now a `t` is used in the other section)
                    - if you have a writing right, then you can also delete - but with sticky bit, you can reset this behaviour to revoke delete permission
            - setting special permissions:
                - using the symbolic mode, nothing changes:
                    - `chmod g+s community_content/` (an `s` is added to the `g` group)
                - using the numerical method, we need to pass a fourth, preceding digit in our chmod command:
                    - syntax: `chmod X file/dir`
                    - `X` can be:
                        - Start at 0
                        - SUID = 4
                        - SGID = 2
                        - Sticky = 1
                    - example:
                        - `chmod 2770 community_content/` (note an extra number BEFORE the original 3)

    - **Changing ownership:**
        - using `chown` command (=change mode):
        - Examples:
            - `chown user filename`       // Change user ownership of a file
            - `chown user:group filename` // Change user and group ownership of a file
            - `chgrp group filename`      // Change group ownership of a file

        - Tips:
            - All groups are stored in `/etc/group` file (we can read it with `cat`)
            - To work as a group other than your default group, use `newgrp groupname`
            - A file/folder can only have 1 group owner
            - There are no nested groups either

### What is the difference between Gi, Gb and GB?
- `Gi`, `Gb`, and `GB` refer to different ways of measuring storage capacity, and they differ in how the units are calculated:
    - The key distinction to remember is that `GiB` (Gibibytes) are larger than `GB` (Gigabytes) when the same number precedes them because of the difference in base calculations (binary vs decimal).
    - This difference can be particularly important in understanding the actual capacity and performance specifications of hardware and network communications.

- **Gi (Gibibyte):**
    - A `Gibibyte` is a unit of data storage that equals 2^30 bytes, or 1,073,741,824 bytes.
    - This unit is based on a binary system and is commonly used in computing to ensure precision, especially with RAM and disk sizes.
    - It is denoted as "GiB" but often just abbreviated as "Gi".
- **Gb (Gigabit):**
    - A `Gigabit` is a unit of data measurement that equals 10^9 bits, or 1,000,000,000 bits.
    - This unit is often used to describe data transfer rates, such as network speeds and download rates.
    - Since there are 8 bits in a byte, a Gigabit is equivalent to 125 million bytes (or approximately 0.125 Gigabytes).
- **GB (Gigabyte):**
    - A `Gigabyte` is a unit of storage capacity that equals 10^9 bytes, or 1,000,000,000 bytes.
    - This unit is based on a decimal system and is often used in marketing consumer storage products like SSDs, hard drives, and USB flash drives.
    - It is used more broadly in many computing contexts, although it can create some confusion when compared with Gibibytes (GiB) because they are slightly different in size due to the base of their calculations (binary vs decimal).

### What are some well-known configuration files on a Linux OS?
- These are used to manage the behavior of the operating system and various applications. The most common ones are: 
    - `/etc/shadow`:
        - This file stores encrypted user password along with other properties related to user password.
        - It is accessible only to privileged users to safeguard sensitive information.
        - `/etc/gshadow`: Contains the shadowed information for group accounts
    - `/etc/passwd`:
        - This file contains user account information, providing a list of users on the system and their settings, which include user ID, group ID, home directory, and optional the shell.
    - `/etc/group`:
        - Similar to `/etc/passwd`, this file stores group information for the system.
        - It defines the groups to which users belong.
    - `/etc/fstab`:
        - This file is used to define how disk partitions, various storage devices, and remote filesystems should be mounted into the filesystem. 
        - It plays a crucial role in handling storage devices during the system boot process.
    - `/etc/hosts`:
        - Used for host name resolution. 
        - The file maps IP addresses to hostnames before the system queries DNS servers.
    - `/etc/resolv.conf`:
        - This file specifies the DNS servers that the system should use to query for domain name resolutions and the search domain for non-fully qualified domain names.
    - `/etc/sysctl.conf`:
        - Contains kernel parameters that can be set at runtime. Adjustments to this file can alter system performance and security characteristics.
    - `/etc/sudoers`:
        - Specifies privileges for users, defining which users can execute commands as other users, including the root user.
        - It's crucial for managing administrative access and permissions.
    - `/etc/crontab`:
        - A schedule file that defines shell commands to run periodically on a given schedule.
        - It's used for automating system maintenance or administration tasks.
    - `/etc/services`:
        - This file maps service names to port numbers and protocol types.
        - It is used by various network services to determine the ports to listen to or connect with.
    - `/etc/skel`:
        - this is not a file, but a directory
        - serves as a template for new user home directories
        - When a new user account is created, the system automatically copies the contents of `/etc/skel` into the new user's home directory
        - This ensures that all new users start with a consistent set of configuration files in their home directories.

### Explain the "set" builtin command and some of its most commonly used flags!
- `set`:
    - used mostly within scripts, to see the intermediate process
    - Sets or unsets shell options and positional parameters
    - can also display the names and values of shell variables

    - **Common flags:**
        - If used without any options:
            - `set` will print a list of all shell variables and functions, formatted as assignments that can be reused as input for setting or configuring variables.
        - `-e` (Exit immediately):
            - Causes the shell to exit if any command exits with a non-zero status (unless the command that fails is part of an until or while loop, if test, part of an && or || list, or if the command's return status is being inverted using !).
        - `-x` (Debug mode): 
            - Displays each command and its expanded arguments before execution, which is helpful for debugging scripts.
        - `-u` (Treat unset variables as an error): 
            - When set, the shell treats attempts to expand unset variables as an error and exits immediately.
            - useful to find typos or unset variables
        - `-o` option-name (Set options): 
            - This is used to set options by name.
            - For example, `set -o` noclobber prevents the shell from overwriting existing files with redirection commands.
        - `-f` (Disable filename expansion): 
            - Disables globbing (filename expansion), preventing characters like *, ?, and [] from being interpreted by the shell.
        - `-v` (Verbose mode): 
            - Prints shell input lines as they are read, which is useful for debugging shell scripts.
    
    - **Example:**
        - `set -eux`:
            - `e` causes the script to exit immediately if any command within the script fails
            - `u` causes the script to exit, if an unset variable is used (catch typos)
            - `x` prints out each command as it executes (seeing the intermediate steps)

### How would you make a service auto-start and machine boot-up?
- using `systemd`, the standard init system for most modern Linux distributions:
    - Create the script:
        - `sudo nano /usr/local/bin/my_script.sh`
    - Add content, eg:

            #!/bin/bash
            echo "My script is running" > /var/log/my_script.log
    
    - Make the script executable:
        - `sudo chmod +x /usr/local/bin/my_script.sh`
    - create a file for the new service:
        - `sudo nano /etc/systemd/system/my_service.service`
    - fill up the file with the service configuration you need
    - Reload systemd to recognize the new service:
        - `sudo systemctl daemon-reload`
    - Enable the service to start on boot:
        - `sudo systemctl enable my_service`

## NETWORKING

### What is a MAC address?
- **MAC address:**
    - Short for `Media Access Control`
    - A unique identifier assigned to network interfaces for communication
    - It's a 12-digit long, hexadecimal(0-9 + A-F = 16 digit options) sequence (burned in in the factory, so can't be changed)
    - Alternative names: `physical address`, `hardware address`, `Layer 2 address`, `ethernet address`
    - `Layer 2` of both the `4-layer model` and `OSI model` (Data-Link layer) uses **MAC** (physical address) for identification of the internal server
    - `ARP protocol` is what finds out the MAC address of a server / service we are trying to connect to (uses IP address to do it)
    - We can use it also to set up **security** based on it (spoofing is a weakness, where the physical address can be mimiced)

### What is the difference between binding to 127.0.0.1 or 0.0.0.0?
- Binding to IP addresses like `127.0.0.1` or `0.0.0.0` is a common practice in networking:
    - `127.0.0.1` (localhost):
        - Also called `the loopback IP address` 
        - When a server or service is bound to `127.0.0.1`, it is configured to listen for incoming connections **only from the same machine** on which it is running
        - typically used for *security reasons* or for *testing purposes*, as it does not allow connections from other machines on the network
    
    - `0.0.0.0` (All IPv4 addresses on the local machine):
        - Binding to `0.0.0.0` means that the **server is listening on all IPv4 addresses that the machine possesses**. This includes the localhost (`127.0.0.1`) and any other network interfaces that are configured
        - It is used when you want a server to be accessible from other machines on the network or from the internet (firewall and router config is needed!)
        - Useful in environments with multiple network interfaces

- **Binding:** (just for better understanding what it is exacly)
    - refers to the process where a server or software application assigns itself to a specific IP address and port number combination
    - allows the application to listen for and accept incoming network connections on that specific address and port
    - the `application` or `service` is BOUND to an `IP address` and a `port`

### What are the Layers of the OSI model?
- **7-layer OSI model** 
    - Layers:
        - Layer 7: Application
        - Layer 6: Presentation
        - Layer 5: Session
        - Layer 4: Transport
        - Layer 3: Network
        - Layer 2: Data link
        - Layer 1: Physical
        
    - `Device` associations to **layers 1-3**:
        - **L1** device is a `hub`, because it deals with electrical signals:
            - **Responsibility:**
                - Deals with the hardware transmission and reception of raw unstructured data over a physical medium. It includes the components and methods for connecting devices and transmitting bits.
            - **Functions:**
                - Defines the electrical and physical specifications of the data connection. It defines how data is physically sent through the network, including layout of pins, voltages, cable specifications, hubs, repeaters, network adapters, host bus adapters (HBA used in storage area networks), and more.
        - **L2** device would be a `switch`:
            - **Responsibility:**
                - Provides node-to-node data transfer—a link between two directly connected nodes. It also handles error correction from the physical layer.
            - **Functions:**
                - Framing, physical addressing (MAC addressing), flow control, error detection, error handling and correction, and manages access to the physical media. Devices like switches and bridges operate at this layer.
        - **L3** device is a `router`, because it uses IP protocol:
            - **Responsibility:**
                - Responsible for packet forwarding including routing through intermediate routers. It involves the addressing, packaging, and routing of packets between source and destination.
            - **Functions:**
                - Logical addressing (IP addressing), routing, path determination, and packet forwarding. Routers operate at this layer and use protocols like IP to route data across networks.

    - From L4, we don't associate with devices, but with `functionality`:    
        - **L4** 
            - typical devices could be `gateways`, `firewalls` and `load balancers` (but not strictly associated!)
            - **Responsibility:**
                - Manages end-to-end control and error-checking to ensure complete data transfer. This layer ensures that data is sent and received in the order it was sent and without errors.
            - **Functions:**
                - Segmenting data for transmission, establishing and maintaining connections, error detection and recovery, and flow control.
        - **L5**
            - typical devices could be `gateways`, `firewalls` and `load balancers` (but not strictly associated!)
            - **Responsibility:**
                - Manages sessions between applications. This layer establishes, manages, and terminates connections between local and remote applications.
            - **Functions:** 
                - Session establishment, maintenance, and termination, synchronization of data exchange, and dialog control (either half-duplex or full-duplex).
        - **L6** 
            - Not typically associated with a specific type of hardware device, but software functionalities in `application delivery controllers` might perform tasks like data encryption, decryption, or compression that pertain to this layer.
            - **Responsibility:** 
                - Translates data between the application layer and the network. It ensures that data is in a usable format and is where data encryption and decryption occurs.
            - **Functions:** 
                - Data translation and encryption, data compression, and ensuring that data is in the appropriate format for the receiving application.
        - **L7** 
            - This layer, where data is closest to the end user, involves software-level services like application-level gateways, web proxies, and firewalls designed to work at the application level, handling specific application protocols such as HTTP, FTP, etc.
            - **Responsibility:** 
                - Closest to the end user, this layer interacts with software applications that implement a communicating component. It facilitates services that directly support applications.
            - **Functions:** 
                - Identifying communication partners, determining resource availability, synchronizing communication, ensuring adequate security, and providing various protocols like HTTP, FTP, SMTP, etc.

### What is the difference between a router and a switch?
- **Switch:**
    - Operates at the **Data Link layer (Layer 2)** of the OSI model, though some advanced switches can also perform operations at the Network layer (Layer 3).
    - Primarily used to connect and switch data packets between devices on the same network (LAN or VLAN).
    - Doesn't connect to the internet - if a packet is supposed to go out, it is sent to the router first (?)
    - Manages traffic within a network by **using MAC addresses** to forward data to the correct device.
    - Example:
        - Used locally, to create a network by connecting devices like computers, printers, and servers within a single local network environment.
- **Router:**
    - Operates at the **Network layer (Layer 3)** of the OSI model.
    - Used to connect multiple networks together, such as connecting a local network to the Internet.
    - Directs data packets between networks using logical addressing (IP addresses). 
    - Routers use headers and forwarding tables to determine the best path for forwarding the packets.
    - Example:
        - Used for network edge deployment, where a network connects to the rest of the internet or other external networks

### What is the difference between TCP and UDP?
- **What are they?**
    - Both are a protocols used in the OSI model's **Layer 4 (Transport layer)** (only 1 is used at the same time!)
- **Comparison:**
    - `TCP` (`Transmission Control Protocol`): 
        - **In short:** connection-oriented and reliable, because it cares about unsuccessful deliveries
        - Provides reliable, ordered, and error-checked delivery of data over the network
        - Guarantees deliver of data: if a piece of data doesn't arrive at the destination (in the require time) it'll be resent automatically (or the recipient will be notified of the problem)
        - Connection-oriented, and a connection between client and server is established (also known as a session) before data can be sent using a three-way handshake
        - Uses ports for communication
    - `UDP` (`User Datagram Protocol`): 
        - **In short:** no checking if the info was actually delivered
        - *Connectionless*, meaning there's no time spent on establishing a session between source and destination (less overhead)
        - No guarantee of delivery, ordering, or duplicate protection
        - Prioritizes time over reliability
        - Uses ports for communication

### What is a VPN?
- **VPN - Virtual Private Network:**
    - It's a technology, that allows you to to create a secure connection over the internet to another network:
        - **site-to-site:** connect 2 networks (eg AWS network with office network)
        - **Client-to-site:** connect you (the Client) to a distant server (eg. office network)
    - It achieves this using a `VPN server`, to which you connect, then the connection is forwarded from this server
    - It uses `end-to-end encrytion` for sending data, so it's secure
    - Hides you from the internet, by connecting throught the `VPN server` (but not completely!)
    - You can set connection rules (eg. you can only connect to the AWS network from the office network, so you need to connect to it first)

### What is DNS?
- **DNS** stands for **Domain Name System**, which is essentially the *phone book of the internet*:
    - Web browsers interact through IP addresses
    - DNS translates domain names to IP addresses
    - DNS is basically a diectory, that contains **domain names** and their corresponding **IP addresses**
    - DNS is an application layer protocol (L7), but uses `UDP` L4 transport layer protocol

- **How DNS works:** *( https://www.youtube.com/watch?v=72snZctFFtA&ab_channel=DNSMadeEasyVideos )*
    - the domain actually has a `.` at the end, which represents the root of the internet's namespace
    - after typing in a domain, it will first be determined, if the IP Address is known:
        - configured on the computer?
        - configured in memory? (in cache)
    - If it's not known yet, then this process will happen (this process is much better explained in the video in the DNS links!):
        - a query is sent from the computer to a `resolving name server` to resolve the domain, and find out the IP address:
            - the `resolving name server` should know where to find the `root name servers` (the `.`)
            - the name servers reply with the location of the `com name servers` (=`top level domain name servers` or `TLD`)
            - the `resolving name servers` then take all this info from the `root name servers`, adds it to its `cache`, and go to the `com TLD servers`
            - the `com TLD server` doesn't know, just where to find the `example.com name servers` (=`authoratative name servers` or `ANS`)
            - The domain's `registrar` is what determines which `ANS` to use, and lets the `TLD` servers know (this is where we register a domain name)
            - the `resolving name servers` then take all this info from the `authoratative name servers`, which finally knows the IP address
            - this is then sent to the OS, which forwards the info to the browser, so it can now make a connection

- **Summary of server types (DNS servers involved in loading a webpage):**
    - `Resolving name server / DNS recursor`:
        - The recursor can be thought of as a librarian who is asked to go find a particular book somewhere in a library. The DNS recursor is a server designed to receive queries from client machines through applications such as web browsers. Typically the recursor is then responsible for making additional requests in order to satisfy the client’s DNS query.
    - `Root name server`:
        - The root server is the first step in translating (resolving) human readable host names into IP addresses. It can be thought of like an index in a library that points to different racks of books - typically it serves as a reference to other more specific locations.
    - `TLD name servers`
        -  The top level domain server (TLD) can be thought of as a specific rack of books in a library. This nameserver is the next step in the search for a specific IP address, and it hosts the last portion of a hostname (In example.com, the TLD server is "com").
    - `Authorative name servers`
        - This final nameserver can be thought of as a dictionary on a rack of books, in which a specific name can be translated into its definition. The authoritative nameserver is the last stop in the nameserver query. If the authoritative name server has access to the requested record, it will return the IP address for the requested hostname back to the DNS Recursor (the librarian) that made the initial request.

### What is DHCP?
- **Dynamic Host Configuration Protocol:**
    - makes sure the user's device has all the necessary information to work well
    - used to automatically obtain network configuration information

    - **We must configure in it:**
        - IP address range the server can hand out
        - Mask setup to see what the network and host addresses are 
        - Default Gateway to handle remote IP addresses (the IP address of the router that does that)
        - DNS server to resolve IP addresses behind the domain names

    - **It needs:**
        - DHTP Server
        - DHTP Client (modern computers have this built-in)
        - Network connection (they need to be on the same network)
        - Communication protocol (DORA steps, see below)

    - Steps a DHCP client takes to acquire an IP (`DORA` steps)
        - `Discover` - sends out broadcast saying that it's looking for a DHTP server
        - `Offer` - the DHTP server's response that is sent back to the broadcast (eg offer an IP address, that the host can use)
        - `Request` is sent again, if the offer is accepted
        - `Acknowledgement` of accepting it (the rest of the options are sent now)

### What are some well-known ports?
- **Ports:**
    - a port is a communication endpoint (16-bit unsigned number (0 - 65535))
    - TCP and UDP both use ports for communication
    - well-known-ports are reserved ports for specific services, to make data-forwarding easier
    - Port number ranges:
        - System Ports range (0-1023)
            - Running an application on a System Port requires admin rights
            - It also needs to explain why it can't use other non-system ports
        - User Ports range (1024-49151)
            - A documentation with request for using a User Port number must describe why a port number from the Dynamic Ports range is unsuitable.
        - Dynamic Ports range (49152-65535)
            - These ports have been specifically set aside for local and dynamic use.
            - Application software may simply use any dynamic port that is available on the local host, without any sort of assignment.
    - Well-known ports: (all here: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml )
        - `21` - `FTP`
        - `22` - `SSH`
        - `25` - `SMTP`
        - `53` - `DNS`
        - `80` - `HTTP`
        - `194` - `IRC`
        - `389` - `LDAP`
        - `443` - `HTTPS`
        - `3306` - `MySQL`
        - `5432` - `PostgreSQL`
        - `6443` - `Kubernetes API Server`
        - `27017` - `MongoDB`

### What are the private IP address ranges?
- Private IP address ranges are specified in the Internet Protocol standards and are used within individual networks or organizations. These addresses are not routable on the public Internet, which means they are reserved for use within private networks and are not recognized outside of these networks.
- Private IP addresses are essential for managing and maintaining internal network operations without using public IP space, allowing for efficient IP address allocation and management within private networks, as well as for NAT (Network Address Translation) to map private IP addresses to public ones for Internet connectivity.
- There are 3 ranges:
    - **Class A:** `10.0.0.0` to `10.255.255.255`
        - This range supports up to 16 million devices (`10.0.0.0/8`). It is commonly used in large networks because it allows for extensive sub-netting and many IP addresses.

    - **Class B:** `172.16.0.0` to `172.31.255.255`
        - This range includes 16 contiguous Class B network blocks (`172.16.0.0/12`). It's widely used in medium-sized networks.

    - **Class C:** `192.168.0.0` to `192.168.255.255`
        - This range includes 256 Class C network blocks (`192.168.0.0/16`) and is typically seen in small networks, such as home or small business networks.
    
    - In addition to these, for IPv6, there is a block of private addresses known as `Unique Local Addresses` (`ULAs`). The range for ULAs is:
        - `fc00::/7`
            - This range is divided into two parts: `fc00::/8` and `fd00::/8`
                - The latter part, `fd00::/8`, is more commonly used because it requires that the next 40 bits be randomly generated, ensuring uniqueness in local contexts.

### How many usable addresses are in 192.168.1.0/24?
- An `IPv4` address is stored on 8 x 4 2-bits (32 bits) (its value can be `1` or `0`): `00000000.00000000.00000000.00000000` to `11111111.11111111.11111111.11111111`
    - a set of numbers (8 digits) is called an `octet` = 8 bits
    - each octet's value can range from 0 to 255
    - for example:
        - `192.168.1.1` == `11000000.10101000.00000001.00000001`
    - the number after the IP address (eg. `/8` or `/16` or `/24`) refers to the digits used for the network's ip (eg. `/8` covers the first octet, so there are 3x8 digits left to be handed out within the network for the devices)

- The subnet `192.168.1.0/24` refers to an IPv4 network that includes all IP addresses from `192.168.1.0` to `192.168.1.255`. The `/24` denotes that the first 24 bits of the 32-bit IP address are dedicated to the network portion, leaving the last 8 bits for host addresses.

- Breakdown:
    - **Total Addresses:** The subnet includes `2^8 = 256` addresses, since there are 8 bits for the host part.
    - `Network Address`: The first address, `192.168.1.0`, is the network address and is reserved to identify the network itself.
    - `Broadcast Address`: The last address, `192.168.1.255`, is the broadcast address, used for sending messages to all devices on the network.

- So, the number of usable addresses 254
- These usable addresses range from `192.168.1.1` to `192.168.1.254`.

### What is the purpose of the ARP protocol?
- To find out the MAC address of the server / service it wants to connect to, using the IP address from L1
- It operates on the Link (L2) layer primarily, but because it also uses IP addresses, it's also involved with L3 (Network layer)
- **How does ARP work?**
    - The host (user's machine) sends an ARP request
    - It includes the IP address (from Layer 1), that it wants to find out who is using it
    - A broadcast is sent (ff:ff:ff:ff:ff:ff), so everyone on the network will hear it
    - The server who the IP address corresponds to, will send a response and include its L2 ethernet address
- Table's that the devices store the data in:
    - **ARP table:**
        - maps **IP addresses** to **MAC addresses**
        - contains IP addresses and MAC addresses
    - MAC address table:
        - maps **SwitchPORTs** to **MAC addresses**
        - contains PORT numbers and MAC addresses
    - Routing table:
        - maps **IP networks** to **Interfaces**
        - contains network names, their IP addresses and `DC` meaning it's direcly connected

### What are the basic networking components in AWS? (?)
1. Amazon VPC (Virtual Private Cloud)
    - `VPC`: A logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.
2. Subnets
    - `Subnet`: A range of IP addresses in your VPC. You can launch AWS resources into a specified subnet. Use a public subnet for resources that need to connect to the internet, and a private subnet for resources that won’t be connected to the internet.
3. Internet Gateway
    - `Internet Gateway` (`IGW`): A VPC component that allows communication between instances in your VPC and the internet. It provides a target in your VPC route tables for internet-routable traffic, and performs network address translation for instances that have been assigned public IPv4 addresses.
4. Route Tables
    - `Route Tables`: Contain a set of rules, called routes, that determine where network traffic from your subnet or gateways is directed.
5. NAT Gateways/Instances
    - `NAT Gateways`/`Instances`: Used to enable instances in a private subnet to connect to the internet or other AWS services, but prevent the internet from initiating a connection with those instances.
6. Security Groups and Network ACLs
    - `Security Groups`: Act as a virtual firewall for your instances to control inbound and outbound traffic.
Network ACLs (Access Control Lists): Act as a firewall for controlling traffic in and out of one or more subnets.
7. Elastic IP Addresses
    - `Elastic IP Addresses`: Static IPv4 addresses designed for dynamic cloud computing. You can quickly remap the address to another instance in your account, providing a failover solution.
8. Elastic Network Interfaces (`ENIs`)
    - `Elastic Network Interfaces` (`ENIs`): A virtual network interface that you can attach to an instance in a VPC. ENIs can include attributes such as a primary private IPv4 address, one or more secondary IPv4 addresses, an Elastic IP address, a MAC address, membership in specific security groups, and more.
9. VPC Endpoints
    - `VPC Endpoints`: Allow private connections between your VPC and supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.
10. AWS Direct Connect
    - `AWS Direct Connect`: Bypasses the internet to provide a secure, dedicated connection from your premises to AWS.
11. AWS Transit Gateway
    - `AWS Transit Gateway`: Connects VPCs and on-premises networks through a central hub. This simplifies your network and puts an end to complex peering relationships.
    
### What network diagnostic/debugging tools are you familiar with? (?)
- **4 key debugging points:**
    - correct IP address?
    - correct mask configuration?
    - default gateway is configured?
    - DNS server is configured and works correctly?
- **Debugging tools:**    
    - `Ping`: 
        - This is a fundamental tool that tests connectivity between two hosts on a network. 
        - It uses `ICMP` (`Internet Control Message Protocol`) to send echo requests to a target host and waits for a reply.
        - It helps determine if a host is reachable and measures the round-trip time for messages.
        - How it works video: https://www.youtube.com/watch?v=vJV-GBZ6PeM&ab_channel=PowerCertAnimatedVideos
    - `Traceroute` (`tracert` on Windows):
        - This tool is used to display the route (path) and measure transit delays of packets across an internet protocol (IP) network. 
        - It helps in identifying the path taken by packets across a network and pinpoints where delays or drops are occurring.
        - How it works video: https://www.youtube.com/watch?v=1bIpUup5Vp4&ab_channel=CBTNuggets
    - `Nslookup` / `Dig`: 
        - These are command-line tools used for querying the `Domain Name System` (`DNS`) to obtain domain name or IP address mapping, or other DNS records. 
        - `nslookup` is widely used on Windows and some Unix-based platforms, while `dig` is preferred on Linux systems for its robust features.
    - `Netstat`: 
        - This tool displays network connections (both incoming and outgoing), routing tables, and a number of network interface statistics. 
        - It is particularly useful for checking which ports are open and what connections are currently active on a machine.
    - `Wireshark`: 
        - An advanced network protocol analyzer, Wireshark allows users to capture and interactively browse the traffic running on a computer network. 
        - It provides detailed information about network traffic and can be used for network troubleshooting and analysis.
    - `Tcpdump`: 
        - This is a command-line packet analyzer tool that allows the user to capture and display the packets being transmitted or received over a network to which the computer is attached.
    - `IPerf` / `JPerf`: 
        - These tools are used to measure the bandwidth between two hosts on a network. 
        - They can test `TCP` or `UDP` throughput and provide details on the performance of the network.
    - `MTR` (My Traceroute): 
        - `MTR` combines the functionality of the `traceroute` and `ping` programs in a single network diagnostic tool. 
        - It provides a continuously updated list of routers, packet loss, and response times between the local host and each router along the path to a remote host.
    - `Telnet` / `SSH`: 
        - While primarily used for remote access to servers, these tools are also used for diagnosing certain types of network issues, such as testing the accessibility of services on specific ports.
    - `Nmap`: 
        - This is a network scanning tool that can discover devices and services on a computer network. 
        - It is extensively used for network inventory, managing service upgrade schedules, and monitoring host or service uptime.

## Security
### What is encryption at rest and encryption in transit, and how are these implemented in AWS?
- **Data encryption (in AWS):**
    - AWS is using AES-256 algorithm for encryption
    - there is an `engine` that creates an individual cryptographic key, the `data key`:
        - contains all of the cipher information that is then applied to the data object (image, video, individual document, that you want protected)
        - The cipher data is applied against the individual object and then you end up with the encrypted data
        - That encrypted data is then put into storage (S3 or EBS)
        - without the original encryption key there is no way to read that data
    - The engine makes a unique key for every object that goes into your system (for better security), so these need to be managed:
        - `individual data key` is only used by that data object
        - `master key` is applied against the original `data key` to get an **encrypted version** of that `data key`
        - the object is attached to the encrypted object, and that is what gets stored
        - you only will need the `master key` to decrypt the encrypted key, that you will then use to get the data
        - AWS offers solution out-of-the-box you can use to manage the master key storage:
            - Hardware solution - Cloud HSM
            - Hardware Security Module
            - Services such as KMS - The key management system

- **Encryption at Rest:**
    - It refers to the protection of data stored on disk. 
    - The goal is to prevent unauthorized access to the data when it is stored on physical media such as hard drives, SSDs, or backup tapes. 
    - This type of encryption ensures that even if the storage medium is accessed by an unauthorized party, the data remains unintelligible without the decryption key.
    - **Implementation in AWS:**
        - `Amazon S3`: AWS offers server-side encryption (SSE) for S3 objects with three options:
            - `SSE-S3`: AWS manages the encryption keys.
            - `SSE-KMS`: AWS Key Management Service (KMS) manages the keys, providing additional control and auditing capabilities.
            - `SSE-C`: Customer provides and manages the encryption keys.
        - `Amazon EBS` (Elastic Block Store): EBS volumes can be encrypted to protect data at rest. Encryption occurs on the server that hosts the EC2 instance, providing encryption for data at rest, data in transit between the instance and the volume, and snapshots created from the volume. Encryption is handled using AWS KMS.
        - `Amazon RDS` (Relational Database Service): RDS supports encryption at rest for DB instances using AWS KMS. This encryption applies to the underlying storage for the DB instance, automated backups, read replicas, and snapshots.
        - `AWS S3 Glacier`: Supports encryption at rest by default using AWS KMS.
        - `AWS CloudTrail Logs`: CloudTrail logs can be encrypted using SSE-KMS.

- **Encryption in Transit:**
    - Encryption in transit refers to the protection of data as it moves between different parts of a system, such as between clients and servers or between different services.
    - The goal is to protect the data from eavesdropping and tampering while it is being transmitted.
    - **Implementation in AWS:**
        - `TLS`/`SSL`: AWS services support encryption in transit using Transport Layer Security (TLS) and Secure Sockets Layer (SSL). For example:
            - `Amazon S3`: Supports HTTPS for secure data transfer.
            - `AWS API Gateway`: Supports HTTPS for secure communication between clients and APIs.
            - `Elastic Load Balancing` (`ELB`): Supports HTTPS/SSL termination at the load balancer.
        - `AWS VPN`: AWS provides VPN connections for securely connecting on-premises networks to AWS VPCs using IPsec.
        - `AWS Direct Connect`: Provides a dedicated network connection from your premises to AWS. AWS Direct Connect supports encryption at the application layer (e.g., TLS/SSL) or can be combined with AWS VPN to encrypt traffic.
        - `Amazon RDS`: Supports SSL/TLS connections to encrypt data in transit between the database instance and the application.
        - `Amazon Elastic File System` (`EFS`): Supports encryption of data in transit using TLS.
        - `AWS IoT`: Supports secure communication using TLS/SSL for IoT devices.

### Which service is responsible for monitoring and log collections in AWS? (?)
- **Amazon CloudWatch:**
    - Amazon `CloudWatch` is the primary service for **monitoring** AWS resources and applications. 
    - It collects and tracks metrics, collects and monitors log files, and sets alarms. 
    - Key features include:
        - **Metrics**: Collects and tracks metrics for AWS resources like EC2 instances, RDS databases, and more.
        - **Alarms**: Allows you to set alarms based on metrics and receive notifications.
        - **Dashboards**: Provides a visual interface to monitor and display metrics and alarms.
        - **Events**: Monitors AWS resources and routes event notifications to targets like Lambda functions, SNS topics, and SQS queues.
        - **Logs**: Collects and monitors log data from various AWS services and applications.
- **Amazon CloudWatch Logs:**
    - Amazon `CloudWatch Logs` lets you **monitor**, **store**, and **access log files** from various sources. 
    - It can be used to collect and monitor logs from:
        - **AWS Services**: Such as VPC Flow Logs, Lambda logs, and Route 53 query logs.
        - **Custom Sources**: From your applications and on-premises servers using the CloudWatch Logs Agent or the CloudWatch Logs API.
        - **Log Groups and Streams**: Organizes log data into log groups and log streams.
        - **Metric Filters**: Allows you to extract metric data from log events.

- **AWS Systems Manager (Integrated solution):**
    - `AWS Systems Manager` integrates with `CloudWatch` and other AWS services to provide a unified interface for operational data management. 
    - It includes features like:
        - **OpsCenter**: Centralized view of operational issues.
        - **Run Command**: Execute commands on AWS resources.
        - **Parameter Store**: Secure storage for configuration data and secrets.
        - **Session Manager**: Secure, auditable instance management.

### What is a bastion host, and how can it be implemented in AWS? (!) update with notes from workshop!
- **Bastion host:**
    - a special-purpose server designed to provide secure access to a `private network` from an `external network` (typically the internet)
    - The primary purpose of a `bastion host` is to enhance security by minimizing the attack surface and controlling access to critical resources.
    - acts as a `gateway` through which authorized users can access other instances or resources within a `private subnet` of a `Virtual Private Cloud` (`VPC`):
        - Only allows secure, authenticated connections (typically using `SSH` for Linux or `RDP` for Windows).
    
    - **Implementing a Bastion Host in AWS:**
        1. Create a VPC:
            - If you don't already have a VPC, create one using the VPC wizard or manually via the AWS Management Console.
        
        2. Set Up Subnets:
            - Create a public subnet for the bastion host.
            - Create private subnets for your application servers or other resources.
        
        3. Create a Security Group for the Bastion Host:
            - Define a security group that allows inbound SSH (port 22) or RDP (port 3389) from specific IP addresses or IP ranges (e.g., your office IP).
            - Allow outbound traffic on necessary ports (e.g., SSH or RDP) to the private subnet.
        
        4. Launch an EC2 Instance for the Bastion Host:
            - Choose an appropriate AMI (Amazon Machine Image) for your bastion host (e.g., Amazon Linux, Ubuntu for SSH access, or Windows Server for RDP access).
            - Launch the instance in the public subnet and associate it with the security group created earlier.
        
        5. Configure Key Pair or Password Authentication:
            - Use an SSH key pair for Linux instances or set up a strong password for Windows instances.
        
        6. Associate Elastic IP (Optional):
            - Assign an Elastic IP to the bastion host to have a static, reachable IP address.
        
        7. Configure Route Tables:
            - Ensure that the route table associated with the public subnet has a route to an internet gateway for internet access.
            - Private subnets should have route tables that do not allow direct internet access.
        
        8. Harden the Bastion Host:
            - Disable unnecessary services and ports.
            - Regularly update the operating system and software.
            - Configure logging and monitoring (e.g., using AWS CloudWatch).
        
        9. Access Private Resources via the Bastion Host:
            - Connect to the bastion host using SSH or RDP.
            - From the bastion host, establish connections to instances within the private subnet.
        
        - **Example of Security Group Configuration for SSH Access:**
            - Bastion Host Security Group:
                - Inbound Rules:
                    - Type: SSH
                    - Protocol: TCP
                    - Port Range: 22
                    - Source: Your specific IP range (e.g., 203.0.113.0/24)
            - Private Subnet Instances Security Group:
                - Inbound Rules:
                    - Type: SSH
                    - Protocol: TCP
                    - Port Range: 22
                    - Source: Security group ID of the bastion host

### What are the key differences between security groups and NACLs?
- **Security Groups:**
    - acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic
    - Both inbound and outbound rules control the flow of traffic to and traffic from your instance (it's just like a turbo version `iptables`)
    - when no rules are defined in a security group it blocks all inbound and outbound traffic! (By default when you launch an EC2 instance via the AWS Management Console will generate a security group for you which will allow inbound SSH connections and allow all outbound connections.)
    - each security group can be applied to one or more instances, even across subnets
    - each instance is required to be associated with one or more security groups (to be precise: a security group is associated with a network interface that is attached to an instance)
    - Different setups need different security group setups (eg port 3306 for MySQL)
    - Different rules can be set for the `webserver` or the `database server`, or we can set `ping/ICMP rules`

- **Network Access Control Lists NACL:**
    - Features:
        - `NACL` sets rules for your **network/subnet**, based on the protocol type such as HTTP, TCP, UDP, etc., and the port numbers
        - Used in combination with **SG**s to create a multi-layer protection
        - each `NACL` can be applied to one or more `subnets`, but each subnet is required to be associated with one — and only one! — `NACL`
        - When you create a VPC, AWS automatically creates a default `NACL` for it (You can add and remove rules from a default `NACL`, but you can't delete the `NACL` itself)
    
- **Comparison:**
    - Similarities:
        - both act as a virtual firewall to protect your network/instance
        - use sets of inbound and outbound rules to control traffic to and from resources in a VPC
        - Can be applied to more than one instance (security group) or subnet (NACL)
        - Can be locked down to deny all traffic in either direction
        - Are valid methods of securing resources in a VPC
        - Work together to promote network redundancy and prevent unauthorized activity
    
    - **Differences:** (this already implements the comparison chart image!)
        - `Security groups` and `NACLs` operate at separate layers in the VPC:
            - `SG` -> Instance level-security
            - `NACL` -> Network level-security
        - don't handle response traffic the same way:
            - `SG` allows or denies traffic that a NACL allows in
            - `NACL` allows or denies traffic **before** it reaches an `SG`
        - Rules processing:
            - `SG` rules are processed as a group
            - `NACL` rules are processed one a time (in ascending order, by number set)
        - Allow-deny:
            - `SGs` are implicit deny - you can only add `allow` rules!
            - `NACLs` support both `allow` and `deny` rules
        - Statefulness (=apply rules based on connection state):
            - `SG` is `stateful` = response traffic is automatically allowed
                - you don't need to set separate rules for responses, like with `NACLs`
            - `NACL` is `stateless` = response traffic is subject to inbound and outbound rules:
                - this means that NACL rules typically **come in pairs**. For every inbound rule for a NACL, there must be a corresponding outbound rule
        - Application to AWS EC2 instances:
            - `Security groups` are a **required** form of defense for `instances`, because an `instance` must be associated with at least one `security group`
            - A `NACL` on the other hand, automatically applies to **all instances** in the `subnet` it is associated with
        - Default rules:
            - `SG` deny all incoming traffic by default
            - `NACL` allow all traffic in and out by default (must be configured to be less permissive!)
    
- **How to use `NACL` together with `SGs`:**
    - By taking advantage of the order of operations:
        - When traffic enters your network, it is filtered by `NACLs` **before** it is filtered by `security groups` (so traffic allowed by a `NACL` can then be allowed or denied by a `security group`, and traffic stopped by a `NACL` never makes it any further)
    
### Which service is responsible for tracking activities on an AWS account? (?)
- **AWS CloudTrail:**
    - `AWS CloudTrail` is a service that enables governance, compliance, and operational and risk auditing of your AWS account. 
    - With `CloudTrail`, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. 
    - This provides a history of AWS API calls for your account, including API calls made through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.
    
    - **Key Features:**
        - Event logging: 
            - operations such as the creation, modification, and deletion of AWS resources
        - Trails:
            - can be set to apply to all regions or to a single region
            - can be configured to log events in a specified S3 bucket for storage
            - A single trail can log events from multiple AWS accounts, simplifying centralized auditing and compliance
        - CloudTrail Insights:
            - Automatically detect unusual API activities in your AWS account
            -  help identify operational issues and potential security threats by analyzing normal activity patterns
        - Integration with Other Services (eg. `CloudWatch`)
        - Event history (90-day history)
        - Security and Compliance:
            - Helps meet compliance requirements by providing detailed logs of account activity, which can be used for audits and investigations
    
    - **Use cases:**
        - **Security Monitoring:**
            - Track user activity and API usage to detect unauthorized access or changes to your AWS resources.
            Investigate potential security incidents by reviewing API call history.
        - **Compliance Auditing:**
            - Maintain a record of AWS resource changes to demonstrate compliance with internal policies and regulatory standards.
            Use CloudTrail logs to generate audit reports for compliance frameworks like PCI DSS, HIPAA, and GDPR.
        - **Operational Troubleshooting:**
            - Identify the root cause of operational issues by reviewing the history of API calls and resource changes.
            Monitor the creation, modification, and deletion of resources to ensure proper resource management and optimization.
        - **Change Management:**
            - Ensure changes to infrastructure are authorized and documented, supporting effective change management processes.
            Use CloudTrail logs to verify that changes to critical resources are made according to organizational policies.

### Explain the difference between symmetric and asymmetric encryption!
- **Symmetric:**
    - Analogy:
        - Simple box with a lock analogy, where everyone with access has their own key (every key is identical)
    - How it works:
        - Uses 1 `single key`
        - This key is used both for encryption and decryption
        - The sender and the receiver both need the key (so they both have one), and this must be kept a secret
        - This method is much simpler, but risky because of using just 1 key
- **Assymetric:**
    - Analogy:
        - It works roughly like a mail box, where anyone can drop in their mail through a slot (this would be the public key), but only you can open and read the mail using your private key.
    - How it works:
        - Uses 2 keys: `private key` and `public key`
        - `public key` is meant to be shared, so others can send you messages using your public key (it is used for **encryption**)
        - `private key` is kept as a secret, so you can **decrypt** messages sent to you
        - Solves the problem of sharing keys, because the **decryptor** `private key` is not sent accross, just the **encrypting** `public key`
        - It is slower compared to symmetric method
        - Examples are `RSA` and `ECC`

### What is the Principle of Least Privilege (PoLP), and how can it be implemented in AWS?
- **Principle of Least Privilege (PoLP):**
    - a security concept that aims to give users, systems, or applications the minimum level of access necessary to perform their required tasks
    - helps reduce the risk of unauthorized access or damage by limiting the access and permissions to only what is necessary
    - **Implementing the Principle of Least Privilege in AWS:**
        - Use `IAM` Roles instead of `root user`:
            - Give users and services the specific permissions they need, using `IAM roles`
            - Organize `users` into `IAM groups`, based on their roles and responsibilities
            - Create `IAM policies` by specifying the exact actions, resources and conditions: attach these to `groups` instead of single `users`
            - Enable MFA

### How do AWS IAM roles differ from IAM users, and in what scenarios would you use each?
- `IAM roles` and `IAM users` are both mechanisms for controlling access to AWS resources, but they serve different purposes:
    
    - **User:**
        - Represent individual people or services that need access to AWS resources
        - Each user has a unique identity within your AWS account:
            - permanent credentials (long-term use)
            - they are assigned policies that define their permissions (similarly to `roles`)
            - suitable for long-term access
        - Typical use-cases:
            - Human users (employees)
            - Administrative tasks (admin)
            - Service accounts (for the management of a specific resource)
        - **When to use summary:** 
            - long-term access; human user; static access keys (no dynamic is available)
            - eg. employee access

    - **Role:**
        - Are intended for granting temporary access to AWS resources
        - They are not associated with a specific user or service but can be assumed by anyone who needs them:
            - temporary credentials (through `AWS STS` - security token service)
            - Roles can be **assumed** by AWS services, IAM users, applications, or external identities
                - `assume`: same as "wear a different hat", which basically means, get temporary permissions using a certain role, that is being `assumed`
            - they are assigned policies that define their permissions (similarly to `users`)
            - enables role-based access control to different tasks
        - Typical use-cases:
            - Cross-Account Access: Allowing access to resources in another AWS account without sharing long-term credentials.
            - AWS Services: Granting AWS services (eg EC2) the permissions they need to interact with other AWS resources.
            - Granting short-lived access to AWS resources for specific tasks or applications.
            - Providing temporary access to AWS resources for users authenticated via an external identity provider
        - **When to use summary:** 
            - temporary access; service permissions; cross-account actions; access through external identity providers
            - eg. `EC2` access to `S3` (the role is attached to the `EC2`)

### Explain the AWS Shared Responsibility Model in the context of security.
- **Shared Responsibility model:**
    - A security framework thar separates responsibilities of AWS and users to ensure a secure environment in the cloud
    - In essence, AWS is responsible for the security "of" the Cloud, while the customer is responsible for security "in" the Cloud:
        - `AWS`: involves the infrastructure that runs all the services offered in the AWS Cloud (e.g., hardware, software, networking, and facilities)
        - `User`: involves managing the security of the data they store and process, the applications they deploy, and the configuration of the AWS services they use (e.g., securing access to AWS resources, managing encryption, and ensuring appropriate access controls)
    - **Example Scenarios:**
        - `EC2` Instance:
            - AWS Responsibility: Ensures the physical servers and underlying infrastructure running the EC2 instances are secure and operational.
            - Customer Responsibility: Securing the guest operating system, applying security patches, configuring firewalls, managing IAM roles, and encrypting data on the instance.
        - `S3` Bucket:
            - AWS Responsibility: Secures the underlying storage infrastructure and provides tools to manage access.
            - Customer Responsibility: Managing bucket policies, access control lists (ACLs), and ensuring data stored in S3 is encrypted if needed.

### What is the difference between KMS and HSM?
- **AWS Key Management Service (KMS):**
    - KMS is a fully managed service, meaning AWS handles the underlying infrastructure and management tasks for you.
    - KMS is ideal for most standard encryption and key management tasks where ease of use, integration with AWS services, and cost-effectiveness are primary concerns.
- **AWS CloudHSM:**
    - Dedicated Hardware:CloudHSM provides dedicated, single-tenant HSMs that are physically isolated from other customers' HSMs.
    - CloudHSM is suited for scenarios requiring full control over keys, compliance with strict regulatory requirements, or the need for custom cryptographic operations (eg. banking)

## Containers and container orchestration
### What are the key differences between containers and virtual machines?
- **Containerization (Docker container) vs Virtualization (VM):**
    - **Virtualization:**
        - Virtualization is the technology which can simulate your hardware (such as CPU , disk, memory) and represent it as seperate machine
        - a full guest OS gets created, and everything that comes with it  (kernel images, device drivers, etc.). It's called `hardware-level or paravirtualization`
        - VMs run on a hypervisor (a software layer used to manage VMs)
        - VMs are fully isolated from each other and the Host
    - **Containerization:**
        - `iamge` -> the blueprint; `container` -> the running environment
        - Containers run on a container engine (eg. Docker), that uses the host OS (OS-level virtualization):
            - generally you need to run a container that uses the same OS as your own machine
        - Containers share the host OS kernel but have their own user space:
            - makes a process/app think it runs in a completely virtualized environment
        - programs running inside of a container can only see what was allocated for the container when it started (they are isolated at the process level)
        - they are light-weight, because of sharing the OS
            - they can be shared more easily
            - they can be scaled more easily
        <br>
    - **Comparison image:** 
        ![docker v virtual](../../assets/dockervsvirtual.png)

### What are the most important instructions in a Dockerfile?
- `Dockerfile`:
    - used with `docker build` command to create a `docker image`
    - contains all the commands that'll be used by `Docker` to assemble an `image`
    - we always base it on another, existing image (`FROM image`) -> the ultimate level is `scratch` (when it's so basic, that we don't base it any more levels)
    - Docker images are immutable, so when there is a change needed, we build a new build a new image
        - When we update the app and create a new `image`, the previous one becomes untagged `<none>` (you can still use it with it's ID)
    - **Typical build-up:**
        - `FROM`: 
            - Specifies the base image to use for the Docker image
            - eg.: `FROM <image>[:<tag>]`
        - `RUN`: 
            - Commands we would like to run
            - eg:
                - `RUN apt-get update`
                - `RUN apt-get install -y nginx`
                - `RUN chmod +x /some/path/to/script.sh`
        - `ENV`: 
            - use this to bake environment variables into the environment Docker creates within a container, eg:
            - `ENV <key>=<value>`
        - `ADD` and `COPY`:
            - use these commands to add arbitrary files to your images
            - they are basically the same the main difference being:    
                - with `ADD` you can specify a URL as the source (that points to some file)
                - `COPY` doesn't support this - it's generally better use `COPY` whenever you can
        - `WORKDIR`
            - Sets the working directory
            - eg: `WORKDIR /path/to/workdir`
        - `CMD`:
            - Sets the default command to be executed when the container starts (can be overwritten)
            - the `executable` is overridable at runtime, but will still use the params:
                - eg. if we set `CMD ["echo", "Hello, World!"]`, then `docker run <container>` -> runs with `echo "Hello, World!"`
                - but we can set it to something else, like this: `docker run <container> newCommand` -> runs `newCommand "Hello, World!"`
            - Syntax: `CMD ["executable", "param1", "param2"]`
            - Use it to set a default command with flexibility for the user to override
        - `ENTRYPOINT:`
            - Sets the command that will always be executed when the container starts (this is more secure, as it can't be overwritten)
            - can't be easily overwritten - but we can add additional params at runtime:
                - we set it to `ENTRYPOINT ["echo"]` -> then `docker run <container> "Hello, World!"` will execute `echo "Hello, World!"`
            - Syntax: `ENTRYPOINT ["executable", "param1", "param2"]`
            - Use it when you want to enforce a specific command to run and optionally allow parameters
        - `EXPOSE`:
            - Purpose: Informs Docker that the container listens on the specified network ports at runtime.
            - Usage: `EXPOSE <port>`
            - Example: `EXPOSE 8080`
            - Importance: Documents which ports are intended to be published.
        - `VOLUME`:
            - Purpose: Creates a mount point with the specified path and marks it as holding externally mounted volumes.
            - Usage: `VOLUME ["/data"]`
            - Example: `VOLUME ["/app/data"]`
            - Importance: Used to persist data and share it between containers or with the host system.

### What is the difference between the CMD and the ENTRYPOINT instructions?
- `CMD`:
    - Sets the default command to be executed when the container starts
    - the `executable` is overridable at runtime, but will still use the params:
        - eg. if we set `CMD ["echo", "Hello, World!"]`, then `docker run <container>` -> runs with `echo "Hello, World!"`
        - but we can set it to something else, like this: `docker run <container> newCommand` -> runs `newCommand "Hello, World!"`
    - Syntax: `CMD ["executable", "param1", "param2"]`
    - Use it to set a default command with flexibility for the user to override
- `ENTRYPOINT:`
    - Sets the command that will always be executed when the container starts
    - can't be easily overwritten - but we can add additional params at runtime:
        - we set it to `ENTRYPOINT ["echo"]` -> then `docker run <container> "Hello, World!"` will execute `echo "Hello, World!"`
    - Syntax: `ENTRYPOINT ["executable", "param1", "param2"]`
    - Use it when you want to enforce a specific command to run and optionally allow parameters
- We can use them combined, in that case `CMD` will provide the params, and `ENTRYPOINT` will provide the executable:
    - `ENTRYPOINT ["echo"]`
    - `CMD ["Hello, World!"]`

### How does caching work in docker build?
- Docker uses a layered architecture:
    - each instruction creates a new layer
    - layers are stacked on top of each other, and each layer depends on the layers below it
    - during the `build` process, Docker checks if any layers can be reused from existing layers (eg they were already created in a previous version):
        - an existing, mathching layer is called the `cached layer` -> this is reused insted of being recreated, saving time
- How to optimize:
    - put frequently changing keywords further down in the docker file, so they are read last (eg. `COPY`)
    - separate dependencies into separate files (eg. `requirements.txt` for a python app)

### What are some common practices for optimizing container image size?
- **Common practices for optimizing container image size:**
    - Use minimal base images:
        - Standard images like `alpine`:
            - `FROM alpine:3.19.1`
        - Or even better in some cases, `distroless images` by Google:
            - `FROM gcr.io/distroless/base`

    - Multi-stage builds:
        - Separate the build environment from the runtime environment, and only copy the necessary artifacts into the final image:

                FROM golang:alpine AS builder
                WORKDIR /app
                COPY . .
                RUN go build -o myapp

                FROM alpine:latest
                COPY --from=builder /app/myapp /myapp
                ENTRYPOINT ["/myapp"]

    - Reduce number of layers by combining commands into a single one:
            
            RUN apt-get update && apt-get install -y \
                curl \
                vim && \
                apt-get clean && \
                rm -rf /var/lib/apt/lists/*
    
    - Clean up after installation:
            
            RUN apt-get update && apt-get install -y \
                curl \
                vim && \
                apt-get clean && \
                rm -rf /var/lib/apt/lists/*
    
    - Use `.dockerignore` file to exclude files that are not necessary for the final image (eg. node_modules, temp)
    
    - Install only required dependencies (eg. using a `requirements.txt` file for a Python app)

### What problems can occur when the "latest" tag is used?
- The main issue is that there is no version control, as `latest` can change over time
- This leads to unpredictable behavior, when a new version comes out, that works differently with other parts of your app (it might become incompatible)
- Debugging becomes difficult, as the environment changes
- Potentially it can pull a non-stable latest version

### Explain the architecture of a Kubernetes cluster!
- Image from official website: https://kubernetes.io/docs/concepts/architecture/
- Nana video: https://www.youtube.com/watch?v=umXEmn3cMWY&list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC&index=4&ab_channel=TechWorldwithNana
- **Basic architecture of a k8s cluster:** (this was called "master-slave-architecture" in the past!)
    - made of a `Master node` (=`Control Plane`) and some `worker nodes`
        - in production environments in order to have a backup of the `master node`, there's usually more that 1 `master node` used

        - Each `worker node` must contain:
            - each `node` needs a **container runtime** (in our case it's the `docker runtime`)
                - this is where the `pods` run
            - the scheduler process is **kubelet** (Kubernetes process that interacts with both the `container` and the `node`)
                - The `API server` on the `control plane`/`master node` communicates directly with the `kubelet` in each `node`
                - `kubelet` starts the `pod` with the container inside and assign resources from the `node` to the `container`
            - **kube proxy** is also installed on every `node`, this forwards the requests from `services` to `pods` (`services` is what connects the nodes instead of direct IP addresses)
            - Apart from this, the `nodes` contain the `docker containers` that are running on them
        - The `master node`/`control plane` runs k8s essential processes:
            - eg `API Server` (also a container): (this is what we communicate with, and this communicates with the nodes)
                - this is the cluster's gateway - the entrypoint to the k8s cluster, to which we can connect using the `UI` or the `CLI`, or through `API` (also authentication process is done by it)
            - `scheduler`:
                - ensures `Pod` placement based on the incoming requests to the `API server`
                - decides on which `worker node` the next `pod` should be started on
                - the actual execution of the request is done by the `kubelet`, the `scheduler` only makes the decision on where it should be done
            - `controller manager`:
                - keeps an overview of what is happening on the cluster
                - detects state changes in the cluster (eg when a pod dies/crashes and needs replacement)
            - `etcd` ("cluster brain"):
                - key-value storage that holds the current state of the cluster
                - backups are made using snapshots of this
                - the application data is not stored here!

    - `virtual network`:
        - this is what connects the `master node` to the `worker nodes`
        - creates a unified machine from all the nodes

### What is the difference between Deployment and StatefulSet kubernetes object? / What is the Deployment Kubernetes object responsible for?
- **Deployment:**
    - A `Deployment` provides declarative updates for `Pods` and `ReplicaSets`
    - We don't want to just rely on 1 node, we have to have backups, so there's no downtime -> we can specify how many replicas we want to make of our app node:
        - We create `deployments`, not `pods` directly, because here we can specify the replica numbers (we can also scale up or down replica numbers)
        - `deployments` are the blueprints for the app's `pods` (they are another abstraction layer, so now we have `container` -> `pod` -> `deployment`)
        - the issue is, we can't replicate a whole node, because we can't replicate databases (for this, we use `statefulSet`):
            - so if we have a stateless App (eg no DB) -> we can use `Deployment`
            - if we have a stateful App (eg we need a DB's state to be tracked for replicas) -> we can use `StatefulSet`

    - After you describe a desired state in a `Deployment`, the `Deployment Controller` changes the actual state to the desired state at a controlled rate. 
        - You can define `Deployments` to create new `ReplicaSets`, or to remove existing `Deployments` and adopt all their resources with new `Deployments`.
    
    - Highest in abstraction hierarchy:
        - `Deployment` (set number of running pods, and set replacement strategy (eg. rolling))
            - `ReplicaSet`
                - `Pod`
                    - `Container` (eg. Docker)

    - The following are typical use cases for `Deployments`:
        1. Create a `Deployment` to rollout a `ReplicaSet`. The `ReplicaSet` creates `Pods` in the background. Check the status of the rollout to see if it succeeds or not.
        2. Declare the new *state* of the `Pods` by updating the `PodTemplateSpec` of the `Deployment`. A new `ReplicaSet` is created and the `Deployment` manages moving the `Pods` from the old `ReplicaSet` to the new one at a controlled rate. Each new `ReplicaSet` updates the revision of the `Deployment`.
        3. Rollback to an earlier `Deployment` revision if the current state of the `Deployment` is not stable. Each rollback updates the revision of the `Deployment`.
        4. Scale up the `Deployment` to facilitate more load.
        5. Pause the `Deployment` to apply multiple fixes to its `PodTemplateSpec` and then resume it to start a new rollout.
        6. Use the status of the `Deployment` as an indicator that a rollout has stuck.
        7. Clean up older `ReplicaSets` that you don't need anymore.
    
    - ![deployment](../../assets/deployment.png)<br>

- **StatefulSets:**
    - `StatefulSets` are a workload API object used for managing stateful applications. They manage the deployment and scaling of a set of Pods, and unlike `Deployments`, they provide guarantees about the ordering and uniqueness of these Pods
    - **What they do:**
        - `StatefulSets` are specifically designed for applications that require a stable, unique network identifier, stable persistent storage, and ordered deployment and scaling.
        - `StatefulSets` maintain a strict order with regards to how Pods are created, scaled, and deleted. They are created sequentially, and also deleted in reverse order during scaling down.
        - Each Pod in a `StatefulSet` derives its hostname from the name of the `StatefulSet` and a unique ordinal for each Pod (e.g., myapp-0, myapp-1). This naming convention remains consistent, even if the Pods are rescheduled to new IPs.
        - `StatefulSets` use `Persistent Volumes` that can be mounted to the Pods based on the same unique ordinal associated with each Pod. If a Pod is rescheduled, it can reattach to the same `Persistent Volume`, preserving its state.
    - ![statefulset](../../assets/statefulset.png)<br>

- **Comparison:**
    - `StatefulSets` -> for apps that have a state (eg DBs)
        - the replaced pods name doesn't change
            - the volume under it is also retained (each pod gets its own PVC and PV)
        - the pod order will also be constant
        - sharding:
            - subdivide the db by a certain criteria in (eg price ranges of products)
            - the rows get subdivided
        - `StatefulSets` needs different blueprint (yaml file):
            - needs a headless service (where the `CLusterIP` is set to `None` in the yaml file)

            - needs a `volumeClaimTemplates` section

### What is a Service kubernetes object responsible for?
- **Service:**
    - A Networking component in k8s, that makes sure the `Pod` is always reachable (the `Pod`'s IP gets updated every time they are reset - a `Service` has a constant availability, and uses **selectors** to refer to `Pods` - `Pods` use **labels**, that the selectors can use)
        - If we update the tag of the `Pod`, it becomes **uncontrolled** (we can use this for testing), and a new one gets created instead
        - **Types:**
            - `ClusterIP:` Makes the connected `Pod` reachable only from inside the cluster. The Service IP remains static.
            - `NodePort:` Makes the `Pod` reachable from outside the cluster through a static port on each `Worker Node`.
            - `LoadBalancer:` Makes the `Pod` reachable from outside the cluster through an external IP address provided by the `CloudProvider`. (we can open `LoadBalancers` with `minikube tunnel`)
            - `Headless:` Sets `ClusterIP` to `none`, allowing clients to connect directly to the `Pods` without a stable IP.
            - `ExternalName:` Maps a service to an external `DNS name` (`URL`), allowing access to services outside the cluster by referring to the external `DNS name` (`URL`).

    - The Kubernetes `service object` (not to be mixed with service in context of microservices) is responsible for handling communication inside or outside the cluster (we mostly use it for internal communications, for external we have `ingress`)
    - The Kubernetes `service object` has a `type` argument which determines its functionality.
    - We use these as a docking bay for a `pod`, so that they can communicate with each other:
        - each `pod` has an IP address, but when that `pod` gets replaced (because it died and needs replacement), a new IP address gets assigned
        - In order for `pods` maintain communication, they are connected with `services`, that have their own `static IP address`
    - The most common service types include:

        - **ClusterIP:**
            - A `ClusterIP` service is the default Kubernetes service. It gives you a service inside your cluster that other apps inside your cluster can access. There is no external access.
            - There are a few scenarios where you would use the Kubernetes proxy to access your services:
                - Debugging your services, or connecting to them directly from your laptop for some reason
                - Allowing internal traffic, displaying internal dashboards, etc.
            - Because this method requires you to run `kubectl` as an authenticated user, you should NOT use this to expose your service to the internet or use it for production services.
        
        - **NodePort:**
            - A `NodePort` service is the most primitive way to get external traffic directly to your service:
                -  `NodePort`, as the name implies, opens a specific port on all the Nodes (the VMs), and any traffic that is sent to this port is forwarded to the service. 
                - Basically, a `NodePort` service has two differences from a normal `ClusterIP` service:
                    - First, the type is `NodePort`. 
                    - There is also an additional port called the `nodePort` that specifies which port to open on the nodes. If you don’t specify this port, it will pick a random port. Most of the time you should let Kubernetes choose the port.
            - There are many downsides to using `NodePorts`:
                - You can only have one service per port
                - You can only use ports `30000–32767`
                - If your `Node/VM` IP address change, you need to deal with that
                
                - For these reasons, we don’t recommend using this method in production to directly expose your service. If you are running a service that doesn’t have to be always available, or you are very cost sensitive, this method will work for you. A good example of such an application is a demo app or something temporary.

        - **LoadBalancer:**
            - A `LoadBalancer` service is the standard way to expose a service to the internet.
            - If you want to directly expose a service, this is the default method:
                - All traffic on the port you specify will be forwarded to the service
                - There is no filtering, no routing, etc. This means you can send almost any kind of traffic to it, like HTTP, TCP, UDP, Websockets or gRPC for example.

            - The big downside is that each service you expose with a `LoadBalancer` will get its own IP address, and you have to pay for a `LoadBalancer` per exposed service, which can get expensive!

### How can be a kubernetes pod reached from the public internet?
- We can either use a `Service`:
    - `NodePort:` Makes the `Pod` reachable from outside the cluster through a static port on each `Worker Node`.
    - `LoadBalancer:` Makes the `Pod` reachable from outside the cluster through an external IP address provided by the `CloudProvider`. (we can open `LoadBalancers` with `minikube tunnel`)
    - `ClusteIP` is not good, because it makes the `Pod` only reachable from inside the `Cluster`

- **Ingress:**
    - It's very similar to `services`, but this is for **external connections** -> we can connect to these from outside the cluster
    - It sits in front of multiple `services` and act as a **smart router** or entrypoint into your cluster.
    - You can do a lot of different things with an `Ingress`, and there are many types of `Ingress controllers` that have different capabilities:
        -  Usually an `ingress controller` will spin up a HTTP(S) `Load Balancer` for you. This will let you do both path based and subdomain based routing to backend services. For example, you can send everything on `foo.yourdomain.com` to the `foo` service, and everything under the `yourdomain.com/bar/` path to the bar service

### What kind of probes are there in Kubernetes, and what are their use cases? / What is the difference between LivenessProbe and ReadinessProbe?
- `Liveness` and `readiness probes` are mechanisms in Kubernetes used to manage how `containers` inside a `Pod` are handled. They help Kubernetes make decisions about when to restart a container or when to route traffic to a pod.
- We can build it into the `deployment.yaml` file (under the `containers` section)

- **Liveness Probes** ("is the container still alive?")
    - Liveness probes are "health checks", and are used to know whether to restart a container. The main purpose of a liveness probe is to check if an application inside a container is still running. If the liveness probe fails, Kubernetes assumes that the container is in a broken state and restarts it automatically.

    - **Example Use Case:**
        - An application might be running, but it's deadlocked, with all threads hung. Although the application process is still running, the application is not functioning as expected. A liveness probe could catch this by checking some type of "I am alive" signal at a set interval. If this check fails, Kubernetes restarts the container to try to restore normal operation.

- **Readiness Probes** ("Is the container ready?")
    - Readiness probes are used to determine when a container is ready to start accepting traffic. Essentially, the readiness probe is meant to check if the application is ready to serve requests. If the readiness probe fails, Kubernetes won’t send traffic to the pod until it passes.

    - **Example Use Case:**
        - A web server is deployed within a container, and it starts up with some initial load time because it might be loading large data sets or configurations. Even though the container is running, it's not yet ready to serve traffic. A readiness probe can check the HTTP endpoint or a specific condition that returns success only when the server is truly ready to handle requests.

### What is the difference between resource Limit and Request?
- **Limit & Request:**
    - **Request:** 
        - Describes what is the minimum resource (CPU & memory) required for a pod to start.
        - Kubernetes uses resource requests to make scheduling decisions, and it needs to make sure the request is fulfilled
    - **Limit:** 
        - Describes what is the maximum amount of resources (CPU and memory) that a pod can use.
        - Kubernetes uses resource limits to constrain the resource usage of containers, preventing any single container from using more than its allocated resources and affecting other containers, and for this it uses Limit

### What are the main differences between ConfigMaps and Secrets?
- **In short:**
    - `ConfigMap`:
        - used to store non-sensitive configuration data in key-value pairs:
            - allows you to decouple environment-specific configuration from your container images ( Otherwise we would have to build and deploy our apps again, when we change something inside the app's configuration)
        - not encrypted, stored in plain text format
        - Use Case: Used to pass configuration data to `Pods`, such as environment variables, command-line arguments, or configuration files, to applications. (`Pod` and `ConfigMap` needs to be in the same namespace!)
    - `Secret`:
        - used to store sensitive data, such as passwords, OAuth tokens and SSH keys in key-value pairs
        - encoded, but the access is usualy also restricted
        - Use Case: Used to pass sensitive information to applications in `Pods` securely.

## Infrastructure as Code
### What is Infrastructure as Code? What are its advantages and disadvantages?
- `IaaC`:
    - Infrastructure as a Code: 
        - uses code (files) to create and manage infrastructure
        - this process allows for automatation and versioning of infrastructure changes, by treating it as code
    - Benefits:
        - easily reproduced
        - automated
        - scalability (easily scale up or down by changing config parameters)
        - uses states
        - version control (keep track of changes and see history)
    - Disadvantages:
        - slow process to set up initially
        - complex configurations
    - A standard tool for this is `Terraform`
    - Providers:
        - these wrap an API, that you can modify and then call it

### What are the basic commands of the terraform workflow?
- The base loop (Lifecycle commands / state management commands):
    - `terraform init`:
        - Initializes a Terraform working directory. If remote backends are used, this command configures the backend.
        - (initialize an operational index that contains Terraform pattern files)
    - `terraform plan`:
        - Generates an execution plan, showing what actions Terraform will take to reach the desired state.
    - `terraform apply`
        - Applies the changes required to reach the desired state of the configuration.
- To then destroy it, we can use:
    - `terraform destroy`
- More commands:
    - `terraform state`:
        - Provides subcommands for advanced state management tasks, such as listing resources, showing specific resources, and removing resources from the state file.
    - `terraform refresh`:
        - Updates the state file with the real-world state of the managed resources.
    - look for more by typing `terraform`, then hitting `Enter`

### What is the difference between resources and data sources in terraform?
- `resource`:
    - A resource represents a component of your infrastructure (we use the keyword, if we want to tell TF that we want to create a component in our infrastrucuture)
    - if a resource type has only 1 instance, we call it `this`
    - we can also use it to update or delete a component in our infrastructure
    - it doesn't necessarily represen 1 component, because for example if we want to create a private S3 bucket (`block public access`), we need 2 resources (1 that creates the S3, then the second resource makes it private)
- `data`:
    - used to reference something external
    - allows you to retrieve or query information that is external to Terraform (eg information about existing resources or services)
    - Data sources are read-only; Terraform does not manage the lifecycle of data sources

### What does state mean in the context of terraform?
- A state a stackünk (=backend) leképződése terraformban
- `state` refers to a file that Terraform uses to keep track of the resources it manages. It serves as a mapping between the resources defined in your configuration and the actual resources in your infrastructure.
- state files (`terraform.tfstate`) keep a record of all resources created and managed by Terraform, including their configurations and metadata.
- a state can be local (default), or remote, if we want to work in a team

### What are modules in terraform?
- **Module:**
    - A self-contained collection of Terraform configurations that manages a collection of related infrastructure resources.
    - Other Terraform configurations can call a module, which tells Terraform to manage any resources described by that module.
    - Modules define `input variables` (which the calling module can set values for) and `output values` (which the calling module can reference in expressions).

### List the meta-arguments in terraform with their use cases!
- `meta-arguments` are special arguments that can be used with resources, modules, and other constructs to modify or control their behavior
- Some examples:
    - `count`
        - **Use Case:** Used to create multiple instances of a resource or module. The value assigned to count determines how many instances are created.

                resource "aws_instance" "example" {
                    count = 3
                    ami = "ami-123456"
                    instance_type = "t2.micro"
                }

    - `for_each`
        - **Use Case:** Provides a way to iterate over a map or set of strings to create multiple instances of a resource or module. It allows for more complex and fine-grained control compared to count.

                resource "aws_instance" "example" {
                    for_each = var.instances
                    ami = "ami-123456"
                    instance_type = "t2.micro"
                }

    - `depends_on`
        - **Use Case:** Explicitly declares dependencies between resources. This ensures that certain resources are created or destroyed only after others.

                resource "aws_instance" "example" {
                    ami = "ami-123456"
                    instance_type = "t2.micro"
                    depends_on = [aws_vpc.example]
                }

    - `lifecycle`
        - Use Case: Controls resource lifecycle settings, including create_before_destroy, prevent_destroy, and ignore_changes.

                resource "aws_instance" "example" {
                    ami = "ami-123456"
                    instance_type = "t2.micro"
                    
                    lifecycle {
                        create_before_destroy = true
                        prevent_destroy = true
                        ignore_changes = [tags["Name"]]
                    }
                }

    - `provider`
        - **Use Case:** Specifies a provider configuration to use for a resource or module. Useful for multi-cloud or multi-region deployments.

                resource "aws_instance" "example" {
                    provider = aws.west
                    ami = "ami-123456"
                    instance_type = "t2.micro"
                }

    - `provisioner`
        - **Use Case:** Executes scripts or commands on the local machine or on remote resources as part of the resource creation or destruction process.

                resource "aws_instance" "example" {
                    ami = "ami-123456"
                    instance_type = "t2.micro"

                    provisioner "local-exec" {
                        command = "echo ${aws_instance.example.id}"
                    }
                }

    - `connection`
        - **Use Case:** Defines how to connect to the resource for the purpose of running provisioners. It is used in conjunction with provisioner.

                resource "aws_instance" "example" {
                    ami = "ami-123456"
                    instance_type = "t2.micro"

                    provisioner "remote-exec" {
                        inline = ["sudo apt-get update", "sudo apt-get install -y nginx"]
                    }

                    connection {
                        type = "ssh"
                        user = "ubuntu"
                        private_key = file("~/.ssh/id_rsa")
                        host = self.public_ip
                    }
                }
    - `timeouts`:
        - **Use Case:** Configures custom timeout settings for resource creation, update, and deletion operations.

                resource "aws_instance" "example" {
                    ami = "ami-123456"
                    instance_type = "t2.micro"

                    timeouts {
                        create = "10m"
                        update = "15m"
                        delete = "5m"
                    }
                }

### What is the best practice for a terraform project's file structure?
1. Root Directory
    - The root directory should contain general configuration files and directories for various environments and components.
        - `main.tf`
        - `variables.tf`
        - `outputs.tf`
        - `provider.tf`
        - `terraform.tfvars`

    - `main.tf` file:
        - try to outsource variables into separate `variables` file
        - Define outputs to expose information about the infrastructure to `outputs.tf`
        - Configure provider settings in `providers.tf` file
        - Provide default values in `terraform.tfvars` file
    
    - use `.gitignore` to exclude files like `terraform.tfvars`

2. Create subdirectories:
    - for environments:
        - `/environments`
            - eg:
                - `/development`
                - `/staging`
                - `/production`
    - for modules:
        - Modules should be reusable components, each with its own directory containing Terraform configurations.
        - `/modules`
            - `/network`
            - `/compute`
            - `/storage`

## TERRAFORM (Additional)
### What are the key features of Terraform?
- Terraform key features:
    - Infrastructure as Code (IaC): Define and provision infrastructure using declarative configuration files.
    - Platform Agnostic: Supports multiple cloud providers and services via a plugin-based architecture.
    - State Management: Maintains state of infrastructure to track resource changes over time.
    - Dependency Graph: Automatically determines the order of resource creation and deletion based on dependencies.
    - Modularization: Reusable and shareable modules for managing infrastructure components
    - Immutable Infrastructure: Ensures consistency by recreating resources rather than modifying them in place.
    - Change Automation: Automates resource provisioning, scaling, and management tasks.
    - The ability to translate HCL code into JSON format
    - A configuration language that supports interpolation 
    - A module count that keeps track of the number of modules applied to the infrastructure.
    
### What is the best way to store the terraform state file?
- The best way to store the state file is to keep it in the remote backend like S3 or GitLab-managed terraform state so, that whenever multiple people are working on the same code resource duplication won’t happen.

### What is terraform state locking?
- Whenever we are working on any terraform code and do terraform plan, apply or destroy terraform will lock the state file in order to prevent the destructive action.

### What is Terraform backend?
- A backend defines where Terraform stores its state data files. Terraform uses persisted state data to keep track of the resources it manages.


### What is a null resource?
- As in the name you see a prefix null which means this resource will not exist on your Cloud Infrastructure
- Terraform null_resource can be used in the following scenario:
    - Run shell command
    - You can use it along with local provisioner and remote provisioner
    - It can also be used with Terraform Module, Terraform count, Terraform Data source, Local variables
    - It can even be used for output block

### What are the types of provisioners?
- Remote exec: Run commands using Terraform on a remote server
- Local exec: Run commands using Terraform on the local system

### What is the difference between locals & variables in terraform?
- The variables are defined in the variables.tf file or using variables keyword that can be overridden but the locals can not be overridden.
- So if you want to restrict the overriding the variables at that time you need to use the locals.

## EXTRA QUESTIONS - RELEASE ENGINEER (not in the current material!)

### What are the Jenkins Agents?

### What keywords can be used in Gitlab to start a sidecar container during the build?

### How can you create a paralel build jobs in Gitlab CI?