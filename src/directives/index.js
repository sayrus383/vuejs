let outsideClickHandler;

export const Autoclose = {
    bind(el, binding, vnode) {
        outsideClickHandler = (e) => {
            e.stopPropagation();

            if (!el.contains(e.target)) {
                vnode.context.closePopup();
            }
        };
        document.addEventListener('click', outsideClickHandler);
        document.addEventListener('touchstart', outsideClickHandler);
    },
    unbind() {
        document.removeEventListener('click', outsideClickHandler);
        document.removeEventListener('touchstart', outsideClickHandler);
    },
};