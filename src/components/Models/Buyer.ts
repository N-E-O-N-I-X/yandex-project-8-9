import { IBuyer, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment = '';  // Вид оплаты
  private email = '';  // Email покупателя
  private phone = '';  // Телефон покупателя
  private address = '';  // Адрес покупателя

  // Методы для установки данных
  setPayment(value: TPayment): void {
    this.payment = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  setPhone(value: string): void {
    this.phone = value;
  }

  setAddress(value: string): void {
    this.address = value;
  }

  // Получение всех данных покупателя
  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  // Очистка данных покупателя
  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  // Валидация данных покупателя
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) errors.payment = 'Не выбран вид оплаты';
    if (!this.email) errors.email = 'Укажите емэйл';
    if (!this.phone) errors.phone = 'Укажите телефон';
    if (!this.address) errors.address = 'Укажите адрес';

    return errors;
  }
}
