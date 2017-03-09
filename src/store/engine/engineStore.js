import { assign, map, merge, apply, prop, __, identity, propEq, find, findIndex, reduce, keys } from 'ramda';

const INITIAL_STATE = 'INITIAL_STATE';
const MAP_PROVIDER = 'MAP/provider';
const MAP_ZOOM = 'MAP/zoom';
const MAP_LAYERS = 'MAP/layers';
const MAP_CENTER = 'MAP/center';
const LAYER_VISIBILTY = 'LAYER/visibility';
const DATASOURCE = 'DATASOURCE';
///////////////////////////////////////
// Put this into a store helper file
// allow us to combine mutations.
const combineMutations = (mutations, mutationsNames) => {
    const mt = map(prop(__, mutations), mutationsNames);

    return (state, data) => {
        map(apply(__, [state, data]), mt);
    };
};
// (object, object) => int
const queryObject = (q, obj, acc=1) => reduce((acc, k) => q[k] === obj[k] ? acc * 1 : typeof obj[k] === 'object' ? queryObject(q[k], obj[k], acc) : acc * 0, acc, keys(q));
////////////////////////////////

// Internal data query functions
const findLayerByIdIndex = (id, layers) => findIndex(propEq('id', id), layers);
const findLayerByIndex = (i, layers) => layers[i];
const findLayerById = (id, layers) => find(propEq('id', id), layers);
const findLayer = (q, layers) => find(ly => queryObject(q, ly), layers);


// Mutations defined by the user
const mutations = {
    [MAP_PROVIDER]: (state, conf) => state.map = merge(state.map, {provider: conf.map_provider}),
    [MAP_ZOOM]: (state, conf) => state.map = merge(state.map, {zoom: conf.zoom}),
    [MAP_LAYERS]: (state, conf) => state.map = merge(state.map, {layers: map(ly => {
        ly.url = ly.options.urlTemplate;
        return ly;
    }, conf.layers)}),
    [MAP_CENTER]: (state, conf) => state.map = merge(state.map, {center: conf.center.replace(/[\[\]]/g, '').split(',').map(parseFloat)}),
    [LAYER_VISIBILTY]: (state, layer) => {
        state.map.layers = map((ly) => ly.id === layer.id ? layer : ly, state.map.layers);
    },
    [DATASOURCE]: (state, conf) => state.datasource = merge(state.datasource, conf.datasource),
};

// combine mutations into the mutation object, can be placed into the store helper file
Object.assign(mutations, {
    [INITIAL_STATE]: combineMutations(mutations,
        [
            MAP_PROVIDER,
            MAP_ZOOM,
            MAP_CENTER,
            MAP_LAYERS,
            DATASOURCE
        ]),
});


export const mainStore = {
    // State, we should provide a default state, wich any map implementation must have.
    state: {
        datasource: {
            maps_api_template: "https://{user}.carto.com:443",
            stat_tag: "2c212118-b711-11e6-9e07-0ef7f98ade21",
            template_name: "tpl_2c212118_b711_11e6_9e07_0ef7f98ade21",
            user_name: "eduardorodes"
        },
        map: {
            provider: 'leaflet',
            center: [48.623055403950005,2.331414180975],
            zoom: 7,
            layers: [
                {
                    id: "adb1b618-0dd8-4b77-be44-46f26477ae48",
                    options: {},
                    type: 'tiled'
                }
            ]
        }
    },
    // Actions over the model to be defined by the user, we need some default actions
    actions: {
        initialState(commit, config) {
            // NOTE: we can move the request data from engine here
            commit(INITIAL_STATE, config);
        },
        setZoom (commit, zoom) {
            commit(MAP_ZOOM, {zoom});
        },
        setVisibility(commit, {layer, visibility}) {
            commit(LAYER_VISIBILTY, merge(layer, {visibility}));
        }
    },
    // Getters, we have some default getters and the user can define his owns.
    getters (state) {
        return {
            getDataSource() {
                return merge({}, state.datasource);
            },
            getLayers() {
                return map(identity, state.map.layers);
            },
            getMap() {
                return merge({}, state.map);
            },
            getLayerByIndex(index) {
                return merge({}, state.map.layers[index]);
            },
            getLayerById(id) {
                return merge({}, find(R.propEq('id', id), state.map.layers));
            },
            getLayer(query) {
                switch (typeof query) {
                    case 'number':
                        return findLayerByIndex(query, state.map.layers);
                    case 'string':
                        return findLayerById(query, state.map.layers);
                    case 'object':
                        return findLayer(query, state.map.layers);
                    default:
                        console.warn('Are you querying by index, id, or object param?');
                }
            }
        };
    },
    mutations,
};