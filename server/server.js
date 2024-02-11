const express = require('express');

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


const listServices = require('./api.json'); 
app.get('/api/services', (req, res) => {
res.json({data: listServices});
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})