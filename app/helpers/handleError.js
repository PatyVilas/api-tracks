const httpError = (res, err) => {
    const time = new Date();
	console.log(time, err);
	res.status(500);
	res.send({ error: 'Something happened' });
}

module.exports = { httpError }