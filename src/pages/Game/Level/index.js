import React, {useEffect, useState} from "react";
import {Button, Layout, Menu, theme, Input, Space, Tabs} from 'antd';

const {TextArea} = Input;
const {Content, Sider} = Layout;

const defaultLeveldataoverride = `
return {
  desc = '比标准《饥荒》地图尺寸更小的完整生态体验。',
  hideminimap = false,
  id = 'SURVIVAL_TOGETHER_TINY',
  location = 'forest',
  max_playlist_position = 999,
  min_playlist_position = 0,
  name = '迷你世界',
  numrandom_set_pieces = 0,
  override_level_string = false,
  overrides = {
    alternatehunt = 'default',
    angrybees = 'default',
    antliontribute = 'default',
    autumn = 'default',
    bananabush_portalrate = 'default',
    basicresource_regrowth = 'none',
    bats_setting = 'default',
    bearger = 'default',
    beefalo = 'default',
    beefaloheat = 'default',
    beequeen = 'default',
    bees = 'default',
    bees_setting = 'default',
    berrybush = 'default',
    birds = 'default',
    boons = 'default',
    branching = 'default',
    brightmarecreatures = 'default',
    bunnymen_setting = 'default',
    butterfly = 'default',
    buzzard = 'default',
    cactus = 'default',
    cactus_regrowth = 'default',
    carrot = 'default',
    carrots_regrowth = 'default',
    catcoon = 'default',
    catcoons = 'default',
    chess = 'default',
    cookiecutters = 'default',
    crabking = 'default',
    crow_carnival = 'default',
    darkness = 'default',
    day = 'default',
    deciduousmonster = 'default',
    deciduoustree_regrowth = 'default',
    deerclops = 'default',
    dragonfly = 'default',
    dropeverythingondespawn = 'default',
    evergreen_regrowth = 'default',
    extrastartingitems = 'default',
    eyeofterror = 'default',
    fishschools = 'default',
    flint = 'default',
    flowers = 'default',
    flowers_regrowth = 'default',
    frograin = 'default',
    frogs = 'default',
    fruitfly = 'default',
    ghostenabled = 'always',
    ghostsanitydrain = 'always',
    gnarwail = 'default',
    goosemoose = 'default',
    grass = 'default',
    grassgekkos = 'default',
    hallowed_nights = 'default',
    has_ocean = true,
    healthpenalty = 'always',
    hound_mounds = 'default',
    houndmound = 'default',
    hounds = 'default',
    hunger = 'default',
    hunt = 'default',
    keep_disconnected_tiles = true,
    klaus = 'default',
    krampus = 'default',
    layout_mode = 'LinkNodesByKeys',
    lessdamagetaken = 'none',
    liefs = 'default',
    lightcrab_portalrate = 'default',
    lightning = 'default',
    lightninggoat = 'default',
    loop = 'default',
    lureplants = 'default',
    malbatross = 'default',
    marshbush = 'default',
    merm = 'default',
    merms = 'default',
    meteorshowers = 'default',
    meteorspawner = 'default',
    moles = 'default',
    moles_setting = 'default',
    monkeytail_portalrate = 'default',
    moon_berrybush = 'default',
    moon_bullkelp = 'default',
    moon_carrot = 'default',
    moon_fissure = 'default',
    moon_fruitdragon = 'default',
    moon_hotspring = 'default',
    moon_rock = 'default',
    moon_sapling = 'default',
    moon_spider = 'default',
    moon_spiders = 'default',
    moon_starfish = 'default',
    moon_tree = 'default',
    moon_tree_regrowth = 'default',
    mosquitos = 'default',
    mushroom = 'default',
    mutated_hounds = 'default',
    no_joining_islands = true,
    no_wormholes_to_disconnected_tiles = true,
    ocean_bullkelp = 'default',
    ocean_seastack = 'ocean_default',
    ocean_shoal = 'default',
    ocean_waterplant = 'ocean_default',
    ocean_wobsterden = 'default',
    palmcone_seed_portalrate = 'default',
    palmconetree = 'default',
    palmconetree_regrowth = 'default',
    penguins = 'default',
    penguins_moon = 'default',
    perd = 'default',
    petrification = 'default',
    pigs = 'default',
    pigs_setting = 'default',
    pirateraids = 'default',
    ponds = 'default',
    portal_spawnrate = 'default',
    portalresurection = 'none',
    powder_monkey_portalrate = 'default',
    prefabswaps_start = 'default',
    rabbits = 'default',
    rabbits_setting = 'default',
    reeds = 'default',
    reeds_regrowth = 'default',
    regrowth = 'default',
    resettime = 'default',
    rifts_enabled = 'default',
    rifts_frequency = 'default',
    roads = 'default',
    rock = 'default',
    rock_ice = 'default',
    saltstack_regrowth = 'default',
    sapling = 'default',
    season_start = 'default',
    seasonalstartingitems = 'default',
    shadowcreatures = 'default',
    sharks = 'default',
    spawnmode = 'fixed',
    spawnprotection = 'default',
    specialevent = 'default',
    spider_warriors = 'default',
    spiderqueen = 'default',
    spiders = 'default',
    spiders_setting = 'default',
    spring = 'default',
    squid = 'default',
    stageplays = 'default',
    start_location = 'default',
    summer = 'default',
    summerhounds = 'default',
    tallbirds = 'default',
    task_set = 'tiny_forest_set',
    temperaturedamage = 'default',
    tentacles = 'default',
    terrariumchest = 'default',
    touchstone = 'default',
    trees = 'default',
    tumbleweed = 'default',
    twiggytrees_regrowth = 'default',
    walrus = 'default',
    walrus_setting = 'default',
    wasps = 'default',
    weather = 'default',
    wildfires = 'default',
    winter = 'default',
    winterhounds = 'default',
    winters_feast = 'default',
    wobsters = 'default',
    world_size = 'small',
    wormhole_prefab = 'wormhole',
    year_of_the_beefalo = 'default',
    year_of_the_bunnyman = 'default',
    year_of_the_carrat = 'default',
    year_of_the_catcoon = 'default',
    year_of_the_gobbler = 'default',
    year_of_the_pig = 'default',
    year_of_the_varg = 'default',
  },
  random_set_pieces = {
    'Sculptures_2',
    'Sculptures_3',
    'Sculptures_4',
    'Sculptures_5',
    'Chessy_1',
    'Chessy_2',
    'Chessy_3',
    'Chessy_4',
    'Chessy_5',
    'Chessy_6',
    'Maxwell1',
    'Maxwell2',
    'Maxwell3',
    'Maxwell4',
    'Maxwell6',
    'Maxwell7',
    'Warzone_1',
    'Warzone_2',
    'Warzone_3',
  },
  required_prefabs = {
    'multiplayer_portal',
  },
  required_setpieces = {
    'Sculptures_1',
    'Maxwell5',
  },
  settings_desc = '比标准《饥荒》地图尺寸更小的完整生态体验。',
  settings_id = 'SURVIVAL_TOGETHER_TINY',
  settings_name = '迷你世界',
  substitutes = {},
  version = 2,
  worldgen_desc = '比标准《饥荒》地图尺寸更小的完整生态体验。',
  worldgen_id = 'SURVIVAL_TOGETHER_TINY',
  worldgen_name = '迷你世界',
}
`

