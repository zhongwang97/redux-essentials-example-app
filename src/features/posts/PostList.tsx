import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostAuthor } from "./PostAuthors";
import { fetchPosts, selectPostFunc } from "./postSlice"; 
import { TimeAgo } from "./TimeAgo";

export const PostList = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPostFunc)
    const postStatus = useAppSelector(state => state.posts.status)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    const orderedPosts = posts.posts.slice().sort(
        (a, b) => b.date.localeCompare(a.date)
    )

    const renderedPosts = orderedPosts.map(post => (
       <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
       </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}