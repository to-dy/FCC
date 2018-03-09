import React, { Component } from 'react';
import './List.css'

class List extends Component {
    render() {
        return (
            <div className={`List_Container ${this.props.online ? "online" : "offline"}`}>
                <div className={`Avatar ${this.props.online ? "online" : "offline"}`}>
                    <img src={this.props.logo} alt="" />
                </div>

                <div className={this.props.online ? `Line ${this.props.online ? "online" : "offline"}` : "Line_H"}>

                    <div className="Name">
                        <a href={this.props.url} target="_blank">
                            {this.props.name}
                        </a>
                    </div>

                    <div className="Info">
                        {
                            this.props.online ?

                                (
                                    <div className="Info__">
                                        <div className="Game">{this.props.game}</div>
                                        <div className="Status">{this.props.status}</div>
                                    </div>
                                )
                                :
                                <div className="Offline">Offline</div>
                        }

                    </div>

                </div>

            </div>
        )
    }
}

export default List