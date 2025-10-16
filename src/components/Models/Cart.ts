import { IProduct } from '../../types';

export class Cart {
  private items: IProduct[] = [];

  // Добавление товара в корзину
  addItem(product: IProduct): void {
    this.items.push(product);
  }

  // Удаление товара из корзины
  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  // Очистка корзины
  clear(): void {
    this.items = [];
  }

  // Получение списка всех товаров в корзине
  getItems(): IProduct[] {
    return this.items;
  }

  // Получение общей стоимости товаров в корзине
  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  // Получение количества товаров в корзине
  getItemCount(): number {
    return this.items.length;
  }

  // Проверка наличия товара в корзине по ID
  hasItem(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
