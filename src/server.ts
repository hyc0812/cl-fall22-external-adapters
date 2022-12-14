import process from "process";
import express, { Express, Request, Response } from "express";
import bodyParser = require("body-parser");
import axios, { AxiosResponse } from "axios";



type EAInput = {
    id: number | string;
    data: {
        number: number | string;
        infoType: string;
    };
};

type EAoutput = {
    jobRunId: string | number;
    statusCode: number;
    data: {
        result?: any;
    };
    error?: string;
};

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("External Adapter says Hellooooo!");
});

app.post("/", (req: Request, res: Response) => {
    const eaInputData: EAInput = req.body;
    console.log("Request data received : ", eaInputData);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});