import HeaderComponent from './view/header-component.js';
import ContainerComponent from './view/container-component.js';
import FilmFormComponent from './view/film_form-component.js';
import FilmFilterComponent from './view/film_filter-component.js';
import FilmListComponent from './view/film_list-component.js';
import FilmsPresenter from './presenter/film-presenter.js';
import FilmModel from './model/film-model.js';
import { render, RenderPosition } from './framework/render.js';

const filmModel = new FilmModel();

const bodyContainer = document.querySelector('body');
const mainContainer = document.querySelector('main');

// заголовок
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

// контейнер
const containerComponent = new ContainerComponent();
render(containerComponent, mainContainer);

// форма добавления фильма
const filmFormComponent = new FilmFormComponent({ 
  onSubmit: handleAddFilmSubmit 
});
render(filmFormComponent, containerComponent.element);

// фильтр
const filmFilterComponent = new FilmFilterComponent({ 
  onFilterChange: handleFilterChange 
});
render(filmFilterComponent, containerComponent.element);

// список фильмов
const filmListComponent = new FilmListComponent();
render(filmListComponent, containerComponent.element);

// презентер
const filmsPresenter = new FilmsPresenter(
  filmListComponent.element,
  filmModel
);

filmsPresenter.init();

function handleAddFilmSubmit(filmData) {
  filmsPresenter.addFilm(filmData);
}

function handleFilterChange(filter) {
  filmsPresenter.filterFilms(filter);
}