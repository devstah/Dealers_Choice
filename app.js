const express = require ("express");
const morgan = require ("morgan");
const app  = express();
const data = require("./data.js");
const infoArray = data.list(); //invoke function here
app.use(morgan("dev"));
app.use(express.static("public")); //dump all pics of your cities here


app.get("/", (req, res) => {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <h1> Top Cities to Travel to - Post Pandemic </h1>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
  </head>
  <body>
    <div id = navbar>
      <a id = "Home" href = "/">Home</a>
   </div>


  <div id = three_boxes>
    <div id = "Mexico_layout">
      <a id = "Mexico" href = "/cities/MexicoCity">Mexico City</a>
    </div>

    <div id = "Spain_layout">
      <a id = "Spain" href = "/cities/Madrid">Madrid</a>
    </div>

    <div id = "France_layout">
      <a id = "France" href = "/cities/Paris">Paris</a>
    </div>

  </div>

  <div id = three_images>
    <div class = "div1">
      <img src = "/mexico_city.jpg" width = "300" height = "250"/>
    </div>

    <div class = "div2">
      <img src = "/madrid.jpg" width = "300" height = "250"/>
    </div>


    <div class = "div3">
      <img src = "/paris.jpg" width = "300" height = "250"/>
    </div>
  </div>

  </body>
</html>`

 res.send(html);

})

app.get("/cities/:city", (req,res) => {
  const city = req.params.city; //now that you have this, pass this in
  console.log(city);
  const countryObj = data.sort(city);
  console.log(countryObj);

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <h1> ${countryObj.city} </h1>
    <link rel="stylesheet" type="text/css" href="/style.css"/>  </head>
  <body>
      <div id = navbar>
         <a id = "Home" href = "/">Home</a>
         <a id = "Mexico" href = "/cities/MexicoCity">Mexico City</a>
         <a id = "Spain" href = "/cities/Madrid">Madrid</a>
         <a id = "France" href = "/cities/Paris">Paris</a>
      </div>

      <p>
         Population: ${countryObj.population} M | Languages Spoken: ${countryObj.language}
      </p>
      <body>
        ${countryObj.content}
      </body>
  </body>
</html>
`;
res.send(html);
})

const PORT = 1337;
app.listen(PORT, () => {
  console.log("listening in PORT");
})
