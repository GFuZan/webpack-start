interface Nav {
  getData: () => string;
}

const nav: Nav = {
  getData: () => "data",
};

const aaa: { nav: Nav } = {
  nav,
};

export { nav, aaa };
