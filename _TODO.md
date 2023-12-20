# NEXT WEEK SUMMARY:

- Finish WORKBOOK
✅ Watch React videos (Autrian guy)
- Watch React videos (youtube quick guides)
- Watch React Router video (youtube quick guides) https://www.youtube.com/playlist?list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG
- Complete last task from Express module (cat API or football API?) - Or create your own database to practice Mongo?
- Create bootstrap quick setup file with most useful commands
✅ Watch a mongoDB youtube video x in y mins
- Redo Pokemon API project to practice
- Fetch responses
- .env workflow (environmental variables)

- Add to notes:
    - useStyles (otherwise you will have 1 generated global CSS)
    - @mui Material UI (instead of Bootstrap?)
    - React Router - Outlet, Link, Routes/Route enbedded -> index === path{="/"} use this to have a default page, use Layout to do it like this
    - React phases https://docs.google.com/presentation/d/1-qi_PGlNdoUKZYAc1VtOXzJiKrU4AF7lf46AFc4nbEo/edit#slide=id.p
    - controlled vs uncontrolled: (fully working code in employee task before PA)
        - also check how it's done with select/option input types!
        
<!-- - 
=== Controlled ===

const [state1, setState1] = useState()
const [state2, setState2] = useState()

<input value={state1} onChange={(e) => setState1(e.target.value)}>{something}</input>
<input value={state2} onChange={setState2}/>
...

onSubmit() {
  const newObject = {
    key1: state1,
    key2: state2,
  }

  fetch(url, {
    method: 'POST',
    headers: ...,
    body: JSON.stringify(newObject)
  })
}

<select value={selectedOption} onChange={(e)=>{//e.target.value === x}}>
  <option value={x}
</select>

=== Uncontrolled ===

onSubmit = (e) => {
  e.preventDefault();
  e.target.value = // {
    key1: 
  }
}

<form onSubmit={} action='url'>
  <input defaultValue={} name='key1'></input>
  <input name='key1'></input>
  <button></b

-->

# Regular tasks to make progress on:

- SI week progress / Team week tasks
- Updating Workbook regularly
- Practicing Codewars
- Do separate courses of each project (eg. look up topics on javascript.info, watch video tutorials)

# To check & add:

- Create a summary code for all methods (GET etc)

- New material related:
    - https://github.com/raberik98/CC_Express_Endpoints
    - https://github.com/raberik98/CC_Express_Guide
    - Send data to server in jounrey: ask for help

    - https://developer.mozilla.org/en-US/docs/Web/API/Request
    - https://developer.mozilla.org/en-US/docs/Web/API/Response
    - https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream

- Material visualizations (reread before PA):
    - **Q&A doc:** https://docs.google.com/document/d/17Sng1zIGAot7iOTkIaeLxLzHBa8JYwvg7P2jkb3xYMk/edit

    - Promises https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
    - Events https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
    - Async Await https://blog.bitsrc.io/understanding-javascript-async-and-await-with-examples-a010b03926ea
    - Event bubbling https://www.freecodecamp.org/news/event-bubbling-in-javascript/
        (code in hou-web channel!)

- CSS:
    - CSS algorithms https://www.joshwcomeau.com/css/understanding-layout-algorithms/
    - install Bootstrap & watch basic tutorial

- FAQ doc:
    - https://docs.google.com/document/d/17Sng1zIGAot7iOTkIaeLxLzHBa8JYwvg7P2jkb3xYMk/edit
