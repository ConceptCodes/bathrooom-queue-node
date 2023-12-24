import { Router } from "express";
import BathroomController from "@controller/bathroom";
import { IRequest } from "@/constants";
import { authMiddleware, isRole } from "@/middlewares/auth";

export default class BathroomRoute {
  public path = "/bathrooms";
  public router: Router = Router();
  public controller = new BathroomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      this.path,
      (req, res, next) => authMiddleware(req as IRequest, res, next),
      (req, res, next) =>
        this.controller.getBathrooms(req as IRequest, res, next)
    );
    this.router.get(
      `${this.path}/:id`,
      (req, res, next) => authMiddleware(req as unknown as IRequest, res, next),
      (req, res, next) =>
        this.controller.getBathroomById(req as unknown as IRequest, res, next)
    );
    this.router.post(
      this.path,
      (req, res, next) => authMiddleware(req as unknown as IRequest, res, next),
      isRole(["ADMIN"]),
      (req, res, next) =>
        this.controller.createBathroom(req as unknown as IRequest, res, next)
    );
    this.router.patch(
      this.path,
      (req, res, next) => authMiddleware(req as IRequest, res, next),
      isRole(["ADMIN"]),
      (req, res, next) =>
        this.controller.updateBathroom(req as IRequest, res, next)
    );
    this.router.delete(
      `${this.path}/:id`,
      (req, res, next) => authMiddleware(req as unknown as IRequest, res, next),
      isRole(["ADMIN"]),
      (req, res, next) =>
        this.controller.deleteBathroom(req as unknown as IRequest, res, next)
    );
  }
}
