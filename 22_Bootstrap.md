# **Bootstrap**

- Add these lines to the index.html file to import bootstrap:

        <!doctype html>
        <html lang="en">

        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>App title</title>
            <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.css">
        </head>

        <body>
            <div id="root"></div>
            <script type="module" src="./node_modules/bootstrap/dist/js/bootstrap.bundle.js"></script>
            <script type="module" src="/src/main.jsx"></script>
        </body>

        </html>

- Most basic way to use it is the GRID system:

        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-3'>Column 1</div>
                <div className='col-2'>Column 2</div>
                <div className='col-4'>Column 3</div>
                <div className='col'>Column 4</div>   // If there is no col value, it will automatically fill up what's left
            </div>
        </div>

# EXTRAS:
- Video resources:
    - https://www.youtube.com/watch?v=-qfEOE4vtxE&t=2206s&ab_channel=freeCodeCamp.org (WIP)
    - https://www.youtube.com/watch?v=Jyvffr3aCp0&ab_channel=WebDevSimplified (to be watched)