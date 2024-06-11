# Advanced Module - DevOps Workbook

## Linux
### What kind of virtualization technologies are you familiar with?
- "Az izoláció egy eszköze, melynek segítségével eloszthatjuk az erőforrásokat"
- Történelmi gyökerek: hardver kevés helyen létezett, emiatt egy gépet osztottak szét (ez volt eredetile a virtualizáció), ahhoz lehetett terminálokon át csatlakozni. (többszálúság fogalma is ide kapcsolódik)

- Így működik:
    - A hypervisor (Virtual Machine Monitors (VMMs)) segítségével tudunk VM-eket létrehozni, ami allokálja a host resource-ait a virtuális környezet eszközeinek
    - az az előnye ennek,
        - hogy csökkentjük a költségeket azáltal, hogy 1 fizikai gépen tudunk futtatni különböző környezeteket, 
        - csökken a "downtime", mivel könnyen újak hozhatóak létre
        - könnyen tudjuk őket ide-oda küldözgetni (pl snapshotok segítségével)

- Technológiák:
    - Hardware / Platform virtualizáció
        - Type 1 Hypervisor - Bare Metal / Natív virtualizáció:
            - itt nincs host gép, a hypervisor közvetlenül áll kapcsolatban a hardverrel
            - pl `Microsoft Hyper-V`, `Xen`
            
    - Szoftver-virtualizáció:        
        - Type 2 - Hosted / Nested virtualizáció:
            - ennél host gépet használunk (saját OS és kernel), ezen fut a hypervisor
            - a host gép megosztja az erőforrásait a VM-ekkel (szabályozható)
            - pl `Oracle VirtualBox`, `VMware Workstation`
        
        - Konténerizáció:
            - Itt nem egy egész gépet virtualizálunk, mert OS-t nem hozunk létre, ehelyett ezt applikáció szintjén virtualizáljuk
            - Csak felhasználjuk a host gép OS-ének kernelét, hogy izolált egységeket hozzunk létre
                - `kernel` köt össze minket a hardware-el; a `scheduler` is ide tartozik; minden ami a hardware-el kapcsolatos a `kernel`feladata
            - pl `Docker`, `Kubernetes`

    - Ezeken kívül létezik még:
        - Network virtualizáció: itt a network-öt virtualizáljuk
        - Desktop virtualizáció: Hypervisor helyett szoftver segítségével hozunk létre VM-eket egy távoli szerveren, és ezek távolról irányíthatóak
        - Applikáció-virtualizáció: Applikációt virtualizálunk, melyek így önállóan képesek működni
        - Storage virtualizáció: itt csak az adattárolás van már csak virtualizálva
    
### What command line text manipulation tools are you familiar with?
- `sed` = "Stream editor"
    - szövegtranszformációkra használjuk, azon belül is elsősorban replace-re (de lehet search, insert, delete is)
    - stream-ekkel dolgozik - memóriahatékony nagy szöveges adatoknál
    - pl:
        - replace text: `sed 's/old/new/' file.txt`

- `awk`
    - adatok kinyerésére használjuk táblázat-szerűen
    - sorról sorra olvassa be az adatokat, majd azokat további field-ekre bontja (oszlopokat készít), és ezekkel dolgozik
    - pl:
        - text Filtering: `awk '/error/ {print $0}' logfile` (regexet használ!)
            - az "error"-t tartalmazó sorokat nyomtassa ki a logfile-ba
        - adja össze egy oszlop adatait: `awk '{sum += $1} END {print sum}' file.txt`
        - filter: `awk '$2 > 10' file.txt`

- `grep`
    - szövegkeresésre, filterezésre használjuk elsősorban
    - pl:
        - Basic Search: `grep "error" file.txt`
        - Case Insensitive Search: `grep -i "error" file.txt`
        - Recursive Search: `grep -r "error" .`
        - Counting Occurrences: `grep -c "error" file.txt`
        - Invert Match: `grep -v "error" file.txt`
        - Regex Search: `grep "^error.*" file.txt`

- `tail`:
    - a file végi sorokat nyomtatja csak ki (by default 10-et)
    - pl:
        - View the Last N Lines of a File: `tail -n 20 file.txt` (-n nélkül 10 a default)
        - Follow a File in Real Time: `tail -f /var/log/syslog`

- `jq`
    - query nyelvet használ kifejezetten JSON típusú file-okhoz
    - pl:
        - Pretty Print JSON (human-readable): 
            - `cat file.json | jq .`
        - Extract a Specific Field (eg name in this instance):
            - `echo '{"name": "John", "age": 30}' | jq '.name'`

- `source`
    - ezzel megadhatunk egy file-t, amit beolvas, és a benne található parancsokat végrehajtja
    - script-ekbe tudunk így betülteni adatokat (function, variable, config)
    - pl:
        - `source <Filename>`, vagy `. <Filename>`

### How would you schedule a command to run every Sunday at midnight?
- `cron` segítségével:
    - egy command-line utility, ami ütemezi a job-okat
    - leginkább rendszeresen végrehajtandó `cron job`-ok végrehajtására használjuk
    - az ütemezés beállítására `crontab`-ot használunk (minden user-nek van sajátja, de van egy a system-nek is):
        - Így néz ki:

                ┌───────────── minute (0–59)
                │ ┌───────────── hour (0–23)
                │ │ ┌───────────── day of the month (1–31)
                │ │ │ ┌───────────── month (1–12)
                │ │ │ │ ┌───────────── day of the week (0–6) (Sunday to Saturday;
                │ │ │ │ │                                   7 is also Sunday on some systems)
                │ │ │ │ │
                │ │ │ │ │
                * * * * * <command to execute>
        - pl:
            - `1 0 * * * echo "Hello, World!" > /tmp/temp.txt`
            - `45 23 * * 6 /home/user/scripts/myscript.sh`
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

### How would you check the available resources (memory, disk space, CPU)?
- CPU (and memory): `htop` (interactive), `top`
- Memory (RAM) Usage: `free -h`
- Diks space: `df -h`, `du -h /path/to/directory`

### What are hard links and symbolic links?
- Amikor létrehozunk egy file-t, akkor egy referenciát hozunk létre, ami a disk-en lévő memória egy pontjára mutat, ahol a file adatai találhatóak
- Egy hard link egy újabb referenciát hoz létre (mintha egy új file lenne), ami ugyanarra a memóriapontra mutat, ahova az eredeti, így az eredeti file-t törölve a hard link és az adatok közti kapcsolat megmarad
- Egy hard link viszont az eredeti file-ra mutat (a referenciára), így ha az eredeti file-t töröljük, akkor a soft linkkel való kapcsolat is megszakad

### What are services in the context of Linux?
- Egy "service" Linux környezetben egy háttérben futó program vagy app
- Ezeket más néven `daemon`-nak is hívjuk
- a `Systemd` menedzseli ezeket, hogy start-upkor mi fusson le, de mi a `systemctl` segítségével tudunk velük dolgozni
- A leggyakrabban használtak: `systemd` -> `systemctl` command, `cron`, `sshd`, `networkd`

### Describe the permission model of Linux! How would you make a file only readable and writable by its owner?
- A "Permission"-ök azért léteznek a Linuxban, mert az egy multi-user OS, így korlátozni kell, hogy ki mihez fér hozzá
- 2 rétegből áll:
    - Ownership: User / Group / Other-World
    - Permission Read / Write / Execute
- Ezek egy 9biten tárolt rendszert alkotnak: `-rwxrwxrwx` (a 10-edik az elso, ami file/dir)
- 2 féle képpen tudunk változtatni:
    - Symbolic mode: `chmod g+x filename`
    - Absolute mode: `chmod 764 filename` =>  User: `rwx` (7) / Group: `rw-` (6) / Other (4) `r--`
- Special permission:
    - SUID -> ezzel a beállítással mindig az owner nevében futtatjuk a file-t, függetlenül attól, hogy kivel vagyunk bejelentkezve
        - `x` helyett `s` kerul a permission 9bites kódjába
    - SGID -> ugyanez, csak Group Ownerrel
    - Sticky bit -> ezzel be tudjuk állítani, hogy egy directory-ban ne legyen törlési jog, de írási megmarad (kivéve az ownernek és a rootnak)
        - így tudjuk beállítani: `chmod 2770 community_content/`
            - 4ik számjegy kerül a 3jegyű elé! (SUID: 4, SGID: 2, Sticky: 1)
- Ownership változtatás: `chown user:group filename` (lehet csak user is!)

### What is the difference between Gi, Gb and GB?
- **Gi or GiB (Gibibyte):** binárisan tárolt, 2^30 byte
- **Gb (Gigabit):** 10^9 bits (itt már 10-es van, nem 2-es!)
- **GB (Gigabyte):** 10^9 bytes (1 byte = 8 bit)

### What are some well-known configuration files on a Linux OS?
- `/etc/shadow`: encryptálva tárol passwordöket
- `/etc/passwd`: user account ifót tárol, hogy kik vannak a rendszerben
- `/etc/group`: group-okat tárol ugyanígy
- `/etc/fstab`: a diskekről és azok mountolásáról tárol információt
- `/etc/hosts`: itt tárolja a már ismert DNS-eke, hogy ne kelljen mindent lekérdezni
- `/etc/crontab`: cronjob ütemezésre szánt feladatokat tárol
- `/etc/services`: service-ket és a hozzájuk kapcsolódó portokat ls protocol-okat tárolja
- `/etc/skel`: blueprint directory for new users

### Explain the "set" builtin command and some of its most commonly used flags!
- `set`:
    - scriptekben használjuk, leginkább debugginghoz, vagy a progress check-hez
    - Leggyakoribb flagek:
        - `-e`: lépjen ki azonnal, ha bármely command non-zero-val tér vissza (tehát sikertelen)
        - `-x`: minden egyes commandot kiloggol, mielőtt teljesítené (debugging)
        - `-u`: a Linux alapból nem figyelmeztet, ha egy variable unset (pl typo esetén), de ezzel beállíthatjuk
        - `-v`: ez is hasonló az x-hez, de itt minden input line-t loggol ki, nem a parancsokat, amiket futtat
    - Pl: `set -eux`:

### How would you make a service auto-start and machine boot-up? (?)
- a `systemd` daemonnal, ami az init system-ért felelős a Linuxban:
    - Create the script: `sudo nano /usr/local/bin/my_script.sh`
    - Add content, eg: `#!/bin/bash / echo "My script is running" > /var/log/my_script.log`   
    - Make the script executable: `sudo chmod +x /usr/local/bin/my_script.sh`
    - create a file for the new service: `sudo nano /etc/systemd/system/my_service.service`
    - fill up the file with the service configuration you need
    - Reload systemd to recognize the new service: `sudo systemctl daemon-reload`
    - Enable the service to start on boot: `sudo systemctl enable my_service`

## NETWORKING

### What is a MAC address?
- **MAC address:**
    - `Media Access Control`, ami egy egyedi azonosító a network interface-eknél, ami gyárilag kerül beléjük
    - 12 jegyű, hexadecimális kód (0-9 + A-F = 16 digit options)
    - Alternatív elnevezések: `physical address`, `hardware address`, `Layer 2 address`, `ethernet address`
    - Az OSI model L2 Data-Link layere használja ezt azonosításra
    - Az `ARP protocol` a felelős egy szerver vagy service MAC addressének a kiderítéséért 

### What is the difference between binding to 127.0.0.1 or 0.0.0.0?
- `127.0.0.1` (localhost): csak a sajátgépről bejövő connection-ökre hallgasson
- `0.0.0.0` (Minden IPv4 address a local machine-en): Bárhonnan figyelje a bejövő connectionöket
- Binding: szerver vagy app hozzárendelődik egy IP címhez és PORT-hoz, amiken fogadja a bejövő requesteket

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
    
    - Az 1-3 layereket device-okhoz is tudjuk társítani:
        - L1 - Hub - hardveres adattovábbítás (nyers bit streamek, pl `10001011`)
        - L2 - Switch - két node közti kapcsolatért felel, MAC address-t használ; (+meghatározza az adat formátumát a hálózaton)
        - L3 - Router - IP protocol-t használ packet forwardinghoz
    
    - A 4-7 layerekhez inkább funkciókat tudunk társítani:
        - L4 - Gateway / Firewall / Load Balancer - Azt biztosítja, hogy az adatok hiányzalanul, megfelelő sorrendben és hibák nélkül eljussanak a címzetthez
        - L5 - Gateway / Firewall / Load Balancer - A lokális és távoli appok közti session-öket menedzseli
        - L6 - nincs kifejezett device - Data encryption és decryption itt történik, valamint biztosítja, hogy az adatok megfelelően használhatóak legyenek
        - L7 - A userhez legközelebbi layer, ez bonyolítja le a kommunikációt az appok között, valamint az end-user serviceket szolgáltatja

