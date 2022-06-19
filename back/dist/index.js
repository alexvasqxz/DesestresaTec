"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
var morgan = require("morgan");
const cors = require("cors"); //importar cors para su uso
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.options("*", cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.json());
var router = express_1.default.Router();
var mongoose = require("mongoose");
var uri = "mongodb+srv://MongoUser:DesestresatecMongo@cluster0.uzk8g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var Expert = require("./models/Experts");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "error de conexion"));
db.once("openUri", function () {
    console.log("conectado a mongo");
});
app.listen(8002, () => {
    console.log("server is running at http://localhost:8002");
});
router.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    }
    next();
}); //funcion habilita el middleware
router.get("/", function (req, res) {
    res.json({
        mensaje: "keep alive",
    });
});
app.use("/api", router);
app.listen(port);
console.log("sevidor arriba");
