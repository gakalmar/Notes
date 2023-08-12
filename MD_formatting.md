# This is the main heading, which is underlined

## Slightly less important heading, but still underlined

### Ok, this is still important, but not underlined anymore

#### The headings are getting smaller...

##### ...and smaller. Can you still read this?

###### This is the smallest heading. Wait, why is it smaller than baisc paragraph text?

***

You can separate blocks with lines like this. Just use `***` or `---` or `___`. Always try to leave empty lines before and after a RULE.

***

New lines are created like this:</br>
This is a new line

Leave an empty line to start a new paragraph

***

Now let's do **bold text**. Awesome, how about *italic*? Even better! ***Now let's do both!*** Is this MAGIC or what?

***

> Now let's highlight this paragraph.</br>
> This is called a **Blockquote**.
>> You can even add a nested paragraph inside it.</br>
>> Just don't forget the line breaks. `</br>`
>
> It can even include a list:
> - You can add things to your list
> - Like seriously important things
> - It's called an unordered list.
> - 1986\. If you want to start with a number and a dot, use the \  backslash escape character

***

1. If you want to create an ordered list,
2. Just do it like this...
3. Numbers followed by a dot.
4. That's simple!
5. You can also create a nested list:
    - Wow!
    - This too?
6. Then just carry on with the original list...

***

* To add text under a list item like this:</br>
    Just indent the text, after a line break.
* And then you can add more items to your list.

***

### Now let's see how to add some code:

To add single line code or just code keywords use the backticks: `function()`. It will display like code.

    console.log("If you indent something (4 whitespaces), you can add code");
    for (const item of list){
        console.log("This will be indented");
    };

    //within the code window, MD formatiing doesn't work. **See?**

***

### Let's see now how to add some images:

Add an image from your local library (without the backtick):

`![Name of the image](/assets/rocket.png)`

Add an image with a link directly:

`![cat](https://w7.pngwing.com/pngs/409/967/png-transparent-cat-kitten-veterinarian-cat.png)`

But to be able to resize them, you need to use HTML syntax:

<img src="assets/rocket.png"  width="100" height="100"></br>
<img src="https://w7.pngwing.com/pngs/409/967/png-transparent-cat-kitten-veterinarian-cat.png"  width="200">

***

### Let's now insert links:

Let's go to the [MD formatting page](https://www.markdownguide.org/basic-syntax/), where I'm stealing all this info from.










