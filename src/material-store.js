import { writable } from "svelte/store";

const materialStore = writable( [] );
const key = 'materials';

if ( localStorage.getItem( key ) ) {
    materialStore.set( JSON.parse( localStorage.getItem( key ) ) );
}


const add = ( material, price ) => {
    materialStore.update( ( items ) => {
        const item = {
            material, price, id: new Date().getTime()
        };
        return [ item, ...items ];
    } );
};

const edit = ( id, material, price ) => {
    materialStore.update( ( items ) => {
        return items.map( ( item ) => {
            if ( item.id === id ) {
                item.material = material;
                item.price = price;
                return item;
            }
            return item;
        } );
    } );
};

const remove = ( id ) => {
    materialStore.update( ( items ) => {
        return items.filter( ( item ) => item.id !== id );
    } );
};

materialStore.subscribe( items => {
    const value = JSON.stringify( items );
    localStorage.setItem( key, value );
} );

export default {
    subscribe: materialStore.subscribe,
    add,
    edit,
    remove
};
