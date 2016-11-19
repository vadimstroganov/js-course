function prepend(container, element) {
    firstChild = container.firstElementChild;
    container.insertBefore(element, firstChild);
}
