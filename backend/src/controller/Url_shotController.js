const express = require('express')
const shortid = require('shortid')
const logger = require("../logger/pino")
const urlModel = require('../model/url_model')
const usermodel = require('../model/User_model')

const createurl = async (req, res) => {
    try {
        const { email, originalURL } = req.body;
        const existinguser = await usermodel.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({ message: 'User does not exist Create your account' });
        }
        if (!originalURL) return res.status(400).json({ error: "url is require" })
        const Shortidurl = shortid();
        const newurl = await urlModel.findOneAndUpdate(
            { userEmail: email },
            { $push: { url: { originalURL: originalURL, shortURL: Shortidurl } } },
        );
        if (newurl) {
            res.status(200).json({ status: 'success',shortURL: Shortidurl, message: 'URL added/updated for the user.' });
        } else {
            const newUserDocument = new urlModel({ userEmail: email, url: [{ originalURL: originalURL, shortURL: Shortidurl }] });
            await newUserDocument.save();
            res.status(201).json({ status: 'success',shortURL: Shortidurl, message: 'New user document created with URL.' });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const Shortid = async (req, res) => {
    const shortURL = req.params.shortURL;
    try {
        const update = await urlModel.findOneAndUpdate(
            { 'url.shortURL': shortURL },
            { $push: { 'url.$.pastAnalytics': { timestamp: Date.now() } } },
            { new: true } 
        );

        if (!update) {
            return res.status(404).json({ message: 'URL not found' });
        }

        res.redirect(update.url.find(u => u.shortURL === shortURL).originalURL);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const dashboard =async (req,res)=>{
    try {
        const email = req.query.email;
        
        const UserData = await urlModel.find({ userEmail: email }).select('url');
        res.status(200).json(UserData);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUrlData = async (req, res) => {
    try {
        const { email, id } = req.body;
        if (!email || !id) {
            return res.status(400).json({ error: 'User email and URL ID are required' });
        }
        const deleteurl = await urlModel.findOneAndUpdate(
            { userEmail: email },
            { $pull: { url: { _id: id } } },
            { new: true }
        );
        if (!deleteurl) {
            return res.status(404).json({ error: 'facing problem try after sometime' });
        }
        res.status(200).json({ message: 'URL data deleted successfully'});
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createurl,Shortid ,dashboard,deleteUrlData};
