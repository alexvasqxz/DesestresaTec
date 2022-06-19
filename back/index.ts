import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import { auth, requiredScopes} from 'express-oauth2-jwt-bearer';

dotenv.config();

const port = process.env.PORT;

var bodyParser = require("body-parser");
var app: Express = express();
var morgan = require("morgan");
const cors = require("cors"); //importar cors para su uso

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/', (req: Request, res: Response) => {
    res.send('Clase Desarrollo Web');
});

app.post('/hola', function(req, res) {
    res.send('[POST] Saludos');
});

app.use(cors(corsOptions));
app.options("*", cors());

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

var router = express.Router();
var mongoose = require("mongoose");

const checkJwt = auth({
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
    console.log("server is running at http://localhost:8002")
});

router.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
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
        .post(body('name').isAlpha().withMessage('must contain valid characters'),
        body('prof').isAlpha().withMessage('must contain valid characters'),
        body('adress').isLength({min:10, max:100}).withMessage('must have a valid length'),
        checkJwt,
        async function (req: express.Request, res: express.Response) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json( {errors: errors.array() });
            }
            var experto = new Experto();
            experto.name = req.body.name;
            experto.prof = req.body.prof;
            experto.adress = req.body.adress;
            try {
                await experto.save(function (err: any) {
                    if (err) {
                        console.log(err);
                        if (err.name == "ValidationError")
                            res.status(400).send({ error: err.message });
                    }
                    res.status(201).send({ mensaje: "Experto creado" });
                }
                );

            } catch(error) {
                res.status(500).send({ error: error });
            }

        }).get(checkJwt, function (req: express.Request, res: express.Response) {

            Experto.find(function (err: any, experto: any) {
                if (err) {
                    res.send(err);
                }
                res.status(200).send(experto);
            });
        });

router.route("/experto/:id")
        .get(checkJwt, async function  (req: express.Request, res: express.Response) {
            try {
                const experto = await Experto.findOne({ _id: req.params.id })
                res.send(experto)
            } catch {
                res.status(404)
                res.send({ error: "Experto does not exist!" })
            }
        })
        .put(checkJwt,
            body('name').isAlpha().withMessage('must contain valid characters'),
            body('prof').isAlpha().withMessage('must contain valid characters'),
            body('adress').isLength({min:10, max:100}).withMessage('must have a valid length'),
            async function (req: express.Request, res: express.Response) {
                try {
                    const experto = await Experto.findOne({ _id: req.params.id });
                    const errors = validationResult(req);
                    if (!errors.isEmpty()){
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
                    await experto.save()
                    res.send(experto)
                } catch {
                    res.status(404)
                    res.send({ errors: "Nombre does not exist!" })
                }

            }).delete(checkJwt,async (req, res) => {
                try {
                    await Experto.deleteOne({ _id: req.params.id })
                    return res.status(204).send({ mensaje: "Experto eliminado" });
                } catch {
                    res.status(404)
                    res.send({ error: "Experto does not exist "})
                }
            });

            var Resource = require("./models/Resources");

            router.route('/resource')
                .post(body('title').isAlpha().withMessage('Must contain valid characters'),
                    body('author').isAlpha().withMessage('Must contain valid characters'),
                    checkJwt,
                    async function (req: express.Request, res: express.Response) {
                        const errors  = validationResult(req);
                        if (!errors.isEmpty()) {
                            return res.status(400).json({ errors: errors.array() });
                        }
                        var resource = new Resource();
                        resource.title = req.body.title;
                        resource.author = req.body.author;
                        try {
                            await resource.save(function (err: any) {
                                console.log(err);
                                if (err.name == "ValidationError")
                                res.status(400).send({ error: err.message });
                            }
                            );

                        } catch(error) {
                            res.status(500).send({ error: error });
                        }

                    }).get(checkJwt, function (req: express.Request, res: express.Response) {

                        Resource.find(function (err: any, resource: any) {
                            if(err) {
                                res.send(err);
                            }
                            res.status(200).send(resource);
                        });
                    });

            router.route("/resource/:id")
                    .get(checkJwt, async function (req: express.Request, res: express.Response) {
                        try {
                            const resource = await Resource.findOne({ _id: req.params.id })
                            res.send(resource)
                        } catch {
                            res.status(404)
                            res.send({ error: "Resource does not exist"})
                        }
                    })
                    .put(checkJwt, 
                        body('title').isAlpha().withMessage('Must contain valid characters'),
                        body('author').isAlpha().withMessage('Must contain valid characters'),
                        async function (req: express.Request, res: express.Response) {
                            try {
                                const resource = await Resource.findOne({ _id: req.params.id });
                                const errors = validationResult(req);
                                if (!errors.isEmpty()) {
                                    return res.status(400).json({ errors: errors.array() });
                                }
                                if(req.body.title){
                                    resource.title = req.body.title;
                                }
                                if(req.body.author){
                                    resource.author = req.body.author;
                                }
                                await resource.save()
                                res.send(resource)
                            } catch {
                                res.status(404)
                                res.send({ error: "Resource does not exist"})
                            }

                        }).delete(checkJwt, async (req, res) => {
                            try {
                                await Resource.deleteOne({ _id: req.params.id })
                                return res.status(204).send({ mensaje: "Resource eliminado"});
                            } catch {
                                res.status(404)
                                res.send({ error: "Resource does not exist "})
                            }
                        });

app.use("/api", router); 

app.listen(port); 

console.log("sevidor arriba");