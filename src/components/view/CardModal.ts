import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class CardModal extends Card {
  protected descriptionCard: HTMLElement;
  protected buyCardButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.descriptionCard = ensureElement<HTMLElement>(".card__text", container);
    this.buyCardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      container
    );

    this.buyCardButton.addEventListener("click", () => {
      this.events.emit("modal:buy", { id: this.id });
    });
  }

  protected set description(value: string) {
    this.setText(this.descriptionCard, value);
  }

  protected set price(value: number | null) {
    super.price = value;
    this.setDisabled(this.buyCardButton, value === null);
  }

  protected set buttonText(value: string) {
    this.setText(this.buyCardButton, value);
  }
}
