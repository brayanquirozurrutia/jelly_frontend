import {SvgIconComponent} from "@mui/icons-material";
import {SelectChangeEvent, SxProps} from "@mui/material";

export interface DropDownItem {
    id: string;
    name: string;
}

export interface CustomDropDownProps<T extends DropDownItem> {
    label: string;
    placeholder: string;
    items: T[];
    icon: SvgIconComponent;
    selectedValue: string | null;
    onChange: (event: SelectChangeEvent<string | null>) => void;
    sx?: SxProps;
}
