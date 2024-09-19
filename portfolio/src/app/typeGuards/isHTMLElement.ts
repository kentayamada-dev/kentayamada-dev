const isHTMLElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export { isHTMLElement };
