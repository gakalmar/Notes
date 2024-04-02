# Web Module Questions

## Modern JS
( https://www.javascripttutorial.net/es6/ )

1. What is ECMAScript? What is the difference between Javascript & ECMAScript?
    - ECMAScript egy standard (syntax és szabályrendszer)
    - JavaScript egy programnyelv, ami az ECMAscriptet használja

2. Explain the concept of "block scoping" introduced in ES6. How does it differ from function scoping?
    - Global - legfelső szint, mindenhol látszanak
    - Function - függvényeken belül léteznek (és beljebb)
    - Block - if / for loopüon belüli változók (var ezen kívül is látszik)

3. What are template literals in ES6 and how do they improve string manipulation in JavaScript?
    - Backtickel létrehozott stringek (többsoros formázás), amikkel tudunk paramétereket is használni, és construct függvényt is lehet hozzárendelni 

4. Explain the concept of "destructuring assignment" in ES6. How does it simplify variable assignment and object/array manipulation?
    - Object destructuring - const { name, age } = person; - a név alapján vesszük ki
    - Array destructuring - const [a, b, c] = numbers; - sorrend számít

5. What is the "spread operator" in ES6 and how can it be used to manipulate arrays and objects more effectively?

    - Spread operator: ... syntax-ot hívjuk így, ami szétbont iterálható elemeket (string, array) önálló elemekre (shallow copy készítés, Math.min/max()) - OBJ: Array.from(myOBj)
    - Rest paraméter: függvény paramétereknél használjuk, ami összegyűjti a maradék elemet és egybe csomagolja - function sumAll(...args)

6. How does ES6 introduce the concept of "default function parameters"? Provide an example of using default parameters in a function?

    - Alapérték meghatározásra használjuk: function funcName (par1, par2 = "no second par was given"){};

7. Explain the concept of "modules" introduced in ES6. How do they improve code organization and reusability in JavaScript?

    - Egy modul egy önálló kódrész, ami újra felhasználható. Az ES6 syntax-tól kezdve az import-exporttal tudjuk ezeket betölteni (előtte require volt)

8. Compare the CommonJS and ES6 "modules". What are the differences?

    - CommonJS - sync - dinamikus import - nem csak legfelso szinten - natív support - felülírható (másolat tölt be)
    - ES6 - async - specifikus (statikus) import-export - legfelso szinten csak - külön be kell állítani ("type": "module") vagy *.mjs formátum - read-only

9. What are higher-order functions in JavaScript?

    - Olyan függvények, amelyeknek az argumentumaként másik függvényz kell/lehet megadni (forEach, map, stb)
        
10. Explain the purpose and functionality of the map function in JavaScript. How does it differ from the filter and reduce functions?

    - `map()`: - új arrayt ad vissza új elemekkel(!), minden elemén végrehajt egy műveletet
    - `filter()`: - új arrayyt ad vissza az eredeti elemekkel, a callback-je boolean value-t kell hogy visszaadjon, az alapján szűri az elemeket
    - `reduce()`: - egy array-t redukál le egy szimpla értékre (összeg vagy min/max érték számításhoz használhatjuk). A visszaadott érték bármi lehet, akár object is

12. What is the role of the reduce function in JavaScript? How can it be used to aggregate or combine the elements of an array into a single value? Provide an example where the reduce function is used to calculate a cumulative sum or find the maximum value in an array.

    const numbers = [1, 2, 3, 4, 5]; 
    const sum = numbers.reduce( (total, num) => total + num, 0);
    const max = numbers.reduce( (max, current) => {current > max ? current : max})

## Fetch

13. How does a query string parameter in a URL contribute to web application functionality? Explain how query string parameters are typically used to pass data between web pages or APIs.

    - Az URL string opcionális része, amit "?"-el adunk meg, utána kulcs-érték pár: `https://www.example.com/search?q=example&sort=asc`
    - kiolvasni frontenden const {querykey} = useParams()-al, backend endpointban req.query.querykey-vel tudjuk

14. What is the purpose and functionality of the fetch function in JavaScript?

    - külső adatbáyisban tárolunk adatokat (egy másik, távoli web-szerveren). A fetch-el tudunk innen adatokat beolvasni, de tudunk további műveleteket is csinálni (GET, POST, PATCH(update value), PUT(remplace item), DELETE)
    - webszerver szerepe - csak adatkiszolgálás (JSON formában)

15. Explain the syntax of the fetch function and how it handles asynchronous operations?

    - fetch metódustól függően elküldünk egy requestet a szerverre. A szerver azt kiértékeli, végrehajtja a műveleteket vele, majd visszaküld nekünk egy választ ami vagy egy sikeres státusszal érkezik, vagy egy hibaüzenettel
    - a kettő közti állapot a pending állapot, ami miatt async műveletként kell kezelni (be kell várni a választ frontenden)

16. What is asynchronicity in JavaScript? Name some typical use cases when asynchronicity is needed.

    - amikor a kód blokkjai egymástól függetlenül tudnak lefutni (tehát nem blokkolják egymást = non-blocking)
    - előfordul, hogy nem abban a sorrendben fejeződnek be a műveletek, mint a kódban leírt sorrend
    
    - 4 state: promise-pending-fulfilled-rejected
    - Promise object, amikor egy async műveletre először megkapjuk a választ, de a tartalma csak később lesz feltöltve

17. How can you handle the response received from a fetch request?
18. How does the fetch function handle errors and handle HTTP status codes? Provide an example of using fetch to handle different types of responses, including successful and error responses.

    - a response-ban sokmindent el lehet küldeni, de a legfontosabb a státuszkód (sikeres/sikertelen), valamint hogy ok/nem ok volt a request (200 ok, 500 általános server hiba, 404 hiányzó adat)
    - sikertelen esetén hibaüzenetet küldhetünk vissza a res.body-ban (try-catch blokk)
    - siker esetén visszaküldhetünk csak egy üzenetet, vagy akár egy objectet is
    
19. Explain the parts of an URL:

    - URL felépítése:
        1. Scheme protocol (eg. `http:`) -> a hsznált protokolt határozza meg
        2. Domain name (eg. `www.example.com`) -> weboldal vagy web server
        3. Path (eg. `/contact`) -> a weboldal különböző tartalmait oszthatjuk ezekbe
        4. Query string (eg. `?q=example`) -> paramétereket lehet vele küldeni
        5. Fragment identifier (eg. `#team`) -> az oldal különböző elemeire hivatkozhatunk vele 

## Serve

20. Explain the concept of client-server communication in the context of web development. How does information flow between the client and the server in a typical client-server architecture?
    
    - Kliens/felhasználó amikor interakcióba lép egy weboldallal, requesteket küld a szerver vagy webszerver felé (a HTTP protokollal)
    - A szerver/webszerver ezeket kiértékeli, és visszaküld egy választ (sokféle tartalom lehet benne). TCP protokolt használ, ami kis darabokban küldi el az adatokat, amiket a frontend utána újra összerak
    - A visszakapott válasz alapján a frontend-en fut tovább a kód

21. What is the role of HTTP requests and responses in web development? Explain the structure of an HTTP request and an HTTP response.

    - Ezek az üzenet-csomagok a szerver és a felhasználó között
    - HTTP Request: Method, URL, Headers (szabályok, amik meghatározzák, hogyan olvassa ki az adatokat), Body (bármi egyéb információ)
    - HTTP Response: Státuszkód, Headers, Body, (message)

22. Explain the key differences between the CommonJS require syntax and the ECMAScript (ES) module syntax import. How do these two approaches handle module dependencies and exports in JavaScript?
23. What are the advantages of using the ES module syntax import over the CommonJS require syntax?

    - CommonJS - sync - dinamikus import - nem csak legfelso szinten - natív support - felülírható (másolat tölt be)
    - ES6 - async - specifikus (statikus) import-export - legfelso szinten csak - külön be kell állítani ("type": "module") vagy *.mjs formátum - read-only
    
24. What is Express.js and how does it simplify web application development in Node.js? Explain the core features and benefits of using Express.js as a web framework.

    - Az express egy framework, amit npm-el tudunk telepíteni, és szerver-oldali applikációkhoz tudjuk ezt használni
    - Előny:    - könnyen és gyorsan tudunk vele egy szervert létrehozni
                - Gyors és hatékonyan működik (lightweight)
                - middleware-eket is bele lehet kódolni (pl adatok validalasara - app.use)
                - route handling (RESTful APIs)
                - HTTP metódusok használata (GET, POST, PATCH, PUT, DELETE)
                - Error handling

25. Explain the process of handling static files (e.g., CSS, images) in Express.js. How can you configure Express.js to serve static assets from a specific directory in your application?

    - Kell egy middleware a statikus fájlok kezeléséhez: app.use('/', express.static('public'));
    - Kell egy kiszolgáló endpoint: res.sendFile('./index.html') (sendFile-hoz kell modult is importalni)
    - Kell egy nyitott szerver port

26. How does Express.js handle HTTP request/response cycles? Explain the process of receiving and responding to requests using Express.js middleware and route handlers.

    - Kliens interakció -> request küldés a szerverre
    - Szerver megkapja, először a middleware-ek nézik meg (pl adatok validálása, access stb.)
    - Szerver megkeresi az endpointot, ami a request-hez tartozik (URL és method alapján)
    - Szerver feldolgozza a requestet, és generál egy választ, amit visszaküld
    - Kliens megkapja a választ, ami a pending requestet lezárja vagy egy fulfilled, vagy egy rejected státusszal

27. How does routing work in Express.js? Explain how to define routes and handle different HTTP methods (GET, POST, etc.) in an Express.js application.

    - Az express import után csinálunk egy "app"-ot az expressnek (const app = express() )
    - Middlewareket hoyunk letre az app.use-al
    - Endpointokat hozunk letre az app.METHOD és URL alapján
    - Megnyitunk egy portot

28. What are the various methods available in Express.js for sending responses to clients? Explain the differences between res.send() and res.json() in Express.js.

    - `res.send()`: bármit lehet így küldeni (statikus fájlok pl)
    - `res.json()`: kifejezetten json formátumú adatokat lehet vele küldeni, de a headersben ehhez meg kell határozni a "content-type"-ot

29. Explain what the express.json() middleware does?

    - Az endpointok előtt futnak le, és az adatok előkészítésére szolgálnak (pl adat parsing json-ból, vagy adat validálás, hozzáférés ellenőrzése)
    - Middlewares are fundtions that are executed before executing the code for the specific endpoints (preparation).
    - For example, the following is used to parse the body of the request object, that is used for requests like `PUT`, `PATCH` and `POST`:

30. What is the purpose of the next() function in Express.js middleware? How can you use it to pass control to the next middleware function in the chain or to terminate the middleware processing?

    - amikor saját middleware-t hozunk létre, akkor ahhoz kell, hogy a következő middlware-re/endpointra lépjünk
    - a beépített exress-es middleware-eknél nem kell használni, mert ott alapértelmezett (pl app.use(express.json());)

31. Explain the concept of route parameters in Express.js. How can you extract dynamic values from the URL path using route parameters, and how are these values accessed within route handlers?

    - Az endpoint URL-jébe lehet megadni: '/users/:id'
    - Kiolvasni a req.params-al lehet (req.params.id pl.)
    - A kliens oldalról így akkor is tudunk adatokat küldeni, amikor nincs req.body (pl GET és DELETE endpointnál, amikor ID alapján akarunk dolgozni)

    - Tudunk egyébként querz paraméterrel is dolgozni: req.query.querykey-vel olvassuk ki

32. Can you name some typical HTTP response codes and their meaning?

    - Alapértelmezett status(200) OK sikeres fetch után
    - Még néhány: 201 Created / 204 Ok, but no Content / 400 Bad Request / 401 Unauthorized / 403 Forbidden / 404 Not found / 500 Internal Server Error / 503 Service unavailable

33. Can you name some typical HTTP request/response headers and their meaning?

    - HTTP Request Headers: Host, User-Agent, Authorization, Content-Type, Accept, Cookie, If-modified-since
    - HTTP Response Headers: Content-Type, Location, Set-Cookie, Cache-Control, ETag, Server, Access-Control-Allow-Origin, Content-Disposition, WWW-Authenticate, Expires 

34. What are the common HTTP methods used in web development, and what are their respective purposes?
35. How does the GET method differ from the POST method? Explain when it is appropriate to use each method. Which one uses request body to send data? What the other method uses to send data?
36. Explain the use of the PATCH method in HTTP. How does it differ from the PUT method, and when should it be used to update a resource?
37. How can the DELETE method be used to remove a resource from a server? Explain how the DELETE method works and any considerations for handling resource deletion.

    - GET, POST(create new), PUT(replace object), PATCH(modify content), DELETE
    - No Body: GET, DELETE

## Forms:

38. How do you handle form submissions using JavaScript? Explain the process of capturing form data and preventing the default form submission behavior.
39. Explain the required elements necessary to define a form in HTML.

    - Controlled vs uncontrolled (controlled for React is better)
    - Uncontrolled: `<form><input id="" placeholder="" default="">value</input><button></button></form>` belso gomb alapbol submit gomb, de type-al beallithato:
        ilyenkor window.addEventListener("submit", (e)=>{} ) // a page refresh-t preventeljuk
    - Controlled (amikor state-et hozunk letre, es ugy adunk value-t): `<form onSubmit={}><input value={valuestate} onChange={(e) => setValuestate(e.target.value)} /><button><button></form>`
        ugyanugy a buttonra triggerel a submit, csak itt a form elementen van

40. What is the purpose of the required attribute in HTML form elements? How does it enforce mandatory input fields and prevent form submission without the required information?

    - required="true"-val beallithatjuk, h mindenkepp szukseg legyen egy adatra, anelkul nem indul be a submit (pl username szukseges, de telefonszam nem)

41. Explain the different types of form input fields available in HTML. How do input types like text, number, email, checkbox, and radio buttons differ, and how are they used in forms?

            <input type=""> text // number min/max/step // email @ // checkbox multi // radio single // password hiddenchars // date // file

42. Can you explain the purpose of the name attribute in a context of form submission?
43. Can you explain how we can connect a label tag to a form element?

    - Az adatok kinyeresere szolgal (const username = form.elements.username.value;), hogy az event listener-t ra tudjuk tenni a formra vagy windowra (form.addEventListener('submit', (e)=>{e.prevDefault();...});)
    - Label for / HTMLfor-ral kapcsolja hozzá azt az inputot, aminek a neve megegyezik

44. How can you dynamically manipulate or modify form elements using JavaScript? Explain how to add or remove form fields dynamically based on user interaction or specific conditions.

    - insertadjacentHTML-el tudunk hozzaadni elemeket ()
    - igy pedig el tudjuk venni az utolsot> form.removeChild(dynamicFields[dynamicFields.length - 1]);

45. How can you convert form data into a format that can be easily transmitted or processed by the server?

    - request body-nak csinalunk egy objectet, es `JSON.stringify()`-ba tesszuk a fetch request kuldesnel

## React

46. What is React.js and what are its key features?
47. Explain the concept of virtual DOM and how it contributes to React's performance.

    - egy open-source JS library UI-janak letrehozasara hasznaljuk (foleg a dinamikus SPA-knal jelent elonyt)
    - Elonyok: komponensekkel dolgozunk (ujrahasznositas), Virtualis DOM (csak a kulonbseget rendereli le tenylegesen), JSX syntax, server oldali rendereles tortenik (eloszor nagyobb letoltes, utana kisebb valtoztatasok)
    - Tovabbi jellemzok> state-ekkel dolgozunk (valtozok helyett), event handling kozvetlenul az elemeken (onClick, onChange), egyiranyu adatütovabbitas (lefele passzolt propok), ReactRouter


    - React uses a **virtual DOM (Document Object Model)**, that compares the **actual DOM** with the **virtual** one, and only updates the differences.
    - This makes the process faster and more efficient to build interactive UIs, because only the difference gets updated instead of the whole DOM.

48. Explain the component-based architecture in React.js.
    How do components work, and how can they be composed to build complex user interfaces?

    - egy komponens egy ujrahasznosithato kodreszlet, amit be tudunk importalni, ha szukseg van ra (functionkent hozzuk letre, csak nagybetuvel)
    - classkent vagy functionkent lehet letrehozni (mi functionnal hoztuk letre, ez a modernebb egyebkent is)
    - parameter/argument helyett propokat lehet neki adni
    - elettartam-lifecycle -> mountoljuk oket, updatelhetjuk, majd unmountoljuk (intializing/updating/cleanup metódusokat használhatunk rajtuk)

49. What is the significance of JSX in React.js?
    Explain how JSX combines HTML-like syntax with JavaScript code and how it is transpiled into regular JavaScript during the build process.

    - .js helyezz .jsx fajlokban egyszerre lehet használni JS és HTML syntaxot. <> tagek jelzik a HTML kód kezdetét, ezután {} közé írhatunk újra JS kódot
    - Nem HTML-t hozunk letre, hanem React elemeket, amiket utana at kell alakitani (pl Babel csinalja ezt nekunk a hatterben)

50. What are props in React and how are they used to pass data between components?
    Explain the concept of props and how they facilitate parent-child component communication.
51. How can you access and utilize props within a functional component in React?
    Explain how to extract and use props using the destructuring syntax.
52. How can you pass callback functions as props in React?
    Provide an example of how to pass a function from a parent component to a child component, enabling the child to communicate with the parent.

    - parameter/argument helyett propokat lehet neki adni a komponenseknek
    - ezeket csak lefele lehet adni, viszont useState setter function-t is le lehet igy passzolni, amivel visszafele is tudunk adatokat kuldeni
    - alapból props objectben mennek át, ezt egyszerűen egy destrukturált formában tudjuk átadni (mintha egyból a props key-jeire hivatkoznánk: function Greeting({ name }) {} )

53. Explain the concept of spreading props in React. 
    How can the spread operator be used to pass multiple props from a parent component to a child component in a concise manner?

    - egy object key-jeit egyben is atadhatjuk, ha mar a beadasnal használjuk a spread operatort: 
        const commonProps = { prop1: 'value1', prop2: 'value2' }
            ...
        return <ChildComponent {...commonProps} specificProp="specialValue" />

54. Explain the concept of default props (with ES6 JS syntax) in React. 
    How can you define default values for props in a component to handle cases where the prop value is not explicitly passed?

    - Utolag kell meghatarozni az ertekeit:
                    const MyComponent = ({ myProp }) => (<div>{myProp}</div>);
                        MyComponent.defaultProps = { myProp: 'Default Value' }; (méh a komponensen belül!)

55. Explain the immutability principle when working with props and states in React. 
    Why is it important to avoid directly modifying prop values within a component, and what are some best practices for maintaining immutability?
56. How does React.js handle state management? Explain the concept of state and how it differs from props.

    - Miután a child megkapja a propot, a immutableként kell kezelni (nem módosítható), hogy a renderelésben ne okozzon gondot (a szulo nem tud rola, hogy modosul a prop, mert felfele mar nem kuldhetjuk)
    - a propot ugy tudjuk modositani, hogy ha egy useStateben taroljuk az erteket, es lepasszoljuk a setter functionjet is
    - A react statek úgy működnek, hogy a refresh akkor történik, ha a react érzékeli a változást. Ha array tartalmat módosítunk, a referencia nem változik, így shallow copyt kell készíteni (arr.push() pl nem műküdik így)
    - Update tehát setter funcionnel vagy destructuringgal: setArrayCopy([...propArray]) // setArrayCopy(prevArray => [...prevArray, newItem]);

57. What are React hooks? Explain the purpose and benefits of hooks like useState, useEffect in React.js.

    - A react hookok valójaban függvények, amikkel a komponensek életciklusaiban tudunk változtatni (lifecycle)
    - useState: adattárolásra szolgál, ami a komponens életciklusa alatt változik (2 része van: adat, setter függvény)
    - useEffect: side-effecteket tudunk vele létrehozni (leggyakrabban fetchnél használjuk)
        dependency arraybe adjuk meg, mitől függjön az újrafuttatása , egyébként csak mountkor és unmountkor fut le (külön clean-up függvény is megadható unmounthoz)
    - leghasználtabb hookok: useNavigate, useLocation, useParams, useContext

58. Explain the concept of virtual DOM reconciliation in React.js. 
    
    - A react virtuális domot használ, ami azt jelenti, hogy ott nézi meg először az eredményt, viszont csak a váltotatásokat küldi el az igazi DOMnak, így effektívebben és gyorsabban tud működni
    - Minden componens állapotváltozásakor megtörténik ez az összevetés (diffing) -> a reconciliation csak ezután jön, amikor kiszámolja mi az a minimális szükséges változtatás, ami kell: új elemek létrehozása, nem használtak törlése(key prop!), elavultak módosítása

59. Explain how to manage complex state objects with useState. 
    Explain techniques like object spreading or merging to update specific properties within an object state.

    - merging - a spread syntax csak akkor működik shallow copy készítésnél, ha egy szint van, egyébként minden egyes nested objectnél meg kell csinálni: setUser(prevUser => ({ ...prevUser, address: { ...prevUser.address, city: 'New City' }}));
    - spreading - tudunk egy kulcsot úgy updatelni, hogy spread syntaxot használunk, majd csak az updatelt kulcsot adjuk meg újra: setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));

