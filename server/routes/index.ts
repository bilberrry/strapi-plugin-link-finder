export default [
  {
    method: 'GET',
    path: '/find',
    handler: 'finder.find',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/config',
    handler: 'finder.config',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];