### What is the difference between a router and a switch?
- **Switch:**
    - L2 Data Link layeren működik
    - Azonos hálózaton belül küldözget data packeteket (LAN, VLAN)
    - Nincs közvetlen kapcsolatban a külső internettel, ha egy packet mégis külső hálózatra menne, akkor az a routernek küldi
    - MAC addresseket használ az adattovábbításhoz
- **Router:**
    - L3 Network Layeren működik
    - több networköt köt össze (a lokálisat az Internettel)
    - IP addresseket használ adattovábbításhoz
    - Headereket és Forwarding Table-eket használ az útvonal optimalizálására

### What is the difference between TCP and UDP?
- Mindkettő a L4 Transport Layer protokolja, de egyszerre csak 1-et használ
- `TCP` (`Transmission Control Protocol`): 
    - lassabb, de megbízhatóbb protokol, mivel a kézbesítés sikerét is figyeli / garantálja
    - automatikus újraküldés sikertelenség esetén
    - connection oriented: session-t (=connection-t) hoz létre a két fél között, portokat használ
- `UDP` (`User Datagram Protocol`): 
    - gyorsabb, de megbízhatatlan, mivel nem garantálja a kézbesítést, csak "megpróbálja"
    - connectionless: nem hoz létre kapcsolatot a küldő és a fogadó között
    - ez is portokat használ a kommunikációra

### What is a VPN?
- **VPN - Virtual Private Network:**
    - Egy olyan technológia, amely lehetővé teszi, hogy biztonságos kapcsolatot hozzunk létre egy másik hálózattal az interneten keresztül (site = hálózat)
        - VPN szerver segítségével tud létrejönni ez a biztonságos kapcsolat, ehhez kapcsolódunk, majd a VPN szerver kapcsolódik a távoli hálózathoz
    
    - Előnyök:
        - külön szabályt lehet létrehozni a csatlakozáshoz (mint egy túzfal)
        - end-to-end encryptiont használ, amivel biztonságosabb lesz az adatküldés
        - elrejti a felhasználó IP címét a publikus internet elől (olyan, mintha a VPN szerver IP címét használná)

    - 2 fajátja van:
        - Client-to-site: a Client-et köti össze a távoli szerverrel/hálózattal, ez az elterjedtebb
            - a VPN szerver nyitott a publikus internet felé
            - 
        - Site-to-site: 2 hálózatot köt össze (pl AWS és irodai hálózat) 
            - itt létrehozhatunk további szabályokat is, pl az AWS-re csak irodai hálózatról lehet használni, így előbb ahhoz kell csatlakozni
            - itt nem feltélenül kell a publikus internet felé nyitott hálózatot létrehozni

### What is DNS?
- A Domain Name System röviden az internet telefonkönyve, mivel ennek segítségével fordítjuk le a domain neveket IP címekké
- Az L7 Application Layeren létezik, és UDP protokolt használ
- Működése:
    - az internet namespace-ét egy .-al jelöljük az URL-ben, de ez nem látható
    - Amikor beírunk egy domain nevet, először megvizsgálja, hogy az már ismert-e
    - Ha nem, akkor végigmegy a DNS szervereken, és egyre jobban leszűkítve a keresést:
        - `resolving name server` -> `root name servers` (ez a `.`) -> `top level domain name servers` -> `authoratative name servers`
        - `registrar` -> ebben vannak regisztrálva a domainek a hozzájuk tartozó IP címekkel

### What is DHCP?
- Dynamic Host Configuration Protocol: 
    - Azért felel, hogy a user device-nak minden szükséges adat rendelkezésére álljon ahhoz, hogy megfelelően működjön
    - Arra használjuk, hogy automatikusan információt kapjunk egy hálózati configurációról

    - Amit meg kell határozni benne:
        - A szerver által kiosztható IP range-ek
        - Mask setup (8-24, hogy az IP melyik része a hálózat, és mi a device)
        - Egy Gateway-t, ami a networkön kívüli IP címeket kezeli
        - DNS server

    - Az alábbi DORA lépések szerint történik az IP cím lekérdezés: 
        - `Discover` - broadcast küldése, miszerint DHTP szervert keresünk
        - `Offer` - A DHTP szerver a válaszban felajánl egy IP címet, amit a host használhat
        - `Request` - újraküldés, már "elfogadás" válasszal
        - `Acknowledgement` - a szerver tudomásul veszi az "elfogadás"-t, és küldi a további szükséges adatokat

### What are some well-known ports?
- **Ports:**
    - A PORT egy kommunikációs végpont, amit a TCP és UDP protokolok is használnak
    - A well-known-portok előre lefoglalt portok, amiket egyes service-ek használnak, hogy egyszerűsítsék az adattovábbítást
    - Port number ranges:
        - System Ports range (0-1023) - csak admin
        - User Ports range (1024-49151)
        - Dynamic Ports range (49152-65535)
    - Well-known ports:
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
- Ezek olyan tartományok, melyek előre meg lettek határozva, és ezek nem léteznek az interneten, csak privát hálózatokhoz lehet ezeket használni
- 3 range létezik:
    - **Class A:** `10.0.0.0` to `10.255.255.255`
        - `10.0.0.0/8`: 8 bites mask, sok subnet lehetőség
    - **Class B:** `172.16.0.0` to `172.31.255.255`
        - `172.16.0.0/12`: 12 bites mask, közepes subnet lehetőség
    - **Class C:** `192.168.0.0` to `192.168.255.255`
        - `192.168.0.0/16`: 16 bites mask, kevés subnet lehetőség (tipikus otthoni beállítás)

### How many usable addresses are in 192.168.1.0/24? (ez maradhat angolul)
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
- Arra hasznáéljuk, hogy kiderítsük a MAC addressét annak a servernek vagy servicenek, amihez kapcsolódni szeretnénk, IP cím segítségével
- Elsősorban L2 Link layeren működik, de mivel IP címeket is használ, így L3 Network Layer-ben is érintett
- Így működik:
    - A host (user gépe) kiküld egy ARP requestet, amiben benne van az IP cím, amihez tartozó MAC address kell neki
    - A request broadcast formában történik, tehát minden device-ra eljut, és a megfelelő device visszaküldi az L2-es MAC address-ét
    - A device-ok ARP táblákban tárolják az IP címekhez tartozó MAC címeket

### What are the basic networking components in AWS?
1. `VPC` - Virtual Private Cloud
    - Egy virtuális hálózat, egy izolált része a Cloudnak, amiben tudunk `Subnet`-eket létrehozni, amikben meg `instance`-okat tudunk elindítani
    - Meg tudjuk határozni bennük az IP kiosztást (`IPv4 CIDR block` vagy range)
    - `Availability Zone`-okat is tartalmaz
    - `Internet Gateway`-t tudunk hozzácsatolni, amit a `Route Table`-ökön keresztül tudunk elérhetővé tenni
2. `Subnet`
    - Egy IP cím csoport a hálózaron belül
    - Egy availability zone-on belül tudjuk létrehozni
    - Ezeknek is meg kell határozni, hogy a VPC IP kiosztásának melyik részét fedjék le
    - `Instance`-okat tudunk benne létrehozni
    - `NAT Gateway`-t tudunk benne létrehozni, de a `VPC`-vel asszociáljuk (ahhoz van igazából csatolva)
    - A `Subnet` `Route Table`-jében tudjuk beállítani a route-okat (pl. ha private-et akarunk létrehozni, kell csinálni neki egy új Route Table-t, és azt asszociálni a default helyett)
3. `Internet Gateway`
    - Ezt egy `VPC`-hez tudjuk csatolni, és egy `VPC`-nek csak 1 lehet
    - Ez ad hozzáférést a `public subnetek`-nek az Internethez
    - A `Route Table`-ben tudjuk hozzácsatolni a `Subnet`-et az `IGW`-hez:
        - **Destination:** 10.0.0.0/24 -> **Target:** local (ez a lokális hálózatot mutatja meg, default itt van)
        - **Destination:** 0.0.0.0/0 -> **Target:** Internet Gateway (pl igw-12345678)
4. `NAT Gateway`:
    - Ez pedig a `private subnet`-nek ad hozzáférést az internethez, a hálózaton belüli másik, `public subnet`-en kersztül
    - Tehát ezt egy `public subnet`-ben kell létrehozni, de egy `VPC`-hez lesz attól még asszociálva
    - Csak 1 irányban működik, tehát a `Subnet`-nek ad csak hozzáférést, de a kívülről jövő forgalmat nem engedi át
    - `Elastic IP`-t is hozzá kell rendelni 
        - `public connectivity type`-al kell létrehozni a `NAT Gateway`-t, és akkor lehet neki csinálni
        - ez valójában csak egy statikus, public IP cím, amin keresztül lehet hozzá csatlakozni az Internetről
    - A `Route Table`-ben tudjuk hozzácsatolni a `Subnet`-et az `NAT GW`-hez
        - **Destination:** 10.0.0.0/24 -> **Target:** local (ez a lokális hálózatot mutatja meg, default itt van)
        - **Destination:** 0.0.0.0 -> **Target:** local (ez a lokális hálózatot mutatja meg, default itt van)
5. `EC2 instance`
    - Ez egy virtális gép, ami egy `Subnet`-en belül fut
    - Egy `Security Group`-ot tudunk neki létrehozni, ebben tudunk neki adni `inbound` és `outbound rule`-okat megadni:
        - pl SSH belépéshez az `inbound rule`-nál kell hozzáadni egy `type SSH / source 0.0.0.0/0 (anywhere IPv4)` rule-t
    - Létrehozáskor egy `Key Pair`-t is hozzá tudunk rendelni, amivel be tudunk így SSH-zni rá
6. `Security Group`
    - Ebben tudjuk meghatározni egy instane `inbound` és `outbound rule`-jait, pl:
        - Inbound:
            - SSH belépés a 22-es porton
            - HTTP access a 80-as porton
            - ICMP access kell a `ping` használatához
            - egyéb app-ok hozzáférése egyedileg meghatározott portokon
        - Outbound:
            - By default minden kimenő engedélyezve van
            - De be lehet állítani pl, h csak egy adatbázisba engedélyezze speciális esetekben:
                - pl. PostgreSQL a 5432-es porton
+ `Route Table`
    
### What network diagnostic/debugging tools are you familiar with?
- **Debugging tools:**    
    - `ping`: 
        - ehhez a `Security Group`-ban először engedélyezni kell az instance inbound rule-jainál az `ICMP` access-t, mert a ping azon működik
        - echo requesteket küld a célpontnak, és várja a válaszokat
        - By default végtelenítve küldi a requesteket, másodpercenként:
            - `ping -c 4 example.com` (`-c` flag a pingek mennységét állítja (count) )
            - `ping -i 2 example.com` (`-i` flag a pingek gyakoriságát állítja (interval) )
    - `curl`: (=Client URL)
        - egy weboldal tartalmát tudjuk lekérni (pl JSON data, API lekérdezés)
        - Így működik:
            - `curl -L http://example.com` (nyers adatokat küld vissza - GET request - -L flag a redirection miatt kell)
            - `curl -I http://example.com` (a headereket kérdezi le, body nélkül - HEAD request)
    - `traceroute`:
        - végigkövetjük a packet útját a célállomásig
        - `traceroute example.com`
    - `lsof` - list open files - check open ports
    - `host` / `dik` / `nslookup` - DNS feloldással kapcsolatban
    - `nc` netcat - egy távoli szervernek tudod megnézni a nyitott portjait

## Security
### What is encryption at rest and encryption in transit, and how are these implemented in AWS?
- **Encryption at Rest:**
    - azon adatok encryptálása, melyek "rest" állapotban vannak, tehát tároljuk őket valahol
    - az a lényege, hogy még ha hozzá is fér valaki az adatokhoz, ne tudja őket olvasni a decryption key nélkül
    - Példák:
        - Az `AWS S3 bucket`-eknél ez default be van állítva (`SSE-S3`), de használhatjuk `KMS`-el (`Key Management Service`), vagy akár mi magunk is megadhatjuk az encryption key-ket (`SSE-C`)
        - Az `AWS EBS` (Elastic Block Store)-nál is tudjuk encryptálni az adatokat a `KMS`-el
- **Encryption in Transit:**
    - azon adatok encryptálása, melyek "transit" állapotban vannak, tehát éppen továbbítjuk őket (client-server vagy 2 service között)
    - azt akadályozzuk meg, hogy belelássanak vagy módosítsák a transit-ban lévő adatokat
    - Példák:
        - `AWS VPN` end-to-end encryptiont használ, így az adatok biztonságosan lesznek továbbítva
        - Ezen kívül `TLS` (`Transport Layer Security`) és `SSL` (`Secure Sockets Layer`) segítségével is encryptálhatunk `AWS`-ben:

