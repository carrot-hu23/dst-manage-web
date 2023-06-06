import { Form, Input, Tooltip, Button } from 'antd';
import { useState } from 'react';
import InstallSteamcmd from './installSteamcmd';
import InstallDst from './installDst';

const Setting = (props) => {

    function importConfig() {
        
        // ~/steamcmd
        // ~/dst
        // ~/.klei/DoNotStarveTogether/
        // MyDediServer
        // ~/.klei/DoNotStarveTogether/
        const values = {
            steamcmd: '~/steamcmd',
            force_install_dir: '~/dst',
            cluster: 'MyDediServer',
            backup: '~/.klei/DoNotStarveTogether',
            mod_download_path: '~/.klei/DoNotStarveTogether/mod'
        };
        props.form.setFieldsValue(values);

    }
    return <>
        <h3>设置 steamcmd 安装路径</h3>

        <Form
            layout="vertical"
            labelAlign={'left'}
            // eslint-disable-next-line react/prop-types
            form={props.form}
            style={{
                margin: '24px',
            }}
        >
            <Form.Item
                label="steamcmd安装路径"
                name="steamcmd"
                rules={[
                    {
                        required: true,
                        message: 'Please input steam cmd install path',
                    },
                ]}
            >
                <Input placeholder="steamcmd安装路径" />
            </Form.Item>

            <Form.Item
                label="饥荒服务器安装路径"
                name="force_install_dir"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                    },
                ]}
            >
                <Input placeholder="steamcmd 饥荒联机版安装路径" />
            </Form.Item>

            <Form.Item
                label="服务器房间文件名字"
                name="cluster"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server name',
                    },
                ]}
            >
                <Input placeholder="服务器房间文件名字" />
            </Form.Item>

            {/* <Form.Item
                label="游戏存档备份路径"
                name="backup"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server backup',
                    },
                ]}
            >
                <Input placeholder="游戏存档备份路径" />
            </Form.Item>

            <Form.Item
                label="mod下载路径"
                name="mod_download_path"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server mod_download_path',
                    },
                ]}
            >
                <Input placeholder="mod下载路径" />
            </Form.Item> */}

        </Form>
        <div>
            <InstallSteamcmd />
        </div>
        <div>
            <InstallDst />    
        </div>
            <div>
        <Tooltip placement="top" title={"导入 qinming99/dst-admin 安装位置"}>
            <Button type="link" onClick={()=>importConfig()}>
                一键导入dst-admin
            </Button>
        </Tooltip>
        </div>

    </>

}
export default Setting