export const budgetEndpoint = {
  getAll: '/budgets',
  getById: '/budgets/:id',
  create: '/budgets',
  update: '/budgets/:id',
  delete: '/budgets/:id',
  updatePrice : '/budgets/updatePrice/:id',
  updateState: '/budgets/states/:id/:state',
  getStates: '/budgets/states/get',
  search: '/ownable/search/:entity/:query',
  paginate: '/budgets/paginate/',
};
