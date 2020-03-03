'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {wordHandler, paramHandler} = require('./handler')
const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints
    .get("/hangman/words", wordHandler)
    .get("/hangman/guess/:wordId/:letter",paramHandler)
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));