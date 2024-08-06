import CustomCollapse from "../../../../commons/CustomCollapse";
import CustomSnackBar from "../../../../commons/CustomSnackBar";
import useCreateVersion from "./hooks/useCreateVersion.ts";
import {Grid} from "@mui/material";
import CustomInput from "../../../../commons/Inputs";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import NumbersIcon from "@mui/icons-material/Numbers";
import BaseButton from "../../../../commons/CustomButton/CustomButton.tsx";
import CustomInputFile from "../../../../commons/CustomInputFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {SelectedProduct} from "../../types/Products.types.ts";

const CreateVersion = ({productId}: SelectedProduct) => {
    const {
        snackbarOpen,
        setSnackbarOpen,
        endpointSuccess,
        endpointError,
        handleSubmit,
        name,
        setName,
        nameError,
        setFocusedInput,
        focusedInput,
        stock,
        setStock,
        stockError,
        loading,
        handleImageChange,
        imageError,
        imageFileName,
    } = useCreateVersion({productId});

    return (
        <div className="p-2 mb-2">
            <CustomCollapse
                label="Crear versión"
                initialOpen={false}
                onToggle={() => {}}
            >
                {snackbarOpen && (
                    <CustomSnackBar
                        open={snackbarOpen}
                        onClose={() => setSnackbarOpen(false)}
                        message={endpointSuccess || endpointError}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        type={endpointSuccess ? 'success' : 'error'}
                    />
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <CustomInput
                                value={name}
                                setValue={setName}
                                valueError={nameError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="name"
                                label="Nombre"
                                placeholder="Nombre de la versión"
                                icon={DriveFileRenameOutlineIcon}
                                focusText="name"
                                type="text"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <CustomInput
                                value={stock}
                                setValue={setStock}
                                valueError={stockError}
                                setFocusedInput={setFocusedInput}
                                focusedInput={focusedInput}
                                id="stock"
                                label="Stock"
                                placeholder="Stock del producto"
                                icon={NumbersIcon}
                                focusText="stock"
                                type="number"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <CustomInputFile
                                onChange={handleImageChange}
                                id="create-version"
                                buttonText="Subir Imagen"
                                startIcon={<AddPhotoAlternateIcon/>}
                                error={imageError}
                                fileName={imageFileName}
                            />
                        </Grid>
                        <Grid item xs={12} className="text-right">
                            <BaseButton
                                label="Crear versión"
                                className="w-full lg:w-1/2"
                                loading={loading}
                            />
                        </Grid>
                    </Grid>
                </form>
            </CustomCollapse>
        </div>
    );
}

export default CreateVersion;