60. Why is it important to provide a new array as an argument to the useState hook when adding an item to an existing array?

    - Because states **store information by reference**, so if the reference doesn't change, React might not see the difference as it points to the same reference as before (the original array). So the rerender wouldn't happen probably.
    - The correct way of updating the array with an element is by using the spread syntax to make a copy, then adding the new element:
            
61. How does conditional rendering work in React?
    Explain the different techniques and approaches available to conditionally render components or content based on certain conditions or state values.
    How can it be used to control the visibility or behavior of components based on user interactions or other dynamic conditions?

    - valamilyen feltétel alapján renderelünk egy vagy más komponenst: turnery operator (A vagy B választás esetén) vagy && (igen vagy nem esetén)

62. How can you create a select input element in React? How does it differ from the html's select tag?
    Can you show an example of a controlled and an uncontrolled select element with default value setting?
    
    - input react elem: value attributumba tesszük a useState value-ját, és egy event listenerre (különleges react prop) tesszük a setter functiont, ami az e.target.value-t figyeli
    - **controlled select:** a controlledot useStatel irányítjuk:
                const ControlledSelect = () => {
                    const [selectedOption, setSelectedOption] = useState('option1');                            // We store the selected option, and we set "option1" as the default in the beginning

                    const handleChange = (event) => {
                        setSelectedOption(event.target.value);                                                  // The value is updated through the event handler function
                    };

                    return (
                        <div>
                            <label>Select an option: </label>
                            <select value={selectedOption} onChange={handleChange} defaultValue="option1">      // We can also specify the default value here
                                <option value="option1">Option 1</option>                                       // We add a value property to each option element
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    );
                };
    - **uncontrolled select:** uncontrolled-ot a DOM állítja (ref-et kell írni a selectbe), useRef hookkal tudjuk kivalasztani az elemeket:
                const UncontrolledSelect = () => {
                    const selectRef = useRef(null);

                    return (
                        <div>
                            <label>Select an option: </label>
                            <select ref={selectRef} defaultValue="option1">         // Default value added with defaultValue attribute
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    );
                };
