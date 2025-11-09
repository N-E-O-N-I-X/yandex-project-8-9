import './scss/styles.scss';
import { ensureElement, cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { AppApi } from './components/Models/Communication';
import { Gallery } from './components/view/Gallery';
import { CardCatalog } from './components/view/CatalogCard';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct } from './types';


// DOM
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

// Events
const events = new EventEmitter();

// API
const api = new AppApi(CDN_URL, API_URL);

// UI
const gallery = new Gallery(galleryContainer, events);

// Load cards
api.fillCatalog().then((items: IProduct[]) => {
  const cards = items.map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
    return card.render(item);
  });

  gallery.render({ catalogCard: cards });
});