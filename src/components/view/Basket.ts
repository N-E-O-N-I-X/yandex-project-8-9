// components/view/Basket.ts

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IBasketView {
  renderItemList: HTMLElement[];
  totalPrice: number | null;
}

export class Basket extends Component<IBasketView> {
  protected itemList: HTMLElement;
  protected total: HTMLElement;
  protected button: HTMLButtonElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.itemList = ensureElement<HTMLElement>('.basket__list', container);
    this.total = ensureElement<HTMLElement>('.basket__price', container);
    this.button = ensureElement<HTMLButtonElement>('.basket__button', container);

    this.button.addEventListener('click', () => {
      this.events.emit('basket-submit:next');
    });
  }

  protected set totalPrice(value: number | null) {
    this.setText(this.total, `${value ?? 0} синапсов`);
  }

  protected set renderItemList(items: HTMLElement[]) {
    this.itemList.replaceChildren(...items);
  }

  clear() {
    this.itemList.innerHTML = '';
  }

  updateButtonState(count: number) {
    this.setDisabled(this.button, count === 0);
  }
}