### Which service is responsible for monitoring and log collections in AWS?
- `Amazon CloudWatch`
    - Ez egy monitoring service az AWS resource-okhoz:
        - Logs:
            - service-ekkel és app-okkal kapcsolatos adatok kimutatása (időhöz rögzített adatok)
            - struktúrálatlan adatok
        - Metrics:
            - inkább erőforrásokkal kapcsolatos adatok (pl CPU, memória)
            - struktúrált adatok, így műveletek is végrehajthatók velük (pl átlag, min-max)
            - `Alert` és `Dashboard` funkciókat is tudunk hozzájuk csatolni
        - Events:
            - Már külön, Event Bridge néven fut, de régen ide tartozott
            - pl email küldő szolgáltatás
        - X-ray:
            - régen nem ide tartozott, mostmár ide tartozik
            - ez egy tracing service

### Which service is responsible for tracking activities on an AWS account?
- `AWS CloudTrail`
    - Ennek segítségével tudjuk nyomon követni az AWS környezetünkben történő eseményeket/változásokat
        - Logolni lehet az event-eket, és ezeket tárolja (lehet review-zni)
        - Biztonságot lehet növelni, mivel látszanak a nem szokványos események
        - Nyomon követi az API request-eket is
        - Integrálhatjuk más AWS resource-okba, pl a Cloudwatch-ba (monitorozásra az alkalmasabb)

### What is a bastion host, and how can it be implemented in AWS? (!) update with notes from workshop!
- A Bastion host egy olyan host, ami egy private network-ón (subnet-en) lévő instance-t tesz elérhetővé az internetről:
    - Ehhez szükség van egy VPC-re, azon belül is egy public és egy private subnetre
    - A VPC-hez csatolunk egy Internet Gateway-t, a public networkre meg teszünk egy NAT Gatewayt, valamint a Route Table-ben konfiguráljuk ezeket (private -> NAT / public -> IGW)
    - A NAT gateway-re itt igazából nincs szükség, mert ez csak arra való, hogy a private subnet férjen hozzá az internethez. Mi a bastion hosttal épp az ellenkezőjét akarjuk elérni, hogy a private subnet-en lévő instance-ok legyenek elérhetőek kívülről (a bastion hoston keresztül)
    - A public subnet-ben létrehozunk egy EC2-t, és hozzá egy Security Group-ot, ami engedi az SSH-t (Így már be tudunk SSH-zni a public EC2-re, amiről tovább tudunk SSH-zni a private network-ön lévő instance-ra a PRIVATE IP címét használva, ha ott is be van állítva az SSH connection).
        - Itt használhatjuk az `ssh-add ~/.ssh/id_rsa` és `ssh -A ec2_user@public_ec2_ip` belépési módot, hogy ne kelljen a private kulcsot másolgatni
    - Előnyei: izolálja a private gépeket, csak a bastion hoston kell setup-olni
    - Hátrányai: Single Point of Failure - ha elromlik, nem elérhető a private subnet gép (horzontal scaling-el lehet javítani)

### What are the key differences between security groups and NACLs?
- Security Group:
    - EC2-t védi rule-okkal, amikkel szabályozza a hozzáférést
    - Minden EC2-nek kell 1 SG, de 1 SG több instance-hoz is tartozhat
    - By default NEM engedi át a bejövő forgalmat, csak a kimenőt
    - SG már csak azt a forgalmat figyeli, amit a NACL már átengedett
    - csoportosan kezeli a rule-okat
    - csak ALLOW rule-ok
    - stateful -> a response traffic automatikusan megengedett
- NACL:
    - A subnet-eket védi rule-okkal, amikkel szabályozza a hozzáférést
    - Minden subnetnek kell 1 NACL, de 1 NACL több subnet-hez is tartozhat
    - By default átengedi a forgalmat ki és befele is
    - NACL szűr először, utána a SG
    - hierarchia alapján kezeli a rule-okat (sorszámozva vannak, növekvő sorrendben)
    - ALLOW és DENY rule-ok is
    - stateless -> a response traffic-ra is kell külön engedély, így rule párokat használunk in- és outboundra

- Együttesen kell ezeket használni, kihasználva a hierarchiát (NACL előszűr, majd ezután jut el az SG-re). A NACL a network-ön/subnet-en lévő összes gépre vonatkozik, míg az SG-vel finomhangolhatjuk a speciálisabb eseteket
    


### Explain the difference between symmetric and asymmetric encryption!
- Symmetric encryption:
    - doboz analógia, ahol a dobozt egy kulccsal tudjuk kinyitni, de a kulcsból lehet több is, ami nyitja
    - Így működik:
        - egy féle kulcs van, ezt használjuk encryptáláshoz és decryptáláshoz is
        - a feladónak és a fogadónak is kell a kulcsból 1-1 másolat
        - egyszerű módszer, de rizikós, ha kikerül a kulcs
- Assymmetric encryption:   
    - Postaláda analógia, ahol van egy postaláda, amibe mindenki tud dobni egy üzenetet egy nyíláson át (ez lenne a public key), de csak az tudja kinyitni a postaládát, akinek van egy private key-je
    - Így működik:
        - 2-féle kulcsot használ, `private key`-t és `public key`-t
        - A private key-t használjuk decryptáláshoz, ennek kell titokban maradnia
        - A public key-t használjuk encryptálásra, de nem lehet vele decryptálni, így nem baj, ha kikerül (ezt kell elküldenünk annak, aki szeretne nekünk üzenni)
        - Mivel a private key-t nem küldjük el senkinek, ezért sokkal biztonságosabb ez a módszer, de lassabb
        - Egy példa erre a típusra az RSA rendszer

### What is the Principle of Least Privilege (PoLP), and how can it be implemented in AWS?
- Principle of Least Privilege (PoLP):
    - lényege, hogy mindig a lehető legkevesebb hozzáférést engedjük meg egy usernek vagy service-nek, ami szükséges a működéséhez
    - Az AWS-ben pl:
        - érdemes IAM role-okat készíteni, és ezeket odaadni a usereknek, ha szükségük van rá
        - a user-eket érdemes IAM group-okba rendezni role-ok és felelősségeik alapján
        - IAM policy-kat is érdemes létrehozni, melyeket Role-hoz és User-hez is lehet csatolni, de legjobb, ha a group-okhoz csatoljuk  

### How do AWS IAM roles differ from IAM users, and in what scenarios would you use each?
- Mindkettővel szabályozni tudjuk a hozzáféréseket, mindkettőhöz tudunk policy-kat is csatolni, de:
    - IAM user:
        - tényleges személyt (felhasználót) reprezentál
        - hosszú távú használatra
    - IAM role:
        - ideiglenes hozzáférést tudunk vele biztosítani több user-nek vagy service-nek is az "assume" miatt ("wear a different hat")
        - ideiglenes használatra van kitalálva, hogy extra jogokkal tudjunk valakit ideiglenesen felruházni
        - Felhasználása:
            - Ha pl egy másik accounthoz akarunk hozzáférést adni
            - AWS service-eknek tudunk így a működésükhöz szükséges jogokat biztosítani (pl. hogy egy EC2 hozzáférjen egy S3 buckethez)
            - Külsős felhasználóknak tudunk ideiglenesen valamilyen hozzáférést adni

### Explain the AWS Shared Responsibility Model in the context of security.
- Az AWX Shared Responsibility model lényege, hogy meghatározza miért felel az AWS, és miért a felhasználó
- Lényegében az AWS a Cloud biztonságáért felel, a felhasználó pedig a Cloud-ban lévő elemekért:
    - AWS: A Cloud infrastruktúrájának működését biztosító egységek, szolgáltatások biztonságáért felel (hardware, software, networking)
    - User: A felhőben tárolt adatokért, a deploy-olt app-okért, és a szolgáltatások/service-ek biztonságáért felel (hozzáférések konfigurálása, encryptálás)
+ IaaS, PaaS, SaaS

### What is the difference between KMS and HSM?
- Key Management Service (KMS): ez egy "fully-managed" szolgáltatás az AWS-ben, amivel kulcsokat tudunk kezelni (Az AWS felel a működéséért és a kulcsokat is menedzseli).
- A CloudHSM pedig egy hardware, amivel teljeskörűen kontrollálhatjuk a kulcsainkat. Nem nagyon használják, de ha igen, nagy biztonságot igénylő rendszerekben (pl bankok)

## Containers and container orchestration
### What are the key differences between containers and virtual machines?
- Virtualizáció:
    - egy olyan technológia, amivel működőképes virtuális gépeket tudunk létrehozni, azáltal, hogy szimuláljuk a hardware részt (CPU, memory, disk)
    - egy teljes, izolált, OS-el ellátott gépet hozunk létre, amely független a host gép OS-étől
    - ez a VM egy hypervisor-on fut, ez menedzseli a VM-eket és osztja szét a host gép erőforrásait
- Konténerizáció:
    - A konténerek már nem teljes gépek, mert nincs saját OS-ük, mivel a host gép OS kernelét használják (emiatt az OS-nek megfelelő image-eket kell használnunk!)
    - A hypervisor helyett egy container engine-en futnak (pl Docker engine)
    - A konténerekben appokat tudunk futtatni, melyek "azt hiszik", hogy izolált környezetben futnak
    - Nagyon lightweight-ek, mivel nincs külön OS, emiatt könnyen skálázhatóak és könnyen megoszthatóak
    - Az image a tervrajz, a container a futó környezet

### What are the most important instructions in a Dockerfile?
- `Dockerfile`:
    - Arra való, hogy a `docker build` paranccsal egy Docker Image-t hozzunk létre
    - Minden olyan parancsot tartalmaz, ami az image létrehozásához szükséges
    - Mindig egy másik, már létező image-ből indulunk ki (ha nem, akkor "FROM scratch")
    - Az image-ek immutable-ek, ezért minden változtatáskor új image keletkezik (az előző untagged-é válik, de ID-val még mindig tudjuk használni)
- Ezekből áll:
    - `FROM`: Ebből az image-ból indulunk ki
    - `RUN`: Ezeket a parancsokat akarjuk lefuttatni
    - `ENV`: Környezeti változókat tudunk beállítani a konténerben
    - `ADD` and `COPY`: Rámásolni file-okat az image-re (pl ./App). Általában a COPY-t használjuk, az a teljesebb
    - `WORKDIR` A working directory-t állítjuk be vele
    - `CMD`: Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni (módosítható runtime-ban)
    - `ENTRYPOINT:` Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni (nem módosítható, de bővíthetőek a paraméterek)
    - `EXPOSE`: Beállíthatjuk, hogy melyik porton hallgasson a konténerben futó network (de nem ez nyitja ki a portot!)
    - `VOLUME`: Egy mount point-ot hoz létre egy path-al, amire tudunk Volume-ot csatolni

### What is the difference between the CMD and the ENTRYPOINT instructions?
- `CMD`: 
    - Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni
    - Runtimeban módosíthatjuk a parancsot is, meg a paramétereket is
- `ENTRYPOINT:` 
    - Az elindításhoz szükséges parancsot és paramétereket tudjuk ezzel meghatározni
    - Runtimeban nem módosítható a parancs, de bővíthetőek a paraméterek
- Ha kombinálva használjuk, a CMD-ben megadhatjuk a paramétereket, az ENTRYPOINTTAL pedig a parancsot az indításhoz

### How does caching work in docker build?
- A cache-ing az image build-elésekor történik, amikor azt figyeli a Docker, hogy mi az amit nem kell újra legenerálni, mert az már elkészült egyszer.
- Ehhez át lehet beszélni, hogyan is működik a Docker:
    - Rétegelt (layered) architektúrát használ, amiben minden Dockerfile-ban lévő instruction egy új layer-t készít
    - Ezek egymásra rétegződnek, és függnek az alatta (Docker file-ban felette) lévő layerek-től
    - A `docker build` parancs kiadásakor a Docker azt figyeli, hogy bármelyik layer újrahasznosítható-e a már létező layerekből:
        - a már létező, megegyező layer-t hívjuk `cached layer`-nek
- Optimalizálás:
    - A gyakran cserélt rétegek kerülnek a file-ban alulra, hogy a kevésbé változtatott layerek-et ne kelljen újra és újra elkészíteni (pl `COPY`)
    - A dependency-ket másoljuk külön file-ba (pl. `requirements.txt` egy Python app esetében)

### What are some common practices for optimizing container image size?
- Optimalizálási lehetőségek:
    - Minimális `base image` használata (pl `FROM alpine:3.19.1`)
        - vagy `distroless images` by Google (`FROM gcr.io/distroless/base`)
    - Csak a szükséges dependency-ket installáljuk (pl a `requirements.txt` file-ban meghatározva)
    - Install utáni clean up-al
    - Használjunk `.dockerignore` file-t a szükségtelen file-ok kiszűrésére a végleges image-ből (pl node_modules, temp)
    - Layerek számának csökkentése (pl RUN commandok összevonása több, külön RUN command helyett)
    - Többlépcsős build:
        - Szétválasztjuk a build environmentet a runtime environmenttől, úgy, hogy a build env-et létrehozzuk először, majd csak a szükséges elemeket másoljuk át a végleges image-re

