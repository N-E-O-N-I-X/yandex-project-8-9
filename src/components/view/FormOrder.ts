import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IFormOrder {
  payment: "card" | "cash" | "";
  address: string;
}

export class FormOrder extends Component<IFormOrder> {
  protected cash: HTMLButtonElement;
  protected card: HTMLButtonElement;
  protected address: HTMLInputElement;
  protected button: HTMLButtonElement;
  protected errorSpan: HTMLSpanElement;

  public payment: "card" | "cash" | "" = "";
  public addressValue = "";

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.cash = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      container
    );
    this.card = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      container
    );
    this.address = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      container
    );
    this.button = ensureElement<HTMLButtonElement>(".order__button", container);
    this.errorSpan = ensureElement<HTMLSpanElement>(".form__errors", container);

    // Клик по кнопке "Далее"
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("form-order:next");
    });

    // Выбор "При получении"
    this.cash.addEventListener("click", () => {
      this.payment = "cash";
      this.togglePaymentButtons();
      this.emitChange("payment", "cash");
    });

    // Выбор "Онлайн"
    this.card.addEventListener("click", () => {
      this.payment = "card";
      this.togglePaymentButtons();
      this.emitChange("payment", "card");
    });

    // Ввод адреса
    this.address.addEventListener("input", () => {
      this.addressValue = this.address.value;
      this.emitChange("address", this.addressValue);
      this.updateButtonState();
    });
  }

  protected emitChange(field: keyof IFormOrder, value: string) {
    const formName = (this.container as HTMLFormElement).name;
    this.events.emit(`${formName}.${field}:change`, {
      field,
      value,
      formType: "order",
    });
    this.updateButtonState();
  }

  protected togglePaymentButtons() {
    this.toggleClass(this.cash, "button_alt-active", this.payment === "cash");
    this.toggleClass(this.card, "button_alt-active", this.payment === "card");
  }

  protected updateButtonState() {
    const isValid = this.payment !== "" && this.addressValue.trim() !== "";
    this.button.disabled = !isValid;
  }

  // Если надо очистить кнопку позже
  public clearPayment(): void {
    this.toggleClass(this.cash, "button_alt-active", false);
    this.toggleClass(this.card, "button_alt-active", false);
  }

  public reset(): void {
    this.address.value = "";
    this.clearPayment();
  }
}
