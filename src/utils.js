export const createElementAndInsert = (tag, className, properties, container) => {
  const el = document.createElement(tag);
  el.classList.add(className);

  for (let key in properties) {
    el[key] = properties[key];
  }

  container.appendChild(el);
  return el;
};
