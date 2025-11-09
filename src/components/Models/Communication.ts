import { Api } from "../base/Api";
import { IOrder, IProduct, IProductsTotal, IOrderResult } from "../../types";

export class AppApi extends Api {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  fillCatalog(): Promise<IProduct[]> {
    return this.get<IProductsTotal>("/product/").then((data) => {
      return data.items.map((item) => ({
        ...item,
        image: `${this.cdn}/${item.image.replace('.svg', '.png')}`,
      }));
    });
  }

  sendOrder(order: IOrder): Promise<IOrderResult> {
    return this.post<IOrderResult>("/order/", order);
  }
}
