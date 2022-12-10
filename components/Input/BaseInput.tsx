import { MultipleSizeElement } from "@lib/types";
import clsx from "clsx";

export interface BaseInputProps
    extends Omit<JSX.IntrinsicElements["input"], "size" | "prefix" | "suffix">,
        MultipleSizeElement {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

function BaseInput(props: BaseInputProps) {
    const { size = "md", className, prefix, suffix, "aria-invalid": ariaInvalid, ...rest } = props;
    const isInvalid = ariaInvalid && ariaInvalid === "true";

    return (

    );
}

export default BaseInput;
