import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import api from "../api/data";
import Filters from "./Filters";
import BarChart from "./BarChart";
import WordChart from "./WordChart";
import List from "./List";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "india",
      platform: "google_trends",
      locations: [],
      data: [],
    };
    this.editFilter = this.editFilter.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.getLocations({ ...this.state });
  }

  getLocations(newState) {
    if (newState.platform === "reddit_subs") {
      newState.location = "worldwide";
      newState.locations = ["Worldwide"];
      this.getData(newState);
      return;
    } else if (newState.platform === "google_trends") {
      newState.location =
        newState.location === "worldwide" ? "australia" : newState.location;
    }
    api.getData("locations").then((result) => {
      if (result.success) {
        newState.locations = result.data.map((a) => a.location);
        newState.locations =
          newState.platform === "google_trends"
            ? newState.locations.filter((location) => location !== "Worldwide")
            : newState.locations;
        this.getData(newState);
      }
    });
  }

  getData(newState) {
    const endpoint = `${newState.platform}/${newState.location}`;
    api.getData(endpoint).then((result) => {
      if (result.success) {
        newState.data = result.data;
        this.setState(newState);
      }
    });
  }

  editFilter(filter, val) {
    const newState = { ...this.state };
    newState[filter] = val;
    this.getLocations(newState);
  }

  renderData() {
    if (this.state.data.length) {
      return (
        <div>
          {this.state.platform === "google_trends" ||
          this.state.platform === "twitter_trends" ? (
            <WordChart platform={this.state.platform} data={this.state.data} />
          ) : this.state.platform === "youtube_videos" ? (
            <BarChart data={this.state.data} />
          ) : (
            ""
          )}
          <List
            data={this.state.data}
            platform={this.state.platform}
            location={this.state.location}
          />
        </div>
      );
    }
    return (
      <FontAwesomeIcon
        className="spinning-wheel"
        icon={faSpinner}
        size="5x"
        spin={true}
        color="#fff"
      />
    );
  }

  render() {
    return (
      <div className="App">
        <Filters
          platform={this.state.platform}
          location={this.state.location}
          locations={this.state.locations}
          editFilter={this.editFilter}
        />
        {this.renderData()}
      </div>
    );
  }
}

export default App;
