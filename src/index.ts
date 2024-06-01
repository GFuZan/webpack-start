import "./index.scss";

[1, 2, 3].map((n) => n + 1);

[1, 2, 3].includes(2);

Promise.resolve().finally(() => {
  console.log([].flatMap((v) => v?.a));
});

const createImgDom = (src: any) => {
  const imgDom = document.createElement("img");
  imgDom.src = src;
  imgDom.classList.add("t-img");
  document.body.appendChild(imgDom);
};

createImgDom(require("./index.png"));
createImgDom(require("./index.svg"));
createImgDom(require("./index.gif"));
