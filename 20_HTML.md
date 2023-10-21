# HTML
- **Backend** *(=Business logic)*:
    - JavaScript, Python, Ruby
    - Describes how the data is **HANDLED**
    - Operations done for calculation / data handling and manipulation
- **Frontend** *(=View or presentation logic)*:
    - HTML, CSS, JavaScript (for rendering the UI and managing interactions)
    - describes how the data is **DISPLAYED**
    - UI and data display:
        - **UI**: A tool through which the user communicates with the computer (eg. Terminal is a UI tool).
        - **GUI**: *Graphical user interface*, like for example a website or a phone app.
    

- **HTML = HyperText Markup Language**
    - **Markup language** - uses tags and elements to describe the structure and presentation of a document (XML and Markdown are also similar lanugages)
    - **Hypertext** - includes links to other resources (eg other pages, images, etc)
    - Currently we have version *HTML5*

### TAGS
- The building blocks of HTML documents
- Define the structure:
    - Headings
    - Paragraphs
    - Lists (OL & UL)
    - Links
    - Images
    - etc.
- Tags are usually paired (they enclose the content), with an opening and closing tag:

        <OPEN> textcontent </CLOSING>

- Some other tags don't need a closing tag, they are self-closing tags:

        <TAG />

- **Tag types:**
    1. **Semantic tags:** provide meaning and context to the content to improve user experience:

            <p>         Represents a paragraph of a text.
            <header>    Represents the header of a section or a page.
            <nav>       Represents a navigation menu or links for navigating the website.
            <article>   Represents a self-contained piece of content that can be independently distributed, like a news article or blog post.
            <section>   Represents a distinct section of a document, typically with a heading and related content.
            <footer>    Represents the footer of a section or a page, usually containing copyright information or contact details.
    
    2. **Non-semantic HTML tags:** more general purposes, like grouping and formatting elements:

            <section> Represents a high-level container for grouping elements.
            <div>: Represents a generic container for grouping other elements. It does not have any inherent semantic meaning and is often used in conjunction with CSS for styling and layout purposes.
            <span>: Represents an inline container for grouping or applying styles to a portion of text within a larger block of content, such as a paragraph.

### ATTRIBUTES
- Additional pieces of information associated with HTML tags to add detail, modify defaults or control appearance
- They are defined in the opening tag (typically `name="value"` pair (NO SPACES!!!); the value is always enclosed in DOUBLE quotes: "value"):

        id:     Assigns a unique identifier to an element, which can be used to reference the element in JavaScript or apply CSS styles.
        class:  Assigns one or more class names to an element, which can be used to group elements and apply CSS styles or JavaScript functionality.
        src:    Specifies the URL of an external resource, such as an image, video, or script file. This attribute is commonly used with <img>, <video>, and <script> tags.
        href:   Specifies the URL of a linked resource. This attribute is commonly used with the <a> tag to create hyperlinks.
        alt:    Specifies an alternate text description for an image, which can be displayed if the image cannot be loaded and is used by screen readers for accessibility purposes.
        title:  Specifies extra information about an element, usually displayed as a tooltip when the user hovers over the element.

        Simple example of an HTML element:
        <h1 id="title" class="heading">Hello</h1>

            h1: tag name
            id & class: attributes
            Hello: the data (node) to be displayed/handled

        Example tag with multiple attributes: (add space only to separate them)
        <a href="https://www.example.com" title="Visit our website" class="external-link">Visit Example.com</a>

            href: Specifies the URL of the linked page.
            title: Provides extra information about the link, which will be displayed as a tooltip.
            class: Assigns a class name that can be used to apply CSS styles or JavaScript functionality.

### TREE STRUCTURE
- a way of representing hierarchical relationships between elements (**root** element, **child** elements, **edges** connect children at same level)
- each element is called a **node**, while the last elements are called **leaves** or **leaf-nodes**
- **DOM** *(=Document Object Model)* = HTML tree:
    - Root element: usually `<HTML>` tag
    - Direct children of `<HTML>` are `<HEAD>` and `<BODY>`
    - Other elements like `<H1>` or `<P>` can be nested inside the body.