export default () => {
    const [levelList, setLevelList] = useState([
        {
            id: 1,
            name: '森林',
            leveldataoverride: defaultLeveldataoverride,
            modoverrides: "return {}",
            serverIni: {
                id: 1,
                server_port: 10089,
            }
        }
    ])
    const [index, setIndex] = useState(0)
    const {token: {colorBgContainer},} = theme.useToken();

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
    useEffect(() => {
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                setDstWorldSetting(data)
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            })
    }, [])

    function addLevel() {
        setLevelList(current => {
            const newLevel = {
                name: `test ${Math.random()}`,
                leveldataoverride: `return {${Math.random()}}`,
                modoverrides: "return {}",
                serverIni: {
                    id: 1,
                    server_port: 10089,
                }
            }
            return [...current, newLevel]
        })
    }

    // 删除选中的元素
    const removeLevel = (currentIndex) => {
        setLevelList(prevArray => prevArray.filter((_, i) => currentIndex !== i));
    };

    useEffect(() => {

    }, [])

    function setLeveldataoverride(i, newValue) {
        setLevelList(current => {
            current.forEach((item, index) => {
                if (index === i) {
                    item.leveldataoverride = newValue
                }
            })
            return [...current]
        })
    }

    function setModoverrides(i, newValue) {
        setLevelList(current => {
            current.forEach((item, index) => {
                if (index === i) {
                    item.modoverrides = newValue
                }
            })
            return [...current]
        })
    }

    const tabs = [
        {
            key: '1',
            label: `世界配置`,
            // eslint-disable-next-line react/jsx-no-bind
            children: <Leveldataoverride setLeveldataoverride={setLeveldataoverride} index={index}
                                         dstWorldSetting={dstWorldSetting} level={levelList[index]}/>
        },
        {
            key: '2',
            label: `模组配置`,
            // eslint-disable-next-line react/jsx-no-bind
            children: <Modoverrides setModoverrides={setModoverrides} index={index} level={levelList[index]}/>
        }
    ]

    return (
        <div style={{
            height: '64vh',
        }}>
            <Space size={16} wrap>
                <Button type={'primary'} onClick={() => {
                    addLevel()
                }}>添加世界</Button>

                <Button type={'primary'} onClick={() => {
                    console.log(levelList)
                }}>保存配置</Button>

                <span>世界个数: {levelList.length}</span>
            </Space>
            {levelList.length > 0 && (
                <Layout
                    style={{
                        padding: '12px 0',
                        background: colorBgContainer,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            style={{
                                height: '100%',
                            }}
                            onClick={({key, keyPath, domEvent}) => {
                                setIndex(parseInt(key, 10))
                            }}
                            items={levelList.map((level, index) => ({
                                key: index,
                                label: level.name
                            }))}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 400,
                        }}
                    >
                        {index !== null && (
                            <>
                                {levelList[index] !== undefined && (
                                    <>
                                        <span style={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                        }}>{levelList[index].name}</span>
                                        <br/>
                                        <Tabs
                                            defaultActiveKey="1"
                                            // tabPosition={mod}
                                            items={tabs}
                                        />
                                        {/*
                                        <Leveldataoverride
                                            setLevel={(i, newValue)=>{
                                                console.log(i, newValue)
                                                setLevelList(current=>{
                                                    current.forEach((item, index)=>{
                                                        if (index === i) {
                                                            item.leveldataoverride = newValue
                                                        }
                                                    })
                                                    console.log("set state", current)
                                                    return [...current]
                                                })
                                            }}
                                            index={index}
                                            dstWorldSetting={dstWorldSetting}
                                            level={levelList[index]} />
                                        */}
                                    </>
                                )}
                                <br/><br/>
                                <Button type={"primary"} onClick={() => {
                                    removeLevel(index)
                                }}>删除</Button>
                            </>
                        )}

                    </Content>
                </Layout>
            )}
            {levelList.length === 0 && (
                <>
                    <br/><br/>
                    <span>暂无世界</span>
                </>
            )}
        </div>
    )
}

const Leveldataoverride = ({index, level, setLeveldataoverride, dstWorldSetting}) => {

    const onChange = (e) => {
        // console.log('Change:', e.target.value);
        setLeveldataoverride(index, e.target.value)
    };

    return (<>
        <span>
            <TextArea
                rows={10}
                value={level.leveldataoverride}
                onChange={onChange}
            />
        </span>
    </>)

}

const Modoverrides = ({index, level, setModoverrides}) => {

    const onChange = (e) => {
        // console.log('Change:', e.target.value);
        setModoverrides(index, e.target.value)
    };

    return (<>
        <TextArea
            rows={10}
            value={level.modoverrides}
            onChange={onChange}
        />
    </>)

}