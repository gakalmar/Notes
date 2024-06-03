# DevOps Workbook
## LINUX
### What kind of virtualization technologies are you familiar with?
- "Az izoláció egy eszköze, melynek segítségével eloszthatjuk az erőforrásokat egy adott gépen" + történelmi gyökerek
- működés (hypervisoron futnak a VM-ek + felel a resource allokációért)
- típusai: 
    - fizikai/bare metal/1es típus: hardveren fut közvetlenül;
    - szoftveres/nested vagy hosted/2es típus: egy host gépen fut, de még külön OS-el
    - konténerizáció: applikáció szintjén (nincs saját OS), host gép kernelét használja (kernel köti össze a szoftvert a harverrel) 
- előnyök (költséghatékony (nem kell fizikai), nincs downtime -> instant replacement, könnyen osztható)
### What command line text manipulation tools are you familiar with?
- `sed` (szövegtranszformáció); `grep` (keresés, filter); `jq` (json query)
- `awk` (adatok kinyerése-táblázat jelleg); `tail` (file végi sorok); `source` (importálhatunk adatokat, pl scriptbe)
### How would you schedule a command to run every Sunday at midnight?
- `cron` utility (cronjob ütemezés) -> `crontab`(per user+system)
- format: min-hour-day(1-31)-month-dow(0-sun/6-sat)
- pl:   sudo crontab -e (open with nano)
        0 0 * * 0 echo "Hello!" > /temp/logs.txt
### How would you check the available resources (memory, disk space, CPU)?
- CPU (+memory%):`top` / Memory (RAM) Usage: `free -h` / Disk space: `df -h`, `du -h /path/to/directory`
### What are hard links and symbolic links?
- új file -> valójában egy referencia a disk-en lévő memória egy pontjára
- hard link (új referencia, ami ugyanoda mutat) / soft link (új referencia, ami az eredeti referenciára mutat)
- eredeti file törlése (=referencia) (hard link megmarad; soft link megszakad)
### What are services in the context of Linux?
- Egy háttérben futó program vagy app (más néven `daemon`)
- a `systemd` -> service-eket menedzseli (boot + futó)
- használat: `systemctl start/stop/enable/disable/status <service>` (pl. `cron`, `sshd`, `networkd`)
### Describe the permission model of Linux! How would you make a file only readable and writable by its owner?
- permission model -> multi-user jelleg miatt
- 2 réteg (ownership U/G/O / permission R/W/X) - f/d+9bit
- módosítás: `chown user:group filename`
- módosítás: (szimbolikus `chmod g+x file` / abszolút `chmod 744 file`)
- spec: SUID owner nevében lehet futtatni; `x` -> `s` (`chmod 4744 file`) + GUID (`2744`)
- sticky: directory szint - ne legyen törlési jog (`1764`)
### What is the difference between Gi, Gb and GB?
- Gi or GiB (Gibibyte): binárisan tárolt, 2^30 byte
- Gb (Gigabit): 10^9 bits (itt már 10-es van, nem 2-es!)
- GB (Gigabyte): 10^9 bytes (1 byte = 8 bit -> 1GB = 8Gb)
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
- `set` scriptekben használjuk, leginkább debugginghoz, vagy a progress check-hez
- `set -eux` (`e` sikertelen command esetén lép ki / `u` figyelje az unset variable-t / `x` loggolja a commandokat / `v` sorokat is)
### How would you make a service auto-start at machine boot-up?
- a `systemd` daemonnal (`systemctl` command!), ami az init system-ért felelős a Linuxban
- `systemctl enable <servicename>` + `systemctl status <servicename>`

