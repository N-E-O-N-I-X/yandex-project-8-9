import { IBuyer, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment = '';  // Вид оплаты
  private email = '';  // Email покупателя
  private phone = '';  // Телефон покупателя
  private address = '';  // Адрес покупателя

  // Методы для установки данных
  setData(data: Partial<IBuyer>) :void {
    
    if (data.payment !== undefined) 
      this.payment = data.payment;

    if (data.address !== undefined) 
      this.address = data.address;

    if (data.phone !== undefined) 
      this.phone = data.phone;

    if (data.email !== undefined) 
      this.email = data.email;
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
 validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    // Проверка типа оплаты
    if (!this.payment) {
      errors.payment = 'Выберите тип оплаты';
    }

    // Проверка email
    if (!this.email) {
      errors.email = 'Укажите адрес эл.почты';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      errors.email = 'Неверный формат email';
    }

    // Проверка телефона
    if (!this.phone) {
      errors.phone = 'Укажите номер телефона';
    } else if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(this.phone)) {
      errors.phone = 'Неверный формат телефона';
    }

    // Проверка адреса
    if (!this.address) {
      errors.address = 'Укажите ваш адрес';
    }

    return {
      isValid: Object.keys(errors).length === 0,  // Если ошибок нет, форма валидна
      errors
    };
}

}
