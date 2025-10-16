import './scss/styles.scss';
import { apiProducts } from './utils/data.ts';
import { Products } from './components/Models/Products.ts';
import { Cart } from './components/Models/Cart.ts';
import { Buyer } from './components/Models/Buyer.ts';
import { Communication } from './components/Models/Communication.ts';
import { API_URL } from './utils/constants.ts';
import { IOrder } from './types/index.ts';

const productsModel = new Products()

productsModel.setItems(apiProducts.items)

console.log(`Массив товаров из каталога: `, productsModel.getItems())

const productById = productsModel.getProductById(apiProducts.items[0].id) 
console.log(`Первый товар: `, productById)

productsModel.setSelected(apiProducts.items[2])

console.log(`Третий товар:`, productsModel.getSelected())

const cart = new Cart()

cart.addItem(apiProducts.items[0])
cart.addItem(apiProducts.items[1])
cart.addItem(apiProducts.items[2]) 

console.log(`Товары в корзине: `, cart.getItems())

cart.removeItem(apiProducts.items[0].id)
console.log(`Товары в корзине после удаления первого: `, cart.getItems())

cart.clear()
console.log(`Товары в корзине после чистки: `, cart.getItems())

cart.addItem(apiProducts.items[0])
cart.addItem(apiProducts.items[1])

console.log(`Стоимость корзины:`, cart.getTotalPrice())

console.log(`Количество товаров в корзине:`, cart.getItemCount())

console.log(`Наличие товара в корзине по id:`, cart.hasItem('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))

const buyer = new Buyer()

buyer.setData({ payment: "card", address: "Рандомный адрес", phone: "", email: "random.pochta@gmail.com"})
console.log(`Данные покупателя:`,buyer.getData())

console.log(`Результат валидации:`, buyer.validate())

buyer.clear() 
console.log(`Данные покупателя очищены:`,buyer.getData()) 

const communication = new Communication(API_URL)

const myOrder: IOrder = {
  payment: "cash",
  email: "random.pochta@gmail.com",
  phone: "+79999999999",
  address: "Рандомный адрес",
  total: 2200,
  items: ["854cef69-976d-4c2a-a18c-2aa45046c390", "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"] 
};

try{
    const products = await communication.getData()
    console.log(`Тестовый каталог товаров:`, products)
}
catch(err){
    console.error("Ошибка при получении товаров", err)
}

try{
    const result = await communication.postData(myOrder)
    console.log(`Данные отправлены:`, result)
}
catch(err){
    console.error("Не удалось создать заказ: ", err)
}
