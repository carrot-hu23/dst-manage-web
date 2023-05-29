import luaparse from 'luaparse';

const parseOverridesObject = (lua) => {
    const ast = luaparse.parse(lua);
    const overrides = ast.body[0].arguments[0].fields.filter(item => item.key.name === 'overrides')
    const overridesObject = overrides[0].value.fields.reduce((acc, field) => {
        acc[field.key.name] = field.value.name === 'StringLiteral' ? field.value.value : field.value.raw.replace(/"/g, "");
        return acc;
    }, {});
    // console.log('overridesObject', overridesObject);
    return overridesObject
}

function configItem2Object(data) {
    const sortedKeys = Object.keys(data).sort((a, b) => data[a].order - data[b].order);
    const m = {}
    sortedKeys.forEach(key => {
        Object.entries(data[key].items).forEach(([key2, value]) => {
            m[key2] = value.value
        })
    })
    return m
}

export {
    parseOverridesObject,
    configItem2Object
}