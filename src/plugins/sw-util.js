import {openDB} from "idb";

const dbPromise = _ => {
    if (!('indexedDB' in window)) {
        throw new Error('Browser does not support IndexedDB')
    }  // if installed from npm use 'openDB'
    return openDB('ibq-store', 1, function (db) {
        if (!db.objectStoreNames.contains('projects')) {
            db.createObjectStore('projects', {keyPath: 'id'});
        }
        if (!db.objectStoreNames.contains('sync-projects')) {
            db.createObjectStore('sync-projects', {keyPath: 'id'});
        }
    });
}
function writeData(st, data) {
    return dbPromise
        .then(function(db) {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}

function readAllData(st) {
    return dbPromise
        .then(function(db) {
            let tx = db.transaction(st, 'readonly');
            let store = tx.objectStore(st);
            return store.getAll();
        });
}

function clearAllData(st) {
    return dbPromise
        .then(function(db) {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.clear();
            return tx.complete;
        });
}

function deleteItemFromData(st, id) {
    dbPromise
        .then(function(db) {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.delete(id);
            return tx.complete;
        })
        .then(function() {
            console.log('Item deleted!');
        });
}

function urlBase64ToUint8Array(base64String) {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}