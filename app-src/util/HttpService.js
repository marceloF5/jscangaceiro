export class HttpService {    

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {        

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());

        //UTILIZANDO PROMISE
        /*return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                //configs aqui
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }            
            }
            xhr.send();
        });*/
    }
}