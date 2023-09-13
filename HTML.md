# HTML
- **Backend**:
    - JavaScript, Python, Ruby
    - Operations done for calculation / data handling and manipulation
- **Frontend**:
    - HTML, CSS, JavaScript (for rendering the UI and managing interactions)
    - UI and data display

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
    1. **Semantic tags:** provide meaning and context to the content to improve user experince:

            <p>         Represents a paragraph of a text.
            <header>:   Represents the header of a section or a page.
            <nav>:      Represents a navigation menu or links for navigating the website.
            <article>:  Represents a self-contained piece of content that can be independently distributed, like a news article or blog post.
            <section>:  Represents a distinct section of a document, typically with a heading and related content.
            <footer>:   Represents the footer of a section or a page, usually containing copyright information or contact details.
    
    2. **Non-semantic HTML tags:** more general purposes, like grouping and formatting elements:

            <div>: Represents a generic container for grouping other elements. It does not have any inherent semantic meaning and is often used in conjunction with CSS for styling and layout purposes.
            <span>: Represents an inline container for grouping or applying styles to a portion of text within a larger block of content, such as a paragraph.

### ATTRIBUTES
- Additional pieces of information associated with HTML tags to add detail, modify defaults or control appearance
- They are defined in the opening tag (typically `name = "value"` pair):

        id:     Assigns a unique identifier to an element, which can be used to reference the element in JavaScript or apply CSS styles.
        class:  Assigns one or more class names to an element, which can be used to group elements and apply CSS styles or JavaScript functionality.
        src:    Specifies the URL of an external resource, such as an image, video, or script file. This attribute is commonly used with <img>, <video>, and <script> tags.
        href:   Specifies the URL of a linked resource. This attribute is commonly used with the <a> tag to create hyperlinks.
        alt:    Specifies an alternate text description for an image, which can be displayed if the image cannot be loaded and is used by screen readers for accessibility purposes.
        title:  Specifies extra information about an element, usually displayed as a tooltip when the user hovers over the element.

        Example tag with multiple attributes:
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

            JavaScript (script.js):

            function addElement() {
                const container = document.getElementById('container');
                const newParagraph = `<p>I am a new paragraph!</p>`;
                container.insertAdjacentHTML('beforeend', newParagraph);
            }

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

