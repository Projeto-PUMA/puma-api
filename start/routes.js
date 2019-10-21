'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('login', 'AuthController.login');
    Route.post('confirmation', 'AuthController.confirmation');
    Route.post('forgotPassword', 'AuthController.forgotPassword');
    Route.post('register', 'AuthController.register').validator('Register');
    Route.post('resetPassword', 'AuthController.resetPassword');
}).prefix('api/v1/auth');

Route.group(() => {
    Route.resource('users', 'UserController').apiOnly();
    Route.get('users/:id/roles', 'UserController.showRoles');
    Route.post('users/:id/roles', 'UserController.grantRoles');
    Route.delete('users/:id/roles', 'UserController.revokeRoles');
    
    Route.resource('roles', 'RoleController').apiOnly();
    Route.post('roles/:id/permissions', 'RoleController.grantPermissions');
    Route.delete('roles/:id/permissions', 'RoleController.revokePermissions');
    Route.post('roles/:id/membership', 'RoleController.membership');
    Route.get('roles/:id/membership', 'RoleController.showMembers');

    Route.resource('permissions', 'PermissionController').apiOnly();
}).prefix('api/v1');