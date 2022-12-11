import React from "react";
import { useAppSelector } from "../../app/hooks";

export interface UserProp {
    userId: string
}

export const PostAuthor = ({userId} :UserProp) => {
    const author = useAppSelector(state => state.users.find(
        user => user.id === userId)
    )

    return <span>by {author ? author.name : 'Unknown author'}</span>
}