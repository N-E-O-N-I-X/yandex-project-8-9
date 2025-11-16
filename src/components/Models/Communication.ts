import { Api } from '../base/Api';
import { IOrder, IProduct, IProductsData } from '../../types';

interface IOrderResult {
	id: string;
	total: number;
}

export class AppApi  extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	fillCatalogy(): Promise<IProduct[]> {
		return this.get('/product/')
			.then((data: IProductsData) => {
				return data.items.map((item) => ({
					...item,
					image: this.cdn + item.image,
				}));
			});
	}

	sendOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order)
			.then((data: IOrderResult)=> {
				return data;
			});
	};
}