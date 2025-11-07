import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFilmFormComponentTemplate() {
  return (
    `<div class="film-form">
      <h2>Добавить фильм</h2>
      <form class="add-film-form">
        Название фильма:<input type="text" id="film-title" name="film-title" placeholder="Например, Начало" required>
        <div class="watched-toggle">
          <label for="film-status">Отметить как просмотренный:</label>
          <label class="switch">
            <input type="checkbox" id="film-status" name="film-status">
            <span class="slider"></span>
          </label>
        </div>
        <button type="submit">Добавить фильм</button>
      </form>
    </div>`
  );
}

export default class FilmFormComponent extends AbstractComponent {
  #handleSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#handleSubmit = onSubmit;
  }

  get template() {
    return createFilmFormComponentTemplate();
  }

  afterElementCreate() {
    this.element.querySelector('.add-film-form').addEventListener('submit', this.#submitHandler);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    
    const formData = new FormData(evt.target);
    const filmData = {
      title: formData.get('film-title').trim(),
      watched: formData.get('film-status') === 'on'
    };

    if (filmData.title) {
      this.#handleSubmit(filmData);
      evt.target.reset();
    }
  };
}