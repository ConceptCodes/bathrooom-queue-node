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
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Implementation for fetching bathrooms
  };

  public getBathroomById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Implementation for fetching a bathroom by ID
  };

  public createBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Implementation for creating a new bathroom
  };

  public updateBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Implementation for updating an existing bathroom
  };

  public deleteBathroom = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Implementation for deleting a bathroom
  };
}
