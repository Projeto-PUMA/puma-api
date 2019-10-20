'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with permissions
 */
const Permission = use('Permission')

class PermissionController {
  /**
   * Show a list of all permissions.
   * GET permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const permissions = await Permission.all();
    return response.ok({permissions})
  }

  /**
   * Create/save a new role.
   * POST permissions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { name, description, slug } = request.only(['name', 'description', 'slug'])
    const role = await Permission.create({ name, description, slug });
    return response.ok({role})
  }

  /**
   * Display a single role.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id } = params;
    const role = await Permission.findOrFail(id);

    return response.ok({ role });
  }

  /**
   * Update role details.
   * PUT or PATCH permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['name', 'description', 'slug']);

    const role = await Permission.findOrFail(id);
    await role.merge(data);
    await role.save();
    return response.ok({ role });
  }

  /**
   * Delete a role with id.
   * DELETE permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params;
    const role = await Permission.find(id);
    await role.delete();
    return response.noContent();
  }
}

module.exports = PermissionController
