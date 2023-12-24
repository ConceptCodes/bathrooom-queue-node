import App from "@/app";
import HealthRoute from "@route/health";
import AuthRoute from "@route/auth";
import BathroomRoute from "./routes/bathroom";

export const app = new App([
  new HealthRoute(),
  new AuthRoute(),
  new BathroomRoute(),
]);

app.listen();
