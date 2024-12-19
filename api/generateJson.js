const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { kv } = require('@vercel/kv');
const cache = require('../cache');

console.log('generateJson.js loaded');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const wordpressUrl = "https://wordpress-1074629-4621962.cloudwaysapps.com";

router.post('/', async (req, res) => {
    const type = req.body.type;
    const id = req.body.id;
    const json = req.body.json;
    

    if (!type) {
        return res.status(400).send("Type is required");
    }

    let filePath;
    let dirPath;
    if (type === 'instagram') {
        filePath = path.join('/tmp', 'instagram-feeds.json');
        dirPath = path.dirname(filePath);
        try {
            const fileName = path.basename(filePath, path.extname(filePath));
            await kv.set(fileName, json);
            cache.del(fileName);
            return res.status(200).send(`Data successfully saved to ${JSON.stringify(json)}`);
        } catch (error) {
            console.error('Error writing file:', error);
            return res.status(500).send("Error writing file");
        }
    }
    if (type === 'youtube') {
        filePath = path.join('/tmp', 'youtube-feeds.json');
        dirPath = path.dirname(filePath);
        try {
            const fileName = path.basename(filePath, path.extname(filePath));
            await kv.set(fileName, json);
            cache.del(fileName);
            return res.status(200).send(`Data successfully saved to ${JSON.stringify(json)}`);
        } catch (error) {
            console.error('Error writing file:', error);
            return res.status(500).send("Error writing file");
        }
    }
    if (type === 'linkedin') {
        filePath = path.join('/tmp', 'linkedin-feeds.json');
        dirPath = path.dirname(filePath);
        try {
            const fileName = path.basename(filePath, path.extname(filePath));
            await kv.set(fileName, json);
            cache.del(fileName);
            return res.status(200).send(`Data successfully saved to ${JSON.stringify(json)}`);
        } catch (error) {
            console.error('Error writing file:', error);
            return res.status(500).send("Error writing file");
        }
    }

    let url;
    if (type === 'options') {
        url = `${wordpressUrl}/wp-json/options/all`;
    } else if (type === 'post') {
        url = `${wordpressUrl}/wp-json/wp/v2/posts/${id}`;
    } else if (type === 'case_study') {
        url = `${wordpressUrl}/wp-json/wp/v2/case_study/${id}`;
    } else if (type === 'job_listing') {
        url = `${wordpressUrl}/wp-json/wp/v2/job_listing/${id}`;
    } else {
        url = `${wordpressUrl}/wp-json/wp/v2/pages/${id}`;
    }

    url = `${url}?ver=${Date.now()}`;

    try {
        const response = await axios.get(url, { timeout: 10000 });
        const data = response.data;

        if (type === 'options') {
            filePath = path.join('/tmp', 'general-setting.json');
        } else {
            const slug = data.slug;
            if (type === 'post') {
                filePath = path.join('/tmp', `posts/${slug}.json`);
            } else if (type === 'case_study') {
                filePath = path.join('/tmp', `case_study/${slug}.json`);
            } else if (type === 'job_listing') {
                filePath = path.join('/tmp', `job_listing/${slug}.json`);
            } else {
                filePath = path.join('/tmp', `pages/${slug}.json`);
            }
        }

        dirPath = path.dirname(filePath);
        fs.mkdirSync(dirPath, { recursive: true });
        const fileName = path.basename(filePath, path.extname(filePath));
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        await kv.set(fileName, data);
        cache.del(fileName);
        const datajson = await kv.get(fileName);
        res.status(200).send(`${fileName} Data successfully saved to ${JSON.stringify(datajson)}`);
    } catch (error) {
        console.error('Error fetching or writing data:', error);
        res.status(500).send("Error fetching or writing data");
    }
});

module.exports = router;