### What problems can occur when the "latest" tag is used?
- A probléma forrását az jelenti ilyenkor, hogy nincs version control, vagyis nem egy konkrét verzióhoz kötjük:
    - Amikor egy új verzió kijön, nem lehet tudni, mi fog történni, mert lehet, hogy már másképp fog működni (inkompatibilitás)
    - A debugging is nehezebbé válik, ha változik az environment
    - Előfordulhat, hogy a `latest` egy nem stabil verziót húz majd le

### Explain the architecture of a Kubernetes cluster!
- Kubernetes architeture (Régi nevén `master-slave architecture`):
    - Egy K8s CLUSTER egy `Master node`-ból (=`Control Plane`) és további `worker node`-okból áll:
        - `Master node`:
            - Production environment-ben a `Master node`-ból is több van a stabil működés biztosítására
            - 4 alapvető egység fut benne:
                - `API Server`:
                    - Ez a cluster Gateway-e, amivel mi kommunikálunk a UI-on vagy CLI-on keresztül, valamint ez kommunikál majd a Node-okban a kubelet-tel
                - `etcd`:
                    - ez a cluster agya, amiben kulcs-érték párokban tárolja az adatokat az pillanatnyi state-ről (de az nem app adatainak tárolása!)
                    - backup-okat tudunk csinálni úgy, hogy erről készítünk snapshotokat
                - `controller manager`:
                    - figyeli a cluster-ben történő változásokat (pl ha egy Pod elhal és újat kell helyette indítani) 
                - `scheduler`:
                    - ez dönti el, hogy a következő Pod melyik Node-ra kerüljön, de a lehelyezésért már a Node kubelet-e felel
        - `Worker node`:
            - `kubelet` (a `scheduler process`):
                - ez áll kapcsolatban a Master Node / Control Plane API szerverével
                - felel a Pod-ok indításáért (a Master Node scheduler döntése alapján), valamint kioszjta az erőforrásokat a Containernek
            - `container runtime` (`docker runtime`):
                - ebben futnak a Pod-ok, melyek tartalmazzák a container-eket
            - `kube proxy`:
                - a service-ek requestjeit továbbítja a Pod-ok felé (a Service-re csatlakoznak a Pod-ok, hogy statikus helyen legyenek elérhetőek selector-okkal a változó IP cím helyett)

### What is the difference between Deployment and StatefulSet kubernetes object? / What is the Deployment Kubernetes object responsible for?
- Deployment:
    - A Pod-okat Deployment-tel hozzuk létre, ami azt az extra tulajdonságot adja, hogy létrehoz egy ReplicaSet-et (futtat egy Auto Scaling Groupot), ami megmondja, hogy hány Pod-nak kell egyszerre futnia (ha 1 leáll, akkor újat indít helyette)
    - Ennek segítségével könnyen scale-elhetjük is a cluster-ünket (csak a replikák számát kell meghatározni)
    - Mivel adatbázisokat nem tudunk replikálni (egy közös PersistentVolumeClaim-et használnak), így Deploymentet stateless App-oknál tudunk használni (ahol nincs szükség állandó tárolásra)
    - Absztrakciós hierarchia: Deployment - ReplicaSet - Pod - Container
- StatefulSets:
    - Ugyanúgy a Pod-ok számát kezeli, de stateful App-oknál (pl ha egy adatbázissal dolguzunk), ahol arra is szükség van, hogy a Podok állandóak legyenek, és a sorrendjük is változatlan legyen (ha 1 leáll, akkor annak a megegyező paramétereivel hoz létre újat, ugyanabban a sorrendben elfoglalt pozícióban)
    - Minden egyes Pod saját PVC-vel és PV-t használ (PersistetVolume), ezeknek a state-je pedig állandóan szinkronizálva van
    - 2 dologban tér el a Deploymenttől:
        - a yaml file-ban kell egy `volumeClaimTemplates` rész
        - headless service-t kell neki létrehozni (ClusterIP -> None)

### What is a Service kubernetes object responsible for?
- Service:
    - Arra használjuk, hogy a ezen keresztül érjük el a Pod-okat, amiknek állandóan változik az IP címük, így ehelyett a Service-ekhez kapcsolódnak selector-ok segítségével, és így állandó helyük lesz (a Service selectora a Pod Label-jét keresi meg)
    - Ha egy pod label-jét átírjuk, akkor az kiesik a körből, és untagged-é válik (ez ilyenkor debigginra használható). Helyette új Pod indul.
    - Típusai:
        - ClusterIP: Csak a belső hálózatról teszi elérhetővé a Pod-ot
        - NodePort: Kívülről is elérhetővé teszi a Pod-ot, egy statikus porton keresztül
        - LoadBalancer: Kívülről is elérhetővé teszi a Pod-ot, egy statikus IP címen keresztül (a CloudProvider határozza meg)
        - ExternalName: Kívülről is elérhetővé teszi a Pod-ot, egy DNS néven keresztül (URL) (nem nagyon használjuk!)
        - Headless: Ezt pl egy StatefulSet-hez tudjuk kapcsolni, a ClusterIP-t kell none-ra állítani hozzá
    - Leginkább belső kommunikációra használjuk, külső kommunikációra általában Ingress-t használunk 

### How can be a kubernetes pod reached from the public internet?
- Service-el: NodePort, LoadBalancer (ExternalName)
- Ingress segítségével:
    - Ez nagyon hasonló a service-ekhez, de itt kifejezetten kívülről bejövő connection létrehozására szolgál
    - Egyfajta routerként, a cluster entrypoint-jaként áll a Service-ek előtt
    - Ingress contorllereket használ, amelyekkel az alábbiakat lehet elérni:
        - Load Balancuing: elosztja a bejövő forgalmat több service között
        - Routing Rule-okat tudunk meghatározni, pl URL path-okat meghatározni, amiket service-ekhez tudunk kötni

### What kind of probes are there in Kubernetes, and what are their use cases? / What is the difference between LivenessProbe and ReadinessProbe?
- Liveness Probe és Readiness Probe a két legfontosabb, ezek a Podokban futó containereket figyelik:
    - Liveness Probe: "Él-e még a container?" - Azt figyeli, hogy máködésben van-e még az adott konténer. Ha a próba nem sikeres, akkor a K8s tudni fogja, hogy újat kell indítani helyette
    - Readiness Probe: "Működőképes-e már a container?" - Azt figyeli, hogy a conatiner tud-e már bejövő kérések/requestek fogadására, tud-e már működni. Amíg a próba sikertelen, addig nem is küld felé requesteket.

### What is the difference between resource Limit and Request?
- Limit: mennyi a maximális resource, amit egy pod használhat (CPU, memória). Azért van erre szükség, hogy ne használjon aránytalanul sokat egy hiba esetén, ami a többi Pod működésére is hatással lenne
- Request: a minimális (szükséges) resource-okat fejezi ki, amire a Pod futtatásához szükség van
- A `Deployment`-en belül, `container` szinten kell beállítani
- Pl: "resources: requests: memory: "128Mi", cpu: "500m", limits: ..."

### What are the main differences between ConfigMaps and Secrets?
- ConfigMap:
    - nem szenzitív információ tárulunk benne
    - ezek általában a container image környezeti változói lehetnek, hogy ezek változásakor ne kelljen új image-eket buildelni (de lehet konfigurációval kapcsolatos adat, command-line argument is)
    - nincs encryptálva, sima text-ként tároljuk az adatokat, kulcs-érték párokban
- Secret:
    - szennzitív adatokat tárolunk benne (pl Jelszavak, tokenek és SSH kulcsok)
    - encode-olva tárolja az adatokat, kulcs-érték párokban (nincs encryptálva!)
    - az encryptálást külön tudjuk meghatározni (encryption at rest)

## Infrastructure as Code
### What is Infrastructure as Code? What are its advantages and disadvantages?
- Infrastructure as a Code (IaaS) alatt azt értjük, amikor az infrastruktúrát kódként kezeljük, azt kódot tartalmazó file-okból hozzuk létre
- Előnyei:
    - Version Control-t használunk valójában: Könnyen követhető amit csináltunk, és nyoma is marad utólag
    - Automatizálhatóak a folyamatok
    - Könnyen skállázhatóvá válik az infrastruktúra
    - State-eket használ
- Hátrányai:
    - Komplexebb és időigényesebb az elején jól megírni a kódot
- Standard eszköz ehhez a Terraform, de továbbiak lehetnek: Ansible, Puppet, Chef
- Providereket használ, mint pl az AWS, ami egy interface-ként szolgál (létrehozhatunk sajátot is)

### What are the basic commands of the terraform workflow?
- Alapvető parancsok:
    - `terraform init`: elindítja a terraform working directory-t, valamint konfigurálja a backendet
    - `terraform plan`: létrehoz a main.tf file-ban található utasításokból egy cselekvési tervet (ezek lementhetőek)
    - `terraform apply`: ez is létrehoz egy tervet, de azt rögtön alkalmazza is
    - `terraform destroy`: megsemmisíti a létrehozott infrastruktúrát
- További parancsok:
    - `terraform state <subcommand>`: a state file-t tudjuk ezzel kezelni (ennek segítségével dönti el a Terraform, mit kell frissíteni). Subcommandokat tudunk használni vele (pl list, mv, rm, show)
    - `terraform refresh`: azonnal updatel-i a valós állapotot a legfrissebb state alapján
    - ha csak a terraform parancsot adjuk meg, akkor láthatjuk az összes parancsot

### What is the difference between resources and data sources in terraform?
- resource:
    - az infrastruktúra egy komponenségt reprezentálja
    - ezt a kulcsszót használjuk a terraformban, ha azt akarjuk, hogy hozzon létre valami, majd megadjuk a típust, és az egyedi nevét (this, ha csak 1 van)
    - nem csak létrehozni, de update-re és delete-re is használhatjuk
    - nem mindig 1 az 1-ben jelent egy komponenst, mert pl egy private S3 bucket létrehozásához 2 resource-ra van szükség (egy ami a bucket-et hozza létre, egy pedig private-é alakítja)
    - A Terraform menedzseli a resource-ok lifecycle-jét
- data source:
    - külső elemeket tudunk vele referálni az infrastruktúránkba
    - query-kkel tudunk külső információt lekérni létező resource-okról vagy service-ekről
    - ezek read only-k, a Terraform nem menedzseli ezeknek a lifecycle-jét

### What does state mean in the context of terraform?
- A state a stack-ünk (=backend) leképződése terraformban
- egy file (`terraform.tfstate`), amit a Terraform arra használ, hogy nyomon kövesse a resource-okat és a létrejövő változásokat
- A state lehet lokális, vagy remote file (ha csapatban akarunk dolgozni)

### What are modules in terraform?
- Terraform module:
    - Terraform configurációk gyűjteménye, amik egy resource-gyűjteményt kezel
    - Ezeket más terraform konfigurációkból tudjuk beolvasni, így hozzáférni a modul-ban található resource-okhoz is
    - A moduloknak vannak input és output variable-jeik, hogy rugalmasan lehessen ezeket kezelni

### List the meta-arguments in terraform with their use cases!
- A Meta-argumentumokat resource-okkal, modulokkal vagy más Terraform construc-okkal tudjuk használni, hogy módosítsuk/pontosítsuk a máküdésüket:
    - Néhány példa:
        - count: az létrehozandó instance-ok számát tudjuk vele beállítani
        - for_each: egy lista minden elemén tudunk vele iterálni, egy kicsivel komplexebb parancsokhoz, mint a count
        - depends_on: explicit tudunk egy resourcenak dependenciát adni (pl csak akkor jöjjön létre valami, ha már valami más létrejött)
        - lifecycle: a resource lifecycle-jére vonatkozó beállításokat tudjuk meghatározni
        - provider: multi-region vagy multi-cloud deploymenteknél tudunk megadni a default provideren kívül más providert
        - connection: a resource kapcsolat típusát tudjuk benne meghatározni (pl hogy SSH-val tudjunk rá belépni)
        - timeouts: különböző műveleteknél tudjuk állítani vele a timeout időtartamát (create, update, delete)

### What is the best practice for a terraform project's file structure?
1. Root Directory
    - Ennek kell tartalmaznia az alap terraform config file-okat, valamint könyvtárakat:
        - `./environments`
        - `./modules`
        - `main.tf`
        - `provider.tf`
        - `variables.tf`
        - `terraform.tfvars`
        - `outputs.tf`

    - `main.tf` file:
        - a provider settings-t érdemes egy külön `providers.tf` file-ban megírni
        - a variable-eket ajánlott kigyűjteni egy `variables` file-ba
        - a `terraform.tfvars` file-ba tudunk default értékeket beleírni (`.gitignore` file-t érdemes létrehozni, hogy ez ne kerüljön fel)
        - az outbputs.tf file-ba tudunk definiált output-koat expose-olni