## NETWORKING
### What is a MAC address?
- `Media Access Control`, más néven fizikai/hardveres/L2/ethernet address, 12 jegyű hexadecimális kód (0-9 + A-F = 16 digit options)
- OSI model L2 Data-Link layere használja azonosításra / `ARP protocol` -> MAC address kiderítése 
### What is the difference between binding to 127.0.0.1 or 0.0.0.0?
- `127.0.0.1` (localhost): csak a sajátgépről bejövő connection-ökre hallgasson
- `0.0.0.0` (Minden IPv4 address a local machine-en): Bárhonnan figyelje a bejövő connectionöket
- Binding: szerver vagy app hozzárendelődik egy IP címhez és PORT-hoz, amiken fogadja a bejövő requesteket
### What are the Layers of the OSI model?
- Layer 1: Physical - HUB
    - hardveres adattovábbítás (nyers bit streamek, pl `10001011`)
- Layer 2: Data link - SWITCH
    - két node közti kapcsolatért felel, MAC address-t használ; (+meghatározza az adat formátumát a hálózaton)
- Layer 3: Network - ROUTER
    - IP protocol-t használ packet forwardinghoz
- Layer 4: Transport
    - Azt biztosítja, hogy az adatok hiánytalanul, megfelelő sorrendben és hibák nélkül eljussanak a címzetthez
- Layer 5: Session
    - A lokális és távoli appok közti session-öket menedzseli (mukafázis/szakasz)
- Layer 6: Presentation
    - Data encryption és decryption itt történik, valamint biztosítja, hogy az adatok megfelelően használhatóak legyenek
- Layer 7: Application
    - A userhez legközelebbi layer, ez bonyolítja le a kommunikációt az appok között, valamint az end-user serviceket szolgáltatja
