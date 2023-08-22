import {useEffect, useRef, useState} from "react";

import {Switch} from "antd";

import ConfigEditor from "./ConfigEditor";
import ConfigViewEditor from "./ConfigViewEditor";


const  leveldataoverride = `
return {
\tdesc = "永不结束的饥荒沙盒模式。\\永远可以在绚丽之门复活。",
\thideminimap = false,
\tid = "ENDLESS",
\tlocation = "forest",
\tmax_playlist_position = 999,
\tmin_playlist_position = 0,
\tname = "无尽",
\tnumrandom_set_pieces = 4,
\toverride_level_string = false,
\toverrides = {    alternatehunt = "default",    angrybees = "default",    antliontribute = "default",    autumn = "default",    bananabush_portalrate = "default",    basicresource_regrowth = "always",    bats_setting = "default",    bearger = "default",    beefalo = "default",    beefaloheat = "default",    beequeen = "default",    bees = "default",    bees_setting = "default",    berrybush = "default",    birds = "default",    boons = "default",    branching = "default",    brightmarecreatures = "default",    bunnymen_setting = "default",    butterfly = "default",    buzzard = "default",    cactus = "default",    cactus_regrowth = "default",    carrot = "default",    carrots_regrowth = "default",    catcoon = "default",    catcoons = "default",    chess = "default",    cookiecutters = "default",    crabking = "default",    crow_carnival = "default",    darkness = "default",    day = "default",    deciduousmonster = "default",    deciduoustree_regrowth = "default",    deerclops = "default",    dragonfly = "default",    dropeverythingondespawn = "default",    evergreen_regrowth = "default",    extrastartingitems = "default",    eyeofterror = "default",    fishschools = "default",    flint = "default",    flowers = "default",    flowers_regrowth = "default",    frograin = "default",    frogs = "default",    fruitfly = "default",    ghostenabled = "always",    ghostsanitydrain = "none",    gnarwail = "default",    goosemoose = "default",    grass = "default",    grassgekkos = "default",    hallowed_nights = "default",    has_ocean = true,    healthpenalty = "always",    hound_mounds = "default",    houndmound = "default",    hounds = "default",    hunger = "default",    hunt = "default",    keep_disconnected_tiles = true,    klaus = "default",    krampus = "default",    layout_mode = "LinkNodesByKeys",    lessdamagetaken = "none",    liefs = "default",    lightcrab_portalrate = "default",    lightning = "default",    lightninggoat = "default",    loop = "default",    lureplants = "default",    malbatross = "default",    marshbush = "default",    merm = "default",    merms = "default",    meteorshowers = "default",    meteorspawner = "default",    moles = "default",    moles_setting = "default",    monkeytail_portalrate = "default",    moon_berrybush = "default",    moon_bullkelp = "default",    moon_carrot = "default",    moon_fissure = "default",    moon_fruitdragon = "default",    moon_hotspring = "default",    moon_rock = "default",    moon_sapling = "default",    moon_spider = "default",    moon_spiders = "default",    moon_starfish = "default",    moon_tree = "default",    moon_tree_regrowth = "default",    mosquitos = "default",    mushroom = "default",    mutated_hounds = "default",    no_joining_islands = true,    no_wormholes_to_disconnected_tiles = true,    ocean_bullkelp = "default",    ocean_seastack = "ocean_default",    ocean_shoal = "default",    ocean_waterplant = "ocean_default",    ocean_wobsterden = "default",    palmcone_seed_portalrate = "default",    palmconetree = "default",    palmconetree_regrowth = "default",    penguins = "default",    penguins_moon = "default",    perd = "default",    petrification = "default",    pigs = "default",    pigs_setting = "default",    pirateraids = "default",    ponds = "default",    portal_spawnrate = "default",    portalresurection = "always",    powder_monkey_portalrate = "default",    prefabswaps_start = "default",    rabbits = "default",    rabbits_setting = "default",    reeds = "default",    reeds_regrowth = "default",    regrowth = "default",    resettime = "none",    rifts_enabled = "default",    rifts_frequency = "default",    roads = "default",    rock = "default",    rock_ice = "default",    saltstack_regrowth = "default",    sapling = "default",    season_start = "default",    seasonalstartingitems = "default",    shadowcreatures = "default",    sharks = "default",    spawnmode = "fixed",    spawnprotection = "default",    specialevent = "default",    spider_warriors = "default",    spiderqueen = "default",    spiders = "default",    spiders_setting = "default",    spring = "default",    squid = "default",    stageplays = "default",    start_location = "default",    summer = "default",    summerhounds = "default",    tallbirds = "default",    task_set = "default",    temperaturedamage = "default",    tentacles = "default",    terrariumchest = "default",    touchstone = "default",    trees = "default",    tumbleweed = "default",    twiggytrees_regrowth = "default",    walrus = "default",    walrus_setting = "default",    wasps = "default",    weather = "default",    wildfires = "never",    winter = "default",    winterhounds = "default",    winters_feast = "default",    wobsters = "default",    world_size = "default",    wormhole_prefab = "wormhole",    year_of_the_beefalo = "default",    year_of_the_bunnyman = "default",    year_of_the_carrat = "default",    year_of_the_catcoon = "default",    year_of_the_gobbler = "default",    year_of_the_pig = "default",    year_of_the_varg = "default"},
\tplaystyle = "endless",
\trandom_set_pieces = {
\t\t"Sculptures_2",
\t\t"Sculptures_3",
\t\t"Sculptures_4",
\t\t"Sculptures_5",
\t\t"Chessy_1",
\t\t"Chessy_2",
\t\t"Chessy_3",
\t\t"Chessy_4",
\t\t"Chessy_5",
\t\t"Chessy_6",
\t\t"Maxwell1",
\t\t"Maxwell2",
\t\t"Maxwell3",
\t\t"Maxwell4",
\t\t"Maxwell6",
\t\t"Maxwell7",
\t\t"Warzone_1",
\t\t"Warzone_2",
\t\t"Warzone_3"
\t},
\trequired_prefabs = {
\t\t"multiplayer_portal"
\t},
\trequired_setpieces = {
\t\t"Sculptures_1",
\t\t"Maxwell5"
\t},
\tsettings_desc = "永不结束的饥荒沙盒模式。\\永远可以在绚丽之门复活。",
\tsettings_id = "ENDLESS",
\tsettings_name = "无尽",
\tsubstitutes = {  },
\tversion = 4,
\tworldgen_desc = "永不结束的饥荒沙盒模式。\\永远可以在绚丽之门复活。",
\tworldgen_id = "ENDLESS",
\tworldgen_name = "无尽"
}
`

export default () => {

    const ref = useRef(leveldataoverride)
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

    const [view, setView] = useState(true)
    function changeView(value) {
        setView(value)
    }

    useEffect(() => {
        // 获取用户的 Overrides
        // setUserOverrides()

        // 获取世界默认配置文件
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                setDstWorldSetting(data)
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            })

    }, [])
    return (
        <>
            <Switch
                checkedChildren={"编辑"} unCheckedChildren={"可视化"}
                onClick={(checked, event) => setView(checked)}
                checked={view}
                defaultChecked={view}/>
            {view && <ConfigEditor valueRef={ref} />}
            {!view && <ConfigViewEditor valueRef={ref}  dstWorldSetting={dstWorldSetting} />}
        </>
    )

}