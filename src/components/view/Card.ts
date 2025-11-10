import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";

interface ICard extends IProduct {
  buttonText: string;
  index: number;
  TotalPrice: number;
}

export class Card extends Component<ICard> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;
  protected events: IEvents;
  protected id!: string;
  protected categoryCard: HTMLElement;
  protected imageCard: HTMLImageElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.cardTitle = ensureElement<HTMLElement>(".card__title", container);
    this.cardPrice = ensureElement<HTMLElement>(".card__price", container);

    try {
      this.categoryCard = ensureElement<HTMLElement>(
        ".card__category",
        container
      );
    } catch {
      this.categoryCard = null as unknown as HTMLElement;
    }

    try {
      this.imageCard = ensureElement<HTMLImageElement>(
        ".card__image",
        container
      );
    } catch {
      this.imageCard = null as unknown as HTMLImageElement;
    }
  }

  protected set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  protected set price(value: number | null) {
    this.setText(
      this.cardPrice,
      value === null ? `Бессцено` : `${value} синапсов`
    );
  }

  protected set category(value: string) {
    if (!this.categoryCard) return;
    this.categoryCard.className = "card__category";
    const categoryClass = categoryMap[value];
    if (categoryClass) {
      this.categoryCard.classList.add(categoryClass);
      this.setText(this.categoryCard, value);
    }
  }

  protected set image(value: string) {
    if (!this.imageCard) return;
    this.setImage(this.imageCard, value);
  }
}
