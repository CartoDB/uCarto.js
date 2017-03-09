import { createMapFromURL } from './carto';

const Carto = function (container) {
    let frame = null;

    if (typeof container === 'string') {
        frame = document.getElementById(container);
    }
    else {
        frame = container;
    }

    return {
        createMapFromURL: createMapFromURL(container)
    };
};


module.exports = Carto;