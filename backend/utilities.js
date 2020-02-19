const missingUser = (res) => {
    res.status(404).json({'statusCode': 404, 'context': 'Missing user.'})
    console.log('Error 404 - missing username')
}

exports = {
    missingUser
}