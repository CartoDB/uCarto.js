import { prop, map, forEach, difference, length, identity, compose } from 'ramda';

import { getMapData } from '../../utils/engine';
import { execIfChange } from '../../utils/utils';
import { getProvider } from './base/providers';

// TODO: generalize this

const hasLayerChanged = compose(
    length,
    difference
);

const Map = function ( container, store, {createMap, generateLayerData, setLayersState, goTo} ) {
    window.st = store; // TODO: Provisional hack
    // Instances
    const nativeMap = createMap(container);

    // Internal state
    let layers = [];

    // Internal API
    const goToIf = execIfChange(goTo(nativeMap));
    const setLayers = setLayersState(nativeMap);

    // Data Observer Outside communication
    const obs = store.subscribe((state) => {
        let ds = store.getDataSource(),
            lys = store.getLayers(),
            mapData = store.getMap();

        if (hasLayerChanged(lys, layers)) setLayers(ds, lys);

        goToIf(mapData.center, mapData.zoom);

        layers = lys;
    });
};


export const loadMap = (container, store) => {
    const provider = getProvider(store.getState().map.provider);

    return new Map(container, store, provider);
};
