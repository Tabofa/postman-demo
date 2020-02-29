exports.missingUser = (res) => {
    res.status(404).json({'statusCode': 404, 'context': 'Missing user.'})
    console.log('Error 404 - missing username')
}

exports.invalidId = (res) => {
    res.status(404).json({'statusCode': 404, 'context': 'Invalid ID.'})
    console.log('Error 404 - Invalid ID')
}

exports.genericError = (res) => {
    res.status(400).json({statusCode: 400, context: "Something whent wrong."})
    console.log('Error 400 - Generic Error')
}

// exports = {
//     missingUser,
//     invalidId,
//     genericError
// }