// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: '操作面板',
    path: '/dashboard/panel',
    icon: icon('ic_analytics'),
  },
  {
    title: '房间设置',
    path: '/dashboard/home',
    icon: icon('ic_blog')
  },
  {
    title: '世界设置',
    path: '/dashboard/cluster/view',
    icon: icon('ic_user'),
  },
  {
    title: '玩家管理',
    path: '/dashboard/player',
    icon: icon('ic_blog')
  },
  {
    title: '游戏备份',
    path: '/dashboard/backup',
    icon: icon('ic_blog')
  },
  // {
  //   title: '系统设置',
  //   path: '/dashboard/setting',
  //   icon: icon('ic_blog')
  // },
  {
    title: '游戏日志',
    path: '/dashboard/log',
    icon: icon('ic_user'),
  },
  // {
  //   title: '模组设置',
  //   path: '/dashboard/mod',
  //   icon: icon('ic_user'),
  // },
  {
    title: '服务器列表',
    path: '/dashboard/dst/server',
    icon: icon('ic_user'),
  },
    {
    title: '帮助文档',
    path: '/dashboard/help',
    icon: icon('ic_blog')
  },

  // {
  //   title: '多层世界',
  //   path: '/dashboard/multi/cluster/view',
  //   icon: icon('ic_user'),
  // },

  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
