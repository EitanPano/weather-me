// Local Asynchronous Storage Service Overcoded
export const lasso = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
};

async function query(entityType, pointerType = [], delay = 500) {
    const entities = JSON.parse(localStorage.getItem(entityType)) || pointerType;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(entities);
        }, delay);
    });
}

async function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity._id === '' + entityId)
    );
}

async function post(entityType, newEntity) {
    newEntity._id = _makeId();
    return query(entityType).then((entities) => {
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

async function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        );
        if (idx === -1) entities.push(updatedEntity);
        else entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

async function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === entityId);
        if (idx < 0) throw new Error(`Unknown Entity ${entityId}`);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

async function postMany(entityType, newEntities, varType = []) {
    return query(entityType, varType).then((entities) => {
        if (Array.isArray(entities)) {
            entities.push(...newEntities);
        } else {
            entities = { ...entities, ...newEntities };
        }
        _save(entityType, entities);
        return entities;
    });
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
    const text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const ls = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    },
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
};

export const ss = {
    set: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
        return value;
    },
    get: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
};
