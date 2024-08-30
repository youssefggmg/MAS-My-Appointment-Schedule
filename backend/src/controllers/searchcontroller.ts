import { Request,Response } from "express";
import { User } from "../models/user";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import dbConnection from "../models/db";

