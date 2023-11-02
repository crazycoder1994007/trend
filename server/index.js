// Server - running on Node.js

import "dotenv/config";
import mongoose from "mongoose";
import routes from "./routes/router";
import googleTrends from "./data/google";
import redditSubs from "./data/reddit";
import youtubeVideos from "./data/youtube";
import twitterTrends from "./data/twitter";

routes.init();

mongoose.connect(
  "mongodb+srv://trend2023:enjoymylife0101@cluster0.mko4g5w.mongodb.net/",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "[trends server] MongoDB error:"));
db.once("open", () => {
  console.log("[trends server] Successfully connected to MongoDB!");
  googleTrends.getTrends();
  //   redditSubs.getSubs();
  //   youtubeVideos.getVideos();
  //   twitterTrends.getTrends();
});
