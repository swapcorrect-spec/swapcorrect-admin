import { Suspense, type FunctionComponent } from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import { PATHS } from "../_constants/paths";
import { Dashboard } from "../app";

const Routes: FunctionComponent<Record<string, never>> = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <BrowserRoutes>
          <Route>
            <Route path="/" element={<p>welcome</p>} />
            <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
          </Route>

          <Route path="*" element={<div>Page not found</div>}></Route>
        </BrowserRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