## Database

63. What is MongoDB, and how does it differ from traditional relational databases? Explain the key features and advantages of MongoDB as a NoSQL database solution.
64. Explain the concept of collections and documents in MongoDB? How does MongoDB store data, and how is it organized within collections and documents.

    - A mongoDB egy NoSQL adatbazis, ami azt jelenti, hogy nem hagyományos táblázat jelleggel tárolja az adatokat, hanem dokumentumokat használ (benne kulcs-érték párokkal), amiket referenciákkal tud összekapcsolni
    - Nagy mennyiségű, vízszintes növekedésre van optimalizálva (egyre több user tudja használni), így nagy mennyiségű adattovábbításra van kitalálva
    - Rugalmas sémákat használ
    - Adattárolási hierarchia: CLUSTER (a cloud) - DATABASE (legfelső szint) - COLLECTION (Array structure) - DOCUMENT (Object structure)
    - egy DOCUMENT-et egy Schema alapján létrehozott model-lel tudunk letrehozni (a séma a tervrajz, a model pedig egy virtuális reprezentációja a dokumentumnak, amit a CRUD operationokhoz használunk CSAK mongoose.js-en belül)

65. What is Mongoose.js, and how does it simplify working with MongoDB in a Node.js environment? Explain the key features and benefits of using Mongoose.js.
66. How do you define and create schemas in Mongoose.js? Explain how schemas define the structure and validation rules for documents in MongoDB collections.

    - A mongoose egy MongoDB könyvtár a node.js-en belül, aminek a segítségével tudunk interakcióba lépni a MongoDB adatbázisunkkal (egyszerűsített felhasználói felülettel)
    - Az Atlas pedig egy cloud-service jellegű tárhely

    - a séma és modell csak mongoose-on belül létezik, ezek a MongoDB-ben nincsenek, ott már csak dokumentumokat látunk
    - CRUD operationöket tudunk végrehajtani ezek segítségével (de adatvalidációra is használjuk)
    - a sémában meg tudjuk határozni az adatbázis dokumentumának felépítését, és a benne található adatok tulajdonságait
    - a modell jelképezi magát a collection-t, ennek segítségével végezzük el a kívánt műveleteket

