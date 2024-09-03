import express from "express";
import { searchByCity,searchByProviderName,searchByavailability,searchByserviceName } from "../controllers/searchcontroller";

const searchrout = express.Router()

searchrout.route("/search/:name").get(searchByProviderName);
searchrout.route("/search/:city").get(searchByCity);
searchrout.route("/search/:availability").get(searchByavailability);
searchrout.route("/search/:availability").get(searchByserviceName);

export default searchrout

