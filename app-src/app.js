import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/index.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'bootstrap/js/modal.js';

const controller = new NegociacaoController();

//Subistuído pelo Controller Decorator;
/*const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.adiciona.bind(controller)); //Dúvida sobre esse bind()

$('#botao-apaga').addEventListener('click', controller.apaga.bind(controller)); 

$('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));
*/
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');

const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
    method,
    headers,
    body
}

fetch('http://localhost:3000/negociacoes', config)
    .then(() => console.log('DADO ENVIADO COM SUCESSO'));
