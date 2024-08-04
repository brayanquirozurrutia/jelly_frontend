import AddProductImage from "../AddProductImage";
import EditProduct from "./EditProduct";
import CreateVersion from "../Version/CreateVersion";
import CustomCollapse from "../../../commons/CustomCollapse";
import {useParams} from "react-router-dom";


const BaseEditProduct = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <div className="p-2 rounded-lg border-2 shadow-md mb-2">
                <CustomCollapse
                    label="Editar producto"
                    initialOpen={false}
                    onToggle={() => {}}
                >
                    <EditProduct productId={id} />
                </CustomCollapse>
            </div>
            <div className="p-2 rounded-lg border-2 shadow-md mb-2">
                <CustomCollapse
                    label="Imágenes"
                    initialOpen={false}
                    onToggle={() => {}}
                >
                    <AddProductImage productId={id} />
                </CustomCollapse>
            </div>
            <div className="p-2 rounded-lg border-2 shadow-md mb-2">
                <CustomCollapse
                    label="Versiones"
                    initialOpen={false}
                    onToggle={() => {}}
                >
                    <CreateVersion productId={id} />
                </CustomCollapse>
            </div>
        </div>
    );
};

export default BaseEditProduct;
