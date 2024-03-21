const invoice = {
    id:1,
    name: 'Compra de oficina',
    date: new Date(),
    client: {
        id:1,
        name:'new name',
        age:20
    },
    items: [
        {
           id:1,
           name:'',
           price: 566    
        },
        {
          id : 2,
          name : 'another product',
          price: 2002 
        }
    ],
    total : function(){
        let total = 0;
        this.items.forEach(item => {
            total += item.price;
        })
        return total;
    }
}

console.log(invoice.total());