### What is the difference between a router and a switch?
- Switch: L2 Data Link / MAC alapú / azonos hálózaton küld packeteket / nincs kapcs. külső internettel (router felé megy a kimenő)
- Router: L3 Network Layer / IP alapú / networkök közti kapcsolat (kapcs, külső internettel) / Header + Forwardin Table használata
### What is the difference between TCP and UDP?
- Mindkettő a L4 Transport Layer protokolja, de egyszerre csak 1-et használ
- `TCP` (Transmission Control Protocol): lassú, kézbesítés sikere (megbízható) / újraküldés / session-t hoz létre (port alapú kapcs. a küldő és fogadó között)
- `UDP` (User Datagram Protocol): gyorsabb, de megbízhatatlan (nincs visszajelzés a sikerről) / connectionless / porton továbbít
### What is a VPN?
- "Egy olyan technológia, amellyel hálózatokat tudunk összekapcsolni"
- Client to site (site = hálózat): elterjedtebb, clientet köt össze másik hálózattal, nyitott az internet felé / VPN szerverhez kapcsolódunk -> azon kapcsolódik a másikhoz
- Site-to-site: 2 hálózatot köt össze (nem felt. kell külső internet)
- Előnyök: csatlakozási szabályok (tűzfal) / end-to-end encryption / rejtve marad a felhasználó IP címe
### What is DNS?
- A Domain Name System "az internet telefonkönyve", lefordítja a domain neveket IP címekké (internet namespaceben vannak tárolva - egy pont a domain végén)
- Az L7 Application Layeren létezik, és UDP protokolt használ 
- Működése: ismeri-e már? -> ha nem, akkor végigmegy a name servereken, egyre jobban leszűkítve a keresést (resolvingNS (megvan-e már?) -> rootNS (TLD-t határozza meg) -> topleveldomainNS (authNS-t határozza meg)-> authorativeNS) + registrar
### What is DHCP?
- Dynamic Host Configuration Protocol: user device csatlakozáshoz szükséges adatait szolgáltatja (hálózati config)
- Amit meg kell határozni a DHCP szerveren: kiosztható IP-k / mask / gateway a külső internet felé / DNS server
- DORA lépések (IP cím lekérdezés): `Discover` (broadcast) / `Offer` (IP cím) / `Request` (elfogadás) / `Acknowledgement`
### What are some well-known ports?
- Port: egy kommunikációs végpont, amit a TCP és UDP protokolok is használnak
- A well-known-portok előre lefoglalt portok, amiket egyes service-ek használnak, hogy egyszerűsítsék az adattovábbítást
- Port range-ek: System (0-1023) / User (1024-49151) / Dynamic (49152-65535)
- Well-known ports: 21 FTP - 22 SSH - 53 DNS - 80 HTTP - 443 HTTPS - 3306 MzSQL - 5432 PostgreSQL - 6443 K8s - 27017 MongoDB 
### What are the private IP address ranges?
- csak privát hálózatokhoz lehet ezeket használni (nem léteznek a neten)
- **Class A:** `10.0.0.0/8` to `10.255.255.255/8` (8 bites mask, sok subnet lehetőség - nagyobb hálózatok)
- **Class B:** `172.16.0.0/12` to `172.31.255.255/12`
- **Class C:** `192.168.0.0/16` to `192.168.255.255/16` (16 bites mask, kevés subnet - tipik otthoni)
### How many usable addresses are in 192.168.1.0/24? (ez maradhat angolul)
- `IPv4` address - 8 x 4 2-bits (32 bits = 4 octet) (bit can be `1` or `0`, octet 0-255)
- pl `192.168.1.1` = `11000000.10101000.00000001.00000001`
- CIDR block X.X.X.X/N -> kiosztható tartomány: végén a mask -> a network-nek fenntartott bináris digiteket jelöli, a többi a csatlakozó hostoké
- network-nek fenntartott a mask utáni X.X.X.0, a broadcastnak meg a X.X.X.255
### What is the purpose of the ARP protocol?
- MAC address-t derítünk ki IP alapján / L2 Data Link (MAC) + L3 Network (IP)
- Működés: A host küld egy ARP requestet (broadcast) az IP címmel, amihez csatlakozni akar -> a megfelelő device visszaküldi a MAC address-ét (device-ok ARP táblákban tárolják az IP címekhez tartozó MAC címeket)
### What are the basic networking components in AWS?
1. `VPC`: Virtual Private Cloud - izolált része a Cloudnak, ebben hozunk létre subnetet - CIDR block, Availability zone (több), IGW hozzárendel
2. `Subnet`: Egy IP cím csoport a hálózaron belül - CIDR block, Availability zone (egy!), ebben hozunk létre instance-t, NATGW-t, Route Table tartozik hozzá (forgalom továbbítás)
3. `Internet Gateway`: `VPC`-hez tudjuk csatolni (1et!), subnet hozzáférése az Internethez (RT-ben hozzáadni!)
4. `NAT Gateway`: `private subnet`-nek ad hozzáférést az internethez (kell neki Elastic IP), vissza nem engedi a forgalmat, `public subnet`-ben hozzuk létre,  (RT-ben hozzáadni!)
5. `EC2 instance`: virtális gép egy `Subnet`-en belül, `Security Group`-ot tudunk neki létrehozni, SSH kulcsot is meg kell határozni
6. `Security Group`: `inbound` és `outbound rule`-ok létrehozása pl Inbound SSH 22, HTTP 80, ICMP (ping) / Outbound pl adatbázishoz
7. `Route Table`: ezzel továbbíthatjuk a forgalmat a belső hálóra (localhost), vagy a gateway-ekre
### What network diagnostic/debugging tools are you familiar with?
- `ping` (`-c` count / `-i` interval) / `curl -L http://example.com` (`-L` a redirection miatt) / `traceroute` packet útja a kézbesítésig / `lsof` - list open files - check open ports / `host` or `dig` or `nslookup` DNS feloldás / `nc` netcat - egy távoli szervernek tudod megnézni a nyitott portjait