2. Alkönyvtárak:
    - `/environments`
        - `/development`
        - `/staging`
        - `/production`
    - `/modules` (ezek újra felhasználható komponensek, mindegyikben a saját tf config file-jaival)
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


------------------------------------------------------------------------------------------------------------


## GIT
### What is Version Control?
- Version control involves the use of a central repository where teammates can commit changes to files and sets of files. The purpose of version control is to track every line of code, and to share, review, and synchronize changes between team members. 

### Explain Git.
- It is a distributed version control system that keeps track of changes to code repositories. As projects progress, Git uses a branch-based workflow to streamline team collaboration.

### What do you mean by Git Repository?
- As part of the software development process, software projects are organized through Git repositories. In the repository, developers can keep track of all the files and changes in the project, so that they can navigate to any point in its history at any time.

### Can you explain the Git branch?
- The Git branch is essentially a separate line of development that can be used for working on a particular feature, usually during development. The use of branches allows developers to code without interfering with the work of other team members.

### What is merging?
- Merging consists of joining branches. For example, when developers incorporate their peer-reviewed changes from a feature branch into the main branch.

### Discuss the advantages of using a version control system.
- A distributed version control system (DVCS) is a system that helps developers track changes of their code.
- **Advantages:**
    1. **Storage and backup:**
        - Create `repositories` (=folders for projects)
        - A decentralized online `backup` storage system, to make your code available from anwhere
    2. **Collaboration:**
        - Availability to work on separate `branches` (all members on the team can work in collaboration)
        - Availability to `merge` separate pieces of work (prevent conflicts)
        - Each other's codes can be `reviewed`
    3. **Version control:**
        - One of the main purposes is `trackability` of the modifications (track versions)
        - Commit messages for `documentation`
        - Branches make availability for `experimentation` with unreleased code
    4. **Open Source and Integration:**
        - Vast `ecosystem of tools and services` built around it (GitHub, GitLab)

### Clarify the differences between Git and GitHub.
- **GIT**
    - It's a `distributed version control system` (DVCS), that helps developers track changes of their code.
    - It's a `command line tool` that you install on your computer (available offline!)
- **GitHub**
    - `Online platofrm` that hosts repositories for GIT system
    - It's a `service` for collaboration and online storage
    - `Social network` for sharing `open-source` content for programmers/developers
    - Provies `additional web interface` for those who don't/can't interact through a command line

### What is the purpose of remote repositories in Git?
- Make your code available from anwhere / code sharing
- Backup of your code
- Available for team members / Access control
- Availability to work in isolation, then only push changes that are ready
- Version control / track progress
- Contributing (open-source)

### When does a merge conflict occur in Git?
- It happens if the automated merge can't happen:
- Possible **reasons**:
    - **Paralel development (woking on the same branch in 2 different locations):** 
        - When the same code is changed on the same branch. One pushes changes, but the other person started working on it before the push was made (resolve with manual merge)
    - **Merging branches (wokring on different branches):** 
        - When there is some part of the code that was developed on a new branch, but the original branch also had some changes (resolve manual merge)
    - **Rebasing:** 
        - means putting "your code" above the "existing code" -> this will likely cause a merging issue (manual merge)
    - **Cherry-picking:**
        - when you manually select commits to be moved to a separate branch, and there is a conflict between them

- To **resolve a merge conflict**, you typically need to:

    1. Examine the conflicting code in your text editor or integrated development environment (IDE).
        - Conflict markers (e.g., <<<<<<<, =======, >>>>>>>) are added to the code to indicate the conflicting sections
    2. Edit the code to remove the conflict markers and choose which changes to keep.
    3. Save the resolved code.
    4. Add the resolved files to the staging area using git add.
    5. Commit the changes to finalize the merge resolution.

### Which other version control tools do you know of?
- Version Control Tools:
    - Mercurial
    - Subversion (SVN)
    - Concurrent Version Systems (CVS)
    - Perforce
    - Bazaar
    - Bitkeeper
    - Fossil

### What is trunk-based development?
- Trunk-based development is a branching model where most of the work takes place in a single trunk, usually called trunk, master, or main. The trunk receives daily merges from all developers in the team.
- Trunk-based development is a popular development model because it simplifies version control. Since the trunk is a single source of truth, this model minimizes the chances of merge conflict.

### What is Gitflow, and how does it compare to trunk-based development?
- Gitflow is a workflow for Git that makes heavy use of branches. In Gitflow, all the code is merged into the develop branch instead of the main branch, which serves as an abridged version of the project’s history.
- Features are worked on specific “feature branches” (typically prefixed with feature/). In the same fashion, releases also create a dedicated release/ branch.
- Compared with trunk-based development, Gitflow is more complex and has a higher chance of inducing merge conflicts, which is why it has fallen out of favor among the development community.

### How long should a branch live?
- In the context of continuous integration, branches should follow trunk-based development practices and thus be short-lived. Ideally, a branch should last for a few hours or, at most, a day.

### More questions from Journey:
- What is git and what is a repository? (seriously, can you explain these to a non-IT person?)
- What does it mean to clone a repository?
- What does it mean to fork a repository?
- What is a branch in git? How do you create it? (there are multiple ways)
- What happens if you have commited your changes into a development branch and you checkout the master? Where are the development changes stored?
- How do you update your branch with the new commits from the branch you opened it from?
- What is a tag? Where is it stored? Can you commit it? Do you need to push/pull it?
- What is a merge commit? How does the default commit message look like?
- What is HEAD? What does it mean if it's detached?
- What is a pull request? Is it a git feature?

## DevOps
## What is DevOps?
- A DevOps egy olyan folyamat, aminek segítségével felgyorsíthatjuk a development team és az operations team közti együttműködést azáltal, hogy egy automatizált CI/CD folyamatot hozunk létre. A ciklus végén feedback-el térünk vissza a development fázisba (SCRUM).
- Részei és a hozzájuk tartozó tipikus tool-ok:
    
    - Plan ()
    - Code (Git)
    - Build (Docker, Kubernetes, Terraform)
    - Test (Selenium)

    - Release (Jenkins, GitHub Actions)
    - Deploy (Docker, Kubernetes, Ansible, Chef, Puppet)
    - Operate (Maven)
    - Monitor (Grafana, Prometheus)

### What is the importance of DevOps?
- A robust and flexible product deployment system is essential for organizations to remain competitive in today's digitized world. It is here that the DevOps concept comes into play. 

    - The DevOps approach plays a crucial role in generating agility and mobility across all aspects of software development, from conception to deployment.
    - Continuously updating and improving products is more streamlined and efficient with DevOps.
    - By implementing DevOps, developers increase their focus on building only code, while automating and consolidating the remaining tasks.
    - In addition to creating better communication and collaboration, combining the engineering and operations teams increase transparency and accessibility.
    - Increasing efficiency speeds up development and reduces coding errors.
    - Programming defects are the most common cause of development failures. DevOps teams will facilitate more releases in a shorter time frame.

### How do CI and version control relate to one another?
- Every change in the code must trigger a continuous integration process. This means that a CI system must be connected with a Git repository to detect when changes are pushed, so tests can be run on the latest revision

## CI / CD
### What is a pipeline?
- In the context of Continuous Integration and Continuous Deployment (CI/CD), a pipeline is a defined **sequence of automated steps** that software undergoes from code integration to deployment. It is designed to facilitate the efficient and reliable delivery of software by automating tasks that would otherwise be manual and error-prone.

    - **Detailed Explanation:**
        - A CI/CD pipeline typically comprises several stages, each representing a distinct phase in the software development lifecycle. These stages include:

            1. **Source:** This is where the pipeline begins. It is triggered by a change in the source code repository, such as a commit or a merge request.
            2. **Build:** During this stage, the source code is compiled and assembled into a deployable artifact. This can involve compiling code, packaging binaries, or generating documentation.
            3. **Test:** Automated tests are executed to verify that the code behaves as expected. This can include unit tests, integration tests, and other forms of automated testing to ensure code quality and functionality.
            4. **Deploy:** The software is deployed to a staging or production environment. This stage can involve various deployment strategies, such as rolling updates or blue-green deployments.
            5. **Monitor:** Post-deployment, the application is monitored to ensure it is performing as expected. This includes checking for errors, performance issues, and other anomalies.

### Explain Continuous Integration, Continuous Delivery, and Continuous Deployment.
- **Continuous Integration (CI):** 
    - Continuous integration (CI) is the practice of developers regularly integrating their code changes into a repository. Integration may take place several times a day and is verified by automated tests and a build process. As a result, integration challenges can be avoided, bugs can be found early in the development cycle, fixed, and tested iteratively. Every time new commits are integrated into the main branch, continuous integration emphasizes testing automation to make sure the application is not broken.
    - **In short:** Continuous integration (CI) executes the sequence of steps required to build and test the project. CI runs automatically on every change committed to a shared repository, offering developers quick feedback about the project’s state.
- **Continuous Delivery (CD):** 
    - In continuous delivery, all code changes are automatically deployed to the test and/or production environments after the build is complete. Feature additions, configuration changes, and error fixes are some examples of changes. By automating the delivery of new code to users, CD ensures a safe, quick, sustainable process. The CD process also involves some additional checks, like performance tests in production. With Continuous Delivery, deployments are predictable and scheduled regularly.
    - **In short:** Continuous delivery is an extension of CI. Its goal is to automate every step required to package and release a piece of software. The output of a continuous delivery pipeline takes the form of a deployable binary, package, or container.
- **Continuous Deployment (CD):** 
    - The most critical stage of the pipeline is continuous deployment. By following this practice, you will be able to release all changes that have passed all stages of the production pipeline to your customers on time. Code changes can be made live much more quickly at this stage because there is little human interaction. In addition, continuous deployment allows you to accelerate your feedback loop with your customers and relieve pressure on your team since "release days" are no longer needed. Minutes after finishing their work, developers see their work go live.
    - **In short:** Continuous deployment is an optional step-up from continuous delivery. It is a process that takes the output from the delivery pipeline and deploys it to the production system in a safe and automated way.

### Name some benefits of CI/CD
- **Less risk:** 
    - automated tests reduce the chance of introducing bugs, creating a safety net that increases the developer’s confidence in their code.
    - With CI/CD setup, fault isolation is easier and faster. In fault isolation, the system is monitored, the fault occurrence time is determined, and the fault location is determined.
    - CI improves transparency by detecting early-stage failures like build failures, merge issues, integration test failures, etc.
- **More frequent releases:** 
    - the automation provided by continuous delivery and continuous deployment allows developers to release and deploy software safely many times per day. 
    - CI/CD makes it possible to quickly integrate small code changes and test the changes easily.
- **Improved productivity:** 
    - freed from the manual labor of building and testing the code, developers can focus on the creative aspects of coding.
- **Elevated quality:** 
    - CI acts as a quality gate, preventing code that is not up to standards from getting released.
- **Better design:** 
    - the iterative nature of continuous integration lets developers work in small increments, allowing a higher degree of experimentation, which leads to more innovative ideas.
- **Reliability:** 
    - With CI/CD, MTTR (mean time to resolution) is reduced since changes are smaller and easier to implement. CI/CD setup increases the reliability of the unit and integration testing.
- **Fast:**
    - When CI/CD is set up, small code changes are merged very quickly and the code is ready for production very soon.

### What are the most important characteristics in a CI/CD platform?
- **Reliability:** the team depends on the CI server for testing and deployment, so it must be reliable. An unreliable CI/CD platform can block all development work.
- **Speed:** the platform should be fast and scalable to obtain results in a few minutes.
- **Reproducibility:** the same code should always yield the same results.
- **Ease of use:** easy to configure, operate, and troubleshoot.

### What is a CI/CD Engineer?
- CI/CD engineers can improve the integration and operation of CI/CD tools as well as ensure quality end-to-end integration systems. CI/CD Engineers would keep teams motivated and lead the charge on CI/CD. It is the CI/CD engineer's responsibility to ensure that CI/CD tools and platforms are functioning correctly within an organization. CI/CD engineers understand how to optimize their teams' development and release processes.

### State difference between CI/CD vs DevOps:
- **CI/CD**
    - An important feature of CI/CD is its ability to automate and deliver code changes quickly and reliably. 
    - CI/CD involves continuous automation and monitoring of the entire application lifecycle, starting with integration and testing and ending with delivery and deployment. As a result of CI/CD pipelines, organizations are able to minimize bottlenecks during software development and deployment.
    - A continuous integration process optimizes the process of building, integrating, and testing code in a development environment. Continuous delivery is concerned with deploying code effectively in production.

- **DevOps**
    - The DevOps methodology is an approach to streamlining the development of products by integrating ideas, practices, processes, and technology.
    - Organizations can implement DevOps methodologies to encourage rapid, continuous deployment of software by setting up their production teams and processes.
    - DevOps promotes minimizing waste and creating scalable, enduring systems.

