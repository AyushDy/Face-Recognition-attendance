const express = require('express');
const faceDetailsController = require('../controllers/faceDetailsController.js');

const faceDetailsRouter = express.Router();

faceDetailsRouter
    .route('/updateFaceData')
    .post(faceDetailsController.updateFaceData);

    faceDetailsRouter
    .route('/getFaceData')
    .get(faceDetailsController.getFaceData)
    
module.exports = faceDetailsRouter;
