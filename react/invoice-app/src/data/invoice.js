export const invoice = {
    id: 10,
    name: 'Componentes PC',
    client: {
        name: 'Agustin',
        lastName: 'Escalante',
        address: {
            country: 'USA',
            city: 'Los Angeles',
            street: 'One Street',
            number: 12
        }
    },
    company: {
        name: 'Meta',
        fiscalNumber: 8856,
    },
    items: [
        {
            id:1,
            product: 'Cpu Intel i7',
            price: 42,
            quantity: 1,
        },
        {
            id:2,
            product: 'Corsair Keyboard Mecanico',
            price: 299,
            quantity: 1,
        },
        {
            id:3,
            product: 'Monitor Asus',
            price: 350,
            quantity: 1,
        },
    ]
}
    