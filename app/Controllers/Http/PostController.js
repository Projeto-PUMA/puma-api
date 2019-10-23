/* eslint-disable no-unused-vars */

'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
const Post = use('App/Models/Post');

class PostController {
  async index ({ response }) {
    const posts = await Post.all();
    return response.ok({ posts });
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'subheading', 'body' ,'user_id', 'category']);
    const post = await Post.create(data);
    return response.ok({ post })
  }

  async show ({ params, response }) {
    const { id } = params;
    const post = await Post.findOrFail(id);

    return response.ok({ post });
  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.only(['title', 'subheading', 'body', 'category']);
    const post = await Post.findOrFail(id);
    await post.merge(data);
    await post.save();

    return response.ok({ post });
  }

  async destroy ({ params, response }) {
    const { id } = params;
    const post = await Post.find(id);
    await post.delete();
    return response.noContent();
  }
}

module.exports = PostController;
