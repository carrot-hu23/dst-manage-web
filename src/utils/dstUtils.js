import luaparse from "luaparse";
import {Beautify} from "lua-format";

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

function unstring(str) {
    if (typeof str === 'string') {
        return str.replace(/^"(.*)"$/, '$1')
    }
    return str
}

function luaTableToJsObject2(lua) {
    try {
        const ast = luaparse.parse(lua)
        if (ast.body[0].expression !== undefined) {
            console.log("ast.body[0].expression: ", ast.body[0].expression)
            const jsObject = luaTableToJsObject(ast.body[0].expression.arguments)
            console.log("lua expression: ", jsObject)
            return jsObject
        }

        const jsObject = luaTableToJsObject(ast.body[0].arguments[0])
        console.log("lua: ", jsObject)
        return jsObject
    } catch (error) {
        console.log(error)
        return {}
    }

}


function luaTableToJsObject(luaTable) {
    const jsObject = {};
    const list = []
    // eslint-disable-next-line consistent-return
    luaTable.fields.forEach(field => {

        if (field.key !== undefined && field.key.name !== undefined) {
            const key = field.key.name || field.key.value;
            const {value} = field;

            switch (value.type) {
                case 'StringLiteral':
                    jsObject[key] = unstring(value.raw);
                    break;
                case 'BooleanLiteral':
                    jsObject[key] = value.value;
                    break;
                case 'NumericLiteral':
                    jsObject[key] = value.value;
                    break;
                case 'TableConstructorExpression':
                    jsObject[key] = luaTableToJsObject(value);
                    break;
                default:
                    break;
            }
        } else if (field.value.type === "NumericLiteral") {
            list.push(field.value.value)
        } else if (field.value.type === "StringLiteral") {
            if (field.value.value === undefined || field.value.value === null) {
                list.push(unstring(field.value.raw))
            } else {
                list.push(unstring(field.value.value))
            }
        }

        /**
         *
         * else if(field.key !== undefined && field.key.raw !== null) {
         *                 const key = field.key.raw || field.key.raw;
         *                 const {value} = field;
         *
         *                 switch (value.type) {
         *                     case 'StringLiteral':
         *                         jsObject[key] = unstring(value.raw);
         *                         break;
         *                     case 'BooleanLiteral':
         *                         jsObject[key] = value.value;
         *                         break;
         *                     case 'NumericLiteral':
         *                         jsObject[key] = value.value;
         *                         break;
         *                     case 'TableConstructorExpression':
         *                         jsObject[key] = luaTableToJsObject(value);
         *                         break;
         *                     default:
         *                         break;
         *                 }
         *             }
         * */
    });
    if (list.length > 0) {
        return list
    }
    return jsObject;
}


function jsObjectToLuaTable(obj, indent = '') {
    if (typeof obj !== 'object' || obj === null) {
        // 基本类型，直接返回字符串表示
        if (typeof obj === 'string') {
            return `"${obj}"`;
        }
        return String(obj);
    }
    if (Array.isArray(obj)) {
        // 数组
        let result = '{\n';
        const childIndent = `${indent}    `;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < obj.length; i++) {
            const value = jsObjectToLuaTable(obj[i], childIndent);
            result += `${childIndent}[${i + 1}] = ${value},\n`;
        }
        result += `${indent}}`;
        return result;
    }
    // 对象
    let result = '{\n';
    const childIndent = `${indent}    `;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in obj) {
        const value = jsObjectToLuaTable(obj[key], childIndent);
        result += `${childIndent}${key} = ${value},\n`;
    }
    result += `${indent}}`;
    return result;
}


const translateLuaObject = (lua) => {
    try {
        const ast = luaparse.parse(lua);
        const overrides = ast.body[0].arguments[0].fields.filter(item => item.key.name === 'overrides')

        if (overrides.length === 0 ) {
            const o = ast.body[0].arguments[0].fields.filter(item=>{
                if (item.key.name !== undefined) {
                    return item.key.name === 'overrides'
                }
                if (item.key.raw !== undefined) {
                    return  item.key.raw ==='overrides' || item.key.raw.replace(/"/g, "") === 'overrides'
                }
                return false
            })
            console.log("========", o)
            const aa = o[0].value.fields.reduce((acc, field) => {
                if (field.value === undefined) {
                    console.log("00000000", field)
                }
                acc[unstring(field.key.raw)] = field.value.type === 'StringLiteral' ? field.value.raw.replace(/"/g, "") : field.value.raw.replace(/"/g, "");
                return acc;
            }, {});

            console.log("++++++++", aa)

            return aa
        }

        const overridesObject = overrides[0].value.fields.reduce((acc, field) => {
            acc[field.key.name] = field.value.name === 'StringLiteral' ? field.value.value : field.value.raw.replace(/"/g, "");
            return acc;
        }, {});

        console.log('overridesObject', overridesObject);
        return overridesObject
    } catch (error) {
        console.log(error)
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

function beautifyLua(luaCode) {
    const code = Beautify(luaCode, {
        RenameVariables: true,
        RenameGlobals: false,
        SolveMath: true
    })
    const watermark = `--discord.gg/boronide, code generated using luamin.js™\n\n\n\n\n`
    return code.replace(watermark, "")
}

export {
    workShopConfigMap,
    toLeveldataoverride,
    translateLuaObject,
    translateJsonObject,
    luaTableToJsObject,
    jsObjectToLuaTable,
    luaTableToJsObject2,

    beautifyLua,
}