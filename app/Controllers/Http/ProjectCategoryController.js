/* eslint-disable no-unused-vars */

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projectCategories
 */
const ProjectCategory = use('App/Models/ProjectCategory');

class ProjectController {
  async index ({ request, response, view }) {
    const projectCategories = await ProjectCategory.query().with('children').fetch();
    const projectCategoriesJson = projectCategories.toJSON();
    const projectCategoriesOnlyFathers = projectCategoriesJson.filter(projectCategory => projectCategory.project_category_id === null);
    return response.ok({ projectCategories: projectCategoriesOnlyFathers });
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'project_category_id']);
    const projectCategory = await ProjectCategory.create(data);
    return response.ok(projectCategory)
  }

  async show ({ params, request, response }) {
    const { id } = params;
    const projectCategory = await ProjectCategory.query().where({id}).with('father').with('children').first();
    await projectCategory.load('father', 'children')
    return response.ok({ projectCategory });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['title', 'description', 'attachment_url']);
    const projectCategory = await ProjectCategory.findOrFail(id);
    await projectCategory.merge(data);
    await projectCategory.save();

    return response.ok({ projectCategory });
  }

  async destroy ({ params, response }) {
    const { id } = params;
    const projectCategory = await ProjectCategory.find(id);
    await projectCategory.delete();
    return response.noContent();
  }
}

module.exports = ProjectController;