67. Explain the different types of Mongoose.js data modeling techniques. How can you define relationships between MongoDB collections using Mongoose.js, such as one-to-one, one-to-many, and many-to-many relationships?
    - Adattárolás referencia alapján (utólag lehet populálni fetchkor, ha kell)
    - 1to1: user-profile reláció obj-obj
    - 1toMany: author-books obj-arr
    - manytoMany: students-classes arr-arr

68. What are the available options for querying and manipulating data using Mongoose.js? Explain how to perform CRUD operations (create, read, update, delete) using Mongoose.js methods and queries.
- CRUD Create, Read, Update, Delete
- CREATE:   Model.create() / new Model() + Model.save()
- READ:     Model.findOne({ att: value}) or Model.findMany()
- UPDATE:   Model.updateOne({ age: 20 }, { $set: { age: 21 } }) // update with this data only, not the whole object!
            Model.replaceOne({ age: 12 }, { age: 13 }) // replace the obj that has this key with THIS object! 
- DELETE:   Model.deleteOne({ key: value })
            Model.deleteMany()

69. Explain the process of connecting to a MongoDB database using Mongoose.js. How can you configure and establish a connection to a MongoDB server using Mongoose.js in a Node.js application?

    - Create MongoDB/Atlas account -> A cluster is created to store COLLECTIONS
    - Install dependencies on backend -> `npm i mongoose`; `npm i dotenv`
    - Create a `.env` file for handling sensible data, like passwords or connection strings:
    - server.js -> import Model from separate file with the Schema
    
