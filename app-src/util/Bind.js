import { ProxyFactory } from './ProxyFactory';

export class Bind {

    constructor(modelo, view, ...props) {
        const proxy = ProxyFactory.create(modelo, props,modelo => {
            view.update(modelo);
        });
        
        view.update(modelo);

        return proxy;
    }
}