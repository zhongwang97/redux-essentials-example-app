import React, { useState } from 'react';
import { postAdded } from './postSlice';
import { useAppDispatch } from '../../app/hooks';

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useAppDispatch()

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content)
            )

            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>添加新文章</h2>
            <form>
                <label htmlFor='postTitle'>文章标题:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name='postTitle'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="postContent">内容：</label>
                <textarea
                    id="postContent"
                    name='postContent'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="button" onClick={onSavePostClicked}>保存文章</button>
            </form>
        </section>
    )
}