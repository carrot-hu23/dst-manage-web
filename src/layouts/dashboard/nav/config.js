// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('trending-up'),
  },
  {
    title: '操作面板',
    path: '/dashboard/panel',
    icon: icon('monitor'),
  },
  {
    title: '房间设置',
    path: '/dashboard/home',
    icon: icon('home')
  },
  {
    title: '世界设置',
    path: '/dashboard/cluster/view',
    icon: icon('layers'),
  },
  {
    title: '模组配置',
    path: '/dashboard/mod',
    icon: icon('package'),
  },
  {
    title: '玩家管理',
    path: '/dashboard/player',
    icon: icon('users')
  },
  {
    title: '游戏备份',
    path: '/dashboard/backup',
    icon: icon('folder')
  },
  {
    title: '游戏日志',
    path: '/dashboard/log',
    icon: icon('database'),
  },
  {
    title: '系统设置',
    path: '/dashboard/setting',
    icon: icon('settings')
  },
  {
    title: '服务器列表',
    path: '/dashboard/dst/server',
    icon: icon('server'),
  },
    {
    title: '帮助文档',
    path: '/dashboard/help',
    icon: icon('github')
  },
];

export default navConfig;
