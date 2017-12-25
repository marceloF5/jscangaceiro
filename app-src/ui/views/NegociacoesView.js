import { View } from './View';
//import { DataConverter } from '../converters/DateConverters.js'
import { DateConverter } from '../converters/DateConverters.js'

export class NegociacoesView extends View{

    template(modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${modelo
                        .paraArray()
                        .map(negociacao => `
                                <tr>                                    
                                    <td>${DateConverter.paraTexto(negociacao.data)}</td>
                                    <td>${negociacao.quantidade}</td>
                                    <td>${negociacao.valor}</td>
                                    <td>${negociacao.volume}</td>                                    
                                </tr>
                            `).join('')}
                </tbody>
                
                <tfoot>
                    <tr>   
                        <td colspan='3'></td>
                        <td>${modelo.volumeTotal}</td>
                    </tr>                    
                </tfoot>
            </table>
            `            
    }
}