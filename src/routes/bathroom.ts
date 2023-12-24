import { NextFunction, Request, Response, Router } from "express";
import BathroomController from "@controller/bathroom";
import { IRequest } from "@/constants";
import { authMiddleware, isRole } from "@/middlewares/auth";
import ValidationMiddleware from "@/middlewares/validation";
import { getByIdSchema } from "@/schemas";
import { insertBathroomSchema } from "@/lib/db/schema";

// NOTE: need to fix my types, but this works for now

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
      [
        (req: Request, res: Response, next: NextFunction) =>
          authMiddleware(req as unknown as IRequest, res, next),
        ValidationMiddleware(getByIdSchema),
      ],
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getBathroomById(req as unknown as IRequest, res, next)
    );

    this.router.post(
      this.path,
      [
        (req: Request, res: Response, next: NextFunction) =>
          authMiddleware(req as unknown as IRequest, res, next),
        isRole(["ADMIN"]),
        ValidationMiddleware(insertBathroomSchema),
      ],
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.createBathroom(req as unknown as IRequest, res, next)
    );

    this.router.patch(
      this.path,
      [
        (req: Request, res: Response, next: NextFunction) =>
          authMiddleware(req as IRequest, res, next),
        isRole(["ADMIN"]),
        ValidationMiddleware(insertBathroomSchema),
      ],
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.updateBathroom(req as IRequest, res, next)
    );

    this.router.delete(
      `${this.path}/:id`,
      [
        (req: Request, res: Response, next: NextFunction) =>
          authMiddleware(req as unknown as IRequest, res, next),
        isRole(["ADMIN"]),
        ValidationMiddleware(getByIdSchema),
      ],
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.deleteBathroom(req as unknown as IRequest, res, next)
    );
  }
}
