import { compose, curry } from 'ramda';
import { getMapData } from './utils/engine';
import { loadMap } from './components/map/map';
import { createStore } from './store/store';
import { mainStore } from './store/engine/engineStore';

const Carto = function ( container, config ) {
    // TODO: pass only needed information
    const store = createStore(mainStore);
    const map = loadMap( container, store );

    store.dispatch('initialState', config);

    this.setVisibilityLayer = (layer, visibility) => store.dispatch('setVisibility', {layer, visibility});
    this.getLayerById = store.getLayerById;
    this.getLayer = store.getLayer;
};

const createEmptyMap = function (container) {

};

const createMapFromJSON = function (container, json) {

};

// NOTE: create? or load... it is possible to create maps from
// here?
export const createMapFromURL = curry((container, url) =>
    new Promise(resolve =>
        getMapData(url).then(data =>
            resolve(new Carto(container, data))
        )
    ));
