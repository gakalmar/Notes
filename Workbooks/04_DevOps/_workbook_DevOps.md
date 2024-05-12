# Advanced Module - DevOps Workbook

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
### What is DNS?
### What is DHCP?
### What are some well-known ports?
### What are the private IP address ranges?
### How many usable addresses are in 192.168.1.0/24?
### What network diagnostic/debugging tools are you familiar with?
### What is the purpose of the ARP protocol?
### What are the basic networking components in AWS?

## Security
### What is encryption at rest and encryption in transit, and how are these implemented in AWS?
### Which service is responsible for monitoring and log collection in AWS?
### What is a bastion host, and how can it be implemented in AWS?
### What are the key differences between security groups and NACLs?
### Which service is responsible for tracking activities on an AWS account?
### Explain the difference between symmetric and asymmetric encryption!
### What is the Principle of Least Privilege, and how can it be implemented in AWS?
### How do AWS IAM roles differ from IAM users, and in what scenarios would you use each?
### Explain the AWS Shared Responsibility Model in the context of security.

## Containers and container orchestration
### What are the key differences between containers and virtual machines?
### What are the most important instructions in a Dockerfile?
### What is the difference between the CMD and the ENTRYPOINT instructions?
### How does caching work in docker builds?
### What are some common practices for optimizing container image size?
### What problems can occur when the "latest" tag is used? 
### Explain the architecture of a Kubernetes cluster!
### What is the Deployment Kubernetes object responsible for?
### What kind of probes are there in Kubernetes, and what are their use cases?
### What is the difference between resource Limit and Request?
### What is the Service Kubernetes object responsible for?
### What are the main differences between ConfigMaps and Secrets?

## Infrastructure as Code
### What is Infrastructure as Code? What are its advantages and disadvantages?
### What are the basic commands of the terraform workflow?
### What is the difference between resources and data sources in terraform?
### What does state mean in the context of terraform?
### What are modules in terraform?
### List the meta-arguments in terraform with their use cases!
### What is the best practice for a terraform project's file structure?

# CHECKLIST

### bash
- write and execute bash scripts
- sed, jq, curl, ...
- subshell [$()], arithemtic expression [$(())], piping [|], input/output redirection [>,>>,<<]
- if, for
- functions
- arguments
- expected output: sh file, successful execution

### Docker
- Dockerfile
- expected output: Dockerfile, successful build

### docker-compose
- Review: nginx-flask (docker-compose solution)
- app (given), nginx, database
- expected output: docker-compose, successful run

### Kubernetes
- Basic types: namespace, deployment, service, configmap, secret
- expected output: manifest file(s)

### Terraform (AWS)
- Create AWS infrastructure (S3, dynamodb, IAM, networking, ...)
- terraform documentation
- expected output: tf files, successful apply

# QUESTION GENERATOR:
- `docker run --rm csuvikg/generate-tti`

# Advanced DevOps module

## System engineering

### What kind of virtualization technologies are you familiar with?

### What level of virtualization implementations are you familiar with?

### What command line text manipulation tools are you familiar with?

### How would you create scheduled command command to run every sunday at midnight?

### How would you check the available free memories?

### How would you check the available free disk space on the computer?

### What are hard links and symbolic links?

### How would you make a service auto-start and machine boot-up

---

## Network engineering

### What is a MAC address?

### What is the difference between binding to 127.0.0.1 or 0.0.0.0?

### What are the Layers of the OSI model?

### What is the difference between a router and switch?

### What is the difference between TCP and UDP?

### What is a VPN?

### What is DNS?

### WHat is DHCP?

### What is a VPC

---

## Security engineering

### In what AWS service can you store sensitive data?

### What network topology is good for hiding EC2?

### How those EC2 called which are serving as a single entry point for accessing protected resource on a restricted network?

### What AWS service is responsible for monitoring and log collection?

### What AWS service is responsible for tracking activites on the account?

### What is the difference between SG and NACL?

### What is the difference between KMS and HSM?

---

## Application

### What is the difference between Docker and Virtual Machine?

### What is the keyworld for defining the base image of a Dockerfile?

### What is the difference between CMD and ENTRYPOINT?

### What is the layout of a minimal Kubernetes deployment?

### What is the difference between Deployment and StatefulSet kubernetes object?

### What is a Service kubernetes object responsible for?

### How can be a kubernetes pod reached from the public internet?

### What is the difference between LivenessProbe and ReadinessProbe?

### What is the difference between resource Limit and Request?

---

## Infrastructure as Code

### What are the basic commands of the terraform cli?

### What is the difference between resource and data in terraform?

### What is state in the context of terraform?

---