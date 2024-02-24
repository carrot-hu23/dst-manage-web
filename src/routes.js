import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import PlayerLog from './pages/PlayerLog';

import Backup from './pages/Backup/index';
import Setting from './pages/System/index';
import Github from './pages/Github/index';
import Panel from './pages/Panel/index';
import Begin from './pages/begin/index';
import UserProfile from "./pages/User/UserProfile";
import Link from "./pages/WebLink";
import Help from "./pages/Help";
import Home2 from "./pages/Home2";

import Levels from "./pages/Levels";
import DstServerList from "./pages/DstServerList";
import Tool from "./pages/Tool";
import Server from "./pages/ClusterList/Server";
import OS from "./pages/ClusterList/OS";
import Mod2 from "./pages/Mod2";

export default function Router() {
  const routes = useRoutes([
    {
      path: '/:cluster/:name/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/:cluster/:name/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'log', element: <PlayerLog /> },
        { path: 'mod2', element: <Mod2 /> },
        { path: 'panel', element: <Panel /> },

        { path: 'tool', element: <Tool /> },
        { path: 'server', element: <Server /> },

        { path: 'cluster', element: <Home2 /> },
        { path: 'levels', element: <Levels /> },
        { path: 'backup', element: <Backup /> },
        { path: 'setting', element: <Setting /> },
        { path: 'github', element: <Github /> },
        { path: 'help', element: <Help /> },
        { path: 'dst/server', element: <DstServerList /> },
        { path: 'user/Profile', element: <UserProfile /> },
        { path: 'link', element: <Link /> },
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
        { element: <Navigate to="/cluster" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        {
          path: '/cluster',
          element: <Server />,
        },
        {
          path: '/os/info',
          element: <OS />,
        },
        { path: 'dst/server', element: <DstServerList /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);

  return routes;
}
