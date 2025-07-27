import { Suspense, type FunctionComponent } from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import { PATHS } from "../_constants/paths";
import { Dashboard } from "../app";
import { Listing } from "../app/listing";
import { UserManagement } from "../app/user-management";
import { Settings } from "../app/settings";
import { SwapActivity } from "../app/swap-activity";
import { FlagsAndReports } from "../app/flags-reports";
import { Profile } from "../app/profile";

const Routes: FunctionComponent<Record<string, never>> = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <BrowserRoutes>
          <Route>
            <Route path="/" element={<p>welcome</p>} />
            <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
            <Route path={PATHS.LISTING} element={<Listing />} />
            <Route path={PATHS.USERMANAGEMENT} element={<UserManagement />} />
            <Route path={PATHS.SETTINGS} element={<Settings />} />
            <Route path={PATHS.SWAPACTIVITY} element={<SwapActivity />} />
            <Route path={PATHS.FLAGSANDREPORTS} element={<FlagsAndReports />} />
            <Route path={PATHS.PROFILE} element={<Profile />} />
          </Route>

          <Route path="*" element={<div>Page not found</div>}></Route>
        </BrowserRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
