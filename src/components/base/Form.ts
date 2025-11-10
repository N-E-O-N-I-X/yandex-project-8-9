import { Component } from './Component';
import { IEvents } from './Events';
import { ensureElement } from '../../utils/utils';

/**
 * Базовая форма с полями и событиями.
 * Тип T описывает форму: какие поля есть и какие у них значения.
 */
export class Form<T> extends Component<T> {
  protected form: HTMLFormElement;
  protected events: IEvents;
  protected errorSpan: HTMLElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container);
    this.form = container;
    this.events = events;

    // Общий контейнер для ошибок, если нужно
    this.errorSpan = ensureElement<HTMLElement>('.form__errors', container);

    // Слушаем input — все изменения в полях формы
    this.form.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });
  }

  /**
   * Обработка изменения значения поля
   */
  protected onInputChange(field: keyof T, value: string): void {
    this.events.emit(`${this.form.name}.${String(field)}:change`, {
      field,
      value,
      formType: this.form.name,
    });
  }

  /**
   * Заполняет текст ошибки (если есть)
   */
  setErrors(errors: string[]): void {
    this.setText(this.errorSpan, errors.join('\n'));
  }

  /**
   * Сброс текста ошибок
   */
  clearErrors(): void {
    this.setText(this.errorSpan, '');
  }

  /**
   * Сброс значений формы
   */
  reset(): void {
    this.form.reset();
    this.clearErrors();
  }
}