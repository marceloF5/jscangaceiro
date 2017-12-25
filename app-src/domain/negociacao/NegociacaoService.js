import { HttpService } from '../../util/HttpService';
import { Negociacao } from './Negociacao';
import { ApplicationException } from '../../util/ApplicationException';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    //Operação com Promise
    obtemNegociacoesDaSemana() {
        return this._http
            .get('http://localhost:3000/negociacoes/semana')
            .then(
                dados => dados.map(objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
                err => {
                    throw new ApplicationException('Não foi possível obter as negociações')
                }
            )
    }

    obtemNegociacoesDaSemanaAnterior() {
        return this._http
            .get('http://localhost:3000/negociacoes/anterior')
            .then(
                dados => dados.map(objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
                err => {
                    throw new ApplicationException('Não foi possível obter as negociações')
                }
            )
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http
            .get('http://localhost:3000/negociacoes/retrasada')
            .then(
                dados => dados.map(objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
                err => {
                    throw new ApplicationException('Não foi possível obter as negociações')
                }
            )
    }

    async obtemNegociacoesDoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ])

            return periodo.reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime())

        } catch(error) {
            console.log(error);
            throw new ApplicationException('Não foi possível obter as negociações por período')
        }


        // PROMISE Padrão
/*   
        return Promise.all([
            this.obtemNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime())
        )
        .catch(err => {
            console.log(err);
            throw new Error('Não foi possível obter as negociações por período')
        })
*/        
    }
    

    //Operação com CALLBACK
    /*obterNegociacoesDaSemana(cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/semana');
        xhr.onreadystatechange = () => {
            //configs aqui
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo negociações do servidor');
                    const negociacoes = JSON
                        .parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    cb(null, negociacoes);
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações do servidor', null);
                    //this._mensagem.texto = 'Não foi possível obter as negociações do servidor';
                }
            }            
        }
        xhr.send();
    }*/
}