import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Modal {
  protected container: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected content: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;

    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.content = ensureElement<HTMLElement>('.modal__content', container);

    this.closeButton.addEventListener('click', () => this.close());
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) this.close();
    });

    this.events.on('modal:close', this.close.bind(this));
  }

  open() {
    this.container.classList.add('modal_active');
  }

  close() {
    this.container.classList.remove('modal_active');
  }

  render(data: { content: HTMLElement }) {
    this.content.replaceChildren(data.content);
  }
}