### DOM - DOCUMENT OBJECT MODEL
- A **programming interface** for HTML and XML documents, representing the structure as a tree of objects (nodes). Allows you to **interact with** and **manipulate** the tree.
- Manipulation of the DOM using JavaSript means access, modify, delete, or add elements and attributes

- **Manipulation methods:**
    - Adding elements with `insertAdjacentHTML()` and `getElementById()`:

            HTML:

            <!DOCTYPE html>
            <html>
                <head>
                    <script type="module" src="script.js"></script>
                </head>
                <body>
                    <div id="container">
                    <p>I am a paragraph!</p>
                    </div>
                </body>
            </html>

            JavaScript (script.js) - WITHOUT CREATING A FUNCTION:

            document.getElementById("container").insertAdjacentHTML("beforeend", `<p>I am a new paragraph</p>`);

            JavaScript (script.js) - BY CREATING A FUNCTION:

            function addElement() {
                const container = document.getElementById("container");     //"container" refers to the id we want to place it into
                const newParagraph = `<p>I am a new paragraph!</p>`;        //newParagraph can be renamed
                container.insertAdjacentHTML("beforeend", newParagraph);    
            }

                insertAdjacentHTML(position, item) - position options:
                    "beforebegin"   Before the element. Only valid if the element is in the DOM tree and has a parent element.
                    "afterbegin"    Just inside the element, before its first child.
                    "beforeend"     Just inside the element, after its last child.
                    "afterend"      After the element. Only valid if the element is in the DOM tree and has a parent element.

            addElement();

            Code breakdown:
            We create a function addElement() that adds a new element after the existing paragraph.
            Inside the function, we get a reference to the container element using getElementById().
            We create a string variable newParagraph containing the new paragraph's HTML.
            We use the insertAdjacentHTML() method on the container element to insert the new paragraph's HTML to the end of the container element.
            We call the addElement() function.

    - Removing HTML elements:

            HTML:

            <!DOCTYPE html>
            <html>
                <head>
                    <script type="module" src="script.js"></script>
                </head>
                <body>
                    <div id="container">
                    <p id="paragraph">I am a new paragraph!</p>
                    </div>
                </body>
            </html>
            JavaScript (script.js):

            function removeElement() {
                const paragraph = document.getElementById('paragraph');
                paragraph.remove();
            }

            removeElement();

            Code breakdown
            We create a function removeElement() that removes the existing paragraph.
            Inside the function, we get a reference to the paragraph element using getElementById().
            We use the remove() method on the paragraph element to remove it from the DOM.
            We call the removeElement() function.

            Remove just the text content:

            const element = document.getElementById("id");
            element.textContent = "";            

    - Access elements:
        - `getElementById`: retrieve a single elementfrom the DOM with a specific `<id>` attribute:

                let element = document.getElementById("myId");

        - `querySelector`: select single element in the DOM based on a CSS selector:
        
                let element = document.querySelector("#myId .myClass");

        - `querySelectorAll`: same as querySelector, but returns a NodeList (list of elements) that match:

                let elements = document.querySelectorAll(".myClass");
    
    - Load elements:
        - In some instances `get` methods can run into issues (due to the method being called before the page is fully loaded). For this, we use the `load` event.
        - `load` event is triggered after a resource (image, script or webpage) has been loaded
        - *event listener* - a function that "listens", and gets executed when it "hears" the trigger (click, mouse movement, load event)
            - `addEventListener()` method is commonly used to attach an eventlistener to an HTML element:

                    HTML:

                    <!DOCTYPE html>
                    <html>
                        <head>
                            <script type="module" src="script.js"></script>
                        </head>
                        <body>

                        </body>
                    </html>

                    JavaScript (script.js):

                    window.addEventListener('load', function () {
                        console.log('All resources have finished loading!');
                    });

                    Code breakdown:
                    We use the addEventListener() method on the window object to listen for the load event.
                    When the load event is triggered, the anonymous function inside addEventListener() gets executed.
                    In this example, we log a message to the console when all resources have finished loading.

