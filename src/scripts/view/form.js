/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import DicodingRestaurantAPI from '../../public/data/restaurantApi';

class FormField extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || '';
    const restaurantId = this.getAttribute('id'); // Get the restaurant ID from the attribute
    this.render(placeholder);

    const inputTitle = this.querySelector('input');
    inputTitle.addEventListener('input', () => {
      this.validateInput(inputTitle);
    });

    const textareaBody = this.querySelector('textarea');
    textareaBody.addEventListener('input', () => {
      this.validateInput(textareaBody);
    });

    const form = this.querySelector('.form-field');
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      if (this.validateForm()) {
        const name = inputTitle.value.trim();
        const review = textareaBody.value.trim();
        console.log(name);
        console.log(review);
        console.log(restaurantId);
        try {
          await new DicodingRestaurantAPI().postReview(restaurantId, name, review);
          alert('Review submitted successfully!');
          // Optionally reset the form
          form.reset();
        } catch (error) {
          alert('Failed to submit review. Please try again.');
          console.error('Error submitting review:', error);
        }
      } else {
        alert('Form is not valid! Please fill in all fields.');
      }
    });
  }

  validateInput(inputElement) {
    const inputValue = inputElement.value.trim();
    const isValid = inputValue !== '';
    inputElement.classList.toggle('invalid', !isValid);
  }

  validateForm() {
    const inputTitle = this.querySelector('input');
    const textareaBody = this.querySelector('textarea');
    return inputTitle.value.trim() !== '' && textareaBody.value.trim() !== '';
  }

  render(placeholder) {
    this.innerHTML = `
        <form action="" class="form-field">
          <div class="form-group">
            <input type="text" placeholder="${placeholder}" id="textInput">
            <textarea name="" id="textareaInput" cols="30" rows="10" placeholder="Masukkan Review Notes"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" id="submit">Submit</button>
          </div>
        </form>
      `;
  }
}

customElements.define('form-field', FormField);
