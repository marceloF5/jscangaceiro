import { View } from './View';

export class MensagemView extends View{

    template(modelo) {
        return modelo.texto 
            ?`<p class='alert alert-info'>${modelo.texto}</p>`
            :`<p></p>`
    }
}