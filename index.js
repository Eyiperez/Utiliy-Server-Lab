const math = require("./services/math");
const GphApiClient = require('giphy-js-sdk-core')
const express = require('express');

const app = express();

const port = 3000;

client = GphApiClient('aqbm4dLmBhLELshXua8nFz2HxjU0BMHo');


app.get('/', (req, res) => {
    res.json({ 'message': 'this is home page' })
});

app.get('/math/add', (req, res) => {
    console.log(req.query);
    const input = req.query;
    console.log(Object.values(req.query));
    const valArr = Object.values(req.query);
    let sumString = '';
    const sumArr = [];
    for (let i = 0; i < valArr.length; i++) {

        if (isNaN(parseInt(valArr[i]))) {
            res.json({ 'error': 'You passed a non-number value into the parameters.' })
        }
        else {
            sumArr.push(parseInt(valArr[i]));
        }

        if (i === valArr.length - 1) {
            sumString += `${valArr[i]} `
        } else {
            sumString += `${valArr[i]} + `
        }
    }
    console.log(sumString);
    console.log(sumArr);
    const sum = math.add(sumArr)
    console.log(sum)
    res.json({ 'input': input, 'sumString': sumString, 'sum': sum })
});

app.get('/math/multiply', (req, res) => {
    console.log(req.query);
    const input = req.query;
    console.log(Object.values(req.query));
    const valArr = Object.values(req.query);
    let productString = '';
    const productArr = [];
    for (let i = 0; i < valArr.length; i++) {

        if (isNaN(parseInt(valArr[i]))) {
            res.json({ 'error': 'You passed a non-number value into the parameters.' })
        }
        else {
            productArr.push(parseInt(valArr[i]));
        }

        if (i === valArr.length - 1) {
            productString += `${valArr[i]}`
        } else {
            productString += `${valArr[i]} * `
        }
    }
    console.log(productString);
    console.log(productArr);
    const product = math.multiply(productArr)
    console.log(product)
    res.json({ 'input': input, 'productString': productString, 'product': product })

});


app.get('/gif', (req, res) => {
    const searchInput = req.query;
    console.log(req.query)
    const searchSubjectArr = Object.values(searchInput)
    const searchObj = {}
    searchObj['q'] = searchSubjectArr[0]
    const gifUrlArr = []
    client.search('gifs', searchObj)
        .then((response) => {

            response.data.forEach((gifObject) => {
                //console.log(gifObject.images.original.url)
                const gifUrl = gifObject.images.original.url
                gifUrlArr.push(gifUrl)

            })
            console.log(gifUrlArr)
            res.send(gifUrlArr);
        })
        .catch((err) => {
        })
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});