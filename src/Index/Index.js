/**
 * Created by swallow on 2017/5/18.
 */
import React, {Component} from 'react';
import 'whatwg-fetch';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './index.css';
import './rem'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songlist: []
        }
    }

    componentDidMount() {
        let url = 'https://www.starcandy.cn/mp/me';
        fetch(url, {method: "GET", credentials: 'include', mode: 'cors'}).then((response)=> {
            if (response.status != 200) {
                let currentUrl = window.location.href;
                window.location.href = "https://www.starcandy.cn/mp/login?redirectUrl=" + currentUrl
            } else {
                let url = 'https://www.starcandy.cn/mp/work';
                let param = {
                    songName: '',
                    songSingers: '',
                    songMusicFileName: ''
                };
                return fetch(url, {method: "GET", param, credentials: 'include', mode: 'cors'})
            }
        }).then((res)=> {
            return res.json()
        }).then((res)=> {
            var _this = this;
            _this.setState({
                songlist: res
            });
        })
    }

    deleteSong(...data) {
        var _this = this;
        let songId = data[1]
        let song = _this.state.songlist
        let url = 'https://www.starcandy.cn/mp/work/' + songId;
        fetch(url, {method: "DELETE", credentials: 'include', mode: 'cors'}).then((res)=> {
            song.splice(data[2], 1)
            _this.setState({
                songlist: song
            })

        })
    }

    render() {
        var _this = this;
        const songList = _this.state.songlist;
        return (
            <div>
                {songList.map((key, index) => {
                    let date = new Date(key.createDate);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes();
                    if (key.song != undefined) {
                        return <div key={index} className="List">
                            <Link
                                to={{pathname: "/Detail/" + key.song.name + "/" + key.song.singers + "/" + encodeURIComponent(key.url)}}>
                                <div className="wrap_info">
                                    <div>{key.song.name}</div>
                                    <div className="singer">{key.song.singers}
                                        <span className="time">{Y+M+D+h+m}</span></div>
                                </div>
                            </Link>
                            <div className="delete" onClick={_this.deleteSong.bind(this, key, key.id, index)}>删除</div>
                        </div>
                    }
                })}
            </div>
        )


    }
}
export default  Index;
