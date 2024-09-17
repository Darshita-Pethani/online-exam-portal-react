export const ValidationTag = (value) => {
    let error = {}

    if (value?.start_time === "") {
        error.start_time = "Start time is required"
    } else {
        error.start_time = ""
    }

    if (value?.date === "" || value?.date_of_birth === "") {
        error.date = "Date is required"
    } else {
        error.date = ""
    }

    if (value?.end_time === "") {
        error.end_time = "End time required"
    } else {
        error.end_time = ""
    }

    if (value?.image === null) {
        error.image = "Image required"
    } else {
        error.image = ""
    }

    return error;
}