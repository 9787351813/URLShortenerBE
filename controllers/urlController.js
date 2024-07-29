// controllers/urlController.js
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = nanoid(8);
    const newUrl = new Url({ longUrl, shortUrl });

    try {
        await newUrl.save();
        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error creating short URL' });
    }
};

exports.redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });

        if (url) {
            url.clicks += 1;
            await url.save();
            res.redirect(url.longUrl);
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error redirecting URL' });
    }
};

exports.getCounts = async (req, res) => {
    try {
        const dailyCount = await Url.countDocuments({
            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });

        const monthlyCount = await Url.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        });

        res.status(200).json({ dailyCount, monthlyCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching counts' });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching URLs' });
    }
};
