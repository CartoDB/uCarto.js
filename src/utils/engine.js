import { composeP, pick, prop, map, merge, addIndex, curry } from 'ramda';
import { jsonp } from './request';

export const getMapData = jsonp;

export const getLayersData = composeP(
    prop('layers'),
    prop('metadata'),
    jsonp
);

export const getInitalMapData = (url) => getMapData(url).then(
    json => getLayersData(url).then(
        layers => json.layers = addIndex(map)((ly, i) => merge(layers[i]), json.layers)
    )
);

// This methos update the style of a layer in the maps api
export const updateLayerStyle = () => {};