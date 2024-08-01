import {GenericObject} from "../../../../../types.ts";
import {CategoryType} from "../../../Categories/category.types.ts";
import {GroupType} from "../../../Groups/group.types.ts";

export interface GetProductInterface extends GenericObject {
    id: string;
    image: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: CategoryType;
    group: GroupType;
}

export interface ProductsData {
    listProducts: GetProductInterface[];
    totalProducts: number;
}

export interface SelectedProductToDisable {
    id: string;
    name: string;
}
