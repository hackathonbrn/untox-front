export const inWindow = (elems, isInit) => {
    if (elems.length !== 0) {
        let wt = $(window).scrollTop(); // верхняя граница window
        let wh = $(window).height(); // высота window
        let wb = wt + wh; // нижняя граница window
        let result = [];

        elems.each((i, el) => {
            let elem = $(el);
            let offset = elem.offset();
            let et = offset.top; // верхняя граница elem
            let eh = elem.height(); // высота elem
            let eb = et + eh; // нижняя граница elem
            
            if (!isInit && (wt <= et) && (wb + eh / 2 >= eb)) {
                result.push(elem);
            } else if (isInit && (wt <= et) && (et <= wb + eh / 2)) {
                result.push(elem);
            }
        });

        return result;
    }
}
