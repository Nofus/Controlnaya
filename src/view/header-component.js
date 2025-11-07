import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderComponentTemplate() {
  return (
    `<header>
      <div class="container">
        <h1>Коллекция фильмов</h1>
        <p>Используйте эту коллекцию для отслеживания фильмов, которые вы посмотрели или хотите посмотреть. Отмечайте фильмы как просмотренные и фильтруйте по статусу.</p>
      </div>
    </header>`
  );
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}