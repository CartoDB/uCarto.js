import * as leaflet from './leaflet';
import * as tangram from './tangram';

let providers = {
    leaflet,
    tangram
};

export const getProvider = (providerName) => {
    const provider = providers[providerName];
    if (!provider) throw new Error('There is no provider with provider ');
    return provider;
};

export const addProvider = (providerName, provider) => {
    providers[providerName] = provider;
};