function deleteTextNodes(element) {
    const textNodeTypeId = 3;

    for(node of element.childNodes) {
        if (node.nodeType == textNodeTypeId) {
            element.removeChild(node);
        }
    }

    return element;
}
