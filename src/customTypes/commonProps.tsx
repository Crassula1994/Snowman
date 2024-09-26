import { MouseEvent } from "react";

export interface ButtonProps {
    block?: boolean;
    colorType: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    outline?: boolean;
}
