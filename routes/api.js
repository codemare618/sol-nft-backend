require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_HOST = process.env.API_HOST;
const {getNFTTokens, getMetadata} = require('../utils/web3');

router.get('/collections', async (req, res) => {
    try {
        const result = await axios.post(`${API_HOST}/collections`, {})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/collections/:slug', async (req, res) => {
    try {
        const {includeLogs, slug} = req.body;
        const result = await axios.post(`${API_HOST}/collections/${req.params.slug}`, {includeLogs, slug})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tokens/listed', async (req, res) => {
    try {
        const {collection} = req.body;
        const result = await axios.post(`${API_HOST}/tokens/listed`, {collection})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tokens/price-vs-rank', async (req, res) => {
    try {
        const {collection} = req.body;
        const result = await axios.post(`${API_HOST}/tokens/price-vs-rank`, {collection})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tokens', async (req, res) => {
    try {
        const {collection} = req.body;
        const result = await axios.post(`${API_HOST}/tokens`, {collection})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/owners', async (req, res) => {
    try {
        const {collection, query} = req.body;
        const result = await axios.post(`${API_HOST}/owners`, {collection, query})
        res.status(200).send(result.data)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.post('/statistics', async (req, res) => {
    try {
        const statics = [];
        const nftTokens = await getNFTTokens();
        nftTokens.map(mint => {
            statics.push(getMetadata(mint))
        })
        res.status(200).send(statics)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router;