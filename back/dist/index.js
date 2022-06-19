"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
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
app.get('/', (req, res) => {
    res.send('Clase Desarrollo Web');
});
app.post('/hola', function (req, res) {
    res.send('[POST] Saludos');
});
app.use(cors(corsOptions));
app.options("*", cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.json());
var router = express_1.default.Router();
var mongoose = require("mongoose");
const checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: 'http://localhost',
    issuerBaseURL: 'https://dev-zvbheutd.us.auth0.com/'
});
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
var Experto = require("./models/Experts");
router.route('/experto')
    .post((0, express_validator_1.body)('name').isAlpha().withMessage('must contain valid characters'), (0, express_validator_1.body)('prof').isAlpha().withMessage('must contain valid characters'), (0, express_validator_1.body)('adress').isLength({ min: 10, max: 100 }).withMessage('must have a valid length'), checkJwt, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var experto = new Experto();
        experto.name = req.body.name;
        experto.prof = req.body.prof;
        experto.adress = req.body.adress;
        try {
            yield experto.save(function (err) {
                if (err) {
                    console.log(err);
                    if (err.name == "ValidationError")
                        res.status(400).send({ error: err.message });
                }
                res.status(201).send({ mensaje: "Experto creado" });
            });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
    });
}).get(checkJwt, function (req, res) {
    Experto.find(function (err, experto) {
        if (err) {
            res.send(err);
        }
        res.status(200).send(experto);
    });
});
router.route("/experto/:id")
    .get(checkJwt, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experto = yield Experto.findOne({ _id: req.params.id });
            res.send(experto);
        }
        catch (_a) {
            res.status(404);
            res.send({ error: "Experto does not exist!" });
        }
    });
})
    .put(checkJwt, (0, express_validator_1.body)('name').isAlpha().withMessage('must contain valid characters'), (0, express_validator_1.body)('prof').isAlpha().withMessage('must contain valid characters'), (0, express_validator_1.body)('adress').isLength({ min: 10, max: 100 }).withMessage('must have a valid length'), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experto = yield Experto.findOne({ _id: req.params.id });
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (req.body.name) {
                experto.name = req.body.name;
            }
            if (req.body.prof) {
                experto.prof = req.body.prof;
            }
            if (req.body.adress) {
                experto.adress = req.body.adress;
            }
            yield experto.save();
            res.send(experto);
        }
        catch (_a) {
            res.status(404);
            res.send({ errors: "Nombre does not exist!" });
        }
    });
}).delete(checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Experto.deleteOne({ _id: req.params.id });
        return res.status(204).send({ mensaje: "Experto eliminado" });
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Experto does not exist " });
    }
}));
var Resource = require("./models/Resources");
router.route('/resource')
    .post((0, express_validator_1.body)('title').isAlpha().withMessage('Must contain valid characters'), (0, express_validator_1.body)('author').isAlpha().withMessage('Must contain valid characters'), checkJwt, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var resource = new Resource();
        resource.title = req.body.title;
        resource.author = req.body.author;
        try {
            yield resource.save(function (err) {
                console.log(err);
                if (err.name == "ValidationError")
                    res.status(400).send({ error: err.message });
            });
        }
        catch (error) {
            res.status(500).send({ error: error });
        }
    });
}).get(checkJwt, function (req, res) {
    Resource.find(function (err, resource) {
        if (err) {
            res.send(err);
        }
        res.status(200).send(resource);
    });
});
router.route("/resource/:id")
    .get(checkJwt, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resource = yield Resource.findOne({ _id: req.params.id });
            res.send(resource);
        }
        catch (_a) {
            res.status(404);
            res.send({ error: "Resource does not exist" });
        }
    });
})
    .put(checkJwt, (0, express_validator_1.body)('title').isAlpha().withMessage('Must contain valid characters'), (0, express_validator_1.body)('author').isAlpha().withMessage('Must contain valid characters'), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resource = yield Resource.findOne({ _id: req.params.id });
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (req.body.title) {
                resource.title = req.body.title;
            }
            if (req.body.author) {
                resource.author = req.body.author;
            }
            yield resource.save();
            res.send(resource);
        }
        catch (_a) {
            res.status(404);
            res.send({ error: "Resource does not exist" });
        }
    });
}).delete(checkJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Resource.deleteOne({ _id: req.params.id });
        return res.status(204).send({ mensaje: "Resource eliminado" });
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Resource does not exist " });
    }
}));
app.use("/api", router);
app.listen(port);
console.log("sevidor arriba");
