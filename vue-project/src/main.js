import { lessons } from "./Lessons.js"; // Update the path to your lessons.js file accordingly


new Vue({
    el: '#app',
    data: {
      cart: [],
      lessons: lessons
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
  
