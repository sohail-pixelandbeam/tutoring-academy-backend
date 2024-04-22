const sendErrors = (e, res) => {
    console.log(e)
    res.status(400).send({ message: "Failed to Complete the Request!", reason: e.message })
}


exports.sendErrors = sendErrors;