import SvgColor from "../components/svg-color";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Cluster',
    path: '/cluster',
    icon: icon('folder'),
  },
  {
    title: 'Users',
    path: '/user/list',
    icon: icon('users'),
  },
  {
    title: 'DstLobby',
    path: '/dst/server',
    icon: icon('server'),
  },
  {
    title: 'OsInfo',
    path: '/os/info',
    icon: icon('hard-drive'),
  },
  {
    title: 'Theme',
    path: '/theme/setting',
    icon: icon('star'),
  },
  {
    title: 'Userprofile',
    path: 'user/profile',
    icon: icon('smile'),
  },
  {
    title: 'Github',
    path: 'github',
    icon: icon('github')
  },
];

export default navConfig;
