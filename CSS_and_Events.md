# Events of the View

- **Browser events:** ACTIONS - They happen in the browser, usually due to user interaction / change of state of the web page.
- **Event listeners:**  The mechanism that is used to check if these events occur, and trigger the event handler (they work together and are essetinally the same thing). We **register** these, when they are attached to an event 
- **Event handler:** REACTIONS - These are the actual actions (functions), the listeners only checks for the action that it's waiting for it to be triggered
- **Event object:** 
    - When you add an event listener: `button.addEventListener("click", callback);`
    - Then create a callback function with a parameter: `function callback(e){}`
    - `e` is the event object we are manipulating, we can refer to it's attributes within the callback:
        - `e.target.style.backgroundColor = "black"` (see **event target** below)
        - `console.log(e.composedPath())` could be used to print all parents of the element (composedPath() is a built-in method on `e` event)
        - `console.log(e.target.textContent)` to log text content through `e` event's object
        - `console.log(e.target.value)` to log the value of the input box
        - `console.log(e.target.tagName)` to log just the tag name
    - And this is how we refer to the document's attributes in general:
        - `document.body.style.backgroundColor = "black"`
    - When some events like `keydown` get triggered, a specialized event object gets manipulated 
        - In this case `KeyboardEvent` object, which has a `key` property that tells you which key was pressed:
                
                item.addEventListener("keydown", (event) => {
                    console.log(`You pressed "${event.key}".`);
                });
- **Event target:**
    - a reference to the object, on which the event happens
    - read-only target property
    - `Event.currentTarget` -> this is different, this is when **bubbling** or **capturing** is happening

## - Main categories:
- **UI (user interface events):**
    - Triggered by user interactions
    - Examples:
        - `resize`
        - `scroll`
        - `focus` - when the item is focused on
        - `blur` - when the item is unfocused

- **Keyboard events:**
    - Triggered when using keyboard, allowing developers to react to key presses/releases and combinations
    - Examples:
        - `keydown`, `keyup`, `keypress`

- **Mouse events:**
    - Triggered when using mouse, allowing developers to react to pointing, clicking, hovering
    - Examples:
        - `click`, `dblclick`
        - `mousedown`, `mousemove`, `mouseup`, 
        - `mouseover` when hovered over (at entry)
        - `mouseout` when hovered over (at exit)
        - `contextmenu`
    
    - 2 ways to handle the `click` event:
        - `addEventListener` method:
            - Better code organization, maintainability, and flexibility (more modern approach!)
            - Possibility of attaching multiple event listeners to a single element, so the functions don't collide

                    document.getElementById('myButton').addEventListener('click', function() {
                        console.log('Button clicked using addEventListener!');
                    });

            - Attach different functions to the same event, on the same object:

                    myElement.addEventListener("click", functionA);
                    myElement.addEventListener("click", functionB);

            - Possibility to add it to multiple elements:
                - Add it to each element:
                        
                        const buttons = document.querySelectorAll('.action-button');        //Select all items, that have the class "action-button"

                        buttons.forEach((button) => {                                       //Add the listener to each with a loop
                        button.addEventListener('click', function(event) {
                            console.log('Action button clicked!');
                        });
                        });
                - Add it to the parent element (eg. document object) by using **event delegation** to filter those elements that should get it based on properties (eg., class, tag name, or attributes):</br>
                *(events in JS bubble up through the DOM tree, which means the action travels (bubbles) up to the parent element, if the child element event happens)*
                
                        document.addEventListener('click', function(event) {                //Add event listener to parent element
                        const target = event.target;

                        if (target.classList.contains('action-button')) {                   //Check if the child has a class that should trigger the action
                            console.log('Action button clicked!');
                        }
                        });

                >- **Event bubbling** describes how the browser handles events targeted at nested elements
                >   - avoid it with `event.propagation()` 
                >   - or `caputre` (see more in Useful functions file and this link: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)

        - `onclick` attribute:
            - Older approach
            - Assign a function to an element's `onclick` attribute
            - Limitation of only being able to add 1 function as the attribute (dangerous, because it can be overwritten!) 

                    document.getElementById('myButton').onclick = function() {
                        console.log('Button clicked using onclick attribute!');
                    };

- **Form events:**
    - Related to user input from elements, like input-fields, checkboxes, radio buttons, drop-down menus
    - Examples:
        - `submit`, `reset`, `change`, `input`

- **Touch events:**
    - Related to touch-enable devices (smartphones, tablets)
    - Examples:
        - `touchstart`, `touchmove`, `touchend`, `touchcancel`
        
- **Mutation events:**
    - Triggered when changes are made in the DOM tree (adding/removing elements/changing attributes).
    - *Mutation events are considered ***deprecated*** and it's recommended to use ***MutationObserver API*** instead.*
    - Examples:
        - `DOMNodeInserted`, `DOMNodeRemoved`, `DOMAttrModified`

