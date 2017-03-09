import { curry } from 'ramda';

export const execIfChange = function (fn) {
    let cache = '';
    return function () {
        let hash = JSON.stringify(arguments);
        if (hash === cache) return;
        cache = hash;
        return fn.apply(null, arguments);
    };
};