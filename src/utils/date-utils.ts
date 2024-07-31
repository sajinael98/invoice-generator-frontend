import dayjs from "dayjs";

export function formatTime(value: any) {
    return dayjs(value).format('hh:mm A')
}

export function parseTime(value: string) {
    return dayjs(value).toDate()
}

export function formatDate(value: any) {
    return dayjs(value).format('YYYY-MM-DD')
}

export function parseDate(value: string) {
    return dayjs(value).toDate()
}