## MERN

70. Explain the concept of React Router. How does it enable client-side routing in React.js applications and facilitate the creation of multi-page-like experiences?
    - A ReactRouter egy újabb könyvtár (react-router-dom), amit az SPA-khoz használunk leginkább, hogy szimulálni tudjuk a multi-page viselkedést
    - Előnye, hogy URL alapján tudja kezelni a tartalmat, így nincs szükség teljes oldalbetöltésre a működéshez
    - Felépítés: `<BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/contacts" element={<Contacts />} /><Routes><BrowserRouter>` vagy `<Link to="/about">About</Link>` - useNavigate+onClick helyett
    - LINK - módosítja az URL-t, ROUTE módosítja a tartalmar, ha változik az URL
            
71. Explain the concept of server-side routing in Express.js. How does Express handle incoming requests and route them to the appropriate API endpoints or route handlers?
    - a szerver oldali routing valójában annyit takar, hogy a requestkor megadott URL címet próbálja megtalálni az endpointoknál megadott URL-ek között, ezen kívül pedig a request módja is elkülöníti ezeket (GET stb.)
    - az endpointok pedig route handler-ek, ami egy kód, ami lefut akkor, ha arra az endpointra fut be a request
    - Vannak ezen kívül middleware-k is, amik minden esetben lefutnak az endpointok előtt, ezeket az adatok előkészítésére vagy hozzáférés leellenőrzésére használjuk (next() )
    - az adatot szolgáltató endpointokat érdemes /api-val kezdeni, hogy könnyen el tudjuk ezeket különíteni, a végére pedig lehet paramétereket illeszteni :-al
    - amikor a backend szerverünk és frontendünk más port-on fut, akkor nincs gond a lekérdezéssel, csak a same-origin probléma miatt kell majd egy proxyval dolgoznunk (ekkor
        meg tudjuk adni, hogy pl az /api-val kezdődő requesteket egyből a backend felé továbbítsa, és ne próbáljon meg a tartalmak között navigálni)
    - az express-nek van saját routere, amivel az endpointokat is ki tudjuk szervezni külön fájlokba a könnyebb átláthatóság miatt

