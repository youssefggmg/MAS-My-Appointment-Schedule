import { Request, Response } from "express";
import { User } from "../models/user";
import { Provider } from "../models/providerinfo";
import { NotFoundError } from "../errors/index";
import { StatusCodes } from "http-status-codes";

export const getProviderInfo = async (req: Request, res: Response) => {
    try {
        const providerId = req.params.id;

        if (!providerId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Provider ID is required' });
        }

        const provider = await User.findById(providerId).populate('services');

        if (!provider) {
            return res.status(StatusCodes.NOT_FOUND).json(new NotFoundError('Provider not found'));
        }
        const providerInfo = await Provider.findOne({
            providerId
        })

        const { name, email, Image,phoneNumber, _id, services } = provider;
        res.status(StatusCodes.OK).json({ name, email, Image, id: _id, services,providerInfo });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
