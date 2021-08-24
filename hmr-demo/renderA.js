let timer;
export function render() {
    timer = setInterval(() => {
    index++
    document.querySelector("#app").innerHTML = `
        <h1>Hello Vite 123456!</h1>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Documentation${index}</a>
    `;
  }, 1000)  
  
}

let index = import.meta.hot.data.cache && import.meta.hot.data.cache.getIndex() ? import.meta.hot.data.cache.getIndex() : 0;

// const timer = setInterval(() => {
//     console.log(++i);
// }, 1000)
export {index}
if (import.meta.hot) {
    import.meta.hot.data.cache = {
        getIndex() {
            return index;
        }
    }
    import.meta.hot.dispose(() => {
        if (timer) clearInterval(timer)
    })
}