72. What is the MERN stack? Explain the individual components of the MERN stack and their role in building web applications.
    - a MongoDB, Express.js, React és Node.js együttes használatát jelenti egy applikáció készítésekor:
    - Mongo - adatbázis kezelés; Express - backend szerver; React - frontend UI; Node.js - a környezet (runtime), amiben az applikáció fut (szerver)

73. Explain how does a proxy work during React development.
    How can you tell the webpack dev server to proxy the requests to your backend?
    What kind of URLs you have to use in the fetch in your JS code, if you want to use the proxy.
    - Két féle képpen tudjuk futtatni az aplikációnkat - development mód és production
    - Production - kompakt csomag, egy szerverről fut; Development - két külön szerver a frontendnek és backendnek (development szerver a Reactnek, es másik az Expressnek, ami adatokat szolgáltat)
    - A proxyval azt szimuláljuk, hogy a beérkező requestek egy helyre érkezzenek, így elkerülve a same origin policy miatt keletkező hibákat 
        (a development szerverre érkezik így minden request, és az válogat és küldi tovább a backend szervernek, ami oda tartozik)
    - CORS: Cross-Origin Resource Sharing - a backendnek kell meghataroznia, hogy milyen tovabbi forrasok ferhessenek hozza a tartalomhoz (PORT alapjan)

