export function convertDate2Day(date) {
    const day = new Date(date).getDay()
    // console.log(day)
    if (day === 0) {
        return 'CN'
    } else {
        return `Th ${day + 1}`
    }
}
