# Programming Basics questions

## Data Basics

1. **What are the differences between objects, arrays, and primitives in JavaScript? How are they used in programming? How would you access the value of a specific key in an object?**
2. **Explain the concept of key-value pairs in objects and how they differ from indexed elements in arrays.**
    - 2 féle adattípus: value type és reference type
    - value type: string, float, int, bool, null, undefined
        - tényleges érték van mögöttük, immutable
    - reference type: array, object, function, date
        - pointerrel működnek, mutable

    - array vs object:
        - object: kulcs érték párokban tárolódik az információ (`key1: "value1",...`)
            - nem iterálható (for in loop)
            - pl valos targyak tulajdonsagait tartoljuk igy 
            - Access data: `array[index]`
        - array: specialis object, ahol a kulcsok numerikus ertekek
            - iteralhato (for of loop), length, sorbarendezes
            - listák tárolására
            - Access: `object.key` (dot notation) vagy `object["keyname"]` (bracket notation)
    
6. **Provide examples of ASSIGNMENT operators in JavaScript.**
    - Értékadásra használjuk:
        - `=`, `+=`, `-=`, `*=`, `/=`, `**=`
        - `i++`, `i--`

7. **Name some of the ARITHMETIC operators in JavaScript.**
    - Alapvető matematikai műveletekre:
        - `+`, `-`, `*`, `**`, `/`, `%`

8. **What are the different COMPARISON operators in JavaScript?**
    - bool értéket adnak vissza:
        - egyenlőség: `==`, `!=`, `===`, `!==`
        - matematikai összehasonlításra: `>`, `<`, `>=`, `<=`
        - Value vs ref típusok összehasonlítása: 
            - `[] === []` két különböző ref típus nem egyenlő, attól h az értékei megegyeznek
            - `obj1.key === obj2.key` az értékeik viszont lehetnek egyenlőek, ha azok value típusok

9. **Name a few LOGICAL operators used in JavaScript.**
    - Hierarchia szerint csökkenő sorrendben: `!` NOT, `&&` AND, `||` OR

10. **Explain the differences between a `for` loop, `for of` loop, and `for in` loop in JavaScript.**
    - `for` loop - több lehetőség (pl. elemek átugrása, nem csak az adott elemre referálunk)
    - `for...of` loop - iterálható elemek
    - `for...in` loop - nem iterálható elemek

11. **If you can't use any built-in functions or methods, how would you calculate the average of values in an array?**

        let sum = 0;
        for (let item of array){
            sum += item;
        }
        let avg = sum/array.length;

## Function Basics

12. **What is a function in JavaScript? Explain its purpose and how it is used in programming.**
    - Egy függvény egy újrahasználható kódrész, ami a végrehajtás után egy értékkel tér vissza
    - A lényege, hogy ne írjuk újra és újra le ugyanazt a kódot

13. **Describe the different syntax elements that make up a JavaScript function.**
    - deklaráció (`function`), függvénynév, paraméterek, függvény BODY, return statement
    - anonymous függvénynél const-ba vagy egy object key-jében tároljuk a függvényt - a függvénynek nem lesz neve (`const variable = function(){};`)
    - arrow function: anonymous function más syntaxxal, itt még tárolni sem kell (`( parameter(s) ) => { BODY };`)

15. **How do you pass arguments to a function? Explain the concept of parameter passing and provide an example.**
    - paraméterek a függvény hívásakor az argumentek
    - function scopeban fognak létezni
    - lehet default value-juk
    - rest paraméter `(...pars)`

16. **What is the difference between function expressions and function declarations? Provide examples of each.**
    - Function declaration: `function funcName(parameter(s)){}`
    - Function expression (=anonymous függvény, amit vagy egy variable-ben tárolunk, vagy egy object kulcsaként)

17. **Explain what a callback function is in JavaScript.**
    - olyan függvény, amit egy másik függvény paramétereként lehet megadni (pl sort, forEach, filter, map, reduce)

