# Client-Server Communication / Fetch
- Communiation between:
    - Client (eg. web browser)
    - Server (eg. computer hosting a website or web application)
- **Server:**
    - **VPS** (*=Virtual Private Server*) - computer connected to the internet
    - **Web server** - programs that run on any computer (but mostly on a VPS)
- Steps in communication:
    1. Browser sends a request to the server using a protocol called **HTTP** (*=Hypertext Transfer Protocol*):
        - information such as theURL of the file or any additional parameters are included
    2. Server receives the request and processes it, to check if it's valid and if the file exists
    3. If all checks are done and in order:
        - Server sends the file back  in chunks, using protocol **TCP** (*=Transmition Control Protocol*)
    4. Browser receives the file in small chuncks and assembles them into the file, then saves it to the computer

## Network
