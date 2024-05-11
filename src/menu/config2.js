import SvgColor from "../components/svg-color";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '房间列表',
    path: '/cluster',
    icon: icon('trending-up'),
  },
  {
    title: '用户列表',
    path: '/user/list',
    icon: icon('hard-drive'),
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
];

export default navConfig;