18. **What is the scope of variables in JavaScript functions? Explain the difference between local and global variables.**

    - **GLOBAL scope** amikor a root-ban hozunk létre egy változót
    - **BLOCK scope** amikor egy loopban vagy if statementben hozunk létre valamit (kivéve var!)
    - **FUNCTION scope** a függvényen belül létezik csak
    - **MODULE SCOPE:** ES6 óta a moduloknak is van saját scope-juk
    - **LEXICAL SCOPE / hozzáférések:**
        - A global scope változói mindenhol elérhezőek
        - Belülről kifelé elérünk változókat, de kívülről befelé nem

## Built-in Features

19. **What are some commonly used built-in functions or methods in JavaScript for working with strings? Provide examples and explain their usage.**

    - String specificus: `string.toUpperCase()`, `string.toLowerCase()`, `string.split(", ")`, `string.trim()`
    - Nem string specifikus: `string.length` (nem method, hanem property!), `string.slice(index1, index2)`, `string.includes("substr")`
    - Conversion: `arr.join("")`, `item.toString()`

20. **Name at least five built-in functions or methods in JavaScript for manipulating arrays. Describe how each function/method works and provide an example for each.**
    - `arr.push(item)`, `arr.pop()`, `arr.unshift(item)`, `arr.shift()`, `array.reverse()`, `array.sort()`
    - Higher order functions: `forEach`, `map`, `find`, `filter`, `reduce`

21. **How can you use built-in functions or methods in JavaScript to perform mathematical operations? Give examples of commonly used functions or methods for mathematical calculations.**
22. **What are some built-in functions or methods in JavaScript for manipulating numbers? Describe their functionality and give examples of how they can be used.**
    - `Math.min(...array)`, `Math.max(...array)`, `Math.round(Float)`, `Math.floor(Float)`, `Math.ceil(Float)`
    - `Math.Pi()`, `Math.random()`
    - `Math.pow(num, exp)`, `Math.sqrt(num)`
    - Arithmetic operators ( + - * ** / % )
    - `Number.parseFloat()`, `Number.parseInt()`, `Number.toFixed(digits)`, `Number.toString(radix)`

23. **Discuss the differences between `for` loops and the `forEach` method in JavaScript.**

    - For: kezdet, vég meghat; ugrások; nem szomszedos elemekre hivatkozas
    - forEach() method: jobb olvashatosag

## File Basics

24. **What distinguishes JavaScript data structures from JSON data structures?**
    - Json: JS Object notation 
        - ez egy szöveg alapú adat formátum, amit leginkább a szerver és a kliens közti adattovábbításra használunk
        - nem egy programnyelv, mint a JS, így nincsenek benne tényleges függvények
        - viszont szigorú syntaxa van (pl, utolsó elem után nem maradhat vessző egy arrayben, csak "-t fogad el, az object key-k is "-vel irodnak)
    - A JS pedig egy programnyelv:
        - végrehajtható kód van benne
        - több funkcionalitással, adattípussal (pl függvények, logikai szerkezetek)
        - adattárolás kulcs-érték párokban

    - **Parsing:**
        - Először be kell olvasni a fájlt, pl az `fs` node modul segítségével (ez lehet sync vagy async)
        - Ezután tudjuk parse-olni az adatokat (`JSON.parse(text, [reviver])`) -> reviverrel szabályokat tudunk megadni a beolvasáshoz, pl h kiszűrjünk vele adatokat

25. **Promises vs. Async / Await:**
    - Promise: egy object, ami az async műveletek (pl `.then()` es `.catch()`) teljesítését vagy nem teljesítését reprezentálja (státusza lehet pending, fulfilled vagy rejected)
    - Async/Await: ES6 ota letezik, a promisokra epul, de itt mas a syntax
        - `async` kulcsszóval tudjuk kiegészíteni a függvényt, hogy `await` műveleteket tudjunk beletenni (ez bevárja a promise-t, és csak azután hajtja végre a kódot) 
    
    - Blocking / non-blocking arra vonatkozik, h egy művelet tud-e párhuzamosan haladni egy másikkal, vagy meg kell várnia, míg az előző befejeződik

