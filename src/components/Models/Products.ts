import { IProduct } from "../../types"

export class Products{
    products: IProduct[] = [];
    selectedProduct: IProduct | null = null;

    setItems(products: IProduct[]): void {
        this.products = products;
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

    setSelected(product: IProduct): void {
        this.selectedProduct = product;
    }

    getSelected(): IProduct | null {
        return this.selectedProduct;
    }
}