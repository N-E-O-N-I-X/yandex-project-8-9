import { Card } from './Card';
import { IEvents } from '../base/Events';

export class CardCatalog extends Card {
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events);

		// Клик по карточке
		this.container.addEventListener('click', () => {
			if (this.id) {
				this.events.emit('product:select', { id: this.id });
			}
		});
	}

	render(data: any): HTMLElement {
    this.id = data.id;
    (this as any).title = data.title;
    (this as any).price = data.price;
    (this as any).image = data.image;
    (this as any).category = data.category;

    return this.container;
  }
}
