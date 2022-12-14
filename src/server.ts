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

type EAOutput = {
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

app.post("/", async (req: Request, res: Response) => {
    const eaInputData: EAInput = req.body;
    console.log("Request data received : ", eaInputData);

    // build the API request to look something like http://numbersapi.com/random/trivia
    const url = `http://numbersapi.com/${eaInputData.data.number}/${eaInputData.data.infoType}`;

    // build EA' response
    let eaResponse: EAOutput = {
        data: {},
        jobRunId: eaInputData.id,
        statusCode: 0,
    };

    try {
        const apiResponse: AxiosResponse = await axios.get(url);
        eaResponse.data = {result: apiResponse.data};
        eaResponse.statusCode = apiResponse.status;
        console.log("RETURNED response: ", eaResponse);
        res.json(eaResponse);
    }catch(error: any) {
        console.log("API Response error: ", error);
        eaResponse.error = error.message;
        eaResponse.statusCode = error.response.status;
        res.json(eaResponse);
    }


});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});