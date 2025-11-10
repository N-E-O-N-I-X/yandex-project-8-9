import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IFormContacts {
	email: string;
	phone: string;
}

export class FormContacts extends Component<IFormContacts> {
	protected email: HTMLInputElement;
	protected phone: HTMLInputElement;
	protected button: HTMLButtonElement;
	protected errorSpan: HTMLSpanElement;

	public emailValue = '';
  public phoneValue = '';

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this.email = ensureElement<HTMLInputElement>('input[name="email"]', container);
		this.phone = ensureElement<HTMLInputElement>('input[name="phone"]', container);
		this.button = ensureElement<HTMLButtonElement>('.button', container);
		this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);

		this.email.addEventListener('input', () => {
			this.emailValue = this.email.value;
			this.emitChange('email', this.emailValue);
			this.updateButtonState();
		});

		this.phone.addEventListener('input', () => {
			this.phoneValue = this.phone.value;
			this.emitChange('phone', this.phoneValue);
			this.updateButtonState();
		});

		this.button.addEventListener('click', (e) => {
			e.preventDefault();  // Останавливаем перезагрузку формы
			this.events.emit('form-contacts:send-order');  // Эмитим событие на отправку
		});

	}


	
	protected emitChange(field: keyof IFormContacts, value: string) {
		const formName = (this.container as HTMLFormElement).name;
		this.events.emit(`${formName}.${field}:change`, {
			field,
			value,
			formType: 'contacts'
		});
	}

	protected updateButtonState() {
		const isValid = this.emailValue.trim() !== '' && this.phoneValue.trim() !== '';
		this.button.disabled = !isValid;
	}

	// Установка класса ошибки и обновление кнопки
	public setValid(isValid: boolean): void {
		this.button.disabled = !isValid;
	}

	// Показ ошибок в span
	public setErrors(errors: string[]): void {
		this.errorSpan.textContent = errors.join(', ');
	}

	// Очистка формы
	public reset(): void {
		this.email.value = '';
		this.phone.value = '';
		this.emailValue = '';
		this.phoneValue = '';
		this.button.disabled = true;
		this.errorSpan.textContent = '';
	}


}