### What are some popular CI/CD tools?
- Some popular CI/CD tools are as follows:
    - Jenkins
    - CircleCI
    - Bamboo
    - Team City
    - Codefresh

### Does CI/CD require any programming knowledge?
- As far as CI/CD goes, it does not require any programming language or scripting language to be used. It is not necessary to use any programming or scripting language when you use a GUI-based tool like Azure DevOps (ADO). The use of ARM templates in Azure DevOps requires scripting knowledge. Therefore, it depends on the tools and different ways of setting up CI/CD.

### Describe the build stage
- The build stage is the first phase of the CI/CD pipeline, and it automates a lot of the steps that a typical developer goes through, such as installing tools, downloading dependencies, and compiling a project. Aside from building code, build automation involves the use of tools to verify that the code is safe and compliant with best practices. In this stage, the buildability and testability of the application are validated

- The build stage is responsible for building the binary, container, or executable program for the project. This stage validates that the application is buildable and provides a testable artifact.

### How long should a build take?
- Developers should get results from their CI pipeline in less than 10 minutes. That’s the longest time that’s practical to wait for results.

### Explain trunk-based development (see also at branches!)
- The trunk-based development approach ensures software remains up-to-date by integrating small, frequent updates into the main branch or a core "trunk". As a result of its ability to streamline merging and integration phases, it can be used to achieve CI/CD and to increase the speed and efficiency of the delivery of software and the efficiency of organizations. It is a branching model that consists of most of the work happening in a single trunk (also known as the trunk, master, or main). Each developer in the team merges their changes into the trunk on a daily basis. The reason why trunk-based development is popular is that it simplifies version control. This model minimizes merge conflicts due to the trunk's single source of truth.

### Can a branch live for a long time?
- Continuous integration follows trunk-based development practices, which means branches should be short-lived. Branch durations should be kept to a minimum of a few hours and a maximum of a day.

### What is the difference between a hosted and a cloud-based CI/CD platform?
- Hosted and Cloud-based CI/CD platforms differ in the following ways:
    - **Hosted CI/CD platform:**
        - It is necessary to manage a hosted CI server in the same way as any other server. Installation, configuration, and maintenance are all required before they can be used.
        - Keeping the server secure requires updates and patches. 
        - Additionally, failures in the CI server can halt development and deployment.
    - **Cloud-based CI/CD platform:**
        - Cloud-based CI platforms, however, do not require maintenance. An organization can immediately start using CI/CD platforms in the cloud without installing or configuring anything. 
        - As the cloud is capable of providing all the machine power necessary, scalability is not an issue.
        - The cloud SLA (service-level agreement) guarantees the reliability of the platform.

### Explain some common practices of CI/CD.
- To help you establish an efficient pipeline for CI/CD, here are some best practices:
    - Embrace the DevOps culture.
    - Ensure continuous integration is implemented and utilized.
    - Ensure the same deployment process is followed for every environment.
    - In the event that your pipeline fails, restart it.
    - Version control should be applied.
    - Incorporate the database into the pipeline.
    - Keep an eye on your continuous delivery pipeline.
    - Get your CD pipeline up and running

### Is security important in CI/CD? What mechanisms are there to secure it?
- Yes. CI/CD platforms have access to all kinds of sensitive data such as API keys, private repositories, databases, and server passwords. An improperly secured CI/CD system is a prime target for attacks and can be exploited to release compromised software or to get unauthorized access. A CI/CD platform must support mechanisms to securely manage secrets, and control access to logs and private repositories.

### How do DevOps tools work together?
- A generic logical flow is shown below that automates it to ensure smooth delivery. Organizations may follow different flows depending on their needs.

    - Developers create code, and a version control system, such as `Git`, manages the source code.
    - Any modifications made to this code are committed to the Git repository by developers.
    - `Jenkins` extracts the code from the repository and builds it using software such as Ant or Maven using the Git plugin.
    - `Puppet` is used to deploy and configure test environments, and Jenkins releases this code to the test environment so that testing can be conducted using Selenium tools.
    - `Jenkins` deploys the code once it has been tested on the production server (even the production servers are managed by resources like a puppet).
    - `Nagios`, for example, continuously monitors it after deployment.
    - Using `Docker` containers, we can test the build features in a controlled environment

###  What are some of the deployment strategies?
- **Regular release/deployment:** Through a single release, the software is made available to the public.
- **Rolling deployment:** Nodes are updated 1-by-1 and monitored for any errors, so the whole update is not done all at once
- **Canary releases:** These releases are intended to reduce the risk of failure by exposing a small fraction of the user base (around 1%) to the release. As part of a canary release, developers gradually transition users to the new release in a controlled manner.
- **Blue-green releases:** Essentially, it involves running two instances of an application simultaneously; one is the current stable version, and the other is the most recent version. An immediate switch is made from the old version to the new one. If there is a problem, users can immediately revert to the previous version, which is safer than regular or big-bang releases.

- OR 

- **Regular release/deployment:** releases software to everyone at once, making it available to the general public.
- **Rolling deployment:** Nodes are updated 1-by-1 and monitored for any errors, so the whole update is not done all at once
- **Canary releases:** this is a method that reduces the chance of failure by exposing a small portion of the userbase (around 1%) to the release. With a canary release, developers gradually switch users to the latest release in a controlled way.
- **Blue-green releases:** consists of running two simultaneous instances of an application; one is the stable version currently serving users and the other the latest release. Users are switched from the former to the latter all at once. This method is safer than the regular or big bang releases because users can instantly be routed back to the previous version if there is a problem.
- **Dark launches:** are deployments where new features are released without being announced. Features can be enabled in a very fine-grained way with feature flags.

### Can you tell me about the serverless model?
- There is a cloud-native approach to development known as serverless development, which allows developers to develop and run applications without requiring the management of servers. The server still exists serverless, but it is abstracted from application development.

### What do you mean by Rolling Strategy?
- Rolling deployments update running instances of an application with new releases as they are released. The process involves replacing old versions of an application over time with new versions of the application by replacing the entire infrastructure on which the application is run.

### Describe Chef
- Chef is essentially an automation platform for turning infrastructure into code. A chef is a tool used to automate processes with scripts. There are three main components of Chef that can be categorized as follows:

    - **Chef Workstation:** The workstation is the computer system on which the administrator sits. This system generates code for configuring and managing infrastructure, known as recipes (written in Ruby). A cookbook consists of multiple recipes. In order to upload cookbooks to the server, the Knife command line tool is used.
    - **Chef Server:** Second, a server resides between a workstation and its nodes, which stores the cookbooks. Servers provide the tools necessary to enable node configurations, and they may be locally or remotely hosted.
    - **Chef Node:** The final component is the node, which requires configuration. You can have a number of Chef nodes that collect information about the current state of a node. The server then compares this information with the configuration files to determine if any new configuration is needed.

### Questions from Journey:
- What is continuous integration?
- Why is CI important?
- Why are tests important in the CI workflow?
- Name software that helps the CI workflow!
- What is a "feature flag"? Can you give an example?

## CI/CD TESTING:
### In what way does testing fit into continuous integration? Is automated testing always a good idea?
- Testing is integral to and inseparable from CI. The main benefit teams get from CI is continuous feedback. Developers set up tests in the CI to check that their code behaves according to expectations. There would be no feedback loop to determine if the application is in a releasable state without testing.

### Why is Automated Testing essential for CI/CD?
- In order to ensure code quality, automation is an important characteristic of the CI/CD pipeline. The test automation process is used throughout the software development pipeline to identify dependencies and other issues, push changes to the different environments, and deploy applications into production. As part of its quality control role, the automation will assess everything from API usage and performance to security. In this manner, all changes made by team members are integrated comprehensively and implemented correctly.

    - With automated testing, we can run tests simultaneously across multiple servers/containers, resulting in a faster testing process.
    - Automated testing provides more consistency. Software automation eliminates human errors, and bias, and assures that it behaves as expected.
    - To meet changing demands, tools and frameworks in a CI/CD pipeline need to be adjusted quickly. Keeping up with updates and being agile is difficult with manual testing. However, most configurations are done automatically when you have automated tests. This allows you to migrate quickly to new environments.
    - Maximizing the workforce is crucial to a successful development project. Test automation frees engineers to work on other high-value tasks.
    - CI/CD pipelines require all the testing effort when small changes are made. Validating minor changes continuously is easier with automated testing.

### Name a few types of tests used in software development
- The most common ones are:

    - **Unit tests:** validate that functions or classes behave as expected.
    - **Integration tests:** are used to verify that the different components of an application work well together.
    - **End-to-end tests**: check an application by simulating user interaction.
    - **Static tests:** finds defects in code without actually executing it.
    - **Security tests:** scans the application’s dependencies for known security issues.
    - **Smoke tests:** fast tests that check if the application can start and that the infrastructure is ready to accept deployments.

### What are the top testing tools in continuous testing?
- An essential part of the CI/CD pipeline is continuous testing (CT). The developers are buffered by it, as it squashes bugs in a timely manner. This ensures that no matter how many releases take place, the end-user experience remains uncompromised. Despite accelerated processes, CT serves as a safety net that preserves the end-user experience. It must be seamlessly integrated into the software delivery pipeline since it is a continuous process. The following are the top testing tools used in continuous testing:

    - Testsigma
    - Selenium
    - IBM Rational Functional Tester
    - Tricentis Tosca
    - UFT (Unified Functional Testing)

### How many tests should a project have?
- It varies, but in principles it follows the testing pyramid:  
    - The majority of tests consist of `Unit tests`
    - Then slightly less `Integration tests`
    - Then on top (the least amount) are the `End-to-end` or `UI tests`

### What is a flaky test?
- A test that intermittently fails for no apparent reason is called a flaky test. Flaky tests usually work correctly on the developer’s machine but fail on the CI server. Flaky tests are difficult to debug and are a major source of frustration.

- Common sources of flakiness are:

    - Improperly handled concurrency.
    - Dependency on test order within the test suite.
    - Side effects in tests.
    - Use of non-deterministic code.
    - Non-identical test environments.

### What is TDD?
- `Test-Driven Development` (`TDD`) is a software design practice in which a developer writes tests before code. By inverting the usual order in which software is written, a developer can think of a problem in terms of inputs and outputs and write more testable (and thus more modular) code.

- The TDD cycle consists of three steps:
    - Red: write a test that fails.
    - Green: write the minimal code that passes the test.
    - Refactor: improve the code, and make it more abstract, readable, and optimized.

### What is the main difference between BDD and TDD?
- If `TDD` is about designing a thing right, `Behavior-Driven Development` (`BDD`) is about designing the right thing:
    -  It starts with a collaboration between developers, testers, and business stakeholders to create a shared understanding of requirements through executable specifications written in natural language
    - While writing a BDD test, developers and testers are not interested in the technical details (how a feature works), rather in behavior (what the feature does). 
    - BDD tests are used to test and discover the features that bring the most value to users.

- **Comparison:**
    - `BDD`: 
        - focuses on the behaviour of the app, from an end-user perspective
        - uses natural language, so that non-developers can also create input
    - `TDD`: 
        - focuses on the correctness of the code, from a developer perspective (through unit tests)
        - uses code to write tests, so it involves only developers

### What is test coverage?
- Test coverage is a metric that measures how much of the codebase is covered by tests. A 100% coverage means that every line of the code is tested at least by one test case.
- There’s a myth that 100% coverage means that the code is bug-free. This is false; no amount of testing can guarantee that. Attempting to reach full test coverage is considered bad practice because it leads to a false sense of security and extra work when code needs to be refactored.
- There are many coverage areas, but the most important ones are overall coverage, line coverage and unit test or function coverage
- Typically an `overall coverage` of 70-90% is considered acceptable, but it depends on many factors (industry, type of app, standards)

### How can you optimize tests in CI?
- First, we need to identify which tests are the **slowest** and prioritize accordingly. Once we have a plan, there are several methods for making tests faster. Some of them are:

    - Breaking large tests into smaller units.
    - Removing obsolete tests.
    - Refactoring tests to have fewer dependencies.
    - Parallelizing tests.

### What’s the difference between end-to-end testing and acceptance testing?
- End-to-end -> UI testing, in production-like environment
- Acceptance -> verify acceptance criteria (meet the business needs). it can include end-to-end tests

- End-to-end usually involves testing the application by using the UI to simulate user interaction. Since this requires the application to run in a complete production-like environment, end-to-end testing provides the most confidence to developers that the system is working correctly.

- Acceptance testing is the practice of verifying acceptance criteria. Acceptance criteria is a document with the rules and behaviors that the application must follow to fulfill the users’ needs. An application that fulfills all acceptance criteria meets the users’ business needs by definition.

- The confusion stems from the fact that acceptance testing implements the acceptance criteria verification with end-to-end testing. That is, an acceptance test consists of a series of end-to-end testing scenarios that replicate the conditions and behaviors expressed in the acceptance criteria.

