# DevOps

## Virtual Box *( Full Manual: https://www.virtualbox.org/manual/ )*
- Oracle's open-source type-2 hypervisor
- Commands:
    - Ctrl + Alt + F1-F6 - virtual console (SSH - Secure Shell)
    - Ctrl + Alt + F7-F8 - GUI
    - Ctrl + Alt + T - open terminal from GUI

- **Virtualization:**
    - the process of creating a software based or virtual version of something (compute, storage, networking, servers or applications)
    - The **hypervisor** makes it feasible:
        - Also called Virtual Machine Monitors (VMMs)
        - It's a piece of software, that runs above the physical server/host
        - It pulls the resources from the physical server/host and allocate them to the virtual environment
        - 2 main types:
            - Type I. / Bare Metal hypervisor
                - Installed directly on top of the physical hypervisor:
                    - HARDWARE -> HYPERVISOR -> VM
                - Most frequently used and most secure
                - Eg.: VMware ESXi / Microsoft Hyper-V / Xen / Opensource KBM / Oracle VM Server for x86
            - Type II. / Hosted
                - There's an additional layer of Host OS between the Host and the Hypervisor:
                    - - HARDWARE -> **HOST OS** -> HYPERVISOR -> VM
                - Less frequent, mostly used for end-user virtualization
                - Eg.: Oracle VM VirtualBox / VMware Workstation (Pro) & VMware Fusion (for Mac) / Paralells Desktop / QEMU
    - Once the hypervisor is installed, we can create **VMs** (Virtual Machines):
        - A VM is a software based computer, that behaves like a separate computer (it has it's own OS and storage, etc.)
        - We can run multiple VMs on a hypervisor (they each can have different OSs)
        - The hypervisor manages the resources that are allocated to these virtual environments
        - They are **portable**, so we can move a VM from 1 hypervisor to another hypervisor
    - **Benefits:**
        - Reduce costs by reducing infrastructure -> Running multiple environments in 1 physical machine
        - Agility and speed: setting up a VM and transfering it to another machine is very simple and quick
        - Lower downtime: if a host goes down, we can just quickly move the VM to another machine that works

- **Virtual Machine:**
    - Definition 1:
        - It's a software emulation of a physical computer
        - It runs an operating system and applications just like a physical computer, but it's **encapsulated** in a layer of software called a **hypervisor** that runs on top of your physical hardware. This allows multiple VMs to run on a single physical machine, with each VM isolated from the others. This isolation means that the processes, software, and data on one VM can't interfere directly with those on another VM.
        - allows for the dynamic allocation of physical resources like CPU and memory to VMs, ensuring that the host system's resources are used efficiently.

    - Definition 2:
        - A virtual machine is a completely self-contained operating system running on another piece of hardware.
        - You interact with it the same exact way you would use any other desktop computer or server.
        - The idea is you can use 1 set of hardware that houses several VMs. The hardware resources (RAM, CPU, storage) are split amongst the VMs. Each VM is completely self-contained. You could, for example, run 3 VMs on a single piece of hardware, each running a different operating system, with 3 separate configurations tailored for different jobs.
        - A VM image is a snapshot of the entire VM. These images are generally used for migrating VMs from one system to another, or as a form of backup and restore. You typically cannot interact directly with a VM image, it needs to be turned into a VM before you can use it - the process to do this depends on the hypervisor (i.e.: the VM software) you are using.
    - **Container vs Virtual Machine:**
        - A Linux container is conceptually similar to a VM, but functions differently:
            - Containers are not full, independent machines, they are just an isolated process
            - They share the same Linux kernel as the host OS, and also the libraries and files required for the execution of processes
            - Typically containers are used to run a single program instead of a whole server.
    - **Snapshots:**
        - with snapshots you can save the current state of a VM and return to that state at any time, making it easier to recover from mistakes or experiment without risk.

- **Virtual Appliance:**
    - a pre-configured virtual machine image designed to provide a specific set of services or to perform a particular function, ready to be run on a hypervisor
    - they are essentially self-contained packages that include all the necessary software, settings, and sometimes operating system environments needed to deploy a service or application with minimal setup
    - they simplify the deployment and management of software applications because they eliminate the need to install and configure software from scratch. Instead, you can simply import the virtual appliance into a virtualization platform and run it
    - Since virtual appliances are tested and configured by the provider, they offer a consistent and reliable environment.

- **Virtualization strategies:**
    - The most simple is **hosted virtualization**, which involves a **HOST OS** and a **GUEST OS**:
        - host operating systems run on hardware and guest operating systems run on a virtual machine
    - It uses:    
        - the existing operating system (host operating system),
        - third-party virtualization software,
        - a variety of guest operating systems (each guest OS operates using shared resources with its host)
    
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

- **Guest additions:**
    - designed to be installed inside a virtual machine after the guest operating system has been installed
    - consist of device drivers and system applications that optimize the guest operating system for better performance and usability
    - provided as a single CD-ROM image file which is called `VBoxGuestAdditions.iso` (located in the installation directory of Oracle VM VirtualBox).
        - To install the Guest Additions for a particular VM, you mount this ISO file in your VM as a virtual CD-ROM and install from there
    - **Features:**
        - **Mouse pointer integration:**
            - provides you with seamless mouse support
            - pressing the Host key is no longer required to free the mouse
        - **Shared folders:**
            - provide an easy way to exchange files between the host and the guest
        - **Better video support:**
            - VirtualBox emulates a virtual graphics card for guest OSs with basic features only -> additions provide extra features and quality
            - Resizing of the VM window can also happen in this case
        - **Seamless windows:**
            - the individual windows that are displayed on the desktop of the virtual machine can be mapped on the host's desktop, as if the underlying application was actually running on the host
        - **Generic host/guest communication channels:**
            - allow you to control and monitor guest execution
            - *guest properties* provide a generic string-based mechanism to exchange data bits between a guest and a host
        - **Time synchronization:**
            - VirtualBox can ensure that the guest's system time is better synchronized with that of the host
            - useful when for example a VM was paused and needs to be resynced
        - **Shared clipboard:**
            - the clipboard of the guest operating system can optionally be shared with your host operating system
        - **Automated logins / Shared credentials:**
            - each version of VirtualBox has it's own version of Guest Additions - automatically checks and makes sure this is updated properly

- **Emulated hardware:**
    - VirtualBox virtualizes almost all hardware of the host:
        - **Input devices:**
            - can emulate a standard PS/2 keyboard and mouse
            - can provide virtual USB input devices to avoid having to capture mouse and keyboard
        - **Graphics:**
            - default graphics devices is SVGA for Windows guests
            - for Linus guests an SVGA graphics devices is emulated
            - legacy guest OS: a VGA-compatible graphics device is available
        - **Storage:**
            - emulates the most common types of hard disk controllers
            - only one of these controllers would be enough for Oracle VM VirtualBox by itself, this multitude of storage adapters is required for compatibility with other hypervisors
            - migrating VMs between hypervisors is very difficult or impossible if the storage controllers are different
        - **Networking:**
            - For each card, you can individually select what kind of hardware will be presented to the virtual machine
        - **USB:**
            - emulates these types of USB host controllers: xHCI, EHCI, and OHCI
        - **Audio:**
            - determines whether the VM will detect a connected sound card, and if the audio output should be played on the host system

- **Disk, Drive, Volume, Partition, Image:**
    - **Disk vs Drive:**
        - **Disk** refers to a physical magnetic platter (the actual physical material that stores all of your data)
        - **Drive** is a physical storage device used to read or write data from and to the disk (traditionally a disk goes into a drive)
            - In Unix-like operating systems, devices are represented by special file system objects called *device nodes* which are visible under the `/dev` directory
        - **Hard Disk Drive (HDD):** once disks and drives became small enough with technology, they could be integrated into a single unit
        - **Solid-State Drive (SSD):** these don't even have a "hard" disk part anymore
    - **Partition vs. Volume:**
        - Disks and Drives are **physical** entities, but parititons and volumes are logical locations on a disk
        - **Partition:**
            - a portion of a disk with a specific size (a literal partition of the available storage space)
            - doesn't necessarily have a file system or need to be formatted
            - Each partition will show up under `/dev` as a separate device node in Unix-like operating systems
        - **Volume:**
            - a partition that has been formatted and has a file system and a "Drive" letter
            - the logical part of the disk, that can be seen and accessed
            - whenever you connect a HDD/SSD/External Drive/Flash Drive and appears in the file browser, what you can see is the Volume
            - In Windows a letter is assigned to a volume (eg. "C" or "D"), when they are formatted to `FAT32`, `exFAT` or `NTFS`
            - The disk can have multiple partitions and volumes, and can be resized using *disk parition management tools*
            - The term volume in Linux is related to the **Logical Volume Manager (LVM)**, which can be used to manage mass storage devices
    - **Virtual Disk vs. Virtual Partition:**
        - **Virtual Disk:**
            - A virtual disk is the storage space used by a virtual machine (is just a file on your computer that is used to store all the information required to run a particular virtual machine)
            - The access method is the same as accessing a physical disk
        - **Virtual Partition:**
            - a combination of 2 or more paritions that a computer can access, like a single partition
            - they aren't physically related to a disk
            - Linux often uses partitions from one or even more disks to create virtual partitions
    - **Image:**
        - Images are identical **snapshots of volumes**, but they have no physical hardware related to them
        - They are copies of one or more volumes, containing every single bit stored on the captured volumes
        - You can create an image of any volume, and store it on any other storage device with sufficient free space
        - They are mostly used to create system backups in case anything fails
        - An image has to be mounted or attached first before it can be accessed, just like a volume
    - **Container:**
        - Containers are used in place of partition tables in the APFS (= Apple File System in macOS)
        - They are a logical portion of a disk that stores volumes and other metadata
        - Within an APFS, disks hold containers and containers hold volumes
        - Containers have space allocations (max space they can use) - these can be set to flexible, so they only take what they need up to the max

## LINUX:
- **Introduction:**
    - It's a free, open-sourse Unix-based Operating System
    - The most commonly used OS on servers and critical systems, because its security features and because it's less prone to malware
    - very high level of customizability
    - There are many Linux Distributions (distros), like **Ubuntu**, **Fedora**, **Debian** and **CentOS**
    - It's also the base of Android

- **Linux Color meanings:**
    - Blue: Directory
    - Green: Executable or recognized data file
    - Cyan (Sky Blue): Symbolic link file
    - Yellow with black background: Device
    - Magenta (Pink): Graphic image file
    - Red: Archive file
    - Red with black background: Broken link

- **Components:**
    - **Kernel:** 
        - The core of the Linux operating system, responsible for managing the system’s resources, such as CPU, memory, and hardware devices. It acts as an intermediary between software applications and the hardware.
    - **Shell:**
        - A command-line interface (CLI) that allows users to interact with the operating system by typing commands. Bash is the most common shell used in Linux.
    - **Graphical User Interface (GUI):** 
        - Although not a requirement, most Linux distributions come with a GUI to make it more user-friendly. Examples include GNOME, KDE Plasma, and Xfce.
    - **Software Applications:** 
        - Linux supports a wide range of applications, from web browsers like Firefox and Chrome, to office suites like LibreOffice, to multimedia apps, development tools, and more.

- **Linux Virtual Console (Terminal):**
    - Virtual consoles and terminals allow multiple users to login and access a Linux system simultaneously
    - **History**: 
        - mainframe computer was the main computer at companies, to which users could connect with a separate, less powerful computer (this was called the **terminal** or teletype)
        - Since the terminal is directly connected to the system, it soesn't need any aoftware or application to run
        - Inside the terminal, linux console is the only place where you can enter commands to the system

    - A Linux OS now runs on each PC -> it offers a way to access software configuration virtually, using the **virtual console** (apart from wired physical console):
        - **Physical console:** 
            - A physical terminal device connected with Linux system on serial port via serial cable physically.
        - **Virtual console:** 
            - An application that simulates a physical terminal device in software and connects it with Linux system on serial port through software configuration virtually.
            - Different Linux flavors (?) offer different number of consoles, eg. ubuntu has 7
            - there is always a default physical console as well (so the total is always virtuals + 1)
            - virtual consoles simulate physical terminals, so they always get CLI installation (command-line interface)
        
        - **Virtual console vs. Terminal:**
            - A Virtual console uses a single terminal to provide workspace and a command prompt
            - Since a virtual console offers only CLI interface and uses a single terminal to access the CLI interface, the words virtual console and terminal are sometimes interchanged, but they are different:
                - **virtual console** refers to an application that simulates a physical terminal 
                - **terminal** refers to an application that allows us to access and use the shell
        
        - **Virtual Terminal:**
            - They are CLIs that are used for executing commands and offering input
            - useful when multiple users want to access a computer
            - Access them using Ctrl + Alt + F1-F6 keys (tty1-6) -> you can log in to each one with a separate username
            - Ctrl + Alt + F7 is the GUI if installed
        
        - **Shell vs. Terminal vs. Console:**
            - **Shell:** The interface that interprets your commands, usually within a terminal or console.
            - **Terminal:** A graphical or text-based application that emulates a physical terminal, allowing you to interact with the shell.
            - **Console:** Refers to the physical terminal in historical contexts or the primary interface for text input/output in modern usage, often seen in server environments.

    - **Working environments:**
        - **Graphic User Interface (GUI):**
            - contains the Desktop environment and allows user to access several sub-shells simultaneously
            - we can skip it during installation (if selected, it is installed on a physical console, and CLI on virtual)
        - **Command Line Interface (CLI):**
            - contains only command line interface and allows user to access a single shell at a time

- **Linux File Systems:**
    - **Filesystem Hierarchy Standard (FHS)** is a reference describing the conventions used for the layout of Unix-like systems
        - all files and directories appear under the root directory `/`, even if they are stored on different physical or virtual devices
        - Eg:
            - `/` Root/Primary hierarchy
            - `/bin` Essential command binaries that need to be available in single-user mode (eg. to bring up the system or repair it)
            - `/boot` Boot loader files (eg kernels)
            - `/dev` Device files
            - `/lib` Libraries essential to binaries
            - `/mnt` Temporary mounted filesystems
        - more here: https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard#Directory_structure

    - **The role of the file system:**
        - It organizes data into files and directories (folders), making it easier for users and systems to manage and access information:
            - Hierarchical organization
            - Determines how data is physically stored on a disk (or other storage media)
            - Retrieve data through file names and paths
            - Metadata management (info about files and their details)
            - Space management: manage space allocation to minimize wasted space, improve efficiency
            - Access control: implement permissions that controls who can do what with the data (r-w-x)
    
    - **Linux File System Types:**
        - **ext2 - Second Extended File System:**
            - Least bugs
            - Takes a really long time to reboot after a power cut
            - Can be upgraded to ext3
        - **ext3 - Third Extended File System:**
            - Includes journaling
            - Booting is much quicker due to the journaling
            - Takes up more memory than ext2
        - **Reiser File System:**
            - An alternative for ext3 - also uses journaling
            - bigger files and volume sizes
            - Faster than ext2 & 3
        - **ext4 Fourth Extended File System:**
            - upgraded ext3 (also uses journal with check sums - avoids corrupted files)
        - **btrfs File System:** ("butter FS)"
            - Copy-on-Write feature
            - uses Storage pools
            - Snapshot feature

    - Other non-Linux types:
        - HFS+
        - exFAT
        - FAT32
        - NTFS

- **Linux File Types:** *( https://www.youtube.com/watch?v=7KTk8NVB1N8&ab_channel=BeginLinuxGuru )*
    1. **Regular Files** `(-)`
        - Symbol: - (dash) at the start of the file permissions.
        - Description: These contain text, data, script, or binary executable code. Most files you'll work with are regular files.
        - Key Point: Regular files can be read, modified, and executed (if they are scripts or compiled binaries with appropriate - permissions).
    2. **Directories** (`d`)
        - Symbol: d at the start of the file permissions.
        - Description: Directories are files that list other files. They are used to organize the filesystem into a hierarchical - structure.
        - Key Point: Use commands like cd, ls, mkdir, and rmdir to navigate, list, create, and delete directories.
    3. **Symbolic Links** (`l`)
        - Symbol: l at the start of the file permissions.
        - Description: Symbolic links are pointers to other files or directories. They can be used for shortcuts or to make a file/- directory accessible from multiple locations.
        - Key Point: Symbolic links are particularly useful for linking libraries, versioning, and creating accessible paths. Use - the ln -s command to create symbolic links.
    4. **Device Files**
        - a. Character Devices (`c`)
            - Symbol: c at the start of the file permissions.
            - Description: Character devices are hardware devices that handle data as a stream of bytes (like keyboards, mice, and serial ports).
            - Key Point: They are accessed and programmed via device files, usually found in /dev.
        - b. Block Devices (`b`)
            - Symbol: b at the start of the file permissions.
            - Description: Block devices are hardware devices that store or hold data (like hard drives and flash drives). They read/- write data in blocks.
            - Key Point: Like character devices, block devices are interacted with through their device files in /dev.
    5. **Named Pipes or FIFO** (`p`)
        - Symbol: p at the start of the file permissions.
        - Description: FIFOs (First In, First Out) are special files that act as pipelines between processes, allowing for inter-process communication.
        - Key Point: Data written to a FIFO by one process can be read by another process in the order it was written.
    6. **Sockets** (`s`)
        - Symbol: s at the start of the file permissions.
        - Description: Sockets are used for IPC (Inter-Process Communication) to exchange data between processes, either within the same computer or over a network.
        - Key Point: They support communication between processes running on different systems and are fundamental to networked applications.
    7. **Special Files**
        - Description: Files in /proc and /sys provide interfaces to kernel data structures. They don’t correspond to actual files on disk but appear as files for ease of access.
        - Key Point: These are useful for querying system and process information or configuring devices and kernel parameters.

- **Hard vs Soft links:** *( https://www.youtube.com/watch?v=lW_V8oFxQgA&ab_channel=CBTNuggets )*
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

- **Flags, Switches and Manual Pages:**
    - **Flags and Switches**
        - **What They Are:** 
            - Flags (also known as options or switches) are additional parameters you add to commands in the terminal to modify their behavior. They provide a way to specify different operations or settings within a single command.
        - **Characteristics:**
            - **Short Flags:**
                - Typically preceded by a single dash `-` and use a single letter, e.g., `-v`. Short flags can often be combined, such as `-vf` instead of `-v` `-f`.
            - **Long Flags:**
                - More descriptive and preceded by two dashes `--`, e.g., `--verbose`. These cannot be combined like short flags.
            - Flags can take values (e.g., `-o filename` or `--output=filename`) or act as boolean switches to turn features on or off.

        - **Usage:**
            - **Modify command behavior:** For instance, `ls -l` lists files in "long format", adding detail compared to just `ls`.
            - **Combine multiple options:** E.g., grep `-i` `-v` "pattern" can be shortened to grep `-iv` "pattern" for case-insensitive searching excluding matches.

    - **Manual Pages (man)**
        - **What They Are:** 
            - Manual pages, accessible via the `man` command, are the built-in documentation for Unix-like systems. They provide detailed information about commands, including their purpose, syntax, options, and examples.

        - **Characteristics:**
            - **Structured Documentation:** Man pages are divided into sections, such as `NAME`, `SYNOPSIS`, `DESCRIPTION`, `OPTIONS`, `EXAMPLES`, `SEE ALSO`, etc.
            - **Navigable:** Use navigation keys (e.g., `Enter`, `Space`, `q` to quit) to move through the document in the terminal.
            - **Sections:** Man pages are categorized into sections, such as user commands, system calls, library functions, devices, and file formats. You can specify the section before the command (e.g., man 1 printf).

        - **Usage:**
            - Learning command usage and options: `man ls` shows how to use the `ls` command.
            - Discovering new tools: Browsing man pages can uncover new commands and options.
            - Understanding system functions and configurations.

    - **Key Points:**
        - **Efficiency and Precision:** Knowing how to use flags and switches can make your command line work faster and more precise. You can tailor command behavior to exactly what you need.
        - **Self-Sufficiency:** Manual pages provide a wealth of information right in the terminal, reducing dependency on internet searches for basic command usage and options.
        - **Understanding Your System:** Reading man pages can deepen your understanding of how Unix-like systems work, leading to better problem-solving and system administration skills.
        
    - **Tips:**
        - **Exploring Flags:** Experiment with different flags for commonly used commands (`ls`, `grep`, `curl`) to become more familiar with them.
        - **Manual Page Exploration:** Make a habit of using `man` command to understand new commands or refresh your memory on command options.
        - Use `--help`: Many commands support a `--help` flag that provides a concise overview of the command's usage and options.

- **Linux startup process:**
    - **4 main steps:** 
        1. **system startup:**
            - When a Linux system is powered up or reset, its processor will execute a specific firmware/program (**BIOS**(PC) or **boot ROM**(embedded Linux)) for system initialization.
        2. **bootloader stage:**
            - The BIOS performs POST checks (power-on self test) and identifies the boot device
            - Then loads the first stage of the bootloader (eg. **GRUB** (GRand Unified Bootloader)) into RAM for later execution.
            - The **primary role of the bootloader** is to manage the boot process and load the operating system. If there's a dual-boot setup, the bootloader allows the user to choose between operating systems.
        3. **kernel stage:**
            - The bootloader then loads the second-stage bootloader (also **GRUB** ?), which loads the **Linux kernel** from the boot partition into memory.
            - The **kernel** initializes the hardware devices, mounts the root filesystem as specified by the bootloader, and starts the init process.
        4. **init process:**
            - Finally, the **init process** starts(takes over as the first user-space process).
            - The init process can be traditional `SysVinit`, `Upstart`, or more commonly now, `systemd`
            - It is responsible for bringing the system to the desired runlevel/state by starting system services and daemons according to scripts or configuration files.
            - This process includes setting up network interfaces, starting system services, and bringing the system to a state where users can log in
    
    - **BIOS vs UEFI:**
        - The CPU is hardwired to run instructions from a physical component, called NVRAM or ROM, upon startup. These instructions are the system’s **firmware**
        - This **firmware** is where the difference between BIOS and UEFI is:
            - **BIOS**
                - It's the legacy version
            - **UEFI (Unified Extensible Firmware Interface):**
                - offers a lot more features and customizations
                - much more standardized so motherboard manufacturers don’t have to worry about every specific OS
                - has the capability to read files from a small FAT system
                - supports a more modern GPT partitioning scheme:
                    - this means that your **UEFI** configuration and binaries sit on a GPT partition on your hard disk
                    - This is often known as **ESP (EFI System Partition)** mounted at `/efi`, typically.
                    - Having a mountable file system means that your running OS can read the same file system (and dangerously enough, edit it as well!)
                - **UEFI** being more flexible, eliminates the necessity of having a *second stage boot loader* like **GRUB**
                - They also support the legacy **BIOS** option
        - **Boot process with GRUB 2:**
            - **BIOS Firmware Startup:**
                - `boot.img` (stage 1) resides in the MBR's first 440 bytes or a partition's boot sector, directing to `diskboot.img` by a 64-bit address.
                - `core.img` (stage 1.5), fitting within a gap between the MBR and first partition (or in its own partition on GPT disks), further loads the system.
                - On MBR disks, this gap historically was 62 sectors; now, a 1 MiB gap is standard for alignment.
                - For GPT, `core.img` goes into a `BIOS_grub` flagged partition.
                - Stage 2 involves loading `/boot/grub/i386-pc/normal.mod` from a specified partition, displaying a menu after loading optional modules.
            - **UEFI Firmware Startup:**
                - For UEFI, `grubx64.efi` acts as stage 1 and 1.5, placed in the EFI System Partition, and is directly booted by the firmware.
                - The `/boot/grub` directory can be on the EFI System Partition or a separate `/boot` partition, containing stage 2 components like `normal.mod` for menu and module loading
    
    - **GRUB (GNU GRand Unified Bootloader):** *( https://en.wikipedia.org/wiki/GNU_GRUB )*
        - a **boot loader package** from the GNU Project, primarly for Unix-based systems
        - it's the implementation of the **Multiboot Specification**:
            - it's purpose is to load and manage the boot process:
                - provides a user the choice to boot one of multiple operating systems installed on a computer
                - or select a specific kernel configuration available on a particular operating system's partitions
                - then loads the selected OS/kernel into memory and transfers control to it (to continue the boot process)
        - **Different boot loader approaches:**
            - a bootloader's approach can be to load kernel images to directly access hard disk sectors without understanding the underlaying FS
            - or as with GRUB, it is made aware of the FS, so the kernel images are configured and accessed using their actual file paths:
                - requires a boot loader to contain a driver for each of the supported file systems
                - eliminates the need for hardcoded locations of hard disk sectors and existence of map files
                - does not require MBR updates after kernel images are added or moved around
                    - **MBR Master Boot Record:**
                        - is the first sector of the hard disk, where the initial **bootstrap program** is:
                            - **bootstrap program:** it's what loads the boot loader from the first bootable device
                            - **boot loader:** it's what the bootstrap program loads, when a bootable device is found. Its job is to load the operating system's kernel into memory and start it running.
                        - a sector is just 512 bytes traditionally, so very small to include larger bootstrap programs with high complexity, so boot loaders are split into pieces, where the first piece basically just starts the second, which is stored in a separate sector (this is how GRUB also workds)
        - **After startup:**
            - GRUB presents a menu where the user can choose from operating systems (OS) found by grub-install.
            - GRUB can be configured to automatically load a specified OS after a user-defined timeout. If the timeout is set to zero seconds, pressing and holding `Shift` while the computer is booting makes it possible to access the boot menu
            - Other commands accepted:
                - `e` edit kernel params before OS is started (eg if the OS fails to boot, or of there's anything we would like to blacklist)
                - `c` enter GRUB command line (not a regular Linux shell like Bash - so only accepts GRUB-based commands)

- **Processes:**    
    - When a **program** is started, a **process** starts (the internal representation of the executing program in the computer's memory)
    - not just programs have processes, but also:
        - components of your graphical desktop environment (GDE) such as GNOME or KDE
        - system daemons that are launched at start-up
    - Processes can run in the **foreground** or in the **backgroud**:
        - **foreground:** they take over your terminal until they have completed
        - **backgroud:** don't dominate the terminal window and you can continue to work in it

- **Permissions:** *( https://www.youtube.com/watch?v=D-VqgvBMV7g&ab_channel=Guru99 )*
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
            - Further permissions (to be coveres later!)

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
                    -  if the owning group does not have execute permissions, then an uppercase `S` is used.
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
                    
- **Default folders:**
    - `/etc/shadow`	    Secure user account information
    - `/etc/passwd`	    User account information
    - `/etc/gshadow`	Contains the shadowed information for group accounts
    - `/etc/group`	    Defines the groups to which users belong
    - `/etc/skel`       Used to initiate home directory when a user is first created

    - `etc/shadow`: *( https://linuxize.com/post/etc-shadow-file/ )*
        - The `/etc/shadow` file keeps records about encrypted users’ passwords
        - used for one of the authentication schemes in Linux: the standard scheme performs authentication against the `etc/passwd` and `etc/shadow` files
        - owned by user `root` and group `shadow`, with `640` permissions (rw-r-----)
        - **Format:**
            - one entry per line, each representing a user account (typically the first line is the root user)
            - check its contents: `sudo cat /etc/shadow`
            - There are 9 fileds:
                1. Username
                2. Encrypted pwd 
                    - `$type$salt$hashed` format, where:
                        - `$1$` – MD5
                        - `$2a$` – Blowfish
                        - `$2y$` – Eksblowfish
                        - `$5$` – SHA-256
                        - `$6$` – SHA-512
                    - If the password field contains an asterisk (*) or exclamation point (!), the user will not be able to login to the system using password authentication
                3. Last pwd change
                4. Min pwd age
                5. Max pwd age
                6. Warning period
                7. Inactivity period
                8. Expiration date
                9. Unused
                - Example:
                    - `linuxize:$6$zHvrJMa5Y690smbQ$z5zdL...:18009:0:120:7:14::`
        - use commands like `passwd` or `change` to modify this file, don't do it manually!
        - replace the hash: `usermod -p $HASH john` (place the hash for the user `john` in `/etc/shadow`)
    
    - `/etc/skel`
        - derived from word "skeleton"
        - Used to initiate home directory when a user is first created
        - “skeleton” directory is defined in `/etc/default/useradd` file:
            ```{bash}
            # cat /etc/default/useradd
            # useradd defaults file
            GROUP=100
            HOME=/home
            INACTIVE=-1
            EXPIRE=
            SHELL=/bin/bash
            SKEL=/etc/skel
            CREATE_MAIL_SPOOL=yes
            ```
        - Default permission of /etc/skel is `drwxr-xr-x`

- **Utilities:**
    - `sysctl`: *( detailed guide: https://wiki.archlinux.org/title/sysctl )*
        - a command-line utility that allows you to read and modify kernel parameters at runtime ( the central management tool for controlling the init system)
        - Kernel parameters control the behavior of the operating system kernel, affecting things like memory management, network behavior, and system performance
        - **Change types:**
            - Changes made with `sysctl -w` are temporary and lost after a reboot
            - Persistent changes made through sysctl are typically stored in `/etc/sysctl.conf` or files under `/etc/sysctl.d/`.

        - Using `sysctl`:
            - Basics:
                - To read a kernel parameter:
                    - `sysctl fs.file-max` (example)
                - Modify kernel param:
                    - `sudo sysctl -w fs.file-max=100000`
            - Disable ICMP echo requests:
                - `sudo sysctl -w net.ipv4.icmp_echo_ignore_all=1`
                - Then edit in nano:
                    - `sudo nano /etc/sysctl.conf`
                    - At the end of the file, add the following line:
                        - `net.ipv4.icmp_echo_ignore_all=1`
                - Apply configuration: `sudo sysctl -p`

    - `systemctl`: *( https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units#starting-and-stopping-services )*
        - **Linux service = daemon:** 
            - a program that runs in the background outside the interactive control of system users (as they lack an interface)
            - This in order to provide even more **security**, because some of these services are crucial for the operation of the operating system
            - the names usually end with a `d`, because they are also called daemons (eg. `sshd`)
            - `systemd` is our `system and service manager` for Linux and we will use `systemctl` command to operate with it

        - `systemctl` is used to introspect and control the state of the `systemd` system and services. Used to:
            - manage services (units)
            - view their status
            - start/stop services
            - enable/disable services to start at boot
        - The configuration for services managed by `systemctl` (or `systemd`) are called **unit files**, and they are typically located in `/etc/systemd/system/`, `/lib/systemd/system/`

        - Service status types:
            - `Enabled`: services are currently running. They usually have no problems.
            - `Disabled`: services are not active but can be activated at any time without a problem.
            - `Masked`: services won’t run unless we take that property away from them.
            - `Static`: services will only be used in case another service or unit needs it.
            - `Generated`: services are scripts generated by systemd's generator

        - **How to use:** *( https://journey.study/v2/learn/materials/pages/unix/managing-services.md ; https://phoenixnap.com/kb/start-stop-restart-linux-services )*
            - Hint: type `sudo -i` to log in as `root`, so no need for `sudo` in every line
            - If installing/updating something, use these lines first:
                - `sudo apt-get update`
                - `sudo apt-get install openssh-server` (replace with what you need to install)

            - List services: 
                - `sudo systemctl list-unit-files --type service --all`:
                - `sudo systemctl | grep running` (List only running services)
                - `sudo systemctl list-unit-files --type service --all | grep sshd` (List specific)

            - Starting and Stopping Services:
                - `sudo systemctl start application.service` (.service can be omitted)
                - `sudo systemctl stop application.service`
                - `sudo systemctl restart application.service`
                - `sudo systemctl reload application.service`

            - Enable/Disable on boot:
                - `sudo systemctl enable application.service` (with `sshd` try wiht just `ssh`!)
                - `sudo systemctl disable application.service`

            - Status check:
                - `systemctl status application.service`
                - `systemctl is-active application.service`
                - `systemctl is-enabled application.service`
                - `systemctl is-failed application.service`

            - System overview:
                - `systemctl list-units`
                - `systemctl list-units --all` (include also inactive units)
                - `systemctl list-units --type=service` (you can also apply filters)
                - `systemctl list-units --type=service --state=active` (list all active units)

            - Display dependencies:
                - `systemctl list-dependencies sshd.service`

            - Check unit properties:    
                - `systemctl show sshd.service`
                - `systemctl show sshd.service -p Conflicts` (display a single property)
            
            - For the SSH example we did this:
                - `systemctl list-units --type=service` (we get the name from this, which is `ssh.service`)
                - `systemctl status ssh` (we chacked it's status, that's active)
                - `sudo systemctl enable ssh` (enable service to ensure it runs automatically on boot)
            
            - Install and manage new service (eg. `nginx`):
                - Use package installer:
                    - `sudo apt update`
                    - `sudo apt install nginx`
                - We can now start it:
                    - `sudo systemctl start nginx`
                - Now we can enable this too, to make sure it starts at boot:
                    - `sudo systemctl enable nginx`

            - **How to use:**
                - Hint: type `sudo -i` to log in as `root`, so no need for `sudo` in every line
                - List services: 
                    - `sudo systemctl list-unit-files --type service --all`:
                        - `Enabled`: services are currently running. They usually have no problems.
                        - `Disabled`: services are not active but can be activated at any time without a problem.
                        - `Masked`: services won’t run unless we take that property away from them.
                        - `Static`: services will only be used in case another service or unit needs it.
                        - `Generated`: services are scripts generated by systemd's generator
                - List only running services:
                    - `sudo systemctl | grep running`
                - Start, stop and restart processes:
                    - `systemctl status [service_name]`: check service status
                    - `systemctl start [service_name]`: start service
                    - `systemctl stop [service_name]`: stop service
                    - `systemctl restart [service_name]`: restart service
                    - `systemctl enable [service_name]`: enable to start when the system boots
                    - `systemctl disable [service_name]`: disable on boot
            
    - `cron`: *( https://en.wikipedia.org/wiki/Cron )*
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
        - **Simple automation script for backing up files:** *( https://linuxhandbook.com/crontab/ )*
            - Create a script file, eg using `Python` (eg `our_backup_script.sh`)
            - Make it a cron job:
                - `crontab -e`:
                    - Add this: `0 3 * * * bash ~/our_backup_script.sh`
            - You can also move the archive folder to a cloud folder (so that it always syncs)
        - **Common commands:**
            - `crontab -e`: edit crontab file
            - `crontab -l`: list existing cronjobs
            - `crontab -r -i`: remove default crontab
            - `crontab -u`: specify a different user's crontab

        - **Scheduling jobs:** *( https://www.youtube.com/watch?v=QZJ1drMQz1A&ab_channel=CoreySchafer )*
            1. check if you used it already:
                - `crontab -l` - if it wasn't, then:
                - `sudo crontab -e` - select with nano
            2. Send outputs to file:
                - `0 * * * *  echo "Linux is Cool!" >> ~/crontab_log.txt` (`>>` appends to the file. `>` would overwrite)
            - Handling users:
                - `crontab -u username -e`: edits another user's crontab, not yours
                - `crontab -r` remove crontab file (resets to default)
        - **Task from first excercise:**
            1. Create a script to fetch the weather:
                - `nano ~/fetch_weather.sh`
                - Add this:
                    ```{bash}
                    #!/bin/bash
                    /usr/bin/curl http://wttr.in/Budapest?format=3 > /etc/motd
                    ```
                - Make it executable:
                    - `chmod +x ~/fetch_weather.sh`
            2. Create the cron job:
                - `crontab -e`:
                    - Add: `0 8 * * * /bin/bash /home/your_username/fetch_weather.sh`
            3. Test it manually:
                - `~/fetch_weather.sh`, then log in again

    - `iptables` *( https://www.hostinger.com/tutorials/iptables-tutorial )*
        - It's a firewall program for Linux
            - monitors traffic from and to your server, using tables
            - the tables include `chains` (sets of rules), that filetre incoming and outgoing data packets
        - Note:
            - iptables rules only apply to `ipv4`, so if you want to set up a firewall for the `ipv6` protocol, you will need to use `ip6tables` instead!
        - **How it works:**
            - When a `packet` matches a `rule`, it is given a `target`
            - The `target can be:
                - another `chain`
                - or a special value:
                    - `ACCEPT`: allows the packet through
                    - `DROP`: doesn't allow the packet to pass
                    - `RETURN`: stops the packet from traversing through a chain and tell it to go back to the previous chain
            - `filter`:
                - it's one of the default tables
                - consists of these `chains`:
                    - `INPUT`: controls incoming packets to the server
                    - `FORWARD`: filters incoming packets that will be forwarded somewhere else
                    - `OUTPUT`: filter packets that are going out from your server
        - **Install and use Iptables Firewall:**
            1. **Install `iptables`:**
                - Connect to server via SSH *( https://www.hostinger.com/tutorials/how-to-use-putty-ssh )*
                - Run these commands:
                    - `sudo apt-get update`
                    - `sudo apt-get install iptables`
                - Check status of current `iptables` config:
                    - `sudo iptables -L -v` (by default all chains are set to `ACCEPT` and have no rules)
            2. **Define Chain Rules:**
                - **Syntax:**
                    - `sudo iptables -A <chain> -i <interface> -p <protocol (tcp/udp) > -s <source> --dport <port no.>  -j <target>`

                    - Where:
                        - `sudo iptables -A` defines a rule by appending it to the chain wiht `-A`
                        - `-i` (interface) — the network interface whose traffic you want to filter, such as `eth0`, `lo`, `ppp0`, etc.
                        - `-p` (protocol) — the network protocol where your filtering process takes place. It can be either `tcp`, `udp`, `udplite`, `icmp`, `sctp`, `icmpv6`, and so on. Alternatively, you can type all to choose every protocol.
                        - `-s` (source) — the address from which traffic comes from. You can add a hostname or IP address.
                        - `–dport` (destination port) — the destination port number of a protocol, such as 22 (SSH), 443 (https), etc.
                        - `-j` (target) — the target name (`ACCEPT`, `DROP`, `RETURN`). You need to insert this every time you make a new rule.
                - **Examples:** (using the `INPUT` chain as an example):
                    - **allow traffic on localhost:**
                        - `sudo iptables -A INPUT -i lo -j ACCEPT`: makes sure that the connections between a database and a web application on the same machine are working properly
                            - `lo` or `loopback` interface: utilized for all communications on the localhost
                    - **Enabling Connections on HTTP, SSH, and SSL Port:**
                        - Execute 1-by-1:
                            - `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`
                            - `sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT`
                            - `sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT`
                        - The commands above are used to make http (port 80), https (port 443), and ssh (port 22) work as usual:
                            - specifies protocol with `-p`
                            - specifies corresponding port with `-dport`
                        - Now we can check again if the rules have been appended in `iptables`:
                            - `sudo iptables -L -v`
                    - **Filtering Packets Based on Source:**
                        - source is an IP address that we can filter, eg:
                            - `sudo iptables -A INPUT -s 192.168.1.3 -j ACCEPT` to accept packets from this IP
                            - `sudo iptables -A INPUT -s 192.168.1.3 -j DROP` to reject packets from this IP
                            - `sudo iptables -A INPUT -m iprange --src-range 192.168.1.100-192.168.1.200 -j DROP` this is used for ranges
                    - **Dropping all other traffic:**
                        - It is crucial to use the `DROP` target for all other traffic after defining `–dport` rules (to prevent an unauthorized connection from accessing the server via other open ports):
                            - `sudo iptables -A INPUT -j DROP`
                    - **Delete rules:**
                        - remove all rules and start with a clean slate:
                            - `sudo iptables -F`
                        - remove a specific rule:
                            - first see all available rules:
                                - `sudo iptables -L --line-numbers`
                            - delete by inserting the corresponding chain and the number from the list:
                                - `sudo iptables -D INPUT 3` (=remove rule number three of the INPUT chain)
            3. **Persist changes:**
                - the rules created are now saved in the memory, but we need to save the to a file to be able to load them again after a reboot: 
                    - `sudo iptables-save > /etc/iptables/rules.v4` (for ipv4)
                        - `sudo iptables-save >> /etc/iptables/rules.v4` (use double arrows if you are appending)
                    - `sudo iptables-save > /etc/iptables/rules.v6` (for ipv6)
                - To load them after a reload manually:
                    - `sudo iptables-restore < /etc/iptables/rules.v4` (for ipv4)
                    - `sudo iptables-restore < /etc/iptables/rules.v6` (for ipv6)
                - To make the loading process automatic:
                    - `sudo apt-get install iptables-persistent`
                    - then choose yes to save the current rules
                    - now after each change you will have to use `sudo iptables-save` command
            4. **Example from the task:**
                - *Task: accept connections only on the SSH port and drop all other input traffic*
                - SSH typically uses port 22, so the idea is to allow incoming connections on port 22 and drop all other input traffic
                1. Set default policies:
                    - setting the default policy for the INPUT chain to DROP:
                        - `sudo iptables -P INPUT DROP`
                2. Allow established sessions to continue:
                    - Allow incoming traffic for established connections, including those initiated by the server:
                        - `sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`
                3. Allow SSH:
                    - `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT`
                4. Allow Loopback Access (important for various local applications):
                    - `sudo iptables -A INPUT -i lo -j ACCEPT`
                5. Save config:
                    - `sudo apt-get install iptables-persistent`
                    - Click `Yes` to both IPv4 and IPv6
                    - `sudo iptables-save >> /etc/iptables/rules.v4` (if there are new rules)

    - `motd` *( https://linuxconfig.org/how-to-change-welcome-message-motd-on-ubuntu-18-04-server )*
            - It's a daemon, that displays "Message of the Day" welcome message
            - I can be modified by modifying the `/etc/motd `file or script within the `/etc/update-motd.d` directory
            - **How to use:**
                - Append additional info:
                    - `sudo sh -c 'echo "Welcome Ubuntu User" > /etc/motd'` (change message to what you want)
                - Modify message:
                    - since it's modular, it's split into various scripts, and we need to modify these to customize it properly
                    - the scripts are executed in order (based on numerical values)
                    - Steps for example:
                        1. Disable all current default scripts (to start from scratch!):
                            - `sudo chmod -x /etc/update-motd.d/*`
                        2. Install prerequisities (eg for showing general system information, hard disk usage and the weather information):
                            - `sudo apt install inxi screenfetch ansiweather`
                        3. Create a new script:
                            - name it `/etc/update-motd.d/01-custom`
                            - content example:
                                ```{bash}
                                #!/bin/sh
                                echo "GENERAL SYSTEM INFORMATION"
                                /usr/bin/screenfetch
                                echo
                                echo "SYSTEM DISK USAGE"
                                export TERM=xterm; inxi -D
                                echo
                                echo "CURRENT WEATHER AT THE LOCATION"
                                # Show weather information. Change the city name to fit your location
                                ansiweather -l bratislava
                                ```
                        4. Make the script executable:
                            - `sudo chmod +x /etc/update-motd.d/01-custom`
                        5. Give back executable rights to the scripts you do want to see from the default ones:
                            - `sudo chmod +x /etc/update-motd.d/00-header`    
                            - `sudo chmod +x /etc/update-motd.d/10-help-text`
                            - etc.    
                        5. Reboot to see the changes
                - Disable `motd`:
                    - `sudo chmod -x /etc/update-motd.d/*` (disable executable permissions to all scripts entirely)

- **inodes in Linux:** *( https://www.howtogeek.com/465350/everything-you-ever-wanted-to-know-about-inodes-on-linux/ )*
    - **Metadata:**
        - *Data that describes other data*
        - It consists of all the records that a file system needs (eg all the file locations, their names, the accounts they belong to, which permissions they have)
    - In `ext4` files system, the `inode` and `directory structures` work together to provide a framweork, that stores all the metadata (it is available for anyone, who requests it - eg kernel, user apps, Linux utils `ls` `stat` `df`)
    - **Inodes:**
        - The Linux FS relies on `inodes`
        - Every file and directory requires an `inode`, and because every file is in a directory, every file also requires a **directory structure**.
        - Directory structures are also called directory entries, or `dentries`
        - Each `inode` has its own `inode number`:
            - unique within the FS (but can appear in more FSs)
            - `file system ID` + `inode number` combined create a **unique identifier**, regardless of the number of mounted FSs (on Linux you mount the FS, not the hard drive or partition!)
        - All `inodes` are held in a table (the `i` stands for index)
        - Display the total number of inodes with this command: 
            - `df -i`
            - `df -i /dev/sda1` -> display only on the first partition of the first drive
            - The output gives us:
                - **File system**: The file system being reported on.
                - **Inodes**: The total number of inodes in this file system.
                - **IUsed**: The number of inodes in use.
                - **IFree**: The number of remaining inodes available for use.
                - **IUse%**: The percentage of used inodes.
                - **Mounted on**: The mount point for this file system.
        - To check the disk's block size, you can use this command:
            - `sudo blockdev --getbsz /dev/sda`
        - To see the inode number of a file:
            - `ls -i geek.txt`
        - Look inside an inode (get its number with the command above):
            - `sudo debugfs -R "stat <1441801>" /dev/sda1`
            - The last property is extents, which shows the first and last block of the file
            - **extents**:
                - record the start and end block of each set of contiguous blocks used to store the file
        - **Directory structure**:
            - to get the file name, we need to use the directory structure in addition to the `inodes`
            - a directory also has an `inode`, just like a file
            - a `directory inode` points to disk blocks that contain `directory structures` (so not blocks that contain file data)
            - The directory structure contains limited info about a file:
                - the file's inode number
                - name
                - length of the name
            - The directory structure is in a directory disk block, so we know the **directory the file is in**
            - The directory structure gives us the **file name** and **inode number**
        - Find out the inode number of a directory:
            - `ls -lid work/`   // -d shows us the info of the dir, not its contents
            - `ls -lid ~`       // using just `~` means the home directory
        - To get the contents of the work directory and show us the directory entries:
            - `ls -lia work/`   // note we used `-a` (all) instead of `-d` this time
            - `.` refers to the current dir, while `..` refers to the parent dir

        - **Summary:**
            - There are 3 components required to have a well-formatted and accessible file in a file system:
                - the file
                    - the data stored on the hard-drive
                - the directory sturcture
                    - contains th name of the file and its inode number
                - the inode
                    - contains the metadata for the file

        - **Symbolic links:**
            - file system entries that look like files, but they're really shortcuts that point to an existing file or directory

- **CSV files:**
    - "Comma Separated Values"
    - a simple file format used to store tabular data, such as a spreadsheet or database

    - **quoted field:** a way to include data that might otherwise be interpreted incorrectly by the CSV parser. Commonly used for fields that contain commas, line breaks, or other special characters that could disrupt the format of the CSV file

    - **Rules:**
        - no specific encoding
        - All records should have the same number of fields, in the same order.
        - Adjacent fields must be separated by a single comma (or some other specified separator character)
        - And many others...

- **Working with paths/pathnames** (if you want to work with something that's not in your current directory):
    - **Absolute path:**
        - We build the path from the root folder, so the whole path: `/root/folder/file`
        - shortcut for the current user's home directory: `~/.ssh`, same as `/home/user/.ssh`
    - **Relative path:**
        - If we don't start with `/`, the path will start from where we are now: `folderincurrentdir/subfolder/file`
        - To move up from the current folder, we use `..`: `../anotherfolder/subfolder`
        - Single `.` refers to the current directory

- **Using wildcards**:
    - Allows you to specify multiple files at once:
        - `*` refers to any number of characters (even 0!):
            - `ls *`        | list all files (this is a **glob** pattern!)
            - `ls *ing`     | list all files ending with "ing"
        - `?` is very similar, but matches exactly 1 character:
            - `ls sp??t`    | list "sport" for example

- **"Everything is a file"**
    - Unix-based systems handle inputs/outputs to/from resources as **streams of bytes** throught the filesystem namespace (=treated as files). 
    - Not just common files and directories, but also more abstract entities (devices, network connections, processes)
    - the Linux kernel and the proc file system are exposing this information to us as a file (they are not actual text files!)
    - Since everything works as a file, **everyhting has permissions as well**
    - **Advantages:**
        - Uniform interface: consistent interface for interacting with different parts of the system (simplifies programming and system interaction)
        - Simplicity and flexibility: operations like opening, closing, reading, writing can be applied to a wide variety of entities (no need for specialized interfaces)
    - **How it works:**
        - When a file is opened, a **file descriptor** is created (uses the path as an addressing system)
        - The descriptor then becomes the interface on which the operations are performed
        - Every File has an associated number called **File Descriptor** (`FD`)
        - When a program is executed the output is sent to File Descriptor of the output device (eg. screen)
    - **Storage locations of special files:**
        - `/proc`: system related files, eg. `/proc/cpuinfo`
        - `/dev`: device realted files, eg. `/dev/cdrom` or `dev/sda` (the first hard drive)
            - `/dev/null` – Discards all data written to it – think of it as a trash can or black hole (the null device?)
            - `/dev/random` – Produces randomness using environmental noise. It’s a random number generator you can tap into
            - `/dev/zero` – Produces zeros – a constant stream of zeros
    - Using these files:
        - We can use these special files with any command: `command > /dev/null`

- **Input-Output redirection:**
    - **Redirection:**
        - a feature in Linux such that when executing a command, you can change the standard input/output devices
        - default workflow of any Linux command is that it takes an input and give an output
        - This can be changed with redirection:
            - The standard input (`stdin`) device is the keyboard
            - The standard output (`stdout`) device is the screen
    
    - **Output redirection:**
        - done with the `>` symbol, eg:
            - `ls -al > listings`   # list the output of ls command to the "listings" file
            - `ls -al >> listings`  # >> is used to append insted of overwrite
        - you could even redirect to a device:
            - `cat music.mp3 > /dev/audio` # this should play the mp3 file
    
    - **Input redirecion:**
        - done with the `<` symbol
        - Example using `mail` program in Linux:
            - This would attach the file with the email, and it would be sent to the recipient:
                - `mail -s "News Today" abc@gmail.com < NewsFlash`
                - Syntax: `Mail -s "Subject" to-address < AttachmentFilename`
    
    - **Error redirection:**
        - Whenever you execute a program/command at the terminal, 3 files are always open, and the file descriptors are associated with these:
            - `stdin` standard input -> `FD0` (eg keyboard)
            - `stdout` standard output -> `FD1` (eg screen)
            - `stderr` standard error -> `FD2`
        - By default, error stream is displayed on the screen -> **Error redirection** is routing the errors to a file other than the screen
        - Examples:
            - Using `2>` we re-direct the error output to a file named `errorfile`:
                - `myprogram 2>errorsfile`
            - Using find statement:
                - `find . -name 'my*' 2>error.log`:
                    - we are searching the “.” current directory for a file with “name” starting with “my”
            - List directories and store both error and standard output into a file:
                - `ls Documents ABC > dirlist 2>&1`:
                    - `2>&1` means that `STDERR` redirects to the target of `STDOUT` (which is the file dirlist)
                    - this results in both the error and the output being stored in `dirlist` file

- **Set and list environment variables:**
    - **Environment variables:**
        - a set of dynamic named values, stored within the system that are used by applications launched in shells or subshells
            - in simple terms: an environment variable is a variable with a name and an associated value
        - allow you to customize how the system works and the behavior of the applications on the system (eg defult text editor, path to executable files, keyboard layout settings)
        - available system-wide and are inherited by all spawned child processes and shells

        - **Format:**
            - `KEY-value` or `KEY="some other value"` OR `KEY=value1:value2`
            - naming is case sensitve, and env. variables are UPPERCASE
            - assign multiple values wiht `:`
            - no space around `=`

    - **Shell variables:**
        - apply only to the current shell instance
        - Each shell such as `zsh` and `bash`, has its own set of internal shell variables
    
    - **Commands available that allow you to list and set environment variables in Linux:**
        - `env` 
            - The command allows you to run another program in a custom environment without modifying the current one.
            - When used without an argument it will print a list of the current environment variables.
        - `printenv` 
            - The command prints all or the specified environment variables.
            - If called wiht no args, it lists all, otherwise the value of that variable is displayed only:
                - `printenv HOME` (more can also be added at the same time)
            - you could also use `echo` for printing out the value of a variable:
                - `echo $BASH_VERSION`
        - `set` 
            - The command sets or unsets shell variables.
            - When used without an argument it will print a list of all variables including environment and shell variables, and shell functions:
                - use it with `| less` to see page-by-page:
                    - `set | less`
        - `unset`
            - The command deletes shell and environment variables.
        - `export`
            - The command sets environment variables.

    - **Most common environment variables:**
        - ``USER` - The current logged in user.
        - ``HOME` - The home directory of the current user.
        - ``EDITOR` - The default file editor to be used. This is the editor that will be used when you type edit in your terminal.
        - ``SHELL` - The path of the current user’s shell, such as bash or zsh.
        - ``LOGNAME` - The name of the current user.
        - ``PATH` - A list of directories to be searched when executing commands. When you run a command the system will search those directories in this order and use the first found executable.
        - ``LANG` - The current locales settings.
        - ``TERM` - The current terminal emulation.
        - ``MAIL` - Location of where the current user’s mail is stored.
    
    - **Create new variables:**
        - **Create new SHELL variable:**
            - `MY_VAR='Linuxize'`
                - check success with `set | grep MY_VAR` or `echo $MY_VAR`
                - Use the printenv command to check whether this variable is an environment variable or not:
                    - `printenv MY_VAR` (if empty output, then it's not an env variable)
        - **Create new ENVIRONMENT variables:**
            - **Temporary Environment Variables:**
                - Environment Variables created in this way are available only in the current session
                - The `export` command is used to set Environment variables:
                    - `export MY_VAR` OR `export MY_NEW_VAR="My New Var"` (assign a value too)
                        - check: `printenv MY_VAR` (should have an output now)
            - **Persistent Environment Variables:**
                - define them variables in the bash configuration files:
                    - `/etc/environment` is used to set up system-wide environment variables
                        - Format: `VAR_TEST="Test Var"`
                    - `/etc/profile` is used and opened when a bash login shell is entered
                        - Format: `export PATH=$PATH:$JAVA_HOME/bin`
            - **Declare user-specific config files in `~/.bashrc`:**
                - `export PATH="$HOME/bin:$PATH"`
            - **Load the new environment variables into the current shell session:**
                - `source ~/.bashrc`

- **SSH Keys:**
    - more links:
        - https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work
    - stands for **Secure Shell**
    - **Public and Private Keys:**
        - more secure than password authetication
        - each key is a large number with special mathematical properties
        - Locations:
            - The **private key** is kept on the computer you log in from (used to unlock)
            - the public key is stored on the `.ssh/authorized_keys` file on all the computers you want to log in to (used to lock)
        - When you log in to a computer, the SSH server uses the **public key** to "lock" messages in a way that can only be "unlocked" by your **private key**
        - As an extra security measure, most SSH programs store the private key in a passphrase-protected format (this gives you extra time to disable the old public key)
        - Different SSH programs generate public keys in different ways, but they all generate public keys in a similar format:
            - `<ssh-rsa or ssh-dss> <really long string of nonsense> <username>@<host>`
    - **Key-based SSH Logins:**
        - the most secure authentication used with OpenSSH (plain password, Kerberos tickets)
        - advantages of key-based authentication:
            - key values are much more difficuly to brute-force
            - no need for passwords
            - automation friendly (eg scripts and applications can authenticate without human intervention)
            - access control (admins can set access based on authorized keys)
        - Encryption types:
            - **RSA** (Rivest-Shamir-Adleman) - nowadays this is the only recommended
            - **DSA** (Digital Signature Algorithm) - a bit less secure, therefore it's not used anymore
    - **Authorized keys:** *( https://www.ssh.com/academy/ssh/authorized-keys-file )*
        - specifies the SSH keys that can be used for logging into the user account

    - **Working with SSH keys:**
        1. **Connecting to GitHub:**
            - Use your private-public keys on Windows separately:
                - you need to have a `private` key called `id_rsa`
                - you need to have a `public` key called `id_rsa.pub`
                - add the `public key` to your GihHub repo
                - a file called `known_hosts` gets generated after the first attempt to clone a git repo
            - Generate separete keys in the Linux VM, to maintain isolation:
                - create `.ssh` folder in user's root folder and add correct rights:
                    - `mkdir ~/.ssh`
                    - `chmod 700 ~/.ssh`
                - create `known_hosts` file:
                    - `sudo touch ~/.ssh/known_hosts`
                    - `sudo chmod 600 ~/.ssh/known_hosts`
                - Generate keys:
                    - type `ssh-keygen` in the CLI
                    OR
                    - `ssh-keygen -b 4096`  // this also makes the encryption 4096-bit
                    OR
                    - `ssh-keygen -b 4096 -C "email@email.com"`  // this also adds a comment

                    - you can specify the folder to create it into, and add a passphrase
                    - NOTE! the default folder is `root`, not your actual user, so it's probably better to copy it there instead
                    - `sudo chmod 600 ~/.ssh/id_rsa`
                - change owner to current user for all `.ssh` folder and contents:
                    - `sudo chown -R username:username ~/.ssh`
                - add the `public key` to GitHub
                - you can clone now using SSH keys (it will still ask for a passphrase, if you set one up)
        2. **Use SSH login to your VM:**
            - intall SSH server if it's not already
                - `sudo apt-get update`
                - `sudo apt-get install openssh-server`
                - Ensure it's running with: `sudo systemctl status ssh`
                - `sudo ufw allow ssh`
                    - Ubuntu comes with a firewall configuration tool called UFW. If the firewall is enabled on your system, make sure to open the SSH port
                - At this point we set up the machine so that you can connect from any remote machine using SSH
            - **Add host's public key to authorized keys:**
                - **Solution 1 (using `ssh-copy-id` command):**
                    - Using the Bash terminal from windows, once you connected with a password:
                        - `ssh-copy-id ubuntu@127.0.0.1 -p 2222`
                        - `ssh-copy-id -i /c/Users/gakal/.ssh/id_rsa.pub ubuntu@127.0.0.1 -p 2222` (use this if your public key is not in the default folder)
                        - the windows known host file will run into an order if the port was already taken for a different machine, so change 2222 and change it to something else if you see an error
                    - You can also do it direcly in the VM:
                        - in this case you need to do it manually (see below)
                - **Solution 2 (manual):**
                    - Prepare `.ssh` directory if it doesn't exist and create `authorized_keys` file:
                        - `mkdir -p ~/.ssh`
                        - `touch ~/.ssh/authorized_keys`
                        - `chmod 700 ~/.ssh`
                        - `chmod 600 ~/.ssh/authorized_keys`
                        - `sudo chown -R username:username ~/.ssh` (use also this just to make sure)
                    - Copy the `public key` from your Windows HOST to the `authorized_keys` file on the VM:
                        - If the "shared clipboard" still doesn't work, use the shared folder:
                            - copy the `public key` there with a new name (eg. `id_rsa_winhost`)
                            - then add it's contents to the `authorized_keys` directly:
                                - `cat /media/sf_VirtualBoxShared/id_rsa_winhost.pub >> ~/.ssh/authorized_keys`

            - Now we just need to edit the `config` file to use SSH authentication:
                - `sudo nano /etc/ssh/sshd_config`:
                    - Uncomment lines and set values to:
                        - `PubkeyAuthentication yes`
                        - `PasswordAuthentication no`
                - Restart SSH service:
                    - `sudo systemctl restart ssh`
            - Log in from windows's GitBash terminal:
                - **OPT1:** Turn off the VM first, then in Settings/Network -> Set Attached To option to `Bridged Adapter`
                    - `ssh -i /c/Users/gakal/.ssh/id_rsa ubuntu@192.168.1.120`
                - **OPT2:** If you want to keep `NAT` networking:
                    - set the port forwarding rules to (host 2222, guest 22222)
                    - set the port in the VM to `22222` from the default `22`:
                        - `sudo nano /etc/ssh/sshd_config`:
                            - Change `#Port 22` line to `Port 22222` 
                    - restart service:
                        - `sudo systemctl restart ssh`
                    - now you can log in with:
                        - `ssh -i /c/Users/gakal/.ssh/id_rsa -p 2222 ubuntu@127.0.0.1`
                            - `p` used to specify port
                            - `127.0.0.1` means we are connecting through the forwarded port on the localhost
                    - Login from WSL:
                        - copy the private key first to your own folder somewhere, because you can't set its permissions on the Windows mounted part, then:
                        - set permissions for folders and private key
                        - `ssh -i /mnt/c/Users/gakal/.ssh/AWS-GK-London.pem -p 2222 ec2_user@<EC2-public-IP>`
            - Setting up **postgres**:
                - Add `postgres` port forwarding:
                    - set `host port` to what you want (eg keep `5432`)
                    - set `guset port` to `5432`, that Postgres uses
                    - reboot the VM
                - In bash terminal, after you ssh-ed in to the VM, you can now:
                    - check postgres status:
                        - `sudo service postgresql status` (should be active)
                    - Log into the PostgreSQL command line interface:
                        - `sudo -u postgres psql`
                    - Create usperuser:
                        - `CREATE ROLE ubuntu WITH LOGIN SUPERUSER PASSWORD 'ubuntu';`
                        - Or if already exists:
                            - `ALTER ROLE ubuntu WITH PASSWORD 'ubuntu';` (to update pw)
                    - Log in:
                        - `sudo -u postgres psql` (default user)
                        - `sudo -u ubuntu psql`

        3. **More SSH guides:**
            - **Add SSH key to agent:** https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
            
            - **How to use `ssh-copy-id`:** https://www.ssh.com/academy/ssh/copy-id
            
            - **Encrypt-Decrypt process, using a script:** (copy it into a script!)
                ```{bash}
                #!/bin/bash

                # Create the message file
                echo "secret" > message.txt

                # Generating a public/private rsa key pair: id_rsa, id_rsa.pub
                # at the .ssh folder of the user. (eg. if the user is ubuntu it will create it at: /home/ubuntu/.ssh/) by default.
                ssh-keygen

                # Convert the public key to pem format. This step makes the public key able to encrypt messages.
                # -f: This flag specifies the input file for the operation.
                # -e: This flag indicates that the operation will export a key.
                # -m pem: This specifies the format to which the key should be converted. In this case, it's specifying the PEM format.
                # > ~/.ssh/id_rsa.pub.pem: Specifies the converted file.
                ssh-keygen -f ~/.ssh/id_rsa.pub -e -m pkcs8 > ~/.ssh/id_rsa.pub.pem
                
                # the line below be uncommented, and the above commented out if using pem fomrat instead
                # ssh-keygen -f ~/.ssh/id_rsa.pub -e -m pem > ~/.ssh/id_rsa.pub.pem

                # Convert the private key to pem format and change the passphrase
                # -p Indicates that the operation will change the passphrase of an existing private key.
                # (We should include this flag, or the command will generate a completely new pem private key instead of just convert the existing one to pem)
                ssh-keygen -p -m pem -f ~/.ssh/id_rsa

                # Encrypt the message.txt file with the id_rsa.pub.pem public key and save the file in encrypted_message.txt
                # -pubin: This option indicates that the key provided is a public key
                openssl pkeyutl -encrypt -pubin -inkey ~/.ssh/id_rsa.pub.pem -in message.txt -out encrypted_message.txt

                # Decrypt the encrypted_message.txt file with the id_rsa private key and save the file in decrypted_message.txt
                openssl pkeyutl -decrypt -inkey ~/.ssh/id_rsa -in encrypted_message.txt -out decrypted_message.txt

                echo "created keys: id_rsa, id_rsa.pub, id_rsa.pub.pem"
                echo "created txt files: message.txt, encrypted_message.txt, decrypted_message.txt"
                echo "Both message.txt and decrypted_message.txt should contain the same string: 'secret'"
                ```

# HOW TO USE GUIDES:
## DETAILED GUIDES:
- **Using VirtualBox:**
    - **Import Appliance** (eg. the provided file with Ubuntu already installed)
    - **Take a Snapshot** (we can restore it later)
    - **Add hard drive:** ( https://www.youtube.com/watch?v=y1RsHeFqZqw&ab_channel=TechPub )
        - Settings / Storage / Add HDD(+) / Create New Disk (VDI) / dynamic (additional setup might be needed in the OS!)

- **Using Linux/ubuntu:**
    - **Manage Partitions:**
        - It is done using `fdisk` command (view and manage hard-disk partitions on Linux)
        - After that, we use `mkfs` command to format new partitions with a specifix file system
        - Process:
            1. List partitions:
                - on the system: `sudo fdisk -l`
                - on a specific partition: `sudo fdisk -l /dev/sda` (the device name is added)
            2. Enter command mode:
                - don't edit partition while they are in use! (edit system partition by booring from a disk first!)
                - the device name is needed to enter into command mode: `sudo fdisk /dev/sda`
            3. In command mode:
                - type `m` to see the list of available commands
                - you use the letter options displayed to make changes
            4. View the partition table:
                - `p` is used to print the current partition table to the terminal
            5. Delete a partition:
                - `d`, then add the number of the partition you want to delete (you get it from the `p` command, eg. sda5 is 5)
                - now if you list the partitions again with `p`, you see the partition deleted, but it is only written to disk using the `w` command
            6. Creating a partition
                - `n` command creates a new partition 
                - then pick `e` for logical and `p` for primary partition - a disk can only have 4 primary partitions
                - then press `Enter` to accept the default sector (the first free sector on the disk)
                - then pick the last sector of the partition on the disk (press `Enter` again if you want to use up all remaining space)
                    - to be specific, you can also type `+5G` or `+512M` to specify partition size
            7. System ID:
                - A newly created partition is a `Linux` partition, but if we want to make it `Linux swap`, we should do the following after creating it:
                    - to change it's type, press `t` command
                    - when asked fo a HEX code, so type `L` to view the list of HEX codes
                    - "82" is the code for `Linux swap`, so we to type `82`
                    - This doesn't yet format the partition, that is done later with `mkfs` command
            8. Writing changes:
                - `w` command is used to write the changes to the disk
                - we could also type `q` to exit without saving/writing the changes
            9. Formatting a partition:
                - You must format new partitions with a file system before you can use them!
                - Eg. to format the 5th partition on the first disk with `ext4` file system, you would type:
                    - `sudo mkfs.ext4 /dev/sda5` or 
                    - `sudo mkfs -t ext4 /dev/sda5`
                - To directly create a "swap" partition, you can type this instead:
                    - `sudo mkswap /dev/ska5`

    - **File System Mounting:** ( http://web.archive.org/web/20210828232245/https://www.youtube.com/watch?v=A8ITr5ZpzvA )
        - Mount a drive, then can you only use it:
            - `mount -t ext4 /dev/sdb1 /mnt/shared`:
                - `-t` to specify which file system you want to use
                - `-a` can be used instead - no need to specify file system in this case (the rest is still required, so just skip `ext4`)
                - `ext4` is the file system
                - `/dev/sdb1` points to the partition you want to mount. Has to match the FS above! ("b" is the device, "1" is the partition)
                - `/mnt/shared` the firectory you want to mount to (in linux you mount to a directory!). 
                    - `mnt` is the default dir for mounts 
                    - `media` is also used for mounting, but for removable disk types
            - after we mounted, we can use `mount` or `mount -o ro` (mount read-only), to read the mount (?)
            - `/etc/mtab` - gets updated with every mount or unmount (read it with `cat` keyword)
            - `/proc/mounts` - similar to the above
            - mounting is only active until the system is on, it will not be remounted after a reboot. So to fix this:
                - add mounting information to `cat /etc/fstab`:
                    - eg: `/dev/sdb1    /mnt/shared     ext4    defaults        1 2`
                        - device to be mounted
                        - mount point
                        - file system created on that device (matching device!)
                        - mount options (rw, ro, sync, async, dev, nodev, exec, noexec, user, nouser, defaults, etc)
                            - defaults uses: rw, async, dev, exec, suid, auto, nouser
                        - should be dumped?
                        - check file system order (root is 1, the rest can be anything)
        - Mount an ISO (Image file):
            - `mount -o loop filename.iso /mnt/iso`

        - Unmounting:
            - `umount /dev/sdb1` or `umount /mnt/shared`
            - the device you're unmounting can't be "busy"

    - **Change ownership:** (there's a much simple description in the general notes!)
        -  To change the user and/or group ownership of a given file or directory, we use the `chown` command:
            - By default, `chown` doesn’t produce any output on success and returns `zero`
            - Basic syntax: `chown [OPTIONS] USER[:GROUP] FILE(s)`
                - `USER`:
                    - If only the user is specified, the specified user will become the owner of the given files. The group ownership is not changed.
                - `USER:` 
                    - When the username is followed by a colon `:`, and the group name is not given, the user will become the owner of the files, and the files group ownership is changed to the user’s login group.
                - `USER:GROUP`
                     - If both the user and the group are specified (with no space between them), the user ownership of the files is changed to the given user and the group ownership is changed to the given group.
                - `:GROUP`
                    - If the User is omitted and the group is prefixed with a colon `:`, only the group ownership of the files is changed to the given group.
                - `:` 
                    - If only a colon `:` is given, without specifying the user and the group, no change is made.
            
            - use `ls -l` to find out who owns a file or what group it belongs to (check in the commands list for details!)
            - Changing rights:
                - Regular users can change the file group only if they own the file and only to a group they are a member of.
                - Administrative users can change the group ownership of all files.
        - Changing the file owner process:
            - use the `chown` command followed by the `user name` of the new owner and the `target file` as an argument:
                - `chown ubuntu filename`   
                - The numeric user ID (UID) can be used instead of the username, but only if no username exits with that number! Use `+` prefix to make sure it refers to the numeric ID!
            - To change multiple:
                - `chown ubuntu file1 file2 dir3`
        - Change the Owner and the Group of the file:
            - Change both the owner and the group of a file:
                - `chown ubuntu:groupname file1`
            - If no group is specified, the group will be the user's group:
                - `chown ubuntu: file1`
        - Changing the Group of the file:
            - To change only the group of a file:
                - `chown :newgroup file1`   (there's also a `chgrp` command for this)
        - To recursively do the changes:
            - makes the changes on all files and directories under the given directory:
                - `chown -R ubuntu:groupname directory`
        - Using a Reference File
            - The `--reference=ref_file` option allows you to change the user and group ownership of given files to be the same as those of the specified reference file (ref_file):
                - `chown --reference=file1 file2`

    - **Run and control backgroung processes in Linux:** https://www.howtogeek.com/440848/how-to-run-and-control-background-processes-on-linux/
        - Example 1 using `ping`:
            - type `ping www.howtogeek.com` into the terminal:
                - this will execute a foreground process, and we have to use `Ctrl + C` to exit (these are called signals)
                - alternatively, we can use `Ctrl + Z` to make it a backgroud process:
                    - a process in the background works best when the process doesn't produce output and doesn't require input
                    - we get a message saying a process was stopped (not terminated!)
            - now if we type `jobs`, we will get a list of all the jobs (=processes) currently running:
                - this gets displayed: `[1]+ Stopped    ping www.howtogeek.com`
                    - `[1]`: the job number
                    - `+`: shows that this is the job that will be acted upon if we use a job control command without a specific job number. It is called the default job. The default job is always the one most recently added to the list of jobs.
                    - `Stopped`: The process is not running.
                    - `ping www.howtogeek.com`: The command line that launched the process
            - we can do something similar using `ps T` (T meaning list only what is running in the current terminal):
                - This gives us a table with the following attributes:
                    - `PID`: The process ID of the process. Each process has a unique ID.
                    - `TTY`: The pseudo-teletype (terminal window) that the process was executed from.
                    - `STAT`: The status of the process. (see more below)
                    - `TIME`: The amount of CPU time consumed by the process.
                    - `COMMAND`: The command that launched the process.
                - `STAT` column common values:
                    - `D`: Uninterruptible sleep. The process is in a waiting state, usually waiting for input or output, and cannot be interrupted.
                    - `I`: Idle.
                    - `R`: Running.
                    - `S`: Interruptible sleep.
                    - `T`: Stopped by a job control signal (eg `Ctrl + Z`).
                    - `Z`: A zombie process. The process has been terminated but hasn't been "cleaned down" by its parent process.
                - `STAT` column's value can then be followed by one of these extra indicators:
                    - `<`: High-priority task (not nice to other processes).
                    - `N`: Low-priority (nice to other processes).
                    - `L`: process has pages locked into memory (typically used by real-time processes).
                    - `s`: A session leader. A session leader is a process that has launched process groups. A shell is a session leader.
                        - Bash has a `Ss`: The uppercase "S" tell us the Bash shell is sleeping, and it is interruptible
                    - `l`: Multi-thread process.
                    - `+`: A foreground process.
            - using the `bg` command:
                - used to resume a background process
                - It can be used with or without a job number:
                    - If you use it **without a job number** (simply type `bg`):
                        - The name of the command restarted gets displayed
                        - the default job is brought to the foreground, but still runs in the BG
                        - you can't send any input to it and can't stop the process with `Ctrl + C` (we are in a blended mode)
                        - To be able to stop the process, we need to bring it to the foreground first (by typing `fg`, while bash is running)
                        - Now we can stop it with `Ctrl+C`
                            - `Ctrl+C` and `Ctrl+Z` are signals, which are shorthand ways of using the `kill` command (there's 64 different signals, that can be listed with `kill -l`. There's more in the *Linux commands* file)
            - to launch a program as a running background process append an ampersand `&` to the end of the command line:
                - eg to run an endless loop writing "How-To..." to the console every 3 seconds:
                    - `while true; do echo "How-To Geek Loop Process"; sleep 3; done &` (not the `&` at the end of the line):
                    - `[1] 1979` - something like this will get displayed, where `[1]` is the job number and `1979` is the process ID
                    - Now to kill this process, we need to remind ourselves of its job number, using `jobs` (the number wihtin `[]` is the job number)
                    - We can use `kill %{jobnumber}` to kill the process, eg `kill %1` (sends the default `SIGTERM` signal 15), and displays a status report
                    - To be more drastic, if it doesn't respond, you can use `SIGKILL` signal number 9:
                        - `kill 9 %1`
            
    - **Using subshells:** https://linuxconfig.org/linux-subshells-for-beginners-with-examples
        - Using subshells in Bash provides you with an ability to generate context sensitive information
            - eg. if you want to modify a text string right inside an echo statement
        - 2 syntaxes, `backticks` or `$()`:
            - Example 1:
                ```{bash}
                echo '$(echo 'a')'          // interpreted as literal text instead of a command
                    (echo a) -> this gets printed

                echo "$(echo 'a')"          // the string is parsed for actual commands and variables, so a subshell is started
                                            // The inner $(echo 'a') returns an 'a' as output, that the external echo uses (so now it's echo "a")
                    a - > this gets printed

                echo "a$(echo 'b')c"        // The inner $(echo 'b') outbputs a "b", so now it is echo "abc" on high level echo
                    abc -> this gets printed
                
                echo "a`echo 'b'`c"         // we do the same as before, but now using the `backtick` syntax instead of `$()`
                    abc -> this gets printed

                // standard Bash: ' indicates literal, " indicates that the string will be parsed for subshells and variables
                ```
            - Example 2:
                ```{bash}
                touch a                     // create an empty file called "a"
                echo "-$(ls [a-z])"         // list the contents of the current folder (in alphabetical order?)
                    -a -> this gets displayed
                ```
        - when working with subshells, we can include parameters like:
            - `$BASH_SUBSHELL` - to show the subshell number
            - `$BASHPID` - to display the PID of the subshell
            - `$PPID` - to display the PPID of the subshell
            - Example:
                - `echo "Hello from subshell $BASH_SUBSHELL (PID: $BASHPID, PPID: $PPID) to $(sleep 5; echo "John who is in subshell $BASH_SUBSHELL (PID: $BASHPID, PPID: $PPID)")."`

    - **Adding a User:** *( Detailed User & Group operations: https://wiki.archlinux.org/title/users_and_groups )*
        - After installing Ubuntu:
            - the first account created during the installation is the system’s primary `User`
            - This `User` can run administrative tasks as root using the `sudo` command
            - By default, the `root` user account is disabled
        - We can add new users with these commands:
            - `useradd` tool:
                - a low-level utility
            - `adduser` 
                - a script that acts as an interactive frontend for `useradd`
                - Process:
                    - Add user:
                        - `sudo adduser {username}` (after typing the command, the interface starts to ask questions, until we are done)
                    - To add administrator rights, we need to add it to the `sudo` group:
                        - `sudo usermod -aG sudo {username}` (add user to group)
                - The user can then be deleted like this:
                    - `sudo userdel -r {username}` (also deletes the user folders)
                    - check with `ps -u {username}` first if the user has any running processes!
    
    
    - **Using the `ping` command:** *( https://phoenixnap.com/kb/linux-ping-command-examples )*
        - **How `ping` works in Linux:**
            - It is a simple utility used to check whether a network is available and if a host is reachable ( you can test if a server is up and running)
            - The `ping` command allows you to:
                - Test your internet connection
                - Check if a remote machine is online
                - Analyze if there are network issues, such as dropped packages or high latency
            - **How it works:**
                - When you try to `ping` a remote host, your machine starts sending `ICMP echo requests` and waits for a `response`
                - If the connection is established, you receive an `echo reply` for every request
                - The `output` for the ping command contains the amount of time it takes for every packet to reach its destination and return
                - The terminal keeps printing responses until interrupted, and after every session the `statistics` are printed
            - **Syntax:**
                - `ping [option] [hostname] or [IP address]` (eg `ping google.com`)
            - **Response structure:**
                - `from`: The destination and its IP address.
                - `icmp_seq=1`: The sequence number of each ICMP packet. Increases by one for every subsequent echo request.
                - `ttl=52`: The Time to Live value from 1 to 255. It represents the number of network hops a packet can take before a router discards it.
                - `time=7.68 ms`: The time it took a packet to reach the destination and come back to the source. Expressed in milliseconds.
        - **Examples:**
            1. **ping “localhost” to Check Local Network:**
                - used when there are issues reaching a website or a remote machine:
                    - `ping 0`
                    - `ping localhost`
                    - `ping 127.0.0.1`
                - you can also specify the protocol:
                    - `ping -6 hostname/IPv6`
                    - `ping -4 hostname/IPv4`
                - change the interval between ping packets:
                    - `ping -i 0.5 google.com` (default is 1 sec)
                - change ping packet size:
                    - `ping -s 1000 google.com`
                - stop pings after a certain number was sent:
                    - `ping -c 2 google.com` (replace 2 with the number you need)
                - or set limit to a specific time:
                    - `ping -w 25 google.com` (replace 25 with the seconds you wish)
            2. **Flood a network using ping to test performance:**
                - to test your network performance under heavy load:
                    - `sudo ping -f hostname-IP` (requires root to execute, or use sudo)
            3. **Print only Summary Statistics:**
                - to display only summaries:
                    - `ping -c 10 -q google.com` (`-q` was added (=quiet output), `c 10` was used in combination)
                - add timestamp:
                    - `ping -D google.com`

    - **Port forwarding:**
        - **The issue is:**
            - NAT networking: you can't reach guest servers from the VMs
            - Bridged networking: the VMs will appear on the overall network (because they get their own IP address)
        - **Solution:**
            - In VirtualBox, once the VM is stopped:
                - go to Settings/Network/Advanced/Port Forwarding
                - Click on new rule:
                    - Name: SSH
                    - Protocol: TCP
                    - Host port: 2222
                    - Guest port: 22222

        - The in the VM:
            - Check ssh port currently running on:
                - `netstat -tuln | grep ssh`
            - Check the current ssh configuration:
                - `sudo grep -i port /etc/ssh/sshd_config` (you can see that default is 22 in a commented out line)
            - Change default SSH port in ununtu:
                - `sudo nano /etc/ssh/sshd_config`
                    - uncomment and change the port line to `22222`
            - Restart server:
                - `sudo systemctl restart sshd`
            - Check again:
                - `sudo grep -i port /etc/ssh/sshd_config`

## SIMPLIFIED EXTRACTS OF PROCESSES:
- **Create virtual storage and set it up for use:**
    1. In VirtualBox:
        - Settings -> Storage -> SATA Controller "+" Add Hard Disk -> Create (VDI, don't forget to add name!) -> Choose (once you unselect and select it again, it will appear as attached)
    2. Run your VM
        - Use `lsblk` to list all avalilable drives
        - Create the folder you want to mount to, eg:
            - `sudo mkdir -p /mnt/shared`
        - Create a partition:
            - `sudo fdisk /dev/{device}` (eg. `sdb`)
                - `n` for new partition
                - `p` primary partition (to have the possibility of having an FS and an OS)
                - `Enter` for default:
                    - Partiion number
                    - First sector
                    - Last sector
                - `w` to finalize changes and exit editor
                - (press `lsblk` again to see of it was created)
        - Create a filesystem on the partition:
            - `sudo mkfs.ext4 /dev/{partition}` (eg. `sdb1`)
        - Mount the disk with this command:
            - `sudo mount -t ext4 /dev/{partition} /mnt/shared` (eg. `sdb1`)
            - (verify mount using `df -h` command)
        - To unmount it, you can do this:
            - `sudo umount /mnt/shared`

- **Modify GRUB configuration:**
    1. Use the text editor `nano` to get into the file, from the VM's CLI:
        - `sudo nano /etc/default/grub`
            - Chanege the lines you want or comment out what you don't need with `#`
            - Press `Ctrl + O` (like Oscar not Zero!) and hit `Enter` to save changes
            - To exit nano press `Ctrl + X`
    2. Update and reboot:
        - `sudo update-grub` will then update grub's configuration file
        - reboot now to see the updates

- **Get all processes with a specific PPID (Parent Process ID):**
    - The following line will print these processes:
        - `ps -eo ppid,pid,cmd | awk '$1 == 1 {print}'`:
            - `-e` is for selecting all processes.
            - `-o ppid,pid,cmd` specifies the output format, which includes the parent PID, the PID, and the command name.
            - `awk '$1 == 1 {print}'`: This filters the output of ps using awk:
            - `$1 == 1` checks if the first column (PPID) is 1.
            - `{print}` prints the entire line for which the condition is true, effectively listing all processes whose PPID is 1.

- **Starting a process, moving it to the BG and killing it:**
    1. Start a process, eg `sleep 600`
    2. Stop it with `Ctrl + Z` and move it to the background
    3. Restart it in the background with `bg`
    4. You could bring it to the foreground again with `fg` command
    5. To kill it in the foreground: use `Ctrl + C`
    6. To kill it in the background: use `kill %{jobnumber}`

- **Create a usage report:**
    1. Go to the dir, where you want to create the report
    2. a. Generate the report without saving it (just display it to console):
        - `df -h -t ext4`:
            - `-t ext4` to only include these file systems
            - `-h` for human-readable format
    2. b. To save just the report to a file:
        - `sudo sh -c 'df -h -t ext4 > report.txt'`
            - `sudo sh -c` - gives you permission if you don't have by default
                - `sh -c` - runs a new shell session to execute the given command string
    2. c. To save the report (and the command used in the first line):
        - `sudo sh -c 'echo "df -h -t ext4" > report.txt && df -h -t ext4 >> report.txt'`:
            - `echo "df -h -t ext4" > report.txt` - writes the command to report.txt, overwriting the file if it already exists
            - `&&` ensures the second command runs, if the first was successful
            - `df -h -t ext4 >> report.txt` - appends the output of the df command to the file, adding to what was written by the echo command.

    
