import FilmComponent from '../view/film-component.js';
import NullFilmComponent from '../view/null-film-component.js';
import { render } from '../framework/render.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmModel = null;
  #editForm = null;

  constructor(filmsContainer, filmModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmModel = filmModel;
    this.#filmModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderFilms();
  }

  addFilm(filmData) {
    this.#filmModel.addFilm(filmData);
  }

  updateFilm(filmId, updatedData) {
    this.#filmModel.updateFilm(filmId, updatedData);
  }

  deleteFilm(filmId) {
    this.#filmModel.deleteFilm(filmId);
  }

  toggleWatchedStatus(filmId) {
    this.#filmModel.toggleWatchedStatus(filmId);
  }

  filterFilms(filter) {
    this.#filmModel.setFilter(filter);
  }

  #renderFilms() {
    const films = this.#filmModel.films;
    const filmsList = this.#filmsContainer.querySelector('.films-container');
    filmsList.innerHTML = '';

    if (films.length === 0) {
      this.#renderNullFilm(filmsList);
    } else {
      films.forEach(film => {
        const filmComponent = new FilmComponent(
          film,
          this.#handleToggleWatched.bind(this),
          this.#handleEditFilm.bind(this),
          this.#handleDeleteFilm.bind(this)
        );
        render(filmComponent, filmsList);
      });
    }
  }

  #renderNullFilm(container) {
    const nullFilmComponent = new NullFilmComponent();
    render(nullFilmComponent, container);
  }

  #handleModelChange() {
    this.#renderFilms();
  }

  #handleToggleWatched(filmId) {
    this.#filmModel.toggleWatchedStatus(filmId);
  }

  #handleEditFilm(film) {
    this.#showEditForm(film);
  }

  #handleDeleteFilm(filmId) {
    if (confirm('Удалить этот фильм?')) {
      this.#filmModel.deleteFilm(filmId);
    }
  }

  #showEditForm(film) {
    if (this.#editForm) {
      this.#editForm.remove();
    }

    const editForm = document.createElement('div');
    editForm.className = 'film-form';
    editForm.innerHTML = `
      <h2>Редактировать фильм</h2>
      <form class="edit-film-form">
        <input type="text" id="edit-film-title" value="${film.title}" required>
        <div class="watched-toggle">
          <label for="edit-film-status">Отметить как просмотренный:</label>
          <label class="switch">
            <input type="checkbox" id="edit-film-status" ${film.watched ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit">Сохранить</button>
          <button type="button" class="cancel-btn">Отмена</button>
        </div>
      </form>
    `;

    const filmElement = document.querySelector(`[data-film-id="${film.id}"]`);
    filmElement.parentNode.insertBefore(editForm, filmElement);

    editForm.querySelector('.edit-film-form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      const updatedData = {
        title: editForm.querySelector('#edit-film-title').value.trim(),
        watched: editForm.querySelector('#edit-film-status').checked
      };
      
      if (updatedData.title) {
        this.#filmModel.updateFilm(film.id, updatedData);
        editForm.remove();
        this.#editForm = null;
      }
    });

    editForm.querySelector('.cancel-btn').addEventListener('click', () => {
      editForm.remove();
      this.#editForm = null;
    });

    this.#editForm = editForm;
  }
}