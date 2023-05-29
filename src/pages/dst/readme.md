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

    function getDstWorldSetting() {
        fetch('misc/dst_world_setting.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDstWorldSetting(data)
        })
        .catch(error => {
            console.error('无法加载配置文件', error);
        });
    }