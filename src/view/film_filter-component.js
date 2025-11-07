import { AbstractComponent } from '../framework/view/abstract-component.js';


function createFilmFilterComponentTemplate() {
  return (
    `<div class="film-filter">
      <h2>Фильтры</h2>
      <fieldset>
        <legend>Статус:</legend>
        <label>
          <input type="radio" name="status-filter" value="Все" checked />
          Все
        </label>
        <label>
          <input type="radio" name="status-filter" value="Просмотренные" />
          Просмотренные
        </label>
        <label>
          <input type="radio" name="status-filter" value="Не просмотренные" />
          Не просмотренные
        </label>
      </fieldset>
    </div>`
  );
}

export default class FilmFilterComponent extends AbstractComponent {
  #handleFilterChange = null;

  constructor({ onFilterChange }) {
    super();
    this.#handleFilterChange = onFilterChange;
  }

  get template() {
    return createFilmFilterComponentTemplate();
  }

  afterElementCreate() {
    const radioButtons = this.element.querySelectorAll('input[name="status-filter"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', this.#filterChangeHandler);
    });
  }

  #filterChangeHandler = (evt) => {
    const filter = evt.target.value;
    this.#handleFilterChange(filter);
  };
}