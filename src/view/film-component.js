import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFilmComponentTemplate(film) {
  const watchedClass = film.watched ? 'watched' : '';
  const watchedText = film.watched ? 'Просмотрен' : 'Не просмотрен';
  
  return (
    `<li class="film-item ${watchedClass}" data-film-id="${film.id}">
      <div class="film-details">
        <span class="film-title">${film.title}</span>
        <span class="film-status">Статус: ${watchedText}</span>
      </div>
      <div class="film-actions">
        <button class="edit-btn" type="button">Редактировать</button>
        <button class="delete-btn" type="button">Удалить</button>
      </div>
    </li>`
  );
}

export default class FilmComponent extends AbstractComponent {
  #film = null;
  #handleToggle = null;
  #handleEdit = null;
  #handleDelete = null;

  constructor(film, onToggle, onEdit, onDelete) {
    super();
    this.#film = film;
    this.#handleToggle = onToggle;
    this.#handleEdit = onEdit;
    this.#handleDelete = onDelete;
  }

  get template() {
    return createFilmComponentTemplate(this.#film);
  }

  afterElementCreate() {
    this.element.querySelector('.edit-btn').addEventListener('click', () => {
      this.#handleEdit(this.#film);
    });

    this.element.querySelector('.delete-btn').addEventListener('click', () => {
      this.#handleDelete(this.#film.id);
    });
  }
}