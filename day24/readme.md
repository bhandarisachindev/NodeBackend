# What is EJS?

EJS (Embedded JavaScript) is a templating engine for Node.js that allows you to generate dynamic HTML pages using JavaScript.

It lets you embed JavaScript code directly inside HTML.

Mainly used for server-side rendering (SSR) in Express apps.

Think of it like HTML + JavaScript logic together—so your server can send fully rendered pages to the browser.

## How it works

Server sends data to the EJS template.

EJS processes the template and injects the data into HTML.

Browser receives fully rendered HTML.

# app.js
**For render index.ejs**

```js
router.get('/',(req,res)=>{
  res.render("index");  //renders /view/index.ejs
})
```
res.render("index")

res.render() tells Express to render a template using the view engine (here, EJS).

"index" → the name of the template file without the .ejs extension.

Express looks in the views folder by default:

/views/index.ejs → this file gets rendered.

It sends the rendered HTML to the browser as the response.


# Link files

### **1. What the public folder is**

In Express, a public folder is used to store static assets that the browser can access directly.

Examples: CSS files, JavaScript files, images, fonts, videos.

You serve it using:

app.use(express.static('public'));

### **2. Why we need it**
***a) Browser can access files directly***

Files like CSS, JS, and images need to be loaded by the browser.

If they are inside your views folder or somewhere else, the browser cannot access them directly, because views is for server-side templates only.

Example:
```
public/css/style.css → accessible via <link rel="stylesheet" href="/css/style.css">
views/index.ejs → not directly accessible by browser
```
***b) Separation of concerns***

HTML/EJS templates → structure and content.

CSS/JS → styling and behavior.

Keeping them in public keeps the project organized and maintainable.

***c) Efficiency and caching***

Static assets in the public folder can be cached by the browser, making pages load faster.

Express can serve them efficiently without processing them like EJS templates.


### **3. How it works**
app.use(express.static('public'));


Lets the browser request files like:
```

/css/style.css

/js/script.js

/images/logo.png
``` 

Express automatically finds them in the public folder.