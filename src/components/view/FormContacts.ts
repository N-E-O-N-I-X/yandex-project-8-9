import { Form } from '../base/Form';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

interface IFormContacts {
	email: string;
	phone: string;
}

export class FormContacts extends Form<IFormContacts> {
	protected email: HTMLInputElement;
	protected phone: HTMLInputElement;
	protected button: HTMLButtonElement;
	protected errorSpan: HTMLSpanElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this.form = container;

		this.email = ensureElement<HTMLInputElement>('input[name="email"]', container);
		this.phone = ensureElement<HTMLInputElement>('input[name="phone"]', container);
		this.button = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
		this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);

		this.button.addEventListener('click', (e) => {
			e.preventDefault();
			this.events.emit('form-contacts:send-order');
		});

		this.form.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof IFormContacts;
			const value = target.value;
			this.onInputChange(field, value);
		});
	}

	protected onInputChange(field: keyof IFormContacts, value: string) {
		this.events.emit(`${this.form.name}.${String(field)}:change`, {
			field,
			value,
			formType: 'contacts'
		});
	}

	setErrors(errors: string[]) {
		this.setText(this.errorSpan, errors.join('\n'));
	}

	public setValid(isValid: boolean) {
  const button = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
  if (button) {
    button.disabled = !isValid;
  }
}

public reset() {
  const button = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
  if (button) button.disabled = true;

  const errors = this.form.querySelector('.form__errors') as HTMLSpanElement;
  if (errors) errors.textContent = '';
}



}
