import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faYoutube,
  faTwitter,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import "./ListItem.css";

const ListItem = ({ platform, item }) => {
  const getItem = (platform) => {
    if (platform === "google_trends") {
      return (
        <div className="ListItem google">
          <img
            src={item.image ? item.image : require("../img/misc/not-found.jpg")}
            alt="Thumbnail"
          />
          <div className="metric">
            {item.searches
              ? item.searches
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : "-"}
            +
          </div>
          <div>{item.name}</div>
          <div className="link">
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faGoogle} size="lg" />
              <span> View results</span>
            </a>
          </div>
        </div>
      );
    } else if (platform === "reddit_subs") {
      return (
        <div className="ListItem reddit">
          <div className="metric">
            {item.subscribers
              ? item.subscribers
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : "-"}
          </div>
          <div>{item.name}</div>
          <div className="link">
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faReddit} size="lg" />
              <span> Visit subreddit</span>
            </a>
          </div>
        </div>
      );
    } else if (platform === "twitter_trends") {
      return (
        <div className="ListItem twitter">
          <div className="metric">
            {item.tweets === 10000
              ? "<10,000"
              : item.tweets
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </div>
          <div>{item.name}</div>
          <div className="link">
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
              <span> View results</span>
            </a>
          </div>
        </div>
      );
    } else if (platform === "youtube_videos") {
      return (
        <div className="ListItem youtube">
          <img
            src={item.image ? item.image : require("../img/misc/not-found.jpg")}
            alt="Thumbnail"
          />
          <div className="metric">
            {item.views
              ? item.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : "-"}
          </div>
          <div className="metric">
            {item.likes
              ? item.likes.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              : "-"}
          </div>
          <div>{item.name}</div>
          <p>
            <em>{`Published by ${item.publisher}`}</em>
          </p>
          <div className="link">
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faYoutube} size="lg" />
              <span> View video</span>
            </a>
          </div>
        </div>
      );
    }
  };

  return getItem(platform);
};

export default ListItem;
