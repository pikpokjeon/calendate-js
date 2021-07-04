const Store = (initialState) =>
{
    let innerState = {
        subscribers: [],
        state: Object.assign({}, initialState)
    }

    const notify = () =>
    {
        innerState.subscribers.forEach(sub => sub());
    }

    const getState = () => Object.assign({}, innerState.state)
    const setState = stateUpdates =>
    {
        innerState.state = Object.assign(Object.assign({}, innerState.state), stateUpdates);
        console.log(innerState.state)
        notify();
    }
    const action = f => (...args) => setState(f(...args, getState()) ?? {})
    const subscribe = (sub) =>
    {
        innerState.subscribers.push(sub);
        notify();
    };

    return { subscribe, getState, setState, action }
}

export { Store }