## View Basics

26. **Explain the difference between JavaScript object data structure and DOM data structure.**
    - DOM -> Document Object Model, fa struktúra, 1 parent / many children, node-ok az elemek
    - JS -> kvp alapu adattarolás, elemek több helyen is szerepelhetnek (több parentjük is lehet), ezt használjuk a DOM manipulására

27. **What are the necessary steps to change the content of an HTML element using JavaScript?**

    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Do something with that element:
        - `root.insertAdjacentHTML("beforeend", "<div>text</div>")` (add new element after)
        - `root.innerHTML("<p>text</p>")` (change it's content)
        - `item.setAttribute("class", "myClass")` (change its attributes)

## Event Basics

28. **Define an event listener in JavaScript.**
    - Event - egy action, ami a böngészőben történik általában user interactino hatására (click, load, select)
    - Event listener - egy olyan mechanizmus, ami figyeli, hogy egy bizonyos akció megtörténik-e az adott elemen
        - ha igen, akkor elindítja az event handler callback functiont
        - egy elemhez több event listenert is kapcsolhatunk
        - a parentre is rakhatjuk (event bubbling)
    - Event object - amire a listenert tesszuk (`e` vagy `event`) -> amin maga az akició megtörténik, az pedig a `e.target`
    - `addEventListener()`-el tudunk hozzácsatolni egy listenert az elemhez

29. **Outline the steps involved in changing the content of an HTML element when it is clicked.**
    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Attach an event listener:
        - `root.addEventListener("click", e => e.target...)` (you can do operations with it in the callback, refering to it with `e.tartget`)

30. **Inside a `click` event listener, how can you access the element that was clicked?**
    - `e.target`
    - `e.target.value / e.target.tagName`

## Design Basics

31. **What are the differences between `display: block`, `display: inline`, and `display: inline-block` in CSS? When would you use each display property, and how do they affect the layout and behavior of elements?**
    - Block type ( pl `div`, `p`, `h1-h6`):
        - display box egész sort elfoglalják, új sort indítanak, magaság a contenttől függ, margin is van, block elemeket is tartalmazhat
    - Inline type ( pl `span`, `a`, `img`)
        - display box nem foglalja el az egész sort, csak a szükséges helyet, magaság a line-height-tól függ, nincs margin, csak inline elemek lehetnek a childrenek
    - Felulirhatjuk a display type-ot
    - `display: inline-block`: egy gridhez ezt használjuk, mert így több elemet is lehet egy sorba tenni, de a méret is szabadon megadható

32. **Explain the distinctions between `position: relative` and `position: absolute` CSS properties.**
    - static - ez a default, a type alapszabalyai alapjan
    - relative - a static value-hoz kepest relativ tudunk valamit eltolni
    - absolute - a parent elementhez kepest offseteljuk
    - fixed - a viewport alapjan egy fix helyzet (scroll utan is egy helyben marad, pl chatbox)
    - `top`, `right`, `bottom`, `left` property-vel tudjuk meghatarozni: pl `position: relative;` `top: 50px;`
        
33. **What is the box model? Name the CSS properties associated with it.**
    - az egyes HTML elemek befoglaló doboza
    - 4 resz: content, padding, border, margin (utóbbi csak block type-nál)

34. **Identify the CSS properties that affect font and text appearance.**
    - **Typography toolset:**
        - `font-family`
        - `font-size` 
        - `line-height` 
        - `font-weight` (100 to 900)
        - `font-style` (italic, oblique (=bold?))
        - `text-decoration` (inder/overline, strikethrough)
        - `text-alignment` (L, R, C, Justified)
        - `color` (font color)
        - `background-color` (BG color)

35. **List the steps for adding or removing a class name from an HTML element.**
    
    1. Access element by an attribute: 
        - `const root = document.getElementById("rootId");` (or use `querySelector()` - `".class"`/`"#ID"` )
    2. Add/remove attributes:
        - `element.classList.add("active");`                   
        - `element.classList.remove("inactive");`
        - `element.classList.toggle("highlight");`             // Turn it on and off
        - `element.setAttribute("class", "myClass")`           // rename attribute

## JavaScript - Language Specialties

36. **Elaborate on the differences between value and reference data types in JavaScript, specifically in relation to objects and primitives.**
- **"Value"** primitive adattípusok (numbers, strings, booleans, undefined, null):
    - tényleges tartalmat tárolunk, immutable, variable-ben tároláskor vagy fv.-passingkor másolat keletkezik, összehasonlítás value alapján
- **"Reference"** referenci adattípusok (objects, arrays, functions, dates).
    - referenciát tárolunk csak bennük, ami egy pontra mutat a memóriában, ahol a tényleges adat van, mutable, fv-be passing vagy variable-ben tároláskor a referenciát adjuk át, így az eredeti elemre hivatkozunk, compare ref alapon

37. **Discuss the concept of mutability and immutability in objects, arrays, and primitives, and explain why it is important to understand when working with data structures in JavaScript.**
    - primitve típusok immutable-ök, vagyis létrehozás után nem módosíthatóak -> string módosításkor pl új string jön létre
    - referencia alapúak mutable-ök, így ilyenkor az eredetit módosítjuk

38. **Is `null` considered an object or a primitive in JavaScript?**
39. **"What does `undefined` represent in JavaScript?"**
    - mindkettő primitive (null szándékos, undefined nem assignolt elem)

40. **When would you use `var`, `let`, and `const` in JavaScript?**
    - var: hoistingnál más működés, global vagy function scope, nem block (problémás pl loopoknál vagy if statementeknél), újradeklarálhatóak
    - let: az elem módosítható a deklaráció után
    - const: nem módosítható (de a propertyjei igen)

41. **Explain the concept of hoisting in JavaScript.**
- a compilation fázisban, amikor a syntax parser is lefut, a var es function deklarációk a scope-on belül legfelülre kerülnek, hogy tudjunk rájuk hivatkozni deklaráció előtt is (az assignment nem kerül ide, ilyenkor undefined a value-juk)

## Git

42. **Discuss the advantages of using a version control system.**
    - A git egy distributed version control system (DVCS)
    - Előnyei: repok készítése, backup / brancheken való munka, merge, code review, experiment of unreleased code / version control, dokumentáció (commit messages) / open source és ecosystem

43. **Clarify the differences between Git and GitHub.**
    - **GIT** - DVCS és command line tool (offline is elérhető!)
    - **GitHub** - online platform egy webinterface-szel, egy szolgáltatás, ahol a repokhoz hozzáférünk, open-source, social network

44. **What is the purpose of remote repositories in Git?**
    - bárhonnan elérhető a kód csapatmunkához, online backup és verziókövetés, kísérletezés különböző verziókkal, hozzáférés szabályozása, open-source contribution

45. **When does a merge conflict occur in Git?**
    - amikor az auto merge nem sikerül, ilyenkor manuálisan kell mergelni a conflicted kódban (markerek jelzik)
    - párhuzamos munka ugyanazon a branchen, különböző branchek mergelésénél, rebasingnél és cherrypickingnél történhez

## Terminal

46. **How would you execute a JavaScript file in the terminal?**
    - `node filename.js` 

47. **What is the keyboard shortcut to stop a running process in the terminal?**
    - **Ctrl + C** on Windows, **Cmd + C** on Mac

48. **How can you retrieve the previous command executed in the terminal?**
    - Using arrows UP and DOWN

49. **How do you navigate to the parent directory of the current directory in the terminal?**
    - cd ..
