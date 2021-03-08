const { set } = require('mongoose');
const Notification = require('../models/notification');
const Thread = require('../models/thread');
const {getSubstringsBetween} = require('../utils/textFormat');
// @route    POST /
// @desc     Notificate user when someone quotes them
// @access   Private


const setNotification = async (req, res, next) => {
    const {content, threadId} = req.body;

    //get only unique values
    const recipientNames = Array.from(new Set(getSubstringsBetween(content, '[quote=', ' ')));
    const recipientIds = Array.from(new Set(getSubstringsBetween(content, 'member=', ']')));

    try{
        const thread = await Thread.findById(threadId).select('-posts').lean();

        if(content){
            Promise.all(recipientIds.map((recipient, i) => {
                if(recipient === req.user.id) return
                if(thread.settings.status === 'private') {
                    if(!thread.settings.participants.some(participant => participant === recipientNames[i])) {
                        return
                    }
                }

                const notification = new Notification({
                thread: thread, 
                type: 'quote', 
                sender: req.user.id, 
                recipient
                })

                notification.save();
            }))

        }

        next();
    }catch(err) {
        console.error(err);
        next();
    }
};


module.exports = setNotification;