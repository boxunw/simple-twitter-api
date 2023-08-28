const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const admin = require('./modules/admin')
const userController = require('../../controllers/user-controller')
const tweetController = require('../../controllers/tweet-controller')
const followshipController = require('../../controllers/followship-controller')
const { authenticated, authenticatedAdmin, authenticatedUser } = require('../../middleware/api-auth')
const { apiErrorHandler } = require('../../middleware/error-handler')

router.use('/admin/login', passport.authenticate('local', { session: false }), authenticatedAdmin, userController.login)
router.use('/admin', authenticated, authenticatedAdmin, admin)

router.get('/users/current', authenticated, authenticatedUser, userController.getCurrentUser)
// router.get('/users/top', userController)
// router.get('/users/:id/tweets', userController)
// router.get('/users/:id/replied_tweets', userController)
// router.get('/users/:id/likes', userController)
// router.get('/users/:id/followers', userController)
// router.get('/users/:id/followings', userController)
router.put('/users/:id/account', authenticated, authenticatedUser, userController.putUserAccount)
router.get('/users/:id', authenticated, authenticatedUser, userController.getUser)
// router.put('/users/:id', userController.putUserProfile)
router.post('/users', userController.signUp)
router.post('/login', passport.authenticate('local', { session: false }), authenticatedUser, userController.login)

router.get('/tweets/:tweetId/replies', authenticated, authenticatedUser, tweetController.getTweetReplies)
// router.post('/tweets/:tweetId/replies', authenticated, authenticatedUser, tweetController)
// router.post('/tweets/:id/like', authenticated, authenticatedUser, tweetController)
// router.post('/tweets/:id/unlike', authenticated, authenticatedUser, tweetController)
router.get('/tweets/:id', authenticated, authenticatedUser, tweetController.getTweet)
// router.post('/tweets', authenticated, authenticatedUser, tweetController.postTweet)
router.get('/tweets', authenticated, authenticatedUser, tweetController.getTweets)

// router.post('/followships', followshipController)
// router.delete('/followships/:followingId', followshipController)
router.use('/', apiErrorHandler)
module.exports = router
