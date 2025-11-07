import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFilmListComponentTemplate() {
  return (
    `<div class="film-list">
      <h2>Список фильмов</h2>
      <ul class="films-container">
      </ul>
    </div>`
  );
}

export default class FilmListComponent extends AbstractComponent {
  get template() {
    return createFilmListComponentTemplate();
  }
}