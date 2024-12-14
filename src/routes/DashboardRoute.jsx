// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import Analytics from "../views/Analytics/Analytics.jsx";

const DashboardRoutes = [
  {
    path: "/Dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/Analytics",
    sidebarName: "Analytics",
    navbarName: "Analytics",
    icon: Dashboard,
    component: Analytics
  },
  { redirect: true, path: "/", to: "/Dashboard", navbarName: "Redirect" }
];

export default DashboardRoutes;
