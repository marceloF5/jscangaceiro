export function controller(...seletores) {
    
    // todos os seletores no 'elements' em um array
    const elements = seletores.map(seletor => document.querySelector(seletor));

    return function(constructor) {

        //construtor novo baseado no construtor Original com os elementos;
        const constructorNovo = function() {
            return new constructor(...elements);
        }

        const instance = new constructor(...elements);

        Object.getOwnPropertyNames(constructor.prototype)
            .forEach(property => {
                if (Reflect.hasMetadata('bindEvent', instance, property)) {
                    associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property))
                }
            })


        //construtor novo deve garantir os mesmo paramentos que o construtor original
        constructorNovo.prototype = constructor.prototype;

        return constructorNovo;
    }
}

function associaEvento(instance, metadado) {
    document
        .querySelector(metadado.selector)
        .addEventListener(metadado.event, event => {
            if (metadado.prevent) event.preventDefault();
            instance[metadado.propertyKey](event);
        })
}