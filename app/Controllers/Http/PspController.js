/* eslint-disable no-unused-vars */

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pspCategories
 */
const Psp = use('App/Models/Psp');

class PspController {
  async index ({ request, response, view }) {
    const pspCategories = await Psp.query().with('children').fetch();
    const pspJson = pspCategories.toJSON();
    const pspOnlyFathers = pspJson.filter(psp => psp.psp_id === null);
    return response.ok({ pspCategories: pspOnlyFathers });
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'psp_id']);
    const psp = await Psp.create(data);
    return response.ok(psp)
  }

  async show ({ params, request, response }) {
    const { id } = params;
    const psp = await Psp.query().where({id}).with('father').with('children').first();
    await psp.load('father', 'children')
    return response.ok({ psp });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['title', 'description', 'attachment_url']);
    const psp = await Psp.findOrFail(id);
    await psp.merge(data);
    await psp.save();

    return response.ok({ psp });
  }

  async destroy ({ params, response }) {
    const { id } = params;
    const psp = await Psp.find(id);
    await psp.delete();
    return response.noContent();
  }
}

module.exports = PspController;
