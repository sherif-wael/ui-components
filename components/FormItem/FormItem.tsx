import { fontStyles, MultipleSizeElement } from "@lib/styles";
import clsx from "clsx";
import { getErrorMsgId } from "./FormItem.utils";

export interface FormItemProps extends MultipleSizeElement {
    label?: React.ReactNode;
    error?: React.ReactNode;
    id?: string;
    children?: React.ReactNode;
}

function FormItem(props: FormItemProps) {
    return (
        <div className={clsx("flex flex-col", fontStyles(props))}>
            {props.label ? (
                <label
                    className={clsx("text-gray-700 mb-3", fontStyles(props))}
                    htmlFor={props.id}
                >
                    {props.label}
                </label>
            ) : null}

            {props.children}

            {props.error ? (
                <div
                    className={clsx("text-red-600 mt-3", fontStyles(props))}
                    id={getErrorMsgId(props.id)}
                >
                    {props.error}
                </div>
            ) : null}
        </div>
    );
}

export default FormItem;
