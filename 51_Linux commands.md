# LINUX COMMANDS

- Basic commands in the console:
`Ctrl+D` / `exit`       | Logs out and terminate current session (not the same as restarting the system!)
`sudo poweroff`         | shut down 
`sudo reboot`           | restart the system
`ls`                    | list directories on current path
`cd /foldername`        | switch directory
`cd ..`                 | switch to parent folder
`mkdir folder`          | create new folder
`cat filename`          | display contents of file (txt with utf-8 encoding)

- Give user access to shared folder:
`sudo adduser {yourusername} vboxsf`    | Make sure to log in and out to make it work!

- Sudo access priviliges:
`sudo -s`       | run the shell specified with elevated privileges, giving you the # prompt (you need to exit it as well!)
`sudo su`       | makes you the root user and load your custom user environment variables