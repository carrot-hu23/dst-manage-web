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
import Help from './pages/Help/index';
import Panel from './pages/Panel/index';
import Mod from './pages/Mod/index';
import DstServerList from './pages/DstServerList/index';
import Begin from './pages/begin/index';
import ClusterView from './pages/ClusterView/index';
import ClusterList from "./pages/ClusterList";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/:cluster/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/:cluster/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'log', element: <PlayerLog /> },

        { path: 'panel', element: <Panel /> },
        { path: 'home', element: <Home /> },
        { path: 'player', element: <Player /> },
        { path: 'backup', element: <Backup /> },
        { path: 'setting', element: <Setting /> },
        { path: 'help', element: <Help /> },
        { path: 'Mod', element: <Mod /> },
        { path: 'dst/server', element: <DstServerList /> },
        { path: 'cluster/view', element: <ClusterView /> },
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
      path: '/cluster',
      element: <ClusterList />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/cluster" />, index: true },
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
