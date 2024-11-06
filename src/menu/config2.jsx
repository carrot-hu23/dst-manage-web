import SvgColor from "../components/svg-color";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '房间列表',
    path: '/cluster',
    icon: icon('folder'),
  },
  {
    title: '用户列表',
    path: '/user/list',
    icon: icon('users'),
  },
  {
    title: '大厅列表',
    path: '/dst/server',
    icon: icon('server'),
  },
  {
    title: '系统信息',
    path: '/os/info',
    icon: icon('hard-drive'),
  },
  {
    title: '主题设置',
    path: '/theme/setting',
    icon: icon('star'),
  },
  {
    title: '个人信息',
    path: 'user',
    icon: icon('smile'),
  },
];

export default navConfig;
