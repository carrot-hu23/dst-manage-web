const dstRolesMap = {
    wendy: '温蒂',
    wilson: '威尔逊',
    willow: '薇洛',
    wolfgang: '沃尔夫冈',
    wx78: 'WX-78',
    wickerbottom: '薇克巴顿',
    woodie: '伍迪',
    wes: '韦斯',
    waxwell: '麦斯威尔',
    wathgrithr: '薇格弗德',
    webber: '韦伯',
    winona: '薇诺娜',
    warly: '沃利',
    walter: '沃尔特',
    wortox: '沃拓克斯',
    wormwood: '沃姆伍德',
    wurt: '沃特',
    wanda: '旺达',
    wonkey: '芜猴',
    mod: '模组角色',
    "": '未知角色',

}
const dstRolesMap2 = {
    '温蒂': 'wendy',
    '威尔逊': 'wilson',
    '薇洛': 'willow',
    '沃尔夫冈': 'wolfgang',
    'WX-78': 'WX-78',
    '薇克巴顿': 'wickerbottom',
    '伍迪': 'woodie',
    '韦斯': 'wes',
    '麦斯威尔': 'waxwell',
    '薇格弗德': 'wathgrithr',
    '韦伯': 'webber',
    '薇诺娜': 'winona',
    '沃利': 'warly',
    '沃尔特': 'walter',
    '沃拓克斯': 'wortox',
    '沃姆伍德': 'wormwood',
    '沃特': 'wurt',
    '旺达': 'wanda',
    '芜猴': 'wonkey',
    '模组角色': 'mod',
    "未知角色": '',
}
const dstRoles = {
    wendy: './assets/dst/wendy_inv.png',
    wilson: './assets/dst/wilson_inv.png',
    willow: './assets/dst/willow_inv.png',
    wolfgang: './assets/dst/wolfgang_inv.png',
    wx78: './assets/dst/wx78_inv.png',
    wickerbottom: './assets/dst/wickerbottom_inv.png',
    woodie: './assets/dst/woodie_inv.png',
    wes: './assets/dst/wes_inv.png',
    waxwell: './assets/dst/waxwell_inv.png',
    wathgrithr: './assets/dst/wathgrithr_inv.png',
    webber: './assets/dst/webber_inv.png',
    winona: './assets/dst/winona_inv.png',
    warly: './assets/dst/warly_inv.png',
    walter: './assets/dst/walter_inv.png',
    wortox: './assets/dst/wortox_inv.png',
    wormwood: './assets/dst/wormwood_inv.png',
    wurt: './assets/dst/wurt_inv.png',
    wanda: './assets/dst/wanda_inv.png',
    wonkey: './assets/dst/wonkey_inv.png',
    mod: './assets/dst/mod_ch_inv.png',
    "": './assets/dst/unknown_ch_inv.png',

}

const customization = "customization"

// 选择服务器的游戏风格。
const dstGameMod = [
    {
        cn: '无尽',
        name: 'endless',
        description: `永不结束的饥荒沙盒模式。\n
        永远可以在绚丽之门复活。\n
        `
    },
    {
        cn: '生存',
        name: 'survival',
        description: `标准《饥荒》体验。\n`
    },
    {
        cn: '荒野',
        name: 'wilderness',
        description: `外面就是荒野,充满了危险!\n
        随机进入世界的一个地方。
        死亡之后:选一名新冒险家试一下、再试一下。\n
        `
    },
    {
        cn: '暗无天日',
        name: 'lightsout',
        description: `在标准《饥荒》体验的基础上添加黑暗基调。\n
        `
    },
    {
        cn: '熔炉',
        name: 'lavaarena',
        description: `伴随着远古传送门的激活，我们的幸存者发现自己现在被困在一个充满敌意的战火世界里。 如果他们还怀抱着回家的渺茫希望，那就需要团结起来击败战神普格纳的军队以及他的王牌——大熔炉猪战士。\n
        `
    },
    {
        cn: '暴食',
        name: 'quagmire',
        description: `好不容易逃出了熔火大门後，我們的求生者們進到了一個被饥饿的野獸所統治的城市遺跡中。合作煮出美味的料理以緩解噬咬永無止盡的飢餓，避免受到可怕詛咒的折磨。煮出來的料理夠好吃，說不定你還可以回到原本的世界\n
        (tips: 暴食模式需要关闭无人暂停)
        `
    },
    {
        cn: '海钓模式',
        name: 'OceanFishing',
        description: `海钓随机物品\n
        `
    },
    {
        cn: '闯关模式',
        name: 'starvingfloor',
        description: `饥荒单机版的闯关模式\n
        `
    },
    {
        cn: '自定义模式',
        name: customization,
        description: `自定义模式\n
        `
    },

]

export {
    dstRoles, dstGameMod,customization, dstRolesMap, dstRolesMap2
}