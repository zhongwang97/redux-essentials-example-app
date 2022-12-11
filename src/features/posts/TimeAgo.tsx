import { parseISO, formatDistanceToNow } from "date-fns";

export interface TimeAgoProp {
    timestamp: string
}
export const TimeAgo = ({ timestamp }: TimeAgoProp) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}