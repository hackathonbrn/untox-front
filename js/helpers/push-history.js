export default (code, title, path) => {
    let stateObj = { 
        code
    };
    history.pushState(stateObj, title, `${path}/${code}/`);
}
