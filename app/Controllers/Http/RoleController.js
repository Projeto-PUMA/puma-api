'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with roles
 */
const Role = use('Role')

class RoleController {
  async index ({ request, response }) {
    const roles = await Role.query().with('permissions').fetch();
    return response.ok({roles})
  }

  async store ({ request, response }) {
    const { name, description, slug } = request.only(['name', 'description', 'slug'])
    const role = await Role.create({ name, description, slug });
    return response.ok({role})
  }

  async show ({ params, request, response, view }) {
    const { id } = params;
    const role = await Role.query().where({ id }).with('permissions').first();
    return response.ok({ role });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['name', 'description', 'slug']);

    const role = await Role.findOrFail(id);
    await role.merge(data);
    await role.save();
    return response.ok({ role });
  }

  async destroy ({ params, request, response }) {
    const { id } = params;
    const role = await Role.find(id);
    await role.delete();
    return response.noContent();
  }

  async grantPermissions ({ params, request, response }) {
    const { id } = params;
    const { permissions } = request.only(['permissions'])
    const role = await Role.findOrFail(id);
    await role.permissions().attach(permissions);
    await role.load('permissions');
    return response.ok({ role })
  }

  async revokePermissions ({ params, request, response }) {
    const { id } = params;
    const { permissions } = request.only(['permissions'])
    const role = await Role.findOrFail(id);
    await role.permissions().detach(permissions);
    await role.load('permissions');
    return response.ok({ role })
  }
}

module.exports = RoleController
