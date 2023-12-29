import { Request, Response } from "express";
import {
  createPostService,
  getPostByAuthorIdService,
  getPostByIdService,
  getPostsService,
  deletePostService,
} from "../services/post.service";

export async function createPost(_req: Request, res: Response) {
  try {
    const { title, content, userId } = _req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const post = await createPostService(title, content, userId);
    if (post.status !== 201) {
      return res.status(post.status).json({ message: post.message });
    }
    return res
      .status(201)
      .json({ message: "Post created successfully", data: post });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "An error occurred while creating post",
    });
  }
}

export async function getPosts(_req: Request, res: Response) {
  try {
    const posts = await getPostsService();
    return res.status(200).send(posts);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "An error ocurred while fetching posts",
    });
  }
}

export async function getPostById(_req: Request, res: Response) {
  try {
    const id = Number(_req.params.id);
    const post = await getPostByIdService(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).send(post);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "An error ocurred while fetching post",
    });
  }
}

export async function getPostByAuthorId(_req: Request, res: Response) {
  try {
    const authorId = Number(_req.params.authorId);
    const post = await getPostByAuthorIdService(authorId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).send(post);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "An error ocurred while fetching post",
    });
  }
}

export async function deletePost(_req: Request, res: Response) {
  try {
    const id = Number(_req.params.id);
    const post = await getPostByIdService(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const deletedPost = await deletePostService(id);
    return res.status(200).json({ message: "Post deleted successfully", data: deletedPost });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "An error ocurred while deleting post",
    });
  }
}
