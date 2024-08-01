import {SelectedProductToDisable} from "../../ListProducts/types/CreateProduct.types.ts";

export interface DisableProductProps {
    open: boolean;
    onClose: () => void;
    productToDisable: SelectedProductToDisable;
    onConfirm: () => void;
    loading?: boolean;
}
