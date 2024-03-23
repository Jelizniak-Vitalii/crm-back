import { Route, RoutePath } from '../shared';
import { loginController, registrationController } from '../controllers';

export const routes: Route = {
  [RoutePath.AuthLogin]: loginController,
  [RoutePath.AuthRegistration]: registrationController,
};