## NETWORK SECURITY
### What is encryption at rest and encryption in transit, and how are these implemented in AWS?
- Encryption at Rest: adatok encryptálása, melyeket valahol tárolunk (statikus) / hozzáférés esetén ne tudja őket olvasni (encrypt pl: KMS (S3-at, EBS-t), SSE-S3 (default))
- Encryption in Transit: azon adatok encryptálása, melyeket éppen továbbítunk (client-server vagy 2 service között) / olvasást vagy módosítást akadályozzuk meg (pl VPN end-to-end, vagy TLS (Transport Layer Security - újabb) vagy SSL (Secure Socket Layer - régebbi) protokol segítségével)
### Which service is responsible for monitoring and log collections in AWS?
- Amazon CloudWatch: monitoring service az AWS resource-oknak és service-eknek
- Logs (AWS service-ek csinálják) - struktúrálatlan, időhöz rögzített adatok, főled service vagy app-al kapcs
- Metrics - erőforrásokkal kapcs struktúrált adatok (CPU, mem), aritmetikus műveletek (min-max, átlag) + Alert + Dashboard funkció
- Ezen kívül Events (email küldés), X-ray (tracing service)
### Which service is responsible for tracking activities on an AWS account?
- AWS CloudTrail: az AWS környezetünkben történő eseményeket/változásokat követi nyomon
- Előnyök: Event Log és tárolás / Biztonság (látszanak a nem megszokott események) / API requestek követése / Integrálás Cloudwatch-ba (jobb monitoring)
### What is a bastion host, and how can it be implemented in AWS?
- Egy olyan host (szerver), ami a private network-ön lévő resource-okat teszi elérhetővé a küldő internetről (pl szerverek admin hozzáférése miatt)
- Kell: VPC, public+private subnet, IGW (VPC-hez csat. +subnet Route Table konfig.), (+NAT to public subnet!), 1-1 EC2 (SG konfig SSH)
- Előny: izolálja a private gépeket, csak bastion hoston kell setup - Hátrány: single point of failure (több gép kell (horiz scale) + LB)   
### What are the key differences between security groups and NACLs?
- Mind2 rule-okat használ a hálózatunk védelmére
- Security Group: EC2 szinten (1 per SG, de lehet többhöz is csatolni), default nem enged be semmit, NACL után szűr, csoportos rule-kezelés, csak ALLOW, stateful (resp.-t nem kell külön beállítani), csak 1 gépet véd
- NACL: subnet szint (1 per SN, de lehet többhöz is csatolni), default mindent beenged, SG előtt szűr, rule-hierarchia (sorszám), ALLOW+DENY, stateless (rule-párok, mert response-ra is be kell állítani), hálózaton lévő összes gépre érvényes
- Együtt jó használni (NACL előszűr -> minden gépre közös rule-ok, majd ezután jut el az SG-re (instance-ok egyedi beállítása, finomhangolás))
### Explain the difference between symmetric and asymmetric encryption!
- Symmetric: doboz - 1 kulccsal nyílik, de akárhány kulcsot tudunk másolni / 1 kulcsot használ encr + decr-hoz / feladó és átvevőnek is kell (kulcsküldés probléma) / egyszerű algoritmus
- Assymmetric: Postaláda - nyíláson át bárki betehet (public key), de kivenni csak private key-vel / 2 kulcs: encrypt (public); decrypt (private) / nincs decrypt kulcsküldés (csak encrypt, hogy nekünk tudjanak küldeni) / lassabb algoritmus (pl RSA)
### What is the Principle of Least Privilege (PoLP), and how can it be implemented in AWS?
- Principle of Least Privilege: működéséhez szükséges lehető legkevesebb hozzáférést engedjük meg egy usernek vagy service-nek
- Az AWS-ben pl: IAM role (user-nek ideigles jogokat adni) / user IAM groupokba felelősség alapján (ehhez csatolni a policyt közvetlenül, de lehet role/userhey is)
### How do AWS IAM roles differ from IAM users, and in what scenarios would you use each?
- Mindkettővel szabályozni tudjuk a hozzáféréseket, mindkettőhöz tudunk policy-kat is csatolni, de:
- IAM user: tényleges személy (felhasználó); hosszú távú használatra
- IAM role: ideiglenes hozzáférés (user vagy service-nek is); "assume" -> úgy csinálni mintha lenne joga ("wear a different hat") / Pl másik account hozzáférés, AWS servicek működése (EC2 hozzáférjen S3-hoz), külsős felhasználók ideiglenes használatra
### Explain the AWS Shared Responsibility Model in the context of security.
- lényege, hogy meghatározza miért felel az AWS, és miért a felhasználó: AWS -> a Cloud biztonságáért felel (hardware, software, networking) /  USER -> a Cloud-ban lévő elemek biztonságáért (adatok, deploymentek (appok), service-ek), pl hozzáférések konfigurálása, encryptálás
+ IaaS, PaaS, SaaS
### What is the difference between KMS and HSM?
- Key Management Service (KMS): ez egy "fully-managed" szolgáltatás az AWS-ben, amivel kulcsokat tudunk kezelni (Az AWS felel a működéséért és a kulcsokat is menedzseli).
- A CloudHSM pedig egy hardware, amivel teljeskörűen kontrollálhatjuk a kulcsainkat. Nem nagyon használják, de ha igen, nagy biztonságot igénylő rendszerekben (pl bankok)

