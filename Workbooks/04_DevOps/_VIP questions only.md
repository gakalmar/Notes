# DEVOPS MOST IMPORTANT TOPICS

## NETWORKING

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
        - L1 - Hub - hardveres adattovábbítás
        - L2 - Switch - két node közti kapcsolatért felel, MAC address-t használ
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
    - Egy olyan technológia, amely lehetővé teszi, hogy biztonságos kapcsolatot hozzunk létre egy másik hálózattal az interneten keresztül
        - VPN szerver segítségével tud létrejönni ez a biztonságos kapcsolat, ehhez kapcsolódunk, majd a VPN szerver kapcsolódik a távoli hálózathoz
        - A VPN szerver továbbá el is rejti a Client-et az internet elől, olyan, mintha a VPN szerver IP címét használná
        - End-to-end encryption-t használ, amivel biztonságosabb lesz az adatküldés

    - 2 fajátja van:
        - Client-to-site: a Client-et köti össze a távoli szerverrel
        - Site-to-site: 2 hálózatot köt össze (pl AWS és irodai hálózat) 
            - itt létrehozhatunk további szabályokat is, pl az AWS-re csak irodai hálózatról lehet használni, így előbb ahhoz kell csatlakozni

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

## CLOUD COMPUTING

### What kind of virtualization technologies are you familiar with?
- A virtualizáció egy valós entitás helyett egy virtuális dolog létrehozását jelenti
    - A hypervisor (Virtual Machine Monitors (VMMs)) teszi ezt lehetővé (ez allokálja a host resource-ait a virtuális környezetben)
    - Ha a hypervisor installálva van, akkor tudunk létrehozni VM-eket, amik hordozhatóak
    - az az előnye ennek,
        - hogy csökkentjük a költségeket azáltal, hogy 1 fizikai gépen tudunk futtatni különböző környezeteket, 
        - csökken a "downtime", mivel könnyen újak hozhatóak létre
        - könnyen tudjuk őket ide-oda küldözgetni

- Technológiák:
    - Hardware / Platform virtualizáció
        - Type 1 Hypervisor - Bare Metal / Natív virtualizáció:
            - itt nincs host gép, a hypervisor közvetlenül áll kapcsolatban a hardverrel
            - pl `Microsoft Hyper-V`, `Xen`
            
    - Szoftver-virtualizáció:        
        - Type 2 - Hosted / Nested virtualizáció:
            - ennél host gépet használunk (saját OS), ezen fut a hypervisor
            - a host gép megosztja az erőforrásait a VM-ekkel (szabályozható)
            - pl `Oracle VirtualBox`, `VMware Workstation`
        
        - Konténerizáció:
            - Itt nem egy egész gépet virtualizálunk, mert OS-t nem hozunk létre, ehelyett ezt applikáció szintjén virtualizáljuk
            - Csak felhasználjuk a host gép OS-ének kernelét, hogy izolált egységeket hozzunk létre
            - pl `Docker`, `Kubernetes`

    - Ezeken kívül létezik még:
        - Network virtualizáció: itt a network-öt virtualizáljuk
        - Desktop virtualizáció: Hypervisor helyett szoftver segítségével hozunk létre VM-eket egy távoli szerveren, és ezek távolról irányíthatóak
        - Applikáció-virtualizáció: Applikációt virtualizálunk, melyek így önállóan képesek működni
        - Storage virtualizáció: itt csak az adattárolás van már csak virtualizálva

### What is Cloud Computing? 
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

- A Cloud Computing architektúra 4 rétege:
    1. Fizikai réteg (Szolgáltató):
        - CPU, Memória, Routerek, Switchek
    2. Infrastruktúra réteg (Szolgáltató)
        - VM, Adattárolás, Szerverek
    3. Platform réteg (Developer / Szolgáltató)
        - OS, App, Adatbázis
    4. Applikáció réteg (Client)
        - UI

### What are the basic networking components in AWS? (?)
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

### What is a bastion host, and how can it be implemented in AWS? (!) update with notes from workshop!
- A Bastion host egy olyan host, ami egy private network-ón (subnet-en) lévő instance-t tesz elérhetővé az internetről:
    - Ehhez szükség van egy VPC-re, azon belül is egy public és egy private subnetre
    - A VPC-hez csatolunk egy Internet Gateway-t, a public networkre meg teszünk egy NAT Gatewayt, valamint a Route Table-ben konfiguráljuk ezeket (private -> NAT / public -> IGW)
    - A NAT gateway-re itt igazából nincs szükség, mert ez csak arra való, hogy a private subnet férjen hozzá az internethez. Mi a bastion hosttal épp az ellenkezőjét akarjuk elérni, hogy a private subnet-en lévő instance-ok legyenek elérhetőek kívülről (a bastion hoston keresztül)
    - A public subnet-ben létrehozunk egy EC2-t, és hozzá egy Security Group-ot, ami engedi az SSH-t (Így már be tudunk SSH-zni a public EC2-re, amiről tovább tudunk SSH-zni a private network-ön lévő instance-ra a PRIVATE IP címét használva, ha ott is be van állítva az SSH connection).
        - Itt használhatjuk az `ssh-add ~/.ssh/id_rsa` és `ssh -A ec2_user@public_ec2_ip` belépési módot, hogy ne kelljen a private kulcsot másolgatni

## DEVOPS

### What is DevOps?
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

- **Continuous Integration (CI):** 
    - Continuous integration (CI) executes the sequence of steps required to build and test the project. CI runs automatically on every change committed to a shared repository, offering developers quick feedback about the project’s state.
- **Continuous Delivery (CD):** 
    - Continuous delivery is an extension of CI. Its goal is to automate every step required to package and release a piece of software. The output of a continuous delivery pipeline takes the form of a deployable binary, package, or container. No auto-deployment in the end!
- **Continuous Deployment (CD):** 
    - Continuous deployment is an optional step-up from continuous delivery. It is a process that takes the output from the delivery pipeline and deploys it to the production system in a safe and automated way.

###  What are some of the deployment strategies?
- **Regular release/deployment (traditional way):** 
    - Through a single release, the software is made available to the public (very risky in case it doesn't work!)
- **Rolling deployment:** 
    - Nodes are updated 1-by-1 and monitored for any errors, so the whole update is not done all at once
- **Canary releases:** 
    - Exposing a small fraction of the user base (around 1%) to the release. Gradually transition users to the new release in a controlled manner.
- **Blue-green releases:**
    -  It involves running two instances of an application simultaneously:
        - one is the current stable version
        - the other is the most recent version
    -  An immediate switch is made from the old version to the new one (production goes back to staging area, and the new version from the staging area is set to the new live, production). If there is a problem, users can immediately revert to the previous version. 

### Automated tests in CI:
- **Test pytamid:**
    - **Unit tests (the most):** validate that functions or classes behave as expected.
    - **Integration tests:** are used to verify that the different components of an application work well together.
    - **End-to-end or UI tests (the least)**: check an application by simulating user interaction.

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

## CONTAINERS AND CONTAINER ORCHESTRATION

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

## INFRASTRUCUTRE AS A CODE

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

## GIT

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