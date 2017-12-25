import { DateInvalidaException } from './DateInvalidaException';

export class DateConverter {

    constructor() {
        throw Error('Essa classe não pode ser instanciada');
    }

    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }    

    static paraData(texto) {
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(texto))
            throw new DateInvalidaException();
    
        return new Date(...
            texto            
            .split('/')
            .reverse()
            .map((item, indice) => item - indice % 2)); // Utilizar MÓDULO //Operador SPREAD     
    }
}