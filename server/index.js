// Server - running on Node.js

import 'dotenv/config';
import mongoose from 'mongoose';
import googleTrends from './data/google';
import redditSubs from './data/reddit';
//import youtubeVideos from './data/youtube';
import routes from './routes/router';

routes.init();

mongoose.connect('mongodb://localhost/trends', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, '[trends server] MongoDB error:'));
db.once('open', () => {
    console.log('[trends server] Successfully connected to MongoDB!');
    googleTrends.getTrends()
    redditSubs.getSubs();
    //youtubeVideos.getVideos();
});