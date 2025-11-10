import './scss/styles.scss';
import { ensureElement, cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { AppApi } from './components/Models/Communication';
import { Gallery } from './components/view/Gallery';
import { CardCatalog } from './components/view/CatalogCard';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct } from './types';
import { Modal } from './components/view/Modal'
import { CardModal } from './components/view/CardModal';import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/CardBasket';
import { Cart } from './components/Models/Cart';
import { Header } from './components/view/Header';


// DOM
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const headerContainer = ensureElement<HTMLElement>('.header');


// Events
const events = new EventEmitter();


// API
const api = new AppApi(CDN_URL, API_URL);


// Models
const cart = new Cart();


// UI
const gallery = new Gallery(galleryContainer, events);
const modal = new Modal(modalContainer, events);
const cardModal = new CardModal(cloneTemplate(cardPreviewTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const header = new Header(headerContainer, events);


// State
let items: IProduct[] = [];


// Load catalog
api.fillCatalog().then((products: IProduct[]) => {
items = products.map((item) => ({
...item,
image: item.image.replace('.svg', '.png'),
}));


const cards = items.map((item) => {
const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
return card.render(item);
});


gallery.render({ catalogCard: cards });
});


// Open modal preview
events.on('product:select', ({ id }: { id: string }) => {
const product = items.find((item) => item.id === id);
if (!product) return;


const buttonText = cart.hasItem(product.id) ? 'Удалить из корзины' : 'Купить';


const element = cardModal.render({
...product,
buttonText,
});


modal.render({ content: element });
modal.open();
});


// Toggle product in cart from modal
events.on('modal:buy', ({ id }: { id: string }) => {
const product = items.find((item) => item.id === id);
if (!product) return;


if (cart.hasItem(id)) {
cart.removeItem(id);
} else {
cart.addItem(product);
}


modal.close();
events.emit('basket:updated');
});


// Open basket
events.on('basket:open', () => {
events.emit('basket:updated');
modal.render({ content: basket.render() });
modal.open();
});


// Delete from basket
events.on('basket-card:delete', ({ id }: { id: string }) => {
cart.removeItem(id);
events.emit('basket:updated');
});


// Update basket view
events.on('basket:updated', () => {
basket.clear();
const list = cart.getItems().map((item, index) => {
const card = new CardBasket(cloneTemplate(cardBasketTemplate), events);
return card.render({ ...item, index: index + 1 });
});


basket.render({
renderItemList: list,
totalPrice: cart.getTotalPrice(),
});


basket.updateButtonState(cart.getItemCount());

    const count = cart.getItemCount();
	header.render({ counter: count });
});


// Submit basket
events.on('basket-submit:next', () => {
console.log('Оформление заказа, покажи форму заказа тут.');
// Пока нет формы, можно оставить как есть или заглушку
});

// Блокировка прокрутки при открытии/закрытии модалки
events.on('modal:open', () => {
	header.locked = true;
});

events.on('modal:close', () => {
	header.locked = false;
});