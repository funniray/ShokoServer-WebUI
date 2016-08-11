import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions';
import { QUEUE_STATUS, SET_APIKEY, SET_AUTOUPDATE, STATUS_INVALIDATE, STATUS_RECEIVE, STATUS_REQUEST, RECENT_FILES, JMM_NEWS, IMPORT_FOLDERS, SERIES_COUNT,
  FILES_COUNT, SIDEBAR_TOGGLE, UPDATE_AVAILABLE, WEBUI_VERSION_UPDATE, API_SESSION, autoUpdateTick } from './actions'

const VERSION = __VERSION__;

function autoUpdate(state = {
    status: false,
    timer: null
}, action) {
    switch (action.type) {
        case SET_AUTOUPDATE:
            let timer = null;
            if (state.status === action.state) { return state; }
            if (state.timer !== null) { clearInterval(state.timer); }
            if (action.state) {
                timer = setInterval(autoUpdateTick, 4000);
            }
            return Object.assign({}, state,{
                status: action.state,
                timer: timer
            });
        default:
            return state
    }
}

function queueStatus(state = {
    isFetching: false,
    didInvalidate: true,
    items: {}
}, action) {
    if (action.type != QUEUE_STATUS) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function recentFiles(state = {
    isFetching: false,
    didInvalidate: true,
    items: {}
}, action) {
    if (action.type != RECENT_FILES) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function jmmNews(state = {
    isFetching: false,
    didInvalidate: true,
    items: {}
}, action) {
    if (action.type != JMM_NEWS) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function importFolders(state = {
    isFetching: false,
    didInvalidate: true,
    items: {}
}, action) {
    if (action.type != IMPORT_FOLDERS) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function seriesCount(state = {
    isFetching: false,
    didInvalidate: true,
    count: 0
}, action) {
    if (action.type != SERIES_COUNT) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                count: action.payload.count,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function filesCount(state = {
    isFetching: false,
    didInvalidate: true,
    count: 0
}, action) {
    if (action.type != FILES_COUNT) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                count: action.payload.count,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function updateAvailable(state = {
    isFetching: false,
    didInvalidate: true,
    status: false
}, action) {
    if (action.type != UPDATE_AVAILABLE) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                status: (VERSION.indexOf('.') !== -1 && action.payload.version != VERSION),
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

function webuiVersionUpdate(state = {
    isFetching: false,
    didInvalidate: true,
    status: false
}, action) {
    if (action.type != WEBUI_VERSION_UPDATE) { return state; }
    switch (action.meta.status) {
        case STATUS_INVALIDATE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case STATUS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                status: action.payload,
                lastUpdated: action.meta.receivedAt
            });
        default:
            return state
    }
}

const apiSession = handleAction(API_SESSION, (state,action) => {
    return action.error?state:Object.assign({},state, action.payload);
},{});
const activeApiKey = handleAction(SET_APIKEY,(state,action) => {
    return action.error?state:action.payload;
},'');
const sidebarToggle = handleAction(SIDEBAR_TOGGLE,(state,action) => {
    return action.error?state:action.payload;
},true);

const rootReducer = combineReducers({
    apiSession,
    activeApiKey,
    autoUpdate,
    queueStatus,
    recentFiles,
    jmmNews,
    importFolders,
    seriesCount,
    filesCount,
    sidebarToggle,
    updateAvailable,
    webuiVersionUpdate
});

export default rootReducer