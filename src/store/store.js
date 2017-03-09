import { merge, compose, not, equals, apply, __, map, of, prop, forEach } from 'ramda';

const notEq = compose(
    not,
    equals
);

const getState = merge({});

const Store = function ({mutations, actions, state, getters}) {
    let observers = [];

    const commit = (mutationName, data) => {
        mutations[mutationName](state, data);

        forEach(apply(__, of(getState(state))), map(prop('fn'), observers));
    };

    this.dispatch = (type, data) => {
        actions[type](commit, data);
    };

    this.addActions = (act) => merge(actions, act);

    // TODO: make deep clone here.
    this.getState = () => getState(state);

    this.subscribe = fn => {
        const obs = {id: new Date().getTime(), fn};

        observers.push(obs);

        return {
            unsubscribe() {
                observers = filter(notEq, observers);
            }
        };
    }

    Object.assign(this, getters(state));

    return this;
};

export const createStore = (st) => new Store(st);