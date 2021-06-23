const typeOf = ['number', 'function', 'string', 'undefined', "symbol", "object"]
const initType = { array: d => Array.isArray(d), null: d => d === null }

const is = (typeStr) => typeOf.reduce((typeObj, type) => Object.assign(typeObj, { [type]: d => typeof d === type }), { ...initType })[typeStr]

const isNumber = is('number')
const isString = is('string')
const isArray = is('array')
const isUndef = is('undefined')

