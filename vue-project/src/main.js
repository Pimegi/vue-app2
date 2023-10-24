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
      searchQuery: '',
    //   filteredLessons: [],
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
                this.validationErrors.name = 'No Special Characters or numbers allowed';
                this.validationErrors.number = 'Only digits are allowed';
            }
          },
          isNameValid() {
            const regex = /^[a-zA-Z]+$/;
            const name = this.formData.fname.trim(); // Remove leading/trailing white spaces
            if (name) {
                if (!regex.test(name)) {
                    this.validationErrors.name = 'No special characters or numbers allowed';
                    return false;
                }
            } else {
                this.validationErrors.name = 'Name must be provided';
                return false;
            }
            this.validationErrors.name = '';
            return true;
        },
        
        isPhoneValid() {
            const regex = /^\d+$/;
            const phone = this.formData.phone_no.trim(); // Remove leading/trailing white spaces
            if (phone) {
                if (!regex.test(phone)) {
                    this.validationErrors.number = 'Only digits are allowed';
                    return false;
                }
            } else {
                this.validationErrors.number = 'Phone number must be provided';
                return false;
            }
            this.validationErrors.number = '';
            return true;
        },
        

        searchLessons() {
            // No need for explicit code here since it's handled by the computed property.
            // The filteredLessons computed property automatically updates when the searchQuery changes.
        },
    },  
    computed:{
        cartItemCount: function(){
            return this.cart.length;
        },
        isFormValid() {
            return this.isNameValid() && this.isPhoneValid();
        },

        filteredLessons() {
            const query = this.searchQuery.toLowerCase(); // Convert the query to lowercase for case-insensitive search
        
            if (query.length === 0) {
              return []; // Return an empty array initially when the search query is empty
            }
        
            return this.lessons.filter((lesson) => {
              const title = lesson.subject.toLowerCase();
              const location = lesson.location.toLowerCase();
        
              return title.includes(query) || location.includes(query);
            });
        },
    }
  });
  
