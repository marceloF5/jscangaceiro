
const stores = ['negociacoes'];
let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new ('Não é possível criar instancias dessa classe');
    }

    static getConnection() {
        return new Promise((resolve, resject) => {
            const openRequest = indexedDB.open('jscangaceiro', 2);

            if(connection) return resolve(connection);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);                
            };

            openRequest.onsuccess = e => {
                connection = e.target.result;
                close = connection.close.bind(connection);
                connection.close = () => {
                    throw new Error('Você não pode fechar diretamente a conexão');
                }
                resolve(e.target.result);
            };

            openRequest.onerror = e => {        
                resject(e.target.error.name)
            };
        })
    }

    static closeConnection() {
        if (connection) {
            close();
        }
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, {autoIncrement: true});
        })
    }
}

