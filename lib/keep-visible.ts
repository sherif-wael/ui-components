interface KeepVisibleOptions {
    margin: number;
}

const defaultOptions: KeepVisibleOptions = {
    margin: 0,
};

export function keepVisible(
    wrapper: HTMLElement,
    target: HTMLElement,
    options: KeepVisibleOptions = defaultOptions
) {
    const wrapperRect = wrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let scrollDistance = 0;

    if (wrapperRect.y + options.margin > targetRect.y) {
        const targetActualPosition = targetRect.y;
        const targetRequiredY = wrapperRect.y + options.margin;
        scrollDistance = targetRequiredY - targetActualPosition;
        scrollDistance *= -1;
    } else if (
        targetRect.y + targetRect.height >
        wrapperRect.y + wrapperRect.height - options.margin
    ) {
        const targetActualPosition = targetRect.y + targetRect.height;
        const targetRequiredY =
            wrapperRect.y + wrapperRect.height - options.margin;
        scrollDistance = targetActualPosition - targetRequiredY;
    }

    wrapper.scrollTop += scrollDistance;
}
