export const createElementAndInsert = (tag, className, properties, container) => {
  const el = document.createElement(tag);

  if(className) {
    el.classList.add(className);
  }
 
  for (let key in properties) {
    el[key] = properties[key];
  }

  if(container) {
    container.appendChild(el);  
  }
 
  return el;
};