74. Explain the advantages and benefits of using the MERN stack for web development. How does each component of the MERN stack contribute to the development process and overall efficiency of building modern web applications?
    - Mongo (noSQL database) - adatbázis kezelés; NoSQL (dokumentum orientalt), felxibilis sema, magas adatforgalomra van tervezve (horizontal scaling - sok, kis adatmozgas, pl sok felhasználó esetén)
    - Express (framework) - backend szerver; könnyű routing (endpoint készítés), middlewarek használata, HTML metódusok támogatása
    - React (library) - frontend UI; JSX használata, VirtualDOM, komponensek használata (moduláris), Hookok
    - Node.js (runtime) - a környezet (runtime), amiben az applikáció fut (szerver); JS használat frontenden és backenden, async működés támogatása

75. How does data flow in the MERN stack architecture?
    Explain how the frontend, built with React.js, communicates with the backend, developed with Node.js and Express.js, to handle client requests and serve data from the MongoDB database.

    - User interakcioba lep a weboldallal -> requestet kuld a szervernek (development alatt a development szervernek, buildelt appnal az express servernek egyenesen) (SEND REQUEST)
    - Ha development alatt futtatunk, akkor itt meg egy kozbenso lepes van (ertelmezi a requestet, vagy tovabbkuldi a proxyban meghatarozott URLeket a backendnek)
    - a szerver kiertekeli a requestet (middlwareken atfut, megkeresi az endpointot a request tipusaval, es lefuttatja az ott talalhato kodot) (PENDING)
    - A mongoDB a backendre van bekötve, így az adatbázist onnan tudjuk elérni és manipulálni, így az arra vonatkozó kódot az endpointokon belülről futtatjuk
    - visszakuldi a response-t, ami így FULFILLED-á válik (státuszkód alapján 200 OK vagy error 500 vagy más)