# Questions:  

## Advanced module branch selection questions:
- Úgy láttam a jelentkezési dokumentumban, hogy mostanában szinte mindenki az ASP.NET modult választja. Mi ennek az oka, és mennyire könnyű ezzel elhelyezkedni a többi branchhez képest?
    - ugy van kommunikalva, hogy aki jo C#bol, az ide megy (18-3-3-3 jelenleg az arany)
- A DevOps-ról eddig amennyi embert kérdezem, mind másképp foglalta össze a lényegét. Röviden össze tudnád foglalni, hogy ez a modul nagyjából mit takar?
    - minden programozonak szukseges lenne ezt tudni egy munkakornyezet letrehozasahoz
    - Rendszerek karbantartasa / infrastrukturaert felel (felho manapsag, de lehet local is)
    - Containment
    - Deployment
    - Dockerizing

    - negativum az allando keszenlet es ugyelet vallalasa
    - scripteket irunk a folyamatok automatizaciojara
    
- A DevOps-ról azt hallottam, hogy érdemes inkább egy pár év tapasztalat után elkezdeni, erről mi a véleményed? 
    - Nem feltetlenul, sot volt aki mas branch nelkul is el tudott helyezkedni
- Mik a visszajelzések azoktól, akik ezt a branchet választották? (DevOps)

    - Mennyire tudtak könnyen elhelyezkedni?
        - Aranylag minden branchen hasonlo az arany
    - Mennyire tudtak utána jól helyt is állni a munkahelyen?
        - Igen, nem volt gond
    - Más branch-et is végeztek-e el előtte/utána, vagy csak a DevOps-ot?
        - Nem felt, de ha igen az ASP.NET

- Lehet-e 2 branchet választani, és ha igen, milyen feltételekkel?
    - Felajanljak, ha ugy latjak, es epp sokan keresnek munkat

    - Mik a leghatékonyabb kombinációk szerinted?
        - nincs ilyen, a DevOpsot elobb-utobb erdemes amugy alap szinten

- Ha nem lehet 2 branchet is elvégezni, de valaki mondjuk mégis szeretne később önszorgalomból egy másikat is megtanulni, akkor van-e lehetőség arra, hogy a Journeyben elérhető anyagokhoz (és a repokhoz) később is hozzáférjünk?
    - Nem, elobb-utobb megszunik a hozzaferes

**Extra:**

- Álláshirdetések aránya branchenként
    - Nagyjabol jol eloszlik

- Branch indítás feltételei (min 3 ember itt is?)
    - 3 ember kell, de ha 1 kiesik attol meg megy tovabb

- Melyikben vagy mentor?
    - ASP

// TESTING
`Mars exploration sprint 1`
How to compare reference types in unit testing?

What is woth Mocking, and what is best to just instantate?

// SQL
connection string method with connection open inside functions vs connection created with SqliteConnection outside (in Main method) - also commented out line in `bruteforce` task - "with parameterized queries to address SQL injection vulnerability (?)"

How to use an environment variable?

hashing a password? (in SQL notes!)

Testing with SQL? (`bruteforce` task tests)

// WORKBOOK

Workbook questions (marked with ???)

# SI week summary
- Torzsidot teljesen kihasznaltam
- Design Patterns:
    - Egyszeru, konnyen megertheto feladatok
        - Singleton: Most akkor ezt helyettesitsuk mindig a constructor injectionnel, vagy van amikor ez a preferencia?
        - Adapter pattern: Az alapgondolat megvan, az alkalmazasa meg nem teljesen tiszta
        - +1 Majd a vegen, ha jut ra ido
- SOLID:   
    - Seasonal Product: Rettento szenvedosen ment, mert nagyon nehez kitalalni, mit is szeretne a feladat
    - Generalized FizzBuzz: Ez is, iszonyu nehez volt megerteni, mit is szeretne a feladat, meg ugy is, hogy ismerem a FizzBuzz-t. De legalabb nem volt olyan hosszu, mint a Seasonal
    - Birthday Calendar (extra)
- SQL:
    - Legalabb fel napom rament arra, hogy megertsem vegre, hogy kellene elindulni a feladattal (telepites menete nagyon rosszul van megfogalmazva)
    - A feladatok mar konnyen mentek, az SQL querykkel nincs gond
    - Az is sokat segitett, hogy az eredmenyt is lattuk, hogy minek kellene kijonnie
- Extra emailes feladat:

- **Advanced architecture:**
    - `SeasonalProductDiscounter`
        - LSP (Liskov substitution principle): a koncepcio ertheto, de az alkalmazas kicsit nehezkes volt az elso feladatban (minden class helyettesitheto a belole letrehozott classokkal) 
        - A Factory pattern alkalmazasa is nagyjabol ertheto, az eleinte nem volt teljesen vilagos, hogy mikor/miert eri meg alkalmazni (azota mar eszrevettem, hogy pl egy loopban "string"-ekkel meg tudjuk hatarozni, hogy mit hozzon letre ugyanazzal a kod sorral)

    - `FlyThatDrone` feladat: 2szer csinaltam meg, egyszer atirtam kicsit, masodjara mar rajottem, hogy gondolta a feladat
        
- **SQL:**
    - Az alap nyelv vilagos, az online tutorial jo volt

    - `BruteForce` 
        - eleg sok utanajarassal sikerult csak megoldani, mert elsore nem ertettem, mit hova kellene irni (pl az epp elotte tanult SQL query-ket, es azokat is milyen formaban)
        - vegul tobbszor is megcsinaltam ezt a feladatot is, es a connection resz is kitisztult
        - a unit testes resz nem sikerult egyedul, ott nem ertem, hogy kellene ugy letrehozni a connection-t, hogy az mukodjon
        - Create a new database file using the **SQLite command line tools**

### Older questions:

encodeURIComponent() and decodeURIComponent() ?
Event bubbling - how and when to use stopPropagation() ?