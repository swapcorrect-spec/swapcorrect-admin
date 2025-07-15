import { Suspense, type FunctionComponent } from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";

const Routes: FunctionComponent<Record<string, never>> = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <BrowserRoutes>
          <Route>
            <Route path="/" element={<p>welcome</p>} />
          </Route>

          <Route path="*" element={<div>Page not found</div>}></Route>
        </BrowserRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
