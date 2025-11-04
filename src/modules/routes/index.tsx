import { Suspense, lazy, type FunctionComponent } from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";
import { PATHS } from "../_constants/paths";

const Login = lazy(() => import("../app/login"));
const ForgotPassword = lazy(() => import("../app/forgot-password"));
const Dashboard = lazy(() => import("../app/dashboard").then(module => ({ default: module.Dashboard })));
const Listing = lazy(() => import("../app/listing").then(module => ({ default: module.Listing })));
const UserManagement = lazy(() => import("../app/user-management").then(module => ({ default: module.UserManagement })));
const UserSettings = lazy(() => import("../app/settings").then(module => ({ default: module.UserSettings })));
const SwapActivity = lazy(() => import("../app/swap-activity").then(module => ({ default: module.SwapActivity })));
const SwapActivityInfo = lazy(() => import("../app/swap-activity/info").then(module => ({ default: module.SwapActivityInfo })));
const FlagsAndReports = lazy(() => import("../app/flags-reports").then(module => ({ default: module.FlagsAndReports })));
const FlagReportDetails = lazy(() => import("../app/flags-reports/details").then(module => ({ default: module.FlagReportDetails })));
const Profile = lazy(() => import("../app/profile").then(module => ({ default: module.Profile })));

const LoadingFallback = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    minH="100vh"
    w="100%"
  >
    <Spinner size="xl" color="#007AFF" />
  </Box>
);

const Routes: FunctionComponent<Record<string, never>> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
