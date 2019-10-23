/* eslint-disable no-unused-vars */

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
const Project = use('App/Models/Project');
const Event = use('Event');

class ProjectController {
  async index ({ request, response, view }) {
    const projects = await Project.all();
    return response.ok({ projects });
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'attachment_url', 'user_id', 'project_category_id']);
    const project = await Project.create(data);
    await Event.fire('project::created::owner', project);
    await Event.fire('project::created::log', project);
    return response.ok({ project })
  }

  async show ({ params, request, response }) {
    const { id } = params;
    const project = await Project.findOrFail(id);

    return response.ok({ project });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['title', 'description', 'attachment_url']);
    const project = await Project.findOrFail(id);
    await project.merge(data);
    await project.save();

    return response.ok({ project });
  }

  async updateStatus({ params, request, response }){
    const { id } = params;
    const data = request.only(['status']);
    const project = await Project.findOrFail(id);
    await project.merge(data);
    await project.save();
    Event.fire('project::updatedStatus::owner', await project);      
    Event.fire('project::updatedStatus::log', await project);      
    return response.ok({ project });
  }

  async destroy ({ params, response }) {
    const { id } = params;
    const project = await Project.find(id);
    await project.delete();
    return response.noContent();
  }
}

module.exports = ProjectController;
