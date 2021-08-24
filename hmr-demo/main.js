import "./style.css";

import {render} from './renderA'

render();

if (import.meta.hot) {
  import.meta.hot.accept(['./renderA.js'], ([newA]) => {
    console.log(newA)
    if (newA.index > 5) {
      import.meta.hot.invalidate()
    } else {
      newA.render();
    }
    
  });
  // 热更新强制刷新
  import.meta.hot.decline();
  // import.meta.hot.accept((newModule) => {
    // newModule.render();
  // });
}

// const globModules = import.meta.glob("./glob/*");

// Object.entries(globModules).forEach(([k, v]) => {
//   v().then((m) => console.log(k + ":" + m.default));
// });

// const globModules = import.meta.globEager("./glob/*");

// Object.entries(globModules).forEach(([k, v]) => {
//   console.log(k + ":" + v.default);
// });