- **Special events:**
    - some event are only available based on their type, eg:
        - `play` is only available for `<video>` elements

# Design of the View with CSS
## CSS:
- Cascading Style Sheets is a languag used to describe the presentation (visual aspects like colors, fonts) of the document written in HTML or XML
- It defines rules that are applied to certain elements:
    - **Selector:** specifies the elements it should apply to (select by *element type*, *class*, *id*, *attribute values*, *hierarchy*):
        - Examples:
            - **Element selector:** Selects all elements of a specific type.
                - Example: `p` selects all *paragraphs*.
            - **Class selector:** Selects all elements with a specific class.
                - Example: `.my-class` selects all elements with the class *my-class*.
            - **ID selector:** Selects a single element with a specific ID.
                - Example: `#my-id` selects the element with the ID *my-id*.
            - **Attribute selector:** Selects elements with a specific attribute value.
                - Example: `[type="checkbox"]` selects all *checkbox* elements.
            - **Descendant selector:** Selects elements that are descendants of a specific parent element.
                - Example: `ul li` selects all list item elements that are *descendants of a unordered list element*.
            - **Child selector:** Selects direct children of a specific parent element.
                - Example: `ul > li` selects all list item elements that are *direct children of a unordered list element*.
            - **Pseudo-class selector:** Selects elements based on their state or position in the document. 
                - Example: `a:hover` selects all links that *are being hovered over* by the mouse.
            - **Pseudo-element selector:** Selects and styles specific parts of an element. 
                - Example: `p::first-line` selects and styles *the first line of all paragraphs*.
    
    - **Declaration block:** 
        - contains all the **declarations** that should be applied to the 'selected' elements to define style, in a property-value format similar to objects
        - **values** are the specifications of a declaration, (eg. `red` or `15px`, etc.):

                p {                                 //selector (p for paragraph)
                    background-color: yellow;       //all declarations go here
                    font-size: 16px;
                }

