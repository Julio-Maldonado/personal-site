const randomString = (length) => {
  const x = 36 ** (length + 1);
  const y = 36 ** length;
  return Math.round(x - (Math.random() * y)).toString(36).slice(1);
};

const pages = [
  {
    route: '/',
    title: 'Julio Maldonado',
    heading: 'ABOUT THIS SITE',
  },
  {
    route: '/about',
    title: 'About | Julio Maldonado',
    heading: 'ABOUT ME',
  },
  {
    route: '/projects',
    title: 'Projects | Julio Maldonado',
    heading: 'PROJECTS',
  },
  {
    route: '/stats',
    title: 'Stats | Julio Maldonado',
    heading: 'STATS',
  },
  {
    route: '/contact',
    title: 'Contact | Julio Maldonado',
    heading: 'CONTACT',
  },
];

export { pages, randomString };
