import React, { useId } from "react";
import FormItem, { FormItemProps, getErrorMsgId } from "@components/FormItem";
import clsx from "clsx";
import { fontStyles, sizeStyles } from "@lib/styles";

type Omitted = "size" | "prefix" | "suffix";

export interface InputProps
    extends Omit<React.ComponentProps<"input">, Omitted>,
        FormItemProps {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

function Input(props: InputProps) {
    const { label, error, size, id, prefix, suffix, className, ...rest } =
        props;
    const inputId = id || useId();
    const isInvalid = !!props.error;

    return (
        <FormItem id={inputId} label={props.label} error={props.error}>
            <div className={clsx("flex", sizeStyles({ size }))}>
                {prefix && (
                    <div className="flex items-center justify-center px-3 rounded-l-base text-gray-600 bg-gray-50 border border-gray-300 border-r-0">
                        {prefix}
                    </div>
                )}

                <input
                    className={clsx(
                        "text-inherit relative z-[1] px-3 border border-gray-300 outline-none focus:border-gray-700 hover:border-gray= transition-all",
                        isInvalid && "border-red-600 focus:border-red-600",
                        "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
                        !prefix && "rounded-l-base",
                        !suffix && "rounded-r-base",
                        className
                    )}
                    id={inputId}
                    aria-invalid={isInvalid ? "true" : "false"}
                    aria-describedby={getErrorMsgId(inputId)}
                    {...rest}
                />

                {suffix && (
                    <div className="flex items-center justify-center px-3 rounded-r-base text-gray-600 bg-gray-50 border border-gray-300 border-l-0">
                        {suffix}
                    </div>
                )}
            </div>
        </FormItem>
    );
}

export default Input;
