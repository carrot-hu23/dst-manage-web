import { useEffect, useState } from 'react';

import { Row, Col, Card } from 'antd';
import ModItem from './modItem';
import ModDetail from './modConfig';

const ModSelect = () => {

    const [mod, setMod] = useState({})

    const [modList, setModList] = useState([])

    const changeMod = (mod) => {
        setMod(mod)
    }

    const changeEnable = (modId) => {
        console.log('modId', modId);
        // eslint-disable-next-line no-restricted-syntax
        for (const mod of modList) {
            if (mod.modId === modId) {
                mod.enable = !mod.enable
            }
        }
        console.log('modList', modList);

        setModList([...modList])
    }

    useEffect(() => {
        const modData = [
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            },
            {
                modId: 1216718131,
                author: "大大果汁",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/',
                modName: '防卡两招',
                modDescription: '能够把掉落物自动堆叠，同时定期清理服务器。抄自『河蟹防熊锁』。',
                enable: true,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "stack",
                        "label": "自动堆叠(Stacking)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "掉落相同的物品会 boom 的一声堆叠起来。\n            Auto stack the same loots.",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "clean",
                        "label": "自动清理(Cleaning)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "hover": "每过 10 天自动清理服务器无用物品。\n            All servers clean every 10 days",
                                "description": "开"
                            },
                            {
                                "data": false,
                                "hover": "啥事儿都不发生。Nothing will happen.",
                                "description": "关"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "语言(Language)",
                        "default": true,
                        "options": [
                            {
                                "data": true,
                                "description": "中文"
                            },
                            {
                                "data": false,
                                "description": "English"
                            }
                        ]
                    }
                ]
            }, {

                modId: 666155465,
                author: "Show Me (Origin)",
                modImg: 'https://steamuserimages-a.akamaihd.net/ugc/262711712242514641/CCBF1A5AE427AA31DD8CA4415D4162AF6EEAF843/',
                modName: 'Show Me (Origin)',
                modDescription: '0.58',
                enable: false,
                version: "0.58",
                configurationOptions: [
                    {
                        "name": "food_style",
                        "label": "Food Style",
                        "default": 0,
                        "options": [
                            {
                                "data": 0,
                                "hover": "Default is \"long\"",
                                "description": "undefined"
                            },
                            {
                                "data": 1,
                                "hover": "Hunger: +12.5 / Sanity: -10 / Health: +3",
                                "description": "long"
                            },
                            {
                                "data": 2,
                                "hover": "+12.5 / -10 / +3",
                                "description": "short"
                            }
                        ]
                    },
                    {
                        "name": "food_order",
                        "label": "Food Properties Order",
                        "default": 0,
                        "options": [
                            {
                                "data": 0,
                                "hover": "Default if \"interface\"",
                                "description": "Indefined"
                            },
                            {
                                "data": 1,
                                "hover": "Hunger / Sanity / Health",
                                "description": "Interface"
                            },
                            {
                                "data": 2,
                                "hover": "Health / Hunger / Sanity",
                                "description": "Wikia"
                            }
                        ]
                    },
                    {
                        "name": "food_estimation",
                        "hover": "Should we estimate the stale status?",
                        "label": "Estimate Stale Status",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "hover": "Yes, and users may override this option.",
                                "description": "Undefined"
                            },
                            {
                                "data": 0,
                                "hover": "No, but users may override this option.",
                                "description": "No"
                            },
                            {
                                "data": 1,
                                "hover": "Yes, but users may override this option.",
                                "description": "Yes"
                            }
                        ]
                    },
                    {
                        "name": "show_food_units",
                        "hover": "For example, units of meat, units of veggie etc.",
                        "label": "Show Food Units",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "hover": "Yes, and users may override this option.",
                                "description": "Undefined"
                            },
                            {
                                "data": 0,
                                "hover": "No, but users may override this option.",
                                "description": "No"
                            },
                            {
                                "data": 1,
                                "hover": "Yes, but users may override this option.",
                                "description": "Yes"
                            },
                            {
                                "data": 2,
                                "hover": "Server won't send food info to clients and their settings will not matter.",
                                "description": "Forbidden"
                            }
                        ]
                    },
                    {
                        "name": "show_uses",
                        "hover": "",
                        "label": "Show Tools Uses",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "hover": "Yes, and users may override this option.",
                                "description": "Undefined"
                            },
                            {
                                "data": 0,
                                "hover": "No, but users may override this option.",
                                "description": "No"
                            },
                            {
                                "data": 1,
                                "hover": "Yes, but users may override this option.",
                                "description": "Yes"
                            },
                            {
                                "data": 2,
                                "hover": "Server won't send this info to the clients and their settings will not matter.",
                                "description": "Forbidden"
                            }
                        ]
                    },
                    {
                        "name": "lang",
                        "label": "Language",
                        "default": "auto",
                        "options": [
                            {
                                "data": "auto",
                                "hover": "Detect Language Pack",
                                "description": "Auto"
                            },
                            {
                                "data": "en",
                                "hover": "English",
                                "description": "en"
                            },
                            {
                                "data": "ru",
                                "hover": "Russian",
                                "description": "ru"
                            },
                            {
                                "data": "chs",
                                "hover": "Simplified Chinese",
                                "description": "chs"
                            },
                            {
                                "data": "cht",
                                "hover": "Traditional Chinese",
                                "description": "cht"
                            },
                            {
                                "data": "br",
                                "hover": "Brazilian Portuguese",
                                "description": "br"
                            },
                            {
                                "data": "pl",
                                "hover": "Polish",
                                "description": "pl"
                            },
                            {
                                "data": "kr",
                                "hover": "Korean",
                                "description": "kr"
                            },
                            {
                                "data": "es",
                                "hover": "Spanish",
                                "description": "es"
                            }
                        ]
                    },
                    {
                        "name": "display_hp",
                        "label": "Display HP",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "hover": "Depends on installed mods.",
                                "description": "Auto"
                            },
                            {
                                "data": 0,
                                "hover": "No, but users may override this option.",
                                "description": "No"
                            },
                            {
                                "data": 1,
                                "hover": "Yes, but users may override this option.",
                                "description": "Yes"
                            },
                            {
                                "data": 2,
                                "hover": "Server won't send this info to the clients and their settings will not matter.",
                                "description": "Forbidden"
                            }
                        ]
                    },
                    {
                        "name": "chestR",
                        "hover": "This is red component of highlighted chests color.",
                        "label": "Chest Col (Red)",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "description": "Auto"
                            },
                            {
                                "data": 0,
                                "description": "0%"
                            },
                            {
                                "data": 0.1,
                                "description": "10%"
                            },
                            {
                                "data": 0.2,
                                "description": "20%"
                            },
                            {
                                "data": 0.3,
                                "description": "30%"
                            },
                            {
                                "data": 0.4,
                                "description": "40%"
                            },
                            {
                                "data": 0.5,
                                "description": "50%"
                            },
                            {
                                "data": 0.6,
                                "description": "60%"
                            },
                            {
                                "data": 0.7,
                                "description": "70%"
                            },
                            {
                                "data": 0.8,
                                "description": "80%"
                            },
                            {
                                "data": 0.9,
                                "description": "90%"
                            },
                            {
                                "data": 1,
                                "description": "100%"
                            }
                        ]
                    },
                    {
                        "name": "chestG",
                        "hover": "This is green component of highlighted chests color.",
                        "label": "Chest Col (Green)",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "description": "Auto"
                            },
                            {
                                "data": 0,
                                "description": "0%"
                            },
                            {
                                "data": 0.1,
                                "description": "10%"
                            },
                            {
                                "data": 0.2,
                                "description": "20%"
                            },
                            {
                                "data": 0.3,
                                "description": "30%"
                            },
                            {
                                "data": 0.4,
                                "description": "40%"
                            },
                            {
                                "data": 0.5,
                                "description": "50%"
                            },
                            {
                                "data": 0.6,
                                "description": "60%"
                            },
                            {
                                "data": 0.7,
                                "description": "70%"
                            },
                            {
                                "data": 0.8,
                                "description": "80%"
                            },
                            {
                                "data": 0.9,
                                "description": "90%"
                            },
                            {
                                "data": 1,
                                "description": "100%"
                            }
                        ]
                    },
                    {
                        "name": "chestB",
                        "hover": "This is blue component of highlighted chests color.",
                        "label": "Chest Col (Blue)",
                        "default": -1,
                        "options": [
                            {
                                "data": -1,
                                "description": "Auto"
                            },
                            {
                                "data": 0,
                                "description": "0%"
                            },
                            {
                                "data": 0.1,
                                "description": "10%"
                            },
                            {
                                "data": 0.2,
                                "description": "20%"
                            },
                            {
                                "data": 0.3,
                                "description": "30%"
                            },
                            {
                                "data": 0.4,
                                "description": "40%"
                            },
                            {
                                "data": 0.5,
                                "description": "50%"
                            },
                            {
                                "data": 0.6,
                                "description": "60%"
                            },
                            {
                                "data": 0.7,
                                "description": "70%"
                            },
                            {
                                "data": 0.8,
                                "description": "80%"
                            },
                            {
                                "data": 0.9,
                                "description": "90%"
                            },
                            {
                                "data": 1,
                                "description": "100%"
                            }
                        ]
                    }
                ]
            }]
        setModList(modData)

        setMod(modData[0])
    }, [])

    return (<Row gutter={24}>
        <Col span={8} xs={24} md={8} lg={8}>
            <div style={{
                height: '500px',
                overflowY: 'auto',
                overflowX: 'auto'
            }}>
                <Card style={{ padding: '24px' }}>
                    {modList.map(item => <ModItem
                        key={item.modId}
                        mod={item}
                        changeMod={changeMod}
                        changeEnable={changeEnable}
                    />)}
                </Card>
            </div>

        </Col>
        <Col span={14} xs={24} md={14} lg={14}>
            <ModDetail mod={mod} />
        </Col>
    </Row>)
}

export default ModSelect
