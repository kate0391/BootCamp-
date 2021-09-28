// installing npm init -y (para lumabas si package)
//nodemon src/app.js -e js,hbs para masave yung hbs
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//const { registerPartials } = require("hbs");
// console.log(__dirname); //src
// console.log(path.join(__dirname, "../public"));
// console.log(__filename);//src/app
const app = express();

//Define path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //from views to templates
const partialsPath = path.join(__dirname, "../templates/partials");
//Set up handlebars-hbs engine and vies location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//set up static
app.use(express.static(publicDirectoryPath));
//route
app.get("", (req, res) => {
  res.render("index", {
    // para magkavalue yung hbs automatic depende sa info
    title: "Weather App",
    name: "Cathy",
  }); //para sa hbs
});

app.get("/about", (req, res) => {
  // no need na yunghtml
  res.render("about", {
    title: "About",
    name: "Cathy",
  });
});

/*template for help page
Set up help template using hbs
route and render the server visit the browser*/
app.get("/help", (req, res) => {
  // no need na yunghtml
  res.render("help", {
    helpText: "This is some helpful tips",
    title: "help",
    name: "Cathy",
  });
});

/*Create partial for the footer
set up the template created by render the partial of the bottom to all pages
<footer>Created by {{name}}</footer>
*/
//static will not change
//new valuepara makita yung directory view engine

// const app = express();
// app.get("", (req, res) => {
//   res.send("Hellp express"); //to check kung gumagana (localhost:3000)
// });

// app.get("/help", (req, res) => {
//   res.send("help page");
// });
//app.com
//app.com/help
//app/com/about

//para hindi ka na restrat sa terminal type nodemon src/app.js(yung file name like)
//to start the server app.

/*Set up 2 new route
Set up route and render title page
weather page, test*/
// app.get("/about", (req, res) => {
//   res.send(" about");
// });
// app.get("/weather", (req, res) => {
//   res.send("The current weather");
// });
// app.listen(3000, () => {
//   console.log("Server is up on port 3000"); //node src/app
// });

//http and JSON

// app.get("", (req, res) => {
//   res.send(" <h1>Weather<h1>"); //lalabas sa system hig weather(localhost:3000)
// });

//JSON responses
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "cathy",
//       age: 29,
//     },
//     {
//       name: "Mariam",
//       age: 5,
//     },
//   ]);
// });

/*update routes
Set up about route to render a title HTML
Set up weather route to send back JSON
    object with forecast
test*/
// app.get("/about", (req, res) => {
//   res.send(" <h1>About<h1>");
// });

/*Weather endpoint to accept address
no address? send back an error

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is sunny",
    location: "Philippines",
  });
});
Address? Send back the static JSON(add address)*/
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a searh term",
    });
  }
  //JSON
  //   res.send({
  //     forecast: "It is sunny",
  //     location: "Philippines",
  //     address: req.query.address, //h sample http://localhost:3000/weather?address=Manila
  //   });
  // });
  /*Wire up/Weather 
reuire geocode/forecast into app.js, address to geo code, coordinates to get forecast
send back the real forecast and location*/
  //Step 1 i declare const, step 2
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  //query string
  app.get("/products", (req, res) => {
    req.query; // yung nasa taas na url
    if (!req.query.search) {
      return res.send({
        error: "You must provide a searh term",
      });
    }
    res.send({
      products: [],
    });
  });

  //need last not matching so matching everything else
  //pag hingi match yung site o route
  app.get("/help/*", (req, res) => {
    res.send("Article not found");
  });
  // app.get("*", (req, res) => {
  //   res.send("my 404 page");
  // });

  app.get("*", (req, res) => {
    res.render("404", {
      title: "404",
      name: "Cathy",
      errorMessage: "Page not found",
    });
  });
  //Serving up static assets
  // create new folder sa web-app> gawa ng name.html

  /*Create html page "About"(make about.html under public),
 "help", "remove route handler for both"*/

  //serving app CSS,JS Images, nag create ng style.css at img

  //customize handbars hbs
  /*create and render a 404 page within hbs(nasa views)
1.header and footer template
error msg in the paragraph:
app.get("*", (req, res) => {
  res.send("my 404 page");
});
template 404(page not found, help article not found)*/

  //npm handle bars
  //Terminal run
  //nodemon src/app
  //nodemon src/app.js -e js,hbs - para masave din yung mga files sa hbs
  //NPM modules no need to tract sa git
  /*npm install request@2.88.2 para maintall yung*/
  /* GIT creates new drectory and initiate the project
 git status -run sa terminal  */
  //gitinore hindi ka makakatract
  //git add filename/
  //git status
  //git add .
});
app.listen(3000, () => {
  console.log("Server is up on port 3000"); //node src/app
});
