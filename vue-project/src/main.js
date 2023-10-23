import { lessons } from "./Lessons.js"; // Update the path to your lessons.js file accordingly


new Vue({
    el: '#app',
    data: {
      showProduct:true,  
      cart: [],
      lessons: lessons,
      selectedItem: null,
      sortAttribute: 'subject',
      sortOrder: 'asc',
      formData: {
        fname: '',
        phone_no: '',
      },
      validationErrors: {
        name: '',
        number: '',
      },
      orderSubmitted: false,
      confirmationMessage: '',
    },
    methods: {
        addToCart(lesson) {
        if (lesson.spaces > 0) {
        //   const lessonCopy = { ...lesson };   // fixed issues with adding multiple of the same lesson //
            lesson.spaces--;
            this.cart.push(lesson);
        }
        },
        removeFromCart(lesson) {
        // Find the index of the lesson in the cart array
        const lessonIndex = this.cart.indexOf(lesson);

        // Check if the lesson is in the cart
        if (lessonIndex !== -1) {
            // Remove the lesson from the cart
            this.cart.splice(lessonIndex, 1);

            // Increase the spaces of the lesson in the lessons array
            const lessonInList = this.lessons.find((item) => item.id === lesson.id);
            if (lessonInList) {
            lessonInList.spaces++;
            }
        }
        },
        getLessonById(lessonId) {
        return this.lessons.find(lesson => lesson.id === lessonId);
        },

        showCheckoutpage(){    //reverts the showProduct value to false if it's true //
        this.showProduct = this.showProduct ? false : true
        },

        sortLessons() {
            const attribute = this.sortAttribute;
            const order = this.sortOrder === 'asc' ? 1 : -1;

            this.lessons.sort((a, b) => {
            if (a[attribute] < b[attribute]) return -1 * order;
            if (a[attribute] > b[attribute]) return 1 * order;
            return 0;
            });
        },
        submitForm() {
            if (this.isFormValid) {
                this.orderSubmitted = true;
                this.confirmationMessage = 'Order has been submitted!';
                
            } else {
                this.validationErrors.name = 'Invalid name';
                this.validationErrors.number = 'Invalid number';
            }
          },
        isNameValid() {
        const regex = /^[a-zA-Z]+$/;
        if (!this.formData.fname || !regex.test(this.formData.fname)) {
            this.validationErrors.name = 'Invalid name';
            return false;
        }
        this.validationErrors.name = '';
        return true;
        },
        isPhoneValid() {
        const regex = /^\d+$/;
        if (!this.formData.phone_no || !regex.test(this.formData.phone_no)) {
            this.validationErrors.number = 'Invalid number';
            return false;
        }
        this.validationErrors.number = '';
        return true;
        },
    },  
    computed:{
        cartItemCount: function(){
            return this.cart.length;
        },
        isFormValid() {
            return this.isNameValid() && this.isPhoneValid();
          },
    }
  });
  
