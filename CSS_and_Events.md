# Events of the View

- **Browser events:** actions and reactions that happen in the browser, usually due to user interaction / change of state of the web page.
- **Event listeners** are used to handle these events. They are functions that get triggered when these events occur.

## - Main categories:
- **UI (user interface events):**
    - Triggered by user interactions
    - Examples:
        - `resize`, `scroll`, `focus`, `blur`

- **Keyboard events:**
    - Triggered when using keyboard, allowing developers to react to key presses/releases and combinations
    - Examples:
        - `keydown`, `keyup`, `keypress`

- **Mouse events:**
    - Triggered when using mouse, allowing developers to react to pointing, clicking, hovering
    - Examples:
        - `click`, `dblclick`, `mousedown`, `mousemove`, `mouseup`, `mouseover`, `mouseout`, `contextmenu`
    
    - 2 ways to handle the `click` event:
        - `addEventListener` method:
            - Better code organization, maintainability, and flexibility (more modern approach!)
            - Possibility of attaching multiple event listeners to a single element, so the functions don't collide

                    document.getElementById('myButton').addEventListener('click', function() {
                        console.log('Button clicked using addEventListener!');
                    });

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

# Design of the View with CSS
## CSS:
- Cascading Style Sheets is a languag used to describe the presentation (visual aspects like colors, fonts) of the document written in HTML or XML
- It defines rules that are applied to certain elements:
    - **Selector:** specifies the elements it should apply to (select by *element type*, *class*, *id*, *attribute values*, *hierarchy*):
        - Exapmles:
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
- 