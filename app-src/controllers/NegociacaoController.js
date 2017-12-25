import { Negociacoes, Negociacao } from '../domain';
import { NegociacoesView, MensagemView, Mensagem, DateConverter } from '../ui';
import { getNegociacaoDao, Bind, getExceptionMessage, debounce, controller, bindEvent } from '../util';

@controller('#data', '#quantidade', '#valor')
export class NegociacaoController {

    constructor(inputData, inputQuantidade, inputValor) {
    //constructor() {
        //const $ = document.querySelector.bind(document);

        //Object.assign(this, {_inputData: $('#data'), _inputQuantidade: $('#quantidade'), _inputValor: $('#valor')});     
        Object.assign(this, {_inputData: inputData, _inputQuantidade: inputQuantidade, _inputValor: inputValor});               

        /*this._negociacoes = new Negociacoes(modelo => {            
            this._negociacoesView.update(modelo);
        }); //Modelo*/

        /*this._negociacoes = ProxyFactory.create(
            new Negociacoes(), 
            ['adiciona', 'esvazia'], 
            modelo => this._negociacoesView.update(modelo)
        );     

        this._negociacoesView = new NegociacoesView('#negociacoes');        
        this._negociacoesView.update(this._negociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            modelo => this._mensagemView.update(modelo)
        );
        
        this._mensagemView = new MensagemView('#mensagemView')
        this._mensagemView.update(this._mensagem);*/

        //SIMPLIFICANDO O CÓDIGO
        //REmovido por causa do CodeSplitting e LazyLoading
        //this._service = new NegociacaoService();
        
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        )
        this._init();

    }

    async _init() {

        try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        } catch(error) {
            this._mensagem.texto = getExceptionMessage(error);
        }

        // PROMISE Padrão
/*
        getNegociacaoDao()
            .then(dao => dao.listaTodos())
            .then(negociacoes => {                
                negociacoes.forEach(negociacao => {    
                    this._negociacoes.adiciona(negociacao)
                })
            })
*/          
    }

    @bindEvent('submit', '.form')
    @debounce()
    async adiciona(event) {  
        try {
            event.preventDefault();      
            
            //let data = new Date(this._inputData.value.split('-')); //OR
            //let data = new Date(this._inputData.value.replace(/-/g, ',')); //OR

            const negociacao = this._criaNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adicionaNegociacoes(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';                
            this._limpaFormulario();       

        // PROMISE Padrão
/*            
            getNegociacaoDao()
                .then(dao => dao.adicionaNegociacoes(negociacao))
                .then(() => {
                    this._negociacoes.adiciona(this._criaNegociacao());  
                    this._mensagem.texto = 'Negociação adicionada com sucesso';                
                    this._limpaFormulario();            
                })
                .catch(err => this._mensagem.texto = err);
*/            
        } catch (error) {

            this._mensagem.texto = error.message;
            /*console.log(err);
            if(err instanceof DataInvalidaException) {                
                this._mensagem.texto = err.message;
            } else {
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte.';
            } */           
        }
        
        
    }

    @bindEvent('click', '#botao-apaga')
    async apaga() {

        try {
            const dao =  await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociação apagadas com sucesso.';     
        } catch(error) {
            this._mensagem.texto = error.message;
        }

        // PROMISE Padrão
/*   
        getNegociacaoDao()
            .then(dao => dao.apagaTodos())
            .then(() => {
                this._negociacoes.esvazia();        
                this._mensagem.texto = 'Negociação apagadas com sucesso.';     
            })
            .catch(err => this._mensagem.texto = err)          
*/
    }

    @bindEvent('click', '#botao-importa')
    @debounce()
    async importaNegociacoes() {

        const { NegociacaoService } = await import('../domain/negociacao/NegociacaoService');

        const service = new NegociacaoService();

        try {
            const negociacoes = await service.obtemNegociacoesDoPeriodo();            
            negociacoes
                .filter(novaNegociacao => 
                    !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                .forEach(negociacao => {
                    this._negociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                })

        } catch (error) {
            this._mensagem.texto = error.message;
        }

        // PROMISE Padrão
/*         
        this._service
            .obtemNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes
                    .filter(novaNegociacao => 
                        !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => {
                        this._negociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociações importadas com sucesso';
                    });
            });
*/

        // METODO ENCAPSULADO PELO SERVICE
        //PROMISE RESOLVIDAS DE FORMA PARALELO. OS METODOS SE RESOLVEM AO MESMO TEMPO E É RETERNADO ARRAY NAS MESMAS ORDEM COMO DECLARADO.
        /*Promise.all([
            this._service.obtemNegociacoesDaSemana(),
            this._service.obtemNegociacoesDaSemanaAnterior(),
            this._service.obtemNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => {
            periodo = periodo
                .reduce((novoArray, item) => novoArray.concat(item),[])
                .forEach( negociacao => {
                    this._negociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                });

        })
        .catch(err => this._mensagem.texto = err);
        */

        /*const negociacoes = [];
        //PROMISE RESOLVIDAS DE FORMA SEQUENCIAL, OU SEJA, UM METODO AGUARDA A SUA EXECUÇÃO
        this._service
            .obtemNegociacoesDaSemana()
            .then(semana => {
                negociacoes.push(...semana);
                return this._service.obtemNegociacoesDaSemanaAnterior();
            })
            .then(anterior => {
                negociacoes.push(...anterior);
                return this._service.obtemNegociacoesDaSemanaRetrasada();                
            })
            .then(retrasada => {
                negociacoes.push(...retrasada);
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadascom sucesso';
            })
            .catch(err => this._mensagem.texto = err)
        */
        /* CALLBACK TRADICIONAL
        this._service.obterNegociacoesDaSemana((err, negociacoes) => {
            if (err) {
                this._mensagem.texto = 'Não foi possível obter as negociações do servidor';
                return;
            }
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!';
        });*/
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}