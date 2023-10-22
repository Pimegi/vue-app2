new Vue({
    el: '#app',
    data: {
      lesson: {
        id: 1,
        subject: "Maths",
        location: "New York",
        price: 100,
        spaces: 5
      },
      cart: []
    },
    methods: {
      addToCart(lesson) {
        if (lesson.spaces > 0) {
          lesson.spaces--;
          this.cart.push(lesson.id);
        }
      }
    },

    computed:{
        cartItemCount: function(){
            return this.cart.length;
        }
    }
  });
  