- Apply it by either:
    - Creating a separate CSS file, and link it using the `<link>` tag (better practice):

            <!DOCTYPE html>
                <html>
                <head>
                    <title>My Web Page</title>
                    <link rel="stylesheet" href="/public/style.css" />      //HERE
                </head>
                <body>
                    <p>Hello, world!</p>
                </body>
                </html>

    - Directly in HTML using the `<style>` tag:
            
            <!DOCTYPE html>
                <html>
                <head>
                    <title>My Web Page</title>
                    <style>                                                 //HERE
                        p {
                            color: red;
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <p>Hello, world!</p>
                </body>
                </html>

## CSS Units:
- Unit types:
    - **Absolute units:** Fixed units that are not affected by the size of the viewprt or the font size:
        - pixels (px) //margin: 20px;
        - points (pt) //font-size: 18pt;
        - inches (in)
        - millimeters (mm)
        - centimeters (cm)

    - **Relative units:** Based on the size of other elements & context:
        - **Viewport units:** Based on the size of the viewport:
            - vh (viewport height) //height: 80vh;
            - vw (viewprt width) //width: 90vw;
        - **Font-relative units:** Based on the size of font size of an element:
            - em //line-height: 1.5em;
            - rem //margin-left: 1.5rem;
        - Based on **general proportion:**
            - % //background-width: 110%

## Box model:
- The CSS box model is a concept that describes how HTML elements are represented as rectangular boxes on a web page.
- Used to make designs work well on different devices and screen sizes.</br>
    <img src="assets/csspadding.png" width="400" height="250">
    - 4 components:
        - **Content:**
            - the area where text, images and other media are displayed
            - defined by the height and width of an element
        - **Padding:**
            - Space between content and border (`padding` property)
        - **Border:**
            - A line that surrounds the content and padding area (`border` property)
        - **Margin:**
            - The space between the border and surrounding elements (`margin` property)
    - Example of the CSS box model:

            .box {
                width: 300px;
                height: 200px;
                padding: 20px;
                border: 1px solid black;
                margin: 10px;
            }
    - The **actual size of an element** is determined by the sum of its content (padding, border, and margin). 
        - For example, an element with a width of 300px and a padding of 20px on each side will actually have a total width of 340px (300px + 20px + 20px).

- Display property values in HTML based on element types:
    - **Block type:**
        - **Widht:** Block-level elements take up the full width of their parent container
        - **Height** determined by the content or specified by developer
        - **Flow:** new line is created after the element
        - **Box model:** elements have padding, border, margin
        - **Child elements:** can contain other block & inline elements
        - **Display:** Displayed as block-level boxes
        - *Some examples:*
            - `div`, `p`, `h1-h6`, `ul`, `ol`, and `form`
    - **Inline type:**
        - **Width:** They just take up the necessary width to display 
        - **Height** determined by line-height and font-size
        - **Flow:** no new line after the element
        - **Box model:** elements have padding, border (no margin!)
        - **Child elements:** can only contain inline elements
        - **Display:** Displayed as inline boxes
        - *Some examples:*
            - `span`, `a`, `img`, `em`, and `strong`

- We can overwrite these values with CSS! (`div` -> *make it inline* or `span` -> *make it block*)

## Position
- Position value types:
    - **Static:**
        - Default value. Elements are positioned based on the normal flow of the document.
    - **Relative:**
        - Positioned relative to their normal position in the document.
        - Adjust with `top`, `right`, `bottom`, `left` properties
    - **Absolute:**
        - Positioned relative to their nearest positioned ancestor (if there is none, then relative to the document body)
        - Adjust with `top`, `right`, `bottom`, `left` properties
    - **Fixed:**
        - Positioned relative to the viewport
        - They remain in the same position even after scrolling
        - Adjust with `top`, `right`, `bottom`, `left` properties
- Example:

        .box {
            position: relative;         //position relative to it's normal position
            top: 50px;                  
            left: 100px;
        }

## Typography

- Art and technique of arranging type to make written language legible, readable and appealing
- Basic concepts:
    - **Typeface:**
        - a set of characters that share the same design (eg. Arial, Helvetica)
        - It can include various fonts (blod, italic, egular...)
    - **Font:**
        - A specific size weight and style of a typeface (eg. Arial Bold 12pt is considered a font)
    - **Kerning:**
        - The adjustment of spaces between letters (eg. "VA" letters)
    - **Leading:**
        - The sapce between lines of text.
    - **Tracking:**
        - Adjustment of space between groups of letters, word ot lines of text    
    - **Hierarchy:**
        - Arrangement of text blocks based on importance
        - Allows users to quickly gain crucial information first, then get into the details of a specific topic
    - **Alignment:**
        - The posiioning of text on a page (*left/right-aligned, centered or justified*)
    - **White space:**
        - Empty space around and within elements of a design
        - Used to create visual balance and create the design more readible, appealing.

- **Typography toolset:**
    - `font-family`
        - Set the **font family** for an element.
        - Specify a list of fonts to use, in order of preference (if the first font is not available, the browser will try the next font in the list).

    - `font-size` 
        - Set the **size of the font**.
        - Can be set in pixels, ems, rems, or other units.

    - `line-height` 
        - Set the **height of a line of text**. 
        - Can be set as a number, a percentage, or a length value.

    - `font-weight`
        - Set the **thickness** or **boldness** of the font.
        - Can be set as a number from 100 to 900, or as the keywords normal or bold.

    - `font-style`
        - Set the style of the font, such as **italic** or **oblique**.

    - `text-decoration`
        - Add visual emphasis to text, such as **underlining**, **overlining**, or **striking through**.

    - `text-alignment`
        - Set the horizontal alignment of text within its container, such as **left**, **right**, **center**, or **justified**.
     
## Animation

- Used to create dynamic & visually engaging effects on a web page.

- **Transition:**
    - `transition` property
    - create a transition between 2 states of an element
    - specify which CSS properties should be transitioned, duration of transition and timing (transition speed)
    - example:

            button {
                background-color: blue;
                transition: background-color 0.5s ease-out;         //create a transition effect when the background color of a button changes
            }

            button:hover {
                background-color: red;
            }

- **Animation:**
    - `animation` property
    - complex and customizable animations
    - specify a set of keyframes that define the animation
    - example:

            img {                                       //create a bouncing animation for an image
                animation: bounce 2s infinite;
            }

            @keyframes bounce {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
                100% {
                    transform: translateY(0);
                }
            }

- **Transform:**
    - `transform` property
    - used to change the shape, size or position of an element
    - rotate, skew, translate elements without changing the position in the document flow
    - example:

            img {                               //rotate an image 45 degrees
                transform: rotate(45deg);
            }

## CSS with JavaScript
- JS can be used to manipulate CSS on a web page by **selecting elements** and **changing their CSS properties**.
- This can be done with various methods, like:
    - `querySelector`
    - `getElementsById`
    - `style`
    - `className`
    - `classList`
- Example (change the color of a button when it is clicked):

        <button id="myButton">Click me</button>
        
        button {                                                    //button element default properties
            background-color: blue;                                 //starting with blue background & white text
            color: white;
        }

        button.clicked {                                            //create a class within the button element
            background-color: red;
        }

        const myButton = document.getElementById('myButton');

        myButton.addEventListener('click', function() {             //on click the .clicked class is added to the button element
            myButton.classList.add('clicked');
        });

- Direct CSS property manipulation:
    - It's generally better to modify **classes** and keep the styles in the CSS file, to separate functionality from appearance
    - By using classes, multiple styles can be applied to elements, so this method is not the best practice!
    - example (but not to be used!):

            <div id="myDiv">This is my div element.</div>
            
            #myDiv {
                font-size: 16px;
            }

            const myDiv = document.getElementById('myDiv');
            myDiv.style.fontSize = '24px';                          //the fontSize property of the myDiv element is directly changed with JavaScript using the style property