## CONTAINERS AND CONTAINER ORCHESTRATION
### What are the key differences between containers and virtual machines?
- Virtualizáció: "Az izoláció egy eszköze, melynek segítségével eloszthatjuk az erőforrásokat egy adott gépen" / működés (hypervisoron futnak a VM-ek + felel a resource allokációért)
- VM: egy host gépen fut, de még saját OS-el (hypervisor felel a resource allokációért)
- Konténerizáció: applikáció szintjén (nincs saját OS) / host gép kernelét használja (kernel köti össze a szoftvert a harverrel) / hypervisor helyett container engine (docker engine) / app-okat futtatunk bennük, melyek izoláltan környezetben működnek / lightweight + könnyen skálázható / image (tervrajz) - container (futó környezet)
### What are the most important instructions in a Dockerfile?
- Dockerfile: `docker build` paranccsal egy Docker Image-t hozzunk létre belőle / minden parancsot tartalmaz, ami az image létrehozásához szükséges / mindig létezőből indulunk ki (kivéve FROM scratch) / immutable - nincs update, mindig új
- Ezekből áll: FROM, WORKDIR, ADD (URL is)/COPY (egyszerűbb), ENV, RUN, CMD, ENTRYPOINT, EXPOSE, VOLUME 
### What is the difference between the CMD and the ENTRYPOINT instructions?
- Mindkettővel az elindításhoz szükséges parancsot és paramétereket tudjuk meghatározni
- CMD: Runtimeban módosíthatjuk a parancsot is, meg a paramétereket is
- ENTRYPOINT: Runtimeban nem módosítható a parancs, de bővíthetőek a paraméterek
### How does caching work in docker build?
- image build-elésekor (figyeli mi az amit nem kell újra legenerálni)
- Docker működése: Rétegelt (layered) architektúra (Dockerfile instruction 1 layer) / egymásra épülnek, így a felsők függnek az alatta lévőktől (a legalsó fölött mindent frissíteni kell) / cached layer az, amit már elkészített egyszer
- Optimalizálás: A nem cserélt rétegek kerülnek a file-ban felülre (pl IMAGE) / dependency-ket külön file-ba (pl. `requirements.txt` egy Python app esetében)
### What are some common practices for optimizing container image size?
- Minimális `base image` (pl `FROM alpine:3.19.1` vagy distroless) / csak szükséges dependencz install (req.txt file) / install után clean-up / .dockerignore / kevesebb layer (pl RUN command összevonással) / többlépcsős build (build env vs runtime env), így csak az kerül rá a végső image-re, ami tényleg kell
### What problems can occur when the "latest" tag is used?
- probléma forrása: nincs version control (nem egy konkrét verzió) -> új verzió lehet inkompatibilis, nehezebb debug (változó environment), latest lehet egy nem stabil image is! 
### Explain the architecture of a Kubernetes cluster!
- Régi nevén `master-slave architecture`: MASTER NODE (CONTROL PLANE) + WORKER NODES (Production env-ben több master is!)
- Control plane egységei: API server (cluster gateway, erre kapcsolódunk, és ez áll kapcsolatban a node-okkal (kubelet-tel)) / etcd (az agy, cluster state adatai kulcs-érték párokban) + ezt backupoljuk (snapshot) / Controller Manager (figyeli a cluster változásait, pl node elhaláskor új node indítása) / scheduler (eldönti, melyik node-on induljon a következő Pod, de majd csak a kubelet helyezi le!) 
- Worker node: kubelet (ez kommunikál a master API szerverével, felel a Pod-ok indításáért, kiosztja az erőforrásokat a containernek) / container runtime (pl docker rt, ebben futnak a Pod-ok, melyekben meg a container-ek vannak) / kube proxy (service-ek és Podok közti kapcsolatért felel)
### What is the difference between Deployment and StatefulSet kubernetes object? / What is the Deployment Kubernetes object responsible for?
- mindkettő podok indításáért felel egy felsőbb absztrakciós réteget létrehozva (ReplicaSet még köztük van, ami Auto-Scaling groupot futtat!) / könnyen scale-elhető a cluster
- Deployment: adatbázisokat nem tudunk replikálni (egy közös PersistentVolumeClaim-et használnak), így Deploymentet stateless App-oknál tudunk használni (ahol nincs szükség állandó tárolásra) - így az újraindított pod-ok nem is ugyanazok (más lesz a nevük)
- StatefulSets: stateful App-oknál (pl ha egy adatbázissal dolguzunk), ahol arra is szükség van, hogy a Podok állandóak legyenek, és a sorrendjük is változatlan legyen (ha 1 leáll, akkor annak a megegyező paramétereivel hoz létre újat, ugyanabban a sorrendben elfoglalt pozícióban) / Minden Pod saját PVC-vel és PV-t használ (PersistetVolume), ezeknek a state-je pedig állandóan szinkronizálva van / GYAKORLATBAN 2 különbség depl. létrehozáshoz képest: (.yaml-ben kell külön volumeClaimTemplates rész + kell egy headless service a podok statikus jellege miatt (ClusterIP -> None ))
- Absztrakciós hierarchia: Deployment - ReplicaSet - Pod - Container
### What is a Service kubernetes object responsible for?
- a Podokhoz férünk hozzá ezek segítségével (Pod IP változik új létrehozásakor -> label/selector alapú kapcsolat service-ekkel (Service selectora a Pod Label-jét keresi meg))
- Ha egy pod label-jét átírjuk, akkor az kiesik a körből, és untagged-é válik (ez ilyenkor debuggingra használható). Helyette új Pod indul.
- Típusai: ClusterIP (Csak a belső hálózatról elérhető a Pod) / NodePort (Kívülről is elérhető a Pod-ot, statikus porton keresztül) / LoadBalancer (Kívülről is elérhető Pod, statikus IP címen keresztül (a CloudProvider határozza meg)) / ExternalName (Kívülről is elérhető Pod, DNS néven keresztül (URL) (nem nagyon használjuk!)) / Headless (StatefulSet-hez)
### How can be a kubernetes pod reached from the public internet?
- Service-el: NodePort (statikus port), LoadBalancer (statikus IP),  (ExternalName - domain)
- Külső kommunikációra általában Ingress-t használunk (egyben kezeli a kapcsolatot, nem kell külön-külön service-enként: 1 közös LoadBalancer-t használ (kisebb költség), skálázhtóbb emiatt, centralizált config, komplexebb routing) + integrálható külsős funkciókkal (pl authentication, logging, monitoring)
### What kind of probes are there in Kubernetes, and what are their use cases? / What is the difference between LivenessProbe and ReadinessProbe?
- Liveness Probe és Readiness Probe a Podokban futó containereket figyelik:
- Liveness Probe: "Él-e még a container?" - Azt figyeli, hogy működésben van-e még az adott konténer -> ha sikertelen, újat kell indítani helyette
- Readiness Probe: "Működőképes-e már a container?" - Azt figyeli, hogy a konténer kész-e már bejövő kérések/requestek fogadására -> amíg sikertelen, addig nem is küld felé requesteket.
### What is the difference between resource Limit and Request?
- A `Deployment`-en belül, `container` szinten kell beállítani: Pl: "resources: requests: memory: "128Mi", cpu: "500m", limits: ..."
- Limit: mennyi a maximális resource, amit egy pod használhat (CPU, memória). Azért van erre szükség, hogy ne használjon aránytalanul sokat egy hiba esetén, ami a többi Pod működésére is hatással lenne / Request: a minimális (szükséges) resource-okat fejezi ki, amire a Pod futtatásához szükség van
### What are the main differences between ConfigMaps and Secrets?
- ConfigMap: nem szenzitív információ tárulásra, nincs enkriptálva (pl a container környezeti változói, hogy változásakor ne kelljen új image-eket buildelni vagy más, konfigurációval kapcsolatos adat, command-line argument is)
- Secret: szennzitív adatokat tárolunk benne, enkódolva kulcs-érték párokban (nem encryptálva, de az külön beállítható ("enc at rest")!) (pl Jelszavak, tokenek és SSH kulcsok)