# HTML TAGS & ATTRIBUTES:

- Complete list:
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes

0. Entity references:

        5 special characters in HTML. Use codes next to the to display them, if needed:

        <       &lt;
        >       &gt;
        "       &quot;
        '       &apos;
        &       &amp;

1. Commenting:

        <!-- COMMENT -->
        multiple whitespaces are reduced to just one!

2. Basic HTML structure:

        <!doctype html>     //needs to be included for everything else to work right
        <html>
            <head> 
                //non visible content of the webpage//

                <meta charset="utf-8" /> //metadata that can't be represented by HTML (<base>, <link>, <script>, <style>, <title>, <charset>)

                <title>My Title</title>  //the title that goes on the browser tab
            </head>
            <body> 
                //visible content of the webpage//
            </body>
        </html>

3. Header and h1-h6 elements:

        <header> 
            //creates an introductory container on the page// 
            <h1>Title1</h1>
            <h2>Title2</h2>
            ...
            <h6>Text</h6>
        </header>
        
        <main></main>

        <footer></footer>

4. Basic text and data:

        <p> //paragraph text// </p>

        </br> break line (closing tag only!)

        <img> adds image (this is a VOID element, with an OPENING tag only!)
            <img src="link"> //you can add attributes  
            <img src="link" alt="text to show when hovering">

        <a> adds an anchor (eg a hyperlink)
            <a href="http://www.index.com"> //text// </a>  //you can add attributes like href, title, target
            <a ... title="Title of hyperlink">
            <a ... target="_blank"> (this will display the link in a new tab)

        "text &quot; textinquotest &quot; moretext" //Use this for quotes within quotes


5. Basic HTML formatting: (to be done in CSS!)

        <em> *italic* </em>
        <strong> **bold** </strong>

6. Grouping data into division containers:
    - It's purpose is to be able to apply CSS information to a group of data displayed together
    - We use it mostly to structure the website into divisions:

            <div> //text/node// </div>
            <section> //text/node// </section>

7. Boolean ATTRIBUTES:
    - if there is an attribute without a written value:

            <input type="text" disabled />  //This is the same as writing disabled="disabled"  /avoids the user of inputting text into an input box (greys it out)

8. Elements:

- The HTML <form> element can contain one or more of the following form elements:

        <input id="textBox" type="text" />      //create an input box
        
        <label>
        <select>
        <textarea>
        <button>
        <fieldset>
        <legend>
        <datalist>
        <output>
        <option>
        <optgroup>

        <select>
            <option> //opt1// </option>
            <option> //opt2// </option>
            <option> //opt3// </option>
        </select>

        <button> //name of button// </button>

1.Document Structure
•  <!DOCTYPE>
•  <html>
•  <head>
•  <title>
•  <meta>
•  <link>
•  <script>
• <noscript>

2.Text Content
•  <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
•  <p>
•  <span>
•  <strong>
•  <em>
•  <br>
•  <hr>

3.Lists
•  <ul>
•  <ol>
•  <li>
•  <dl>
•  <dt>
•  <dd>

4.Links and Navigation
•  <a>
•  <nav>
•  <link>

5.Embedded Content
•  <img>
•  <audio>
•  <video>
•  <iframe>
•  <canvas>
•  <svg>

6.Forms
•  <form>
•  <input>
•  <textarea>
•  <button>
•  <select>
•  <option>
•  <label>
•  <fieldset>
•  <legend>
•  <datalist>
•  <output>

7.Tables
•  <table>
•  <tr>
•  <th>
•  <td>
•  <caption>

8.Semantic Elements
•  <article>
•  <section>
•  <header>
•  <footer>
•  <aside>
•  <main>
•  <figure>
•  <figcaption>
•  <mark>
•  <progress>
•  <time>
•  <details>
•  <summary>
