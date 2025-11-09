import './scss/styles.scss';
import { ensureElement, cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { AppApi } from './components/Models/Communication';
import { Gallery } from './components/view/Gallery';
import { CardCatalog } from './components/view/CatalogCard';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct } from './types';
import { Modal } from './components/view/Modal'
import { CardModal } from './components/view/CardModal';


// DOM
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

// Events
const events = new EventEmitter();

// API
const api = new AppApi(CDN_URL, API_URL);

// UI
const gallery = new Gallery(galleryContainer, events);
const modal = new Modal(modalContainer, events);
const cardModal = new CardModal(cloneTemplate(cardPreviewTemplate), events);

// 💾 Объявляем переменную для продуктов глобально
let items: IProduct[] = [];

// Загружаем товары
api.fillCatalog().then((products) => {
  // Меняем svg → png
  items = products.map((item) => ({
    ...item,
    image: item.image.replace('.svg', '.png'),
  }));

  // Рендерим карточки
  const cards = items.map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
    return card.render(item);
  });

  gallery.render({ catalogCard: cards });
});

// 🔥 Слушаем клик по карточке — показываем модалку
events.on('product:select', ({ id }: { id: string }) => {
  const product = items.find((item) => item.id === id);
  if (!product) return;

  const element = cardModal.render({
    ...product,
    buttonText: product.price === null ? 'Недоступно' : 'Купить',
  });

  modal.render({ content: element });
  modal.open();
});