import { useEffect, useState } from "react"
import World from "./world"
import WorldItem from "./worldItem"
import { http } from "../../utils/http"

import './index.css'

const MultiWorld = ()=> {

    const [multiWorld, setMutiWorld] = useState({
        worlds: [
            {
                "server_ini": {
                    "server_port": 10999,
                    "is_master": true,
                    "name": "",
                    "id": 10000,
                    "encode_user_path": true,
                    "authentication_port": 0,
                    "master_server_port": 0
                }
            }
        ]
    })
    const [currWorld, setCurrWorld] = useState({})
    const [index, setIndex] = useState(0)

    const [dstWorldSetting, setDstWorldSetting] = useState({
        zh: {
            forest: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            },
            cave: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            }
        }
    })

    useEffect(()=>{
        http.get("/api/cluster/config")
        .then(data=>{
            setMutiWorld(data.data.data)
            setCurrWorld(data.data.data[0])
            console.log(data.data.data);
        })
        .catch(error=>console.log(error))

        fetch('misc/dst_world_setting.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDstWorldSetting(data)
        })
        .catch(error => {
            console.error('无法加载配置文件', error);
        });

    },[])

    return<>
    <div>
        <WorldItem worlds={multiWorld.worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} setIndex={setIndex} />
    </div>
    <div>
        <World worlds={multiWorld.worlds} currWorld={currWorld} setCurrWorld={setCurrWorld} index={index} dstWorldSetting={dstWorldSetting} />
    </div>
    </>
}

export default MultiWorld