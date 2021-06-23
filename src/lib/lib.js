const typeOf = ['number', 'function', 'string', 'undefined', "symbol", "object"]
const initType = { array: d => Array.isArray(d), null: d => d === null }

const is = (typeStr) => typeOf.reduce((typeObj, type) => Object.assign(typeObj, { [type]: d => typeof d === type }), { ...initType })[typeStr]

const isNumber = is('number')
const isString = is('string')
const isArray = is('array')
const isUndef = is('undefined')


const loop = obj => f => Object.values(obj).map((data, i) => f(data, i, obj))

const If = condition => f =>
{
    if (condition) return f()
    else return ({ else: (f) => f() })
}

const setChildren = (el, children) =>
{
    if (children === undefined) return el
    children = !Array.isArray(children) ? [children] : children

    for (const child of children)
    {
        if (typeof child === 'string')
        {
            el.appendChild(document.createTextNode(child))
        }
        else if (isArray(child))
        {
            setChildren(el, child)
        }
        else el.appendChild(child)
    }

    return el
}

const setAttr = (el, attr) =>
{
    for (const key in attr)
    {
        const value = attr[key]

        if (typeof value === 'string')
        {
            el.setAttribute(key, value)
        }
        else el[key] = value
    }

    return el
}

const isChildren = (data) => isArray(data) || isString(data) || "nodeName" in data

const setProps = (cons, initProps) => (attr, children) =>
    isChildren(attr)
        ? cons(Object.assign({}, initProps), attr)
        : cons(Object.assign({ ...initProps }, attr), children)


const createElement = (tag, attr, children) =>
{
    const el = document.createElement(tag)
    setAttr(el, attr ?? {})
    setChildren(el, children ?? [])
    return el
}

const create = (tag, initProps) =>
{
    // 아래 예시와 같이 돔트리를 구성할 수 있게
    // const div = $('div')
    // const span = $('span')
    // const h1 = $('h1')
    // const container = $('div', { class: "container" })

    // container({ id: "main-container" }, [
    //     container([
    //         h1("Title"),
    //         div([
    //             span("any text"),
    //             span({ class: "span2" }, "any text"),
    //         ])
    //     ])
    // ])
    const constructor = (attr, children) => isChildren(attr)
        ? createElement(tag, {}, attr)
        : createElement(tag, attr, children)

    if (initProps) return setProps(constructor, initProps)

    return constructor

}
const mount = (target, comp) =>
{
    comp.subscribe(() =>
    {
        target.innerHTML = "";
        target.appendChild(comp.render());
    });
}

const renderTo = (target, comp) =>
{
    target.innerHTML = "";
    target.appendChild(comp)
}

const fragment = (children) => setChildren(document.createDocumentFragment(), children);


export { loop, If, fragment, create, renderTo, mount, }