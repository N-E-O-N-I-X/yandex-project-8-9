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
}
