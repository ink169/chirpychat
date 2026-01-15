const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
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

app.post("/heygen-live-avatar/create-token", async (req, res) => {

    // get variables from header

    const api_key = req.headers.api_key;
    const avatar_id = req.headers.avatar_id;    
    const mode = req.headers.mode; 
    const voice_id = req.headers.voice_id;  
    const context_id = req.headers.context_id;  
    const language_code = req.headers.language_code;          

    var server = 'https://api.liveavatar.com/v1/sessions/token'

    // create json body for heygen call
    var body = {
        "mode": req.headers.mode,     
        "avatar_id": req.headers.avatar_id,
        "avatar_persona": {
            "voice_id": req.headers.voice_id,
             "context_id": req.headers.context_id,
             "language": req.headers.language_code
      }
    };

    var headers = {
        "x-api-key": req.headers.api_key,
        "content-type": "application/json",
        "accept": "application/json"
    };

   const response = await fetch(server, { method: 'POST', headers: headers, body: JSON.stringify(body)})
      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } 
    
    const vals = await response.json();

    var session_id = vals.data.session_id;
    var session_token = vals.data.session_token;
    var message = vals.message;

    // create json return object
    var retval = {
        "session_id": vals.data.session_id,     
        "session_token": vals.data.session_token,
        "message": message       
    };

    //var  ret_str = `RESULT: session_id=${session_id}; session_token=${session_token}; message=${message}; `;
    // var  ret_str = `session_id=${session_id}; session_token=${session_token}; message=${message}; `;

    // res.json({ result: ret_str });

    res.json({ retval });
    
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
