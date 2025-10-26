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
import { UserSettings } from "../app/settings";
import { SwapActivity } from "../app/swap-activity";
import { FlagsAndReports } from "../app/flags-reports";
import { Profile } from "../app/profile";
import { SwapActivityInfo } from "../app/swap-activity/info";
import { FlagReportDetails } from "../app/flags-reports/details";
import Login from "../app/login";
import ForgotPassword from "../app/forgot-password";

const Routes: FunctionComponent<Record<string, never>> = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <BrowserRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
          <Route path={PATHS.LISTING} element={<Listing />} />
          <Route path={PATHS.USERMANAGEMENT} element={<UserManagement />} />
          <Route path={PATHS.SETTINGS} element={<UserSettings />} />
          <Route path={PATHS.SWAPACTIVITY} element={<SwapActivity />} />
          <Route
            path={`${PATHS.SWAPACTIVITY}/:swapId`}
            element={<SwapActivityInfo />}
          />
          <Route path={PATHS.FLAGSANDREPORTS} element={<FlagsAndReports />} />
          <Route
            path={`${PATHS.FLAGSANDREPORTS}/:reportId`}
            element={<FlagReportDetails />}
          />
          <Route path={PATHS.PROFILE} element={<Profile />} />
          <Route path="*" element={<div>Page not found</div>} />
        </BrowserRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
