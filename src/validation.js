export const ValidationTag = (value) => {
    let error = {}

    if (value?.start_time === "") {
        error.start_time = "Start time is required"
    } else {
        error.start_time = ""
    }

    if (value?.date === "") {
        error.date = "Date is required"
    } else {
        error.email = ""
    }

    if (value?.end_time === "") {
        error.end_time = "End time required"
    } else {
        error.end_time = ""
    }

    return error;
}