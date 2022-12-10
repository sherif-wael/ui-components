export function getMenuStyles(wrapper: HTMLElement) {
    const { top, left, width, height } = wrapper.getBoundingClientRect();
    const margin = 10;

    const styles: React.CSSProperties = {
        width: `${width}px`,
        left: `${left}px`,
    };

    if (Math.floor(top + height / 2) > Math.floor(window.innerHeight / 2)) {
        styles.bottom = `${window.innerHeight - (top - margin)}px`;
    } else {
        styles.top = `${top + height + margin}px`;
    }

    return styles;
}

export function scrollToOption(
    menu: HTMLElement,
    option: HTMLElement,
    options: { margin: number } = { margin: 0 }
) {
    const wrapperRect = menu.getBoundingClientRect();
    const targetRect = option.getBoundingClientRect();

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

    menu.scrollTop += scrollDistance;
}