## CLOUD COMPUTING - IAAS, SAAS, PAAS
### What is Cloud Computing? 
- Összefoglaló cikk magyarul: https://kalauz.lib.pte.hu/felho-technologia/

- **Definíció:** "A `számítási felhő` fogalma azt jelenti, hogy az informatika különböző területeit (hardver, szoftver) fizikailag nem a saját számítógépünkön érjük el, hanem, mint egy szolgáltatást megvásárolva valahol egy távoli erőforrásra/számítógépre/szerverre kapcsolódva vesszük igénybe. A `cloud computing` esetében egy cloud szolgáltató úgy biztosít alkalmazásokat, tárhelyet, adatbázisokat a felhasználói számára, hogy azoknak nem kell tudniuk, hogy az adott számítási infrastruktúra hol helyezkedik el.

- **Előnyök:**
    - On-demand fizetünk a használatért
    - Saját igényeink szerint alakíthatjuk
    - Nem kell fizikai tárhely vagy infrastruktúra
    - Rugalmasan skálázható
    - Nagyon gyorsan beüzemelhető
    - 0-24 elérhető (nincs downtime)

- **Hátrányok:**
    - Adatbiztonság és adatvédelem, mivel állandóan elérhetőek az interneten (hozzáférés szabályozása)
    - Szolgáltatás megbízhatósága (manapság nem gond, de nem a mi kezünkben van)

- **Fajtái:**

    - **Szolgáltatói modell szerint:**
        - Klasszikus: On-premises service - itt mindent mi csinálunk
        - **IAAS:** *Infrastrucutre as a service*
            - Magát az infrastruktúrát, a hardware-t béreljük
            - A szolgáltató felel a **virtualizációért**, **szerverekért**, **adattárolásért** és a **hálózatért**
            - pl Azure, AWS, GCS
        - **PAAS:** *Platform as a service*
            - Amikor a szolgáltató a hardware-en kívül a platformot is biztosítja (**OS**, **Runtime**, **Middleware**-ek)
            - Mi csak az alkalmazásért felelünk, ami ezen fut
            - pl Azure, AWS, GCS
        - **SAAS:** *Software as a service*
            - Itt már mindenért a szolgáltató felel, az **alkalmazásokat** és az **adatokat** kínálja közvetlenül a felhasználóknak
            - pl Google Drive, Dropbox
        - Egyéb:
            + **FAAS:** *Function as a service*
            + **CAAS:** *Communication as a service* (eg. call & messaging service)
            + **XaaS:** *Everything as a service*

    - **Telepítési modell szerinti csoportosítás:**
        - **Nyilvános felhő (Public cloud):**
            - akár hétköznapi emberek számára is elérhető, de az erőforrások a szolgáltató birtokában vannak, és ők is felelnek a működtetésért
        - **Közösségi (Community cloud):**
            - Itt már szervezetek (közösségek) használnak megosztva egy rendszert. A működtetésért már a közösség, vagy egy külsős cég felel
        - **Magán felhő (Private Cloud):**
            - Kizárólag 1 szervezet használja, de a működtetés kezelése kiadható, a telephely pedig lehet távol is
        - **Hibrid (Hybrid Cloud):**
            - Az előző típusok elemei tetszőlegesen összeállítva

## What is the Cloud?
- Cloud is essentially a series of servers that might be accessed through the web, and all one piece of information is stored on physical servers in information centers. Intrinsically by cloud computing, we can access the physical servers and run computer code applications on their machines.

## What service models/layers are you familiar with in cloud computing?:
- **Service model:**
    - **On-premises service:** (all managed by your organization (this is not cloud!))
        - This is the original, FULL service, that includes:
            - Applications
            - Data
            - Runtime
            - Middleware
            - o/s
            - Virtualization
            - Servers
            - Storage
            - Networking

    - **IAAS:** *Infrastrucutre as a service*
        - Provides virtualized computing resources over the internet.
        - You manage:
            - Applications, Data, Runtime, Middleware, o/s
        - The provider manages:
            - Virtualization, Servers, Storage, Networking
    - **PAAS:** *Platform as a service*
        - Offers hardware and software tools over the internet, typically used for application development.
        - You manage:
            - Applications, Data
        - The provider manages:
            - Runtime, Middleware, o/s, Virtualization, Servers, Storage, Networking
    - **SAAS:** *Software as a service*
        - Delivers software applications over the internet, on a subscription basis.
        - Everything is managed by the provider!!

    + **FAAS:** *Function as a service*
    + **CAAS:** *Communication as a service* (eg. call & messaging service)
    + **XaaS:** *Everything as a service*

- Comparion Chart: [alt text](../../assets/iaas-paas-saas.jpg)

### What are the benefits of Cloud Computing?
- **Main advantages:**
    - **Efficiency;** Efficiency in business operations is achieved in the following ways through the utilization of cloud computing: 

    - **Accessibility;** Cloud computing facilitates the access of applications and data from any location worldwide and any device with an online connection. 

    - **Cost savings;** Cloud computing over businesses with scalable computing resources, saving them on the worth of acquiring and maintaining them. These resources are purchased on a pay-as-you-go basis, suggesting businesses pay just for the resources they use. This has proven to be less expensive than acquiring the resources independently. 

    - **Security;** Cloud providers, especially those private cloud services, have strived to implement the most straightforward security standards and procedures to guard clients’ data saved within the cloud. 

    - **Disaster recovery;** Cloud computing is the only efficient means for small, medium, and even large enterprises to back up and restore their data and applications quickly and safely. 

    - **Flexibility and Increased collaboration;** with cloud computing capabilities, individuals from different places can collaborate on business projects without necessarily having to satisfy them.

    - **Scalable and Robust:** It helps in developing scalable and robust applications. Previously, the scaling took months, but now, scaling takes less time.
    
    - **Time-saving:** It helps in saving time regarding deployment and maintenance.

### What are the disadvantages of Cloud Computing?
- **Main disadvantages:**
    - **Vulnerability to attacks:** Storing information within the cloud might cause serious challenges {of information of knowledge} thievery since, within the cloud, each data of a corporation is online. A security breach is something that even the only organizations have suffered from, and it’s a potential risk inside the cloud conjointly .though advanced security measures are deployed on the cloud, still storing confidential information inside the cloud is usually a risky affair.

    - **Network property dependency:** Cloud Computing is entirely enthusiastic about the net. This direct tie-up with the net means that an organization should have reliable and consistent web service conjointly as a fast affiliation and information measure to reap the advantages.

    - **Downtime:** Time is considered the only vital potential downside of exploiting Cloud Computing. The cloud suppliers might typically face technical outages, which might owe varied reasons, like loss of power, low web property, information centers going out of service for maintenance, etc., which could cause a brief time inside the cloud service.

    - **Vendor lock-in:** Once needed to migrate from one cloud platform to a distinct one, an organization would possibly face some serious challenges thanks to the variations between seller platforms. Hosting and running the applications of this cloud platform on another platform might cause support problems, configuration complexities, and additional expenses.

        - The corporate information might boot be left liable to security attacks due to compromises created throughout migrations.

    - **Limited management:** Cloud customers might face restricted control over their deployments. Cloud services run on remote servers that are closely held and managed by service suppliers, making it arduous for businesses to possess the extent of management.

### Give the best example of open source Cloud Computing:
- **Example:** `OpenStack`
    - `OpenStack` is an open-source cloud computing platform that enables users to create and manage both public and private clouds. It provides a set of software tools for building and managing cloud computing platforms for IaaS.

- **Benefits:**
    - Flexibility: Users can tailor the cloud to their specific needs.
    - Cost-Effective: No licensing fees, reducing overall costs.
    - 24/7 Availability
    - Easily scalable
    - Security manage
    - Community Support: Large, active community contributing to continuous improvement and innovation.

- **Use Case:**
    - A company can use `OpenStack` to set up a private cloud infrastructure, allowing it to leverage cloud benefits like scalability and flexibility while maintaining control over its data and resources.

### What types of deployments are used in cloud computing?
- **Deployment model:**
    - Public Cloud: like a bus, available to the crowd over the internet (owned by CSPs like AWS, Azure or Google Cloud)
    - Community Cloud: like a car-share app, multiple organizations use a cloud privately
    - Private Cloud: like a car, exclusively owned and managed by an organization
    - Hybrid Cloud: like a taxi, combination of the 2

### What is SaaS?
- **SAAS:** *Software as a service*
    - Delivers software applications over the internet, on a subscription basis:
        - a software distribution model in which a third-party provider hosts applications and makes them available to their customers over the Internet
    - Everything is managed by the provider

### What is IaaS?
- **IAAS** *Infrastructure as a Service*
    - also known as Hardware as a Service. Organizations usually give their IT infrastructures such as servers, processing, storage, virtual machines, and other resources in this model type. Customers can access the resources very quickly on the internet using the on-demand pay model.

    - Take up IaaS for cloud computing course and understand more about these clouds and their specifications.

    - The Iaas platform eliminates the need for every organization to maintain its IT infrastructure.

    - IaaS is divided into three aspects: public, private, and hybrid. The private cloud can offer that infrastructure that resides at the customer end. In contrast, the public cloud is located at the cloud computing data Centre end, and the hybrid cloud is a combination of both public and private clouds.

    - Storage: IaaS provider provides back-end support for storage for storing files.
    - Network: Network as a Service provides networking components such as routers, switches, and bridges for virtual machines.
    - Load Balancers: It gives load balancing at the infrastructure layer.

- Advantages of IaaS in Cloud Computing:
    - Shared Infrastructure
    - IaaS gives shared users to share the same physical infrastructure.
    - Web Access to the resources
    - IaaS allows IT users to access resources over the internet.
    - On-demand as per usage model
    - Iaas providers provide services only as a clients pay-as-you-go model.
    - Business model focus
    - Iaas Providers give business core organization focus rather than IT infra.
    - Update versions of the Software
    - There is the scalability of services provided as there is no problem with software upgrades and troubleshooting issues related to IT infrastructure.

- Disadvantages of IaaS in Cloud Computing
    - Security
    - Security is the main concern in IaaS as it is not 100percent sure.
    - Maintenance and up gradation
    - Although IaaS providers maintain the software but not for all.
    - Interoperability issues
    - It is difficult to migrate Virtual Machine form one IaaS provider to another, so customers experience problem related to vendor lock.
    - Main Iaas Cloud Service providers are Amazon Web Services, Microsoft Azure, and Google Cloud Platform etc.

### What is PaaS in Cloud Computing?
- **PAAS** *Platform as Service*
    - It's the runtime environment for developers to create, test, run and debug web applications. We can easily buy these web applications from the cloud service provider on a pay-as-you-go basis and access them easily using the internet. There is back scalability that the cloud service provider manages, so end users do not need to worry about managing the infrastructure.

    - PaaS includes infrastructure, servers, storage and networking, platform-middleware, development tools, database management systems, and business intelligence to support the web application life cycle.

    - PaaS providers support programming languages, Application frameworks, Databases, and other tools.

- Advantages of PaaS in cloud computing:
    - Simple Development: Paas allows developers to focus on development and innovation without worrying about infrastructure management.
    - Lower Risk: No need for investment in hardware equipment and software.
    - Prebuilt business functionality: Some Paas Providers have a prebuilt framework so that users do not need to build everything from scratch and can directly start projects.
    - Instant Community: PaaS vendors have a community where developers can share experiences.
    - Scalability: Applications deployed can scale with one user

- Disadvantages of PaaS in Cloud Computing:
    - Vendor lock-in: Development according to the particular vendor can be easy, but migration to another cloud provider can be a problem.
    - Data privacy: Corporate data, whether can be essential or not, will always be private, and it should always be an insecure environment.
    - Synchronization of system applications: We have integrated many applications with local and on the cloud, so there is the problem of increased complexity when mixing local data with cloud data.
    - Most PaaS cloud providers are Salesforce, Windows Azure, Google App Engine, etc.
    - This is one of the most frequently asked cloud computing interview questions.

### What is a Private Cloud?
- A private cloud delivers similar advantages to public cloud-like scalability and self-service. In the private cloud, this is done using a proprietary architecture, and private clouds focus on the needs and demands of a single organization.
- As a result, the private cloud is best for businesses with dynamic or unpredictable computing needs that require direct control over their environments. Security, governance, and regulation are best suited for private cloud services.
- Private clouds are used to keep strategic operations and others secure. It is a complete platform that is fully functional and can be owned, operated, and restricted to only an organization or an industry. Nowadays, most organizations have moved to private clouds due to security concerns, and a hosting company is using a virtual private cloud.
- This is one of the most frequently asked cloud computing interview questions.

