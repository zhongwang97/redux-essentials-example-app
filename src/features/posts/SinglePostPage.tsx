import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Param } from "./postSlice";


export const SinglePostPage = ({ match }: RouteComponentProps<Param>) => {
    const postId = match.params.postId

    const post = useAppSelector(
        state => state.posts.find(p => p.id === postId)
    )

    if (!post) {
        return (
            <section>
                <h2>页面未找到！</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}