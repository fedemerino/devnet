import prisma from "../utils/prisma";

export async function createPostService(
  title: string,
  content: string,
  userId: number
) {
  try {
    if (!title || !content || !userId) {
      return { status: 400, message: "Please provide all fields" };
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: userId } },
      },
    });
    if (!post) {
      return { status: 500, message: "An error occurred while creating post" };
    }
    return { status: 201, message: "Post created successfully", data: post };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while creating post");
  }
}

export async function getPostsService() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching posts");
  }
}

export async function getPostByIdService(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching post");
  }
}

export async function getPostByAuthorIdService(authorId: number) {
  try {
    const post = await prisma.post.findMany({
      where: {
        authorId,
      },
    });
    return post;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching post");
  }
}

export async function updatePostService(
  id: number,
  title: string,
  content: string,
  userId: number
) {
  try {
    if (!title || !content || !userId) {
      return { status: 400, message: "Please provide all fields" };
    }
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    if (!post) {
      return { status: 500, message: "An error occurred while updating post" };
    }
    return { status: 200, message: "Post updated successfully", data: post };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while updating post");
  }
}

export async function deletePostService(id: number) {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    if (!post) {
      return { status: 500, message: "An error occurred while deleting post" };
    }
    return { status: 200, message: "Post deleted successfully", data: post };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while deleting post");
  }
}
