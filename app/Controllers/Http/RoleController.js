'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with roles
 */
const Role = use('Role')
const Permission = use('Permission')

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
  async index ({ request, response, view }) {
    const roles = await Role.all();
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
    const role = await Role.findOrFail(id);

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
}

module.exports = RoleController
