export class View {

    constructor(seletor = '') {
        Object.assign(this, {_elemento: document.querySelector(seletor)});
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

    template(modelo) {
        throw new Error('Você precisa implementar o método template');
    }
}