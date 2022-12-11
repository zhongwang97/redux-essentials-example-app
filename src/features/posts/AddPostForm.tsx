import React, { useState } from 'react';
import { postAdded } from './postSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserFunc } from '../users/userSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useAppDispatch()

    const users = useAppSelector(selectUserFunc)

    const onAuthorChanged: React.ChangeEventHandler<HTMLSelectElement> = e => setUserId(e.target.value)
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )

            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

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
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">内容：</label>
                <textarea
                    id="postContent"
                    name='postContent'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>保存文章</button>
            </form>
        </section>
    )
}