import React, { Component } from 'react';
import './App.css';
import List from './components/List';

const USERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fetching: true,
      sortType: 'all',
      all: true,
      online: false,
      offline: false,
      list: []
    }

    USERS.map(user => this.getData(user))
  }


  toggleOpen(ref) {

    if (ref === "online")
      this.setState({ sortType: 'online', all: false, offline: false, online: true })
    else if (ref === 'offline')
      this.setState({ sortType: 'offline', online: false, all: false, offline: true })
    else
      this.setState({ sortType: 'all', online: false, offline: false, all: true })

  }

  sortList = (channel) => {
    let type = this.state.sortType;
    if (type === 'all') {
      return channel;
    }
    else if (type === 'online') {
      return channel.online;
    }
    else if (type === 'offline') {
      return channel.online === false;
    }
  }

  renderList() {

    return this.state.list
      .sort((x, y) => x.online < y.online)
      .filter(this.sortList)
      .map((channel, index) =>
        <List logo={channel.logo}
          name={channel.name}
          online={channel.online}
          url={channel.url}
          game={channel.game}
          status={channel.status}
          key={index}
        />
      )
  }

  getData(user) {
    this.getUser(user)
  }

  getList(user, user_data) {
    fetch(`https://wind-bow.glitch.me/twitch-api/streams/${user}`)
      .then(res => res.json())
      .then(json => {


        let payload = json.stream ? json.stream.channel : user_data;
        let data = {};

        payload.status ?
          data = {
            online: true,
            name: payload.display_name,
            logo: payload.profile_banner,
            url: payload.url,
            game: payload.game,
            status: payload.status
          }
          :
          data = {
            online: false,
            logo: payload.logo,
            url: `https://www.twitch.tv/${payload.name}`,
            name: payload.display_name
          }
        this.setState(prevState => ({ list: [...prevState.list, data], fetching: false }))

      })
      .catch(err => console.log(err))
  }

  getUser(user) {
    fetch(`https://wind-bow.glitch.me/twitch-api/users/${user}`)
      .then(res => res.json())
      .then(json => this.getList(user, json))
  }



  render() {
    return (
      <div className="App">
        <div className="Container">

          <div className="Title">
            Twitch Streamers
          </div>

          <div className="Container-nav">

            <div className={`nav_c ${this.state.all ? 'active' : ''}`} onClick={() => this.toggleOpen('all')} ref="all">
              <div className="dot all"></div>
              <div className="option">All</div>
            </div>

            <div className={`nav_c ${this.state.online ? 'active' : ''}`} onClick={() => this.toggleOpen('online')} ref="online">
              <div className="dot online"></div>
              <div className="option">Online</div>
            </div>

            <div className={`nav_c ${this.state.offline ? 'active' : ''}`} onClick={() => this.toggleOpen('offline')} ref="offline">
              <div className="dot offline"></div>
              <div className="option">Offline</div>
            </div>

          </div>

          {this.state.fetching ?
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            :
            <div className="List"> {this.renderList()} </div>
          }
        </div>

        <div className="Footer">
          Made with ♥ by <a href="https://twitter.com/todywa" target="_blank" rel="noopener noreferrer">Tody</a>
        </div>
      </div>
    );
  }
}

export default App;
