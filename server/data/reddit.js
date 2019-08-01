// Reddit subs data fetcher

import request from 'request';
import redditModel from '../models/Reddit';

const redditSubs = {
    getSubs: () => {
        request({url: 'https://www.reddit.com/api/trending_subreddits.json', json: true}, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.log(`An unexpected error occured while posting data for ${location}.`);
            }
            else {
                if (body) {
                    console.log(`[trends server] Updating all database entries for Reddit Subs...`);
                    redditModel.deleteMany((error) => {
                        if (error) return console.error(error);
                    });
                    body.subreddit_names.forEach((sub) => {
                        const dbData = new redditModel({
                            name: sub,
                            url: `https://reddit.com/r/${sub}`
                        });
                        dbData.save((error, dbData) => {
                            if (error) return console.error(error);
                        });
                    });
                }
            }
        });
    }
};

export default redditSubs;