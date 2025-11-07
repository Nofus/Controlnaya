import { films } from '../mock/films.js';
import { generateID } from '../utils.js';

export default class FilmModel {
  #films = films;
  #observers = [];
  #currentFilter = 'all';

  get films() {
    if (this.#currentFilter === 'all') {
      return this.#films;
    }
    return this.#films.filter(film => {
      if (this.#currentFilter === 'watched') {
        return film.watched;
      }
      return !film.watched;
    });
  }

  getAllFilms() {
    return this.#films;
  }

  addFilm(filmData) {
    const newFilm = {
      ...filmData,
      id: generateID(),
    };
    this.#films.push(newFilm);
    this._notifyObservers();
    return newFilm;
  }

  updateFilm(filmId, updatedData) {
    const filmIndex = this.#films.findIndex(film => film.id === filmId);
    if (filmIndex !== -1) {
      this.#films[filmIndex] = { ...this.#films[filmIndex], ...updatedData };
      this._notifyObservers();
    }
  }

  deleteFilm(filmId) {
    this.#films = this.#films.filter(film => film.id !== filmId);
    this._notifyObservers();
  }

  toggleWatchedStatus(filmId) {
    const filmIndex = this.#films.findIndex(film => film.id === filmId);
    if (filmIndex !== -1) {
      this.#films[filmIndex].watched = !this.#films[filmIndex].watched;
      this._notifyObservers();
    }
  }

  setFilter(filter) {
    this.#currentFilter = filter;
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}