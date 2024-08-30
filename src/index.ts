import getData from "./common";
import json from "./index.json";
import styles from "./index.modules.scss";
import p1 from "./index.png";
import s1 from "./index.svg";
import g1 from "./index.gif";

import "./index.scss";

[1, 2, 3].map((n) => n + 1);

[1, 2, 3].includes(2);

Promise.resolve().finally(() => {
  console.log([].flatMap((v) => v?.a));
});

const createImgDom = (src: string) => {
  const imgDom = document.createElement("img");
  imgDom.src = src;
  imgDom.classList.add(styles.tMImg);
  document.body.appendChild(imgDom);
};

const createTxtDom = (txt: string) => {
  const spanDom = document.createElement("span");
  spanDom.innerText = txt;
  spanDom.classList.add("t-img");
  document.body.appendChild(spanDom);
};

createImgDom(p1);
createImgDom(s1);
createImgDom(g1);

createTxtDom(JSON.stringify(json));
createTxtDom(getData());
