'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with permissions
 */
const Permission = use('Permission')

class PermissionController {
  async index ({ request, response, view }) {
    const permissions = await Permission.all();
    return response.ok({permissions})
  }

  async store ({ request, response }) {
    const { name, description, slug } = request.only(['name', 'description', 'slug'])
    const permission = await Permission.create({ name, description, slug });
    return response.ok({permission})
  }

  async show ({ params, request, response, view }) {
    const { id } = params;
    const permission = await Permission.findOrFail(id);

    return response.ok({ permission });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['name', 'description', 'slug']);

    const permission = await Permission.findOrFail(id);
    await permission.merge(data);
    await permission.save();
    return response.ok({ permission });
  }

  async destroy ({ params, request, response }) {
    const { id } = params;
    const permission = await Permission.find(id);
    await permission.delete();
    return response.noContent();
  }
}

module.exports = PermissionController
