import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postUpdated, selectPostByIdFunc } from "./postSlice";
import { Param } from "./postSlice";


export const EditPostForm = ({match} : RouteComponentProps<Param>) => {
    const postId = match.params.postId

    const post = useAppSelector(state => selectPostByIdFunc(state, postId))

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.content)

    const dispatch = useAppDispatch()
    const history = useHistory()

    const onTitleChanged: React.ChangeEventHandler<HTMLInputElement> = e => setTitle(e.target.value)

    const onContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => setContent(e.target.value)

    const onSavePostClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (title && content) {
            dispatch(postUpdated({id: postId, title, content, user:"", date:""})) // FIXME 
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>编辑文章</h2>
            <form>
                <label htmlFor="postTitle">文章标题: </label>
                <input
                    type={"text"}
                    id="postTitle"
                    name="postTitle"
                    placeholder="What is on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">内容: </label>
                <textarea 
                    id="postContent" 
                    name="postContent" 
                    value={content} 
                    onChange={onContentChange} 
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                保存文章
            </button>
        </section>
    )

}