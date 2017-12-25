import { obrigatorio } from '../../util/Obrigatorio';

export class Negociacao {
    constructor(
        _data = obrigatorio('data'), 
        _quantidade = obrigatorio('quantidade'), 
        _valor = obrigatorio('valor')) {
        //Object.assign(this, {_data: new Date(_data.getTime()), _quantidade, _valor});            
        Object.assign(this, {_quantidade, _valor});
        this._data = new Date(_data.getTime());
        Object.freeze(this);
    }

    get data() {
        //return this._data;
        return new Date(this._data.getTime())
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }
    
    equals(negociacao)	{
        return JSON.stringify(this) == JSON.stringify(negociacao);
        /*return this.data.getDate() == negociacao.data.getDate()	
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear()
            && this.quantidade == negociacao.quantidade 
            && this.valor == negociacao.valor;*/
    }	
}