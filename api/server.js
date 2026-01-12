const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Aingel API" });
});

app.get("/ping", (req, res) => {
  res.json({ message: "root pong" });
});

app.get("/heygen/ping", (req, res) => {
  res.json({ message: "heygen pong" });
});

app.post("/heygen-live-avatar/create-token", (req, res) => {

    const { api_key } = req.headers.api_key;
    const { avatar_id } = req.headers.avatar_id;    
    const { mode } = req.headers.mode; 
    const { voice_id } = req.headers.voice_id;  
    const { context_id } = req.headers.context_id;  
    const { language_code } = req.headers.language_code;          

    // var { message_str} = `RESULT: api_key=${api_key}; avatar_id=${avatar_id}; mode=${mode}; voice_id=${voice_id}; context_id=${context_id}; language_code=${language_code}`;

    //const message_str = api_key;
    res.json({ message: api_key });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
