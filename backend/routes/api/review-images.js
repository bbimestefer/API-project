const express = require('express')
const router = express.Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { requireAuth } = require("../../utils/auth.js");
const { User, Spot, Booking, SpotImage, ReviewImage, Review } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: [
            {
                model: Review
            }
        ]
    })

    // console.log(reviewImage.toJSON())
    // console.log(reviewImage.Review.userId, req.user.id)

    if(!reviewImage){
        res.status(404)
        res.json({
            message: 'Review Image could not be found',
            "statusCode": 404
        })
    } else if (reviewImage.Review.userId !== req.user.id){
        res.status(403)
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await reviewImage.destroy()

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
    res.json('through')
})


module.exports = router;
