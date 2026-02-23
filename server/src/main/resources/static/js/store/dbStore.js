import { globalStateController } from "./stateController.js";

const dbName = "appStateDB";
const storeName = "gridStore";

// Open (or create) a database
const request = indexedDB.open(dbName, 1);

// Handle database creation or upgrade
request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an object store to hold the state
    const store = db.createObjectStore(storeName, { keyPath: 'id' });

    // Optionally, create an index on the grid matrix to make it searchable
    store.createIndex("gridMatrix", "gridMatrix", { unique: false });
};

// Handle success
request.onsuccess = (event) => {
    const db = event.target.result;
    console.log("Database opened successfully");
};

// Handle errors
request.onerror = (event) => {
    console.error("Error opening database", event.target.error);
};


export const saveStateToIDB = (state) => {
    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);

        // Save each item separately
        Object.keys(state).forEach((key) => {
            const stateWithId = { id: key, value: state[key] };
            const putRequest = store.put(stateWithId);

            putRequest.onsuccess = () => {
                // console.log(`${key} saved successfully`);
            };

            putRequest.onerror = (error) => {
                console.error(`Error saving ${key}`, error);
            };
        });
    };

    request.onerror = (event) => {
        console.error("Error opening IndexedDB", event.target.error);
    };
};

export const saveStateItemToIDB = (item) => {
    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);

        // Check if the item already exists by getting it with the id
        const getRequest = store.get(item.id);

        getRequest.onsuccess = () => {
            if (getRequest.result) {
                // Item exists, update it using 'put'
                const putRequest = store.put(item);
                putRequest.onsuccess = () => {
                    console.log(`Item with id: ${item.id} updated successfully`);
                };
                putRequest.onerror = (error) => {
                    console.error(`Error updating item with id: ${item.id}`, error);
                };
            } else {
                // Item doesn't exist, add a new one
                const addRequest = store.add(item);
                addRequest.onsuccess = () => {
                    console.log(`New item with id: ${item.id} added successfully`);
                };
                addRequest.onerror = (error) => {
                    console.error(`Error adding item with id: ${item.id}`, error);
                };
            }
        };
        putRequest.onerror = (error) => {
            console.error(`Error saving item with id: ${item.id}`, error);
        };

    };

    request.onerror = (event) => {
        console.error("Error opening IndexedDB", event.target.error);
    };
};


export async function loadStateFromDB() {
    const request = indexedDB.open(dbName, 1)

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);

        const getRequest = store.openCursor();

        const allRecords = [];

        getRequest.onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                allRecords.push(cursor.value);
                cursor.continue();
            } else {
                return allRecords
            }
        }
        getRequest.onerror = (error) => {
            console.error("Error retrieving state", error);
            // Reject the promise if there's an error
        };
    }

    request.onerror = (e) => {
        console.error("Error opening IndexedDB", e.target.error);
    }
}



export async function loadStateFromIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onsuccess = (event) => {
            const db = event.target.result;

            // Open a transaction and get the store
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);

            // Array to collect all the records
            const allRecords = [];

            // Open a cursor to iterate through all the records
            const getRequest = store.openCursor();

            getRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    allRecords.push(cursor.value);  // Add the record to the array
                    cursor.continue();  // Move to the next record
                } else {
                    // console.log("All records loaded:", allRecords);
                    resolve(allRecords);  // Resolve the promise with the array of all records
                }
            };

            getRequest.onerror = (error) => {
                console.error("Error retrieving state", error);
                reject(error);  // Reject the promise if there's an error
            };
        };

        request.onerror = (event) => {
            console.error("Error opening IndexedDB", event.target.error);
            reject(event.target.error);  // Reject the promise if there's an error opening IndexedDB
        };
    });
}


export const deleteDatabase = () => {
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = (event) => {
        console.log(`Database ${dbName} has been deleted successfully`);
    };

    request.onerror = (event) => {
        console.error("Error deleting database", event.target.error);
    };

    request.onblocked = (event) => {
        console.error("Database deletion blocked", event.target.error);
    };
};

