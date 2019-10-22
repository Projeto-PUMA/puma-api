'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with roles
 */
const Role = use('Role')

class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const roles = await Roles.query().with('permissions').fetch();
    return response.ok({roles})
  }

  /**
   * Create/save a new role.
   * POST roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { name, description, slug } = request.only(['name', 'description', 'slug'])
    const role = await Role.create({ name, description, slug });
    return response.ok({role})
  }

  /**
   * Display a single role.
   * GET roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id } = params;
    const role = await Roles.query().where({ id }).with('permissions').fetch();
    return response.ok({ role });
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['name', 'description', 'slug']);

    const role = await Role.findOrFail(id);
    await role.merge(data);
    await role.save();
    return response.ok({ role });
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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
