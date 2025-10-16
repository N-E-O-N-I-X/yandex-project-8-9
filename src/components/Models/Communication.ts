import { Api } from "../base/Api";
import { IProductsTotal, IOrder, IOrderResult } from "../../types";

export class Communication extends Api{
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options); 
    }

    getData(): Promise<IProductsTotal> {
        return this.get<IProductsTotal>("/product/");
    }

    postData(order: IOrder): Promise<IOrderResult> {
        return this.post<IOrderResult>("/order/", order);
    }
}