### What is the Public Cloud?
- The primary objective is to deliver internet services in a public or private cloud. Unlike a private cloud, public cloud services are third-party applications that can be used by anybody who wants to access them. The service may be free or sold on demand.
- Public clouds are open to people for use and deployment. For example, Google and Amazon, etc. The public clouds focus on a few layers like cloud application, providing infrastructure, and providing platform markets.

### What are Hybrid Clouds?
- A hybrid cloud is a cloud computing environment where we can use the services available locally and use third-party private and public services to meet the demand. By allowing workloads to move between private and public clouds as computing needs and costs change, a hybrid cloud gives businesses greater flexibility and more data deployment options.
- Hybrid clouds are a combination of public clouds and private clouds. It is preferred over both clouds because it applies the most robust approach to implementing cloud architecture. It includes the functionalities and features of both worlds. It allows organizations to create their cloud and give control over someone else as well.

### What is the difference between Scalability and Elasticity?
- `Scalability` is a long-tern characteristic of cloud computing that is used to handle the increasing workload by increasing the proportion of resource capacity. Horizontal: increase the number of resources / Vertical: increase the capacity of the resource (eg RAM)
- `Elasticity` is a short-term solution for handling unexpected changes. A system’s capability for adjusting its resource levels automatically to match the workloads it faces at any moment

### What are the security benefits of cloud computing?
- **Complete protection against DDoS:** Distributed Denial of Service attacks have become very common and are attacking the cloud data of companies. So cloud computing security ensures restricting traffic to the server, and traffic that can threaten the company and its data is thus averted.
- **Data security:** As data develops, data breaching becomes a significant issue, and the servers become soft targets. The security solution of cloud data helps protect sensitive information and helps the data stay secure against a third party.
- **Flexibility feature:** Cloud offers flexibility, and this makes it popular. The user has the flexibility to avoid server crashing in case of excess traffic. When the high traffic is over, the user can scale back to reduce the cost.
Cloud computing authorizes the application server, which is used in identity management. It provides permissions to the users to control the access of another user who is entering the cloud environment.

### What is the usage of utility computing?
- Utility computing, or The Computer Utility, is a service provisioning model. A service provider makes computing resources and infrastructure management available to the customer and charges them for specific usage rather than a flat rate.
- Utility computing is a plug-in managed by an organization that decides what type of cloud service has to be deployed. It facilitates users to pay only for what they use.

### Explain security management regarding Cloud Computing.
- Identity management access provides the authorization of application services.
- Access control permission is given to the users to have complete controlling access to another user who is entering into the cloud environment.
- Authentication and Authorization provide access to authorized and authenticated users only to access the data and applications.

### How would you secure data for transport in the cloud?
- When transporting data in a cloud computing environment, keep two things in mind: 
    - Make sure that no one can intercept your data as it moves from point A to point B in the cloud, 
    - and make sure that no data leaks (malicious or otherwise) from any storage in the cloud.

- A virtual private network (VPN) is one way to secure data while transported in a cloud. A VPN converts the public network to a private network instead. A well-designed VPN will incorporate two things:

    - A `firewall` will be a barrier between the public and any private network.
    - `Encryption` protects your sensitive data from hackers; only the computer you send it to should have the key to decode the data.
    - Check that there is no data leak with the encryption key implemented with the data you send while moving from point A to point B in a cloud.

### Explain the full form and usage of “EUCALYPTUS” in cloud computing.
- `EUCALYPTUS` stands for Elastic Utility Computing Architecture for Linking Your Programs to Useful Systems.

### Before going for a cloud computing platform, what are the essential things to be taken into concern by users?
- Compliance
- Loss of data
- Data storage
- Business continuity
- Uptime
- Data integrity in cloud computing

### Why is cloud computing the future?
- In addition to the present, emerging technologies like AI, distributed ledger technology, and many other capabilities are getting available through cloud computing. Consequently, these technologies adapt to varied platforms like mobile devices, increasing their use.

### What is big data in cloud computing?
- Big data in cloud computing refers to the practice of storing, processing, and analyzing large volumes of data using cloud-based services. 
- The cloud provides scalable and flexible resources that can handle the vast amounts of structured and unstructured data typical of big data projects. 
- This enables businesses to gain insights, make data-driven decisions, and leverage advanced analytics without the need for significant on-premises infrastructure. 
- Key cloud services for big data include data storage, data processing frameworks like Hadoop and Spark, and data analytics tools.

### What is Load Balancing in Cloud Computing?
- It’s the distribution of workloads across multiple computing resources. It reduces prices related to management systems and will increase the handiness of resources. It has an advantage over different load equalization in that it will transfer masses to servers globally as hostile distributing it across native servers. In the event of an area server outage, cloud equalization delivers users to the nearest regional server.

### Can you name some of the most critical cloud platform databases? 
- MongoDB, CouchDB, and LucidDB

### Why should a company opt for utility computing?
- This complex question requires a complex answer: thanks to utility computing, the end-user will only have to pay for the service on a per-use basis. The user will be able to increase the number of services he uses to satisfy his needs. This approach to cloud computing can be very remunerative for those businesses that plan to scale and grow their product.

### What are cloud storage levels?
- The most commonly seen cloud storage levels are:
    - **Object storage (blob storage):** Data and its metadata are stored in object format. It is the most flexible form of storage and can also be used with web applications. (eg. `S3`)
    - **File storage:** Data is stored in the form of files and often clubbed together as folders. FS is required - Blob/object storage doesn't have FS (file system). (eg. `EFS`)
    - **Block storage:** data is stored in the form of blocks. It is the lowest level of storage and closest to the hardware. (eg. `EBS`)

    + **Dataset storage:** data is organized into a structured form like tables, record format, or delimited format

### What do you mean by cloud usage monitor?
- A cloud usage monitor is a lightweight, autonomous program situated on a cloud that aids in monitoring resources and collecting and processing resource usage data.
- There are three standard agent-based implementations of the usage monitor as follows.
    - **Monitoring agent:** responsible for transparent monitoring and analysis of the data flow. It is an event-driven program that resides on the existing communication paths. It aids in measuring network traffic and metrics.
    - **Polling agent:** responsible for gathering cloud service usage data by polling The resources. It also monitors the resource status and forwards usage data to log databases for reporting and post-processing purposes.
    - **Resource agent:** processing models that collect data using event-driven interactions with resources. It aids in checking the usage metrics based on pre-defined, tangible events, like initiation, suspension, resumption, and scaling of resources.

### What is edge computing?
- Edge computing is complementary to cloud computation. It is a distributed computing paradigm that combines cloud computing and data storage to solve the latency issues that plague the infrastructure. It is a prevalent paradigm in the IoT scenario. Edge computing aims to manipulate the edge on the edge devices, such as tabs, mobile phones, laptops, gateways, etc., to take on some of the provisioning and management responsibilities of the cloud.

### What is an API gateway?
- An API gateway is a management service between the `client` and the `backend` services and processes. 
- It managemes the API services available such as user authentication, rate limiting, and statistical analysis.

### What is rate-limiting?
- Rate limiting is a technique by which a network’s traffic can be limited by putting a cap on the frequency of a particular action in a given timeframe. It can help eliminate suspicious activities, especially those caused by bots on any network, by tracking the IP address where the request originated. It also protects against instances of API overuse.!


### Describe the Cloud Computing Architecture.
- Két részre osztható:
    - Frontend (Client)
        - UI-ek tartoznak ide (mobil-app, browser)
    - Backend
        - Ez maga a Cloud, részei:
            - Application: ehhez fér hozzá a Client a GUI-on keresztül
            - Service: SaaS, PaaS or IaaS
            - Cloud Runtime: ebben futnak a VM-ek (instnace-ok)
            - Storage: flexibilis, skálázható adattárolás
            - Infrastructure: A Cloud hardware és software komponensei 
            + Management: a menedzsmenthez szükséges komponensek
            + Security: a biztonsági komponensek
        - Kiegészítő szolgáltatások:
            - Hálózati infrastruktúra (LoadBalancer, DNS, VPC)
            - Adatbázisok (SQL vagy noSQL)
            - Monitoring & Analytics
    - A kettőt az "Internet" köti össze, ezen keresztül történik a kommunikáció
- [cloudarchitecture](../../assets/cloudarchitecture.png)

- A Cloud Computing architektúra 4 rétege:
    1. Fizikai réteg (Szolgáltató):
        - CPU, Memória, Routerek, Switchek
    2. Infrastruktúra réteg (Szolgáltató)
        - VM, Adattárolás, Szerverek
    3. Platform réteg (Developer / Szolgáltató)
        - OS, App, Adatbázis
    4. Applikáció réteg (Client)
        - UI

### What are the different phases associated with cloud architecture?
- There are four primary phases associated with cloud architecture. They are as follows:
    - **Launch Phase:** Here, the essential services are initiated to get the system ready for communication or app-building.
    - **Monitoring Phase:** This is the next phase, where the launched services are monitored and subsequently managed on user demand.
    - **Shutdown Phase:** In this phase, the services shut down in the order of least recently used to most recently used, and all the system services are closed.
    - **Cleanup Phase:** Here, all the services and processes left from the shutdown phase due to incorrect or faulty shutdown are cleaned up.

### What are Microservices?
- Microservices is a process of developing applications that consist of code that is independent of each other and of the underlying developing platform. Each microservice runs a unique process and communicates through well-defined and standardized APIs, once created. These services are defined in the form of a `catalog` so that developers can easily locate the right service and also understand the governance rules for usage.

### Why are microservices important for a true cloud environment?
- The reason why microservices are so important for a true cloud environment is because of these four key benefits:

    - Each microservice is built to serve a specific and limited purpose, and hence application development is simplified. Small development teams can then focus on writing code for some of the narrowly defined and easily understood functions.
    - Code changes will be smaller and less complex than with a complex integrated application, making it easier and faster to make changes, whether to fix a problem or to upgrade service with new requirements.
    - Scalability — Scalability makes it easier to deploy an additional instance of a service or change that service as needs evolve.
    - Microservices are fully tested and validated. When new applications leverage existing microservices, developers can assume the integrity of the new application without the need for continual testing.

## AWS vs. AZURE
### Give A Brief Introduction To Windows Azure Operating System.
- The Windows Azure operating system is used for cloud services to be run on the Windows Azure Platform. Azure is preferred as it includes the essential features for hosting all the services in the cloud. You also get a runtime environment consisting of a Web Server, Primary Storage, Management services, and load balancers. The Windows Azure system provides the fabric for developing and testing services before their deployment on the Windows Azure in the cloud.

### What is the advantage of using Azure Content Delivery Network?
- Azure Content Delivery Network, or Azure CDN, is a remote server cluster. It aids in delivering content at geographically distinct locations to users with minimal transactions and networks for fast content delivery. Some of the salient advantages of the Azure CDN are as below:
    - Faster performance results in a better user experience.
    - No requirements for added hardware or/and software resources. Requires only configuration to set up the CDN features.
    - Decreased load on the actual servers since data is sent via the edge servers.
    - It is a robust delivery system requiring minimal maintenance
    - Extremely easy to configure with no additional resource requirements.

### What are the roles implemented in Microsoft Azure?
- The three roles that Microsoft Azure has implemented are the Web Role, Worker Role, and Virtual Machine Role.
    - **Web Role:** It provides a front-end web solution. Similar to an ASP.NET application. While facilitating, Azure provides IIS, a web server, with all necessary functions.
    - **Worker Role:** If you want to observe log activity, you may use a worker role because it offers solutions for background services and can execute any lengthy tasks.
    - **Virtual Machine Role:** Web and worker roles can both be run or executed in the virtual machine role.

### What are the different types of storage available in Azure?
- There are several types of storage available in Azure, they are mentioned here:
    - `Blobs`- Large amounts of unstructured and massive data are stored in this approach.
    - `Queues`- Messages used for interaction between application components are stored in queues.
    - `Files`- Files are utilized to store files and share them as common disk storage between virtual machines.
    - `Tables`- NoSQL tables are used to store structured data and are ideal for small databases.
    - `Disks`- Used to create virtual machine drives for high-input/high-output or random read/write activities.

### What is ARM in Azure?
- `ARM` defines `Azure Resource Manager`, it was inducted in 2014 which added the concept of a resource group. ARM is Microsoft’s deployment and management service for Azure. It also enables you to centralize the deployment, security, and management of Azure resources. The resource manager deployment model provides several benefits over the classic deployment model.

### What are the main components of Azure Platform?
- Windows Azure has three main components in Azure: Compute, storage, and fabric

    - **Windows Azure Compute** Azure compute offers a hosting environment for managed code and a computing service via web roles, workers roles, and virtual machine roles.
    - **Windows Azure Storage** There are four main types of storage services offered by Windows Azure, including queues, tables, binary large objects, windows azure disks, etc.
    - **Windows Azure Fabric** The open-source distributed systems platform known as Azure Service Fabric is a Platform as a Service that gives users access to the same powerful tools that Microsoft regularly employs to create, maintain, and operate many of its services.

