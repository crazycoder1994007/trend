import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faYoutube,
  faTwitter,
  faRedditAlien,
} from "@fortawesome/free-brands-svg-icons";
import Dropdown from "./Dropdown";
import "./Filters.css";

const Filters = ({ platform, location, locations, editFilter }) => {
  const platformData = {
    google_trends: {
      icon: faGoogle,
      desc: "The data below displays search terms that jumped significantly in traffic over the past 24 hours.",
    },
    reddit_subs: {
      icon: faRedditAlien,
      desc: "The data below displays subreddits that have gained in popularity over the past 24 hours.",
    },
    twitter_trends: {
      icon: faTwitter,
      desc: "The data below displays the most popular phrases on Twitter over the past 24 hours.",
    },
    youtube_videos: {
      icon: faYoutube,
      desc: "The data below displays YouTube videos that recently have gained in popularity.",
    },
  };

  return (
    <div className="Filters">
      <div>
        <FontAwesomeIcon
          className="fa-icon"
          icon={platformData[platform].icon}
          size="2x"
        />
        <Dropdown
          label="platform"
          value={platform}
          options={[
            "Google Trends",
            "Reddit Subs",
            "Twitter Trends",
            "YouTube Videos",
          ]}
          onChange={editFilter}
        />
        <Dropdown
          label="location"
          value={location}
          options={locations}
          onChange={editFilter}
        />
        <img src={require(`../img/flags/${location}.png`)} alt={location} />
      </div>
      <p>{platformData[platform].desc}</p>
    </div>
  );
};

export default Filters;
