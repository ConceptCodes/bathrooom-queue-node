import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import BathroomService from "@service/bathroom";
import { IRequest } from "@/constants";

export default class BathroomController {
  private service: BathroomService;

  constructor() {
    this.service = new BathroomService();
  }

  public getBathrooms = async (
    _: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bathrooms = await this.service.getAll();
      res.status(StatusCodes.OK).json(bathrooms);
    } catch (error) {
      next(error);
    }
  };

  public getBathroomById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const bathroom = await this.service.getById(Number(id));
      res.status(StatusCodes.OK).json(bathroom);
    } catch (error) {
      next(error);
    }
  };

  public createBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, location } = req.body;
      const bathroom = await this.service.create({
        name,
        location,
      });
      res.status(StatusCodes.CREATED).json(bathroom);
    } catch (error) {
      next(error);
    }
  };

  public updateBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, location, id } = req.body;
      const bathroom = await this.service.update(Number(id), {
        name,
        location,
      });
      res.status(StatusCodes.OK).json(bathroom);
    } catch (error) {
      next(error);
    }
  };

  public deleteBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  };
}
