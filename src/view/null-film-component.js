import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNullFilmTemplate() {
  return `
    <li class="null-film-item">
        Нет фильмов для отображения
    </li>
  `;
}

export default class NullFilmComponent extends AbstractComponent {
  get template() {
    return createNullFilmTemplate();
  }
}