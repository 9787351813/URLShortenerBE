const Url = require('../models/Url');

exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

    // Use dynamic import for nanoid
    const { nanoid } = await import('nanoid');
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
            res.status(200).json({ shortUrl, longUrl: url.longUrl });
        } else {
            throw new Error('URL not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error redirecting URL' });
    }
};

exports.getCounts = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const countToday = await Url.countDocuments({ createdAt: { $gte: today } });
        const countMonth = await Url.countDocuments({ createdAt: { $gte: startOfMonth } });

        res.json({ countToday, countMonth });
    } catch (err) {
        res.status(500).json({ error: err.message });
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