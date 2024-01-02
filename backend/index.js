let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
let session = require("express-session");
const cors = require('cors');
const mongodbSession=require('connect-mongodb-session')(session)
mongoose.set('strictQuery', true);
mongoDbUri="mongodb+srv://siddhesh:Siddhesh%232@cluster0.j7zaagb.mongodb.net/Epharma"

let app = express();
app.use(express.static("assets"));
// app me json data aaega to manage karna
const corsOptions = {
    origin: ['http://localhost:4200'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ["set-cookie"],
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// image b aaegi to size limit bdaa do taaki 50 mb tk image load ho jaee
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));

const store = new mongodbSession({
    uri:mongoDbUri,
    collection:'userSessions'
})
app.use(session(
    {
        secret : 'key that will sign cookie',
        saveUninitialized : false,
        resave : false,
        store:store,
    }
))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect(mongoDbUri);
let db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));


app.get("/", (req, res)=>{
    res.send("Welcome to E-Commerce Back End");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/medicine", require("./routes/medicine"));
// app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/order", require("./routes/order"));
app.use("/generic",require("./routes/generic"));

app.listen(3000,()=>{
    console.log("Back End running on http://localhost:3000/");
});