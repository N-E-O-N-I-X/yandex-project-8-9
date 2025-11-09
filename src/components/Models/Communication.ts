import { Api } from "../base/Api";
import { IOrder, IProduct, IProductsTotal, IOrderResult } from "../../types";
import { categoryMap } from "../../utils/constants";

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
        image: `${this.cdn}+${item.image}`,
        category: categoryMap[item.category],
      }));
    });
  }

  sendOrder(order: IOrder): Promise<IOrderResult> {
    return this.post<IOrderResult>("/order/", order);
  }
}
