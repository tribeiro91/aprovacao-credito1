
const publicRoutes = {
    'GET /cliente' : 'ClientController.list',
    'GET /cliente/:id' : 'ClientController.get',
    'POST /cliente' : 'ClientController.create',
    'PUT /cliente/:id' : 'ClientController.update',
    'DELETE /cliente/:id' : 'ClientController.destroy'
};

module.exports = publicRoutes;


