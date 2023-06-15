import luaparse from "luaparse";

function workShopConfigMap(modConfig) {

    if (modConfig === undefined || modConfig === null) {
        return new Map()
    }
    try {
        const ast = luaparse.parse(modConfig)
        const workshopListAst = ast.body[0].arguments[0].fields
        // const workshopMap = {}
        const workshopMap = new Map();
        // eslint-disable-next-line no-restricted-syntax
        for (const workshopAst of workshopListAst) {
            const {key} = workshopAst
            const {value} = workshopAst
            const workshopId = key.raw.replace("\n", "")
            const config = {}

            workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), config)
            // eslint-disable-next-line no-restricted-syntax
            for (const field of value.fields) {
                if (field.key.name === 'configuration_options') {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const configItem of field.value.fields) {
                        config[configItem.key.name] = configItem.value.value
                    }
                }
            }
        }
        return workshopMap
    } catch (error) {
        console.log('workshopMap error', error);
        return new Map()
    }
}


function toLeveldataoverride(worldPreset, object) {
    const keys = Object.keys(object)
    let overrides = ""
    keys.forEach(key => {
        overrides += `${key}="${object[key]}",\n\t\t\t\t`
    })

    if (worldPreset === "SURVIVAL_TOGETHER") {
        return `return {
        desc="标准《饥荒》体验。",
        hideminimap=false,
        id="SURVIVAL_TOGETHER",
        location="forest",
        max_playlist_position=999,
        min_playlist_position=0,
        name="生存",
        numrandom_set_pieces=4,
        override_level_string=false,
        overrides = {${`\n\t\t${overrides}\n\t`}},
        playstyle="survival",
        random_set_pieces={
            "Sculptures_2",
            "Sculptures_3",
            "Sculptures_4",
            "Sculptures_5",
            "Chessy_1",
            "Chessy_2",
            "Chessy_3",
            "Chessy_4",
            "Chessy_5",
            "Chessy_6",
            "Maxwell1",
            "Maxwell2",
            "Maxwell3",
            "Maxwell4",
            "Maxwell6",
            "Maxwell7",
            "Warzone_1",
            "Warzone_2",
            "Warzone_3" 
        },
        required_prefabs={ "multiplayer_portal" },
        required_setpieces={ "Sculptures_1", "Maxwell5" },
        settings_desc="标准《饥荒》体验。",
        settings_id="SURVIVAL_TOGETHER",
        settings_name="生存",
        substitutes={  },
        version=4,
        worldgen_desc="标准《饥荒》体验。",
        worldgen_id="SURVIVAL_TOGETHER",
        worldgen_name="生存" 
    \n}`
    }
    // eslint-disable-next-line camelcase
    return `return {
        background_node_range={ 0, 1 },
        desc="探查洞穴…… 一起！",
        hideminimap=false,
        id="DST_CAVE",
        location="cave",
        max_playlist_position=999,
        min_playlist_position=0,
        name="洞穴",
        numrandom_set_pieces=0,
        override_level_string=false,
        overrides = {${`\n\t\t${overrides}\n\t`}},
        required_prefabs={ "multiplayer_portal" },
        settings_desc="探查洞穴…… 一起！",
        settings_id="DST_CAVE",
        settings_name="洞穴",
        substitutes={  },
        version=4,
        worldgen_desc="探查洞穴…… 一起！",
        worldgen_id="DST_CAVE",
        worldgen_name="洞穴" 
    \n}`
}

const translateLuaObject = (lua) => {
    try {
        const ast = luaparse.parse(lua);
        const overrides = ast.body[0].arguments[0].fields.filter(item => item.key.name === 'overrides')
        const overridesObject = overrides[0].value.fields.reduce((acc, field) => {
            acc[field.key.name] = field.value.name === 'StringLiteral' ? field.value.value : field.value.raw.replace(/"/g, "");
            return acc;
        }, {});
        // console.log('overridesObject', overridesObject);
        return overridesObject
    } catch (error) {
        return {}
    }

}

function translateJsonObject(data) {
    try {
        const sortedKeys = Object.keys(data).sort((a, b) => data[a].order - data[b].order);
        const m = {}
        sortedKeys.forEach(key => {
            Object.entries(data[key].items).forEach(([key2, value]) => {
                m[key2] = value.value
            })
        })
        return m
    } catch (error) {
        return {}
    }
}

export {
    workShopConfigMap,
    toLeveldataoverride,
    translateLuaObject,
    translateJsonObject
}