export class Mensagem {

    constructor(_texto = '') {
        Object.assign(this, {_texto});
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        return this._texto = texto;
    }
}