## INFRASTRUCTURE AS A CODE
### What is Infrastructure as Code? What are its advantages and disadvantages?
- azt jelenti, hogy az infrastruktúrát kódként kezeljük, azt kódot tartalmazó file-okból hozzuk létre (Terraform, Ansible, Puppet, Chef)
- API Providereket használ, mint pl az AWS, ami egy interface-ként szolgál (létrehozhatunk sajátot is)
- Előnyei: Version Control (trackelhető változások), automatizálható folyamatok, könnyű skálázhatóság, state-ek (összeveti az elvárt állapotot a ténylegessel)
- Hátrányai: Komplexebb és időigényesebb az elején jól megírni a kódot
### What are the basic commands of the terraform workflow?
- Alapvető parancsok: `terraform init/plan/apply/destroy` (init elindítja a working dir-t és konfigurálja a backendet)
- Tovabbiak: `terraform state <subcommand>`: state file kezelése (pl list, mv, rm, show, pull, push) / `terraform refresh`: azonnal updateli a valós állapotot a state alapján / `tf validate`: check syntax és hogy működőképes-e / `tf output`: a generálás utáni adatokat nyerhetjük ki vele, pl IP, hostname (ezek eleinte nem látszanak)
### What is the difference between resources and data sources in terraform?
- resource: az infrastruktúra egy komponense, aminek a lifecycle-jét a TF kezeli (létrehoz valamit, de update-el és töröl is), típust kell megadni és nevet, majd paramétereket / nem 1-az-1-ben komponens, pl private S3 bucket-hez kell extra policy és public access block resource is!
- data source: külső elemeket tudunk vele referálni az infrastruktúránkba / query-kkel tudunk külső információt lekérni létező resource-okról vagy service-ekről / ezek read only-k, a TF nem kezeli ezeknek a lifecycle-jét
### What does state mean in the context of terraform?
- A state a stack-ünk (=backend) leképződése terraformban - van mindig egy kívánt állapot és egy valós, és ha különböznek, akkor a valóst frissíti / egy fileban tárolja a TF (`terraform.tfstate`) / lehet lokális, vagy remote file (ha csapatban akarunk dolgozni)
### What are modules in terraform?
- Terraform configurációk gyűjteménye, amik egy-egy resource-gyűjteményt kezelnek / más terraform konfigurációkból tudjuk beolvasni, így hozzáférni a modul-ban található resource-okhoz is / vannak input és output variable-jeik, hogy rugalmasan lehessen ezeket kezelni
### List the meta-arguments in terraform with their use cases!
- A Meta-argumentumokat resource-okkal vagy modulokkal tudjuk használni, hogy módosítsuk/pontosítsuk a műküdésüket:
- count, for_each, depends_on, lifecycle (pl prevent destroy), provider (defaulton kívül mást ad hozzá), connection (pl SSH-val lehessen hozzá kapcsolódni), timeouts (create, update, delete műveleteknél tudjuk meghatározni)
### What is the best practice for a terraform project's file structure?
1. Root könyvtár file-ok: main.tf, provider.tf, variables.tf + terraform.tfvars (utóbbi default értékeknek), outputs.tf (expose outputs), terraform.tfstate
2. Alkönyvtárak (backend (ha kell külön konfigurálni) / environments - pl dev/stagin/production /  modules (önálló komponensek saját tf file-al) - pl network/compute/storage)