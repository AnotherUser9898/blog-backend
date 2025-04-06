type LoginRequest = {
    username: string;
    password: string;
};

type CreatePostRequest = {
    title: string;
    content: string;
    user?: { username: string; id: number };
};

type EditPostRequest = CreatePostRequest;

type PostParams = {
    postId: string;
};

export type { LoginRequest, CreatePostRequest, PostParams, EditPostRequest };
