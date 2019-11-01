/* eslint-disable no-unused-vars */

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with skills
 */
const Skill = use('App/Models/Skill');

class SkillController {
  async index ({ request, response, view }) {
    const skills = await Skill.query().with('children').fetch();
    const skillsJson = skills.toJSON();
    const skillsOnlyFathers = skillsJson.filter(skill => skill.skill_id === null);
    return response.ok({ skills: skillsOnlyFathers });
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'skill_id']);
    const skill = await Skill.create(data);
    return response.ok(skill)
  }

  async show ({ params, request, response }) {
    const { id } = params;
    const skill = await Skill.query().where({id}).with('father').with('children').first();
    await skill.load('father', 'children')
    return response.ok({ skill });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['title', 'description', 'attachment_url']);
    const skill = await Skill.findOrFail(id);
    await skill.merge(data);
    await skill.save();

    return response.ok({ skill });
  }

  async destroy ({ params, response }) {
    const { id } = params;
    const skill = await Skill.find(id);
    await skill.delete();
    return response.noContent();
  }
}

module.exports = SkillController;
