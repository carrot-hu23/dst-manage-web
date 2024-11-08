import SvgColor from "../components/svg-color";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('trending-up'),
  },
  {
    title: 'Panel',
    path: '/dashboard/panel',
    icon: icon('monitor'),
  },
  {
    title: 'Home',
    path: '/dashboard/cluster',
    icon: icon('home')
  },
  {
    title: 'Levels',
    path: '/dashboard/levels',
    icon: icon('layers')
  },
  {
    title: 'Mod',
    path: '/dashboard/mod2',
    icon: icon('package'),
  },
  {
    title: 'Backup',
    path: '/dashboard/backup',
    icon: icon('folder')
  },
  {
    title: 'Log',
    path: '/dashboard/log',
    icon: icon('database'),
  },
  {
    title: 'Setting',
    path: '/dashboard/setting',
    icon: icon('settings')
  },
  {
    title: 'Lobby',
    path: '/dashboard/dst/server',
    icon: icon('server'),
  },
  // {
  //   title: 'Link',
  //   path: '/dashboard/link',
  //   icon: icon('external-link')
  // },
  // {
  //   title: 'Github',
  //   path: '/dashboard/github',
  //   icon: icon('github')
  // },
  // {
  //   title: 'Help',
  //   path: '/dashboard/help',
  //   icon: icon('help-circle')
  // },
];

export default navConfig;
