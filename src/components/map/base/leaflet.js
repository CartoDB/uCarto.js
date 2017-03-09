import { curry, replace, pick, memoize, map, compose, ifElse, propEq, __, find, merge, forEach} from 'ramda';
import { setLayerStyle } from '../../../utils/engine';
import L from 'leaflet';

export const createMap = container => L.map(container);

export const goTo = curry((map, coords, zoom) => map.setView(coords, zoom));

// TODO: handle layer indexed for layer group
export const generateUrl = memoize(datasource => replace('{user}', datasource.user_name, datasource.maps_api_template) +
    '/api/v1/map/named/' + datasource.template_name + '/1/{z}/{x}/{y}.png');

// TODO: reduce cartodb layer type into one with index.
export const generateLayerData = curry((datasource, layer) => {
    return merge({
        url: layer.url || generateUrl(datasource),
    },
    pick([
        'id',
        'visibility'
    ], layer),
    pick([
        'visible',
        'attribution',
        'maxZoom',
        'subdomains',
    ], layer.options));
});

export const setLayersState = function (nativeMap) {
    const layers = [];
    const addOrUpdateLayer = addOrUpdateLayerOf(nativeMap, layers);

    return function (datasource, rawLayers) {
        let lys = map(generateLayerData(datasource), rawLayers);
        addOrUpdateLayer(lys);
    };
};

export const addLayerToMap = curry((map, layer) => L.tileLayer(layer.url, layer).addTo(map));

export const updateLayerStyle = curry((layer, style) => {
    // Handle the callback data returned
    setLayerStyle(layer, updateLayer(layer))
});

export const updateLayer = curry((layer, { url, index, visibility, style }) => {
    if (visibility !== void 0) layer.setOpacity(visibility ? 1 : 0);
    if (index) layer.setZIndex(index);
    if (url !== layer._url) layer.setUrl(url);
    if (style) updateLayerStyle(layer);
});

const addOrUpdateLayerOf = (nativeMap, layers) => map(
            (ly) => {
                const layer = find(propEq('id', ly.id), layers);
                if(layer) {
                    updateLayer(layer.node, ly);
                }
                else {
                    layers.push(merge(ly, {node: addLayerToMap(nativeMap, ly)}));
                }
            }
        );

export const removeLayer = layer => layer.remove();
