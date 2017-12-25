export class ProxyFactory {
    
    static create(objeto, props, armadilha) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {   
                if(ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {                        
                    return function() {
                        //console.log(`"${prop}" disparou a armadilha`);
                        target[prop].apply(target, arguments); //revisar sobre os arguments
                        armadilha(target);
                    }
                } else {
                    return target[prop];
                }
            },

            set(target, prop, value, receiver) {
                const updated = Reflect.set(target, prop, value); // Estudar mais sobre o ReflectAPI
                
                if(props.includes(prop)) armadilha(target);

                return updated;
            }
        });
    }

    static _ehFuncao(fn) {
        return typeof(fn) == typeof(Function);
    }
}