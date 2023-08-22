import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PlayerLog from './pages/PlayerLog';


//--
import Home from './pages/Home/index';
import Player from './pages/Player/index';
import Backup from './pages/Backup/index';
import Setting from './pages/System/index';
import Github from './pages/Github/index';
import Panel from './pages/Panel/index';
import DstServerList from './pages/DstServerList/index';
import Begin from './pages/begin/index';
import ClusterView from './pages/ClusterView/index';
import ModSetting from "./pages/ModSetting";
import UserProfile from "./pages/User/UserProfile";
import Link from "./pages/WebLink";
import Modinfo from "./pages/Mod/Modinfo";
import Help from "./pages/Help";
import EightLevels from "./pages/EightLevels";
import Cluster from "./pages/Cluster";
import OnlinePlayers from "./pages/Player/OnlinePlayers";
import Forest from "./pages/EightLevels/LevelSetting/Forest";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'log', element: <PlayerLog /> },

        { path: 'panel', element: <Panel /> },
        { path: 'home', element: <Home /> },
        { path: 'cluster', element: <Cluster /> },
        { path: '8level', element: <EightLevels /> },
        { path: 'player', element: <OnlinePlayers /> },
        { path: 'backup', element: <Backup /> },
        { path: 'setting', element: <Setting /> },
        { path: 'github', element: <Github /> },
        { path: 'help', element: <Help /> },
        { path: 'Mod', element: <ModSetting /> },
        { path: 'dst/server', element: <DstServerList /> },
        { path: 'cluster/view', element: <ClusterView /> },
        { path: 'user/Profile', element: <UserProfile /> },
        { path: 'link', element: <Link /> },
        { path: 'modinfo/:modId', element: <Modinfo /> },

        { path: 'view', element: <Forest /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'init',
      element: <Begin />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
