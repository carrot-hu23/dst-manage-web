import SvgColor from "../components/svg-color";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '统计页面',
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
    path: '/dashboard/cluster',
    icon: icon('home')
  },
  {
    title: '世界设置',
    path: '/dashboard/levels',
    icon: icon('layers')
  },
  {
    title: '模组配置',
    path: '/dashboard/mod2',
    icon: icon('package'),
  },
  {
    title: '辅助功能',
    path: '/dashboard/tool',
    icon: icon('star')
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
    title: '自动维护',
    path: '/dashboard/setting',
    icon: icon('settings')
  },
  {
    title: '大厅列表',
    path: '/dashboard/dst/server',
    icon: icon('server'),
  },
  {
    title: '帮助文档',
    path: '/dashboard/help',
    icon: icon('help-circle')
  },
  {
    title: 'Github',
    path: '/dashboard/github',
    icon: icon('github')
  },
];

export default navConfig;
