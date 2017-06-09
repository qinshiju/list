/**
 * Created by swallow on 2017/5/20.
 */
import React, {Component} from 'react';
import 'whatwg-fetch';
import './Detail.css';
var progressTimer = null, timer = null;
class Detail extends Component {
    constructor(props) {
        super(props)
        let params = this.props.match.params;
        this.state = {
            songName: params.name,
            singer:'',
            musicFileUrl: decodeURIComponent(params.musicFileUrl),
            on: true,
            hadTimer: '00:00',
            allTimer: '00:00',
            headImgUrl: ''
        };
    }

    componentDidMount() {
        this.refs.meImg.style.animationPlayState = 'paused';
        let url = 'https://www.starcandy.cn/mp/me';
        fetch(url, {method: 'GET', credentials: 'include', mode: 'cors'}).then((response)=> {
            return response.json();
        }).then((response)=> {
            var _this = this;
            _this.setState({
                singer: response.nickname,
                headImgUrl: response.headImgUrl
            })
        });
        let oImg=document.querySelector('.active');
        document.body.addEventListener('click',()=>{
            oImg.style.display='none';
        },false)

    }

    playPause() {
        if (this.state.on) {
            this.refs.myAudio.play();
            progressTimer = setInterval(this.progress.bind(this), 1000);
            timer = setInterval(this.time.bind(this), 1000);
            this.setState({
                on: false
            });
            let meImg=document.querySelector('.meImg')
            meImg.style.animationPlayState = 'running';
        } else {
            this.refs.myAudio.pause();
            clearInterval(progressTimer);
            clearInterval(timer)
            this.setState({
                on: true
            })
            this.refs.meImg.style.animationPlayState = 'paused';
        }
    }

    progress() {
        let cuT = this.refs.myAudio.currentTime,
            toT = this.refs.myAudio.duration
        let oToTalWidth = this.refs.oToTal.offsetWidth / 20;
        let progress = (cuT / toT) * oToTalWidth;
        this.setState({
            x: progress + 'rem'
        })

    }

    cutTime(time) {
        let value = (time > 10 ? time + '' : '0' + time).substring(0, 2);
        return isNaN(value) ? '00' : value
    }

    secondToMin(time) {
        return this.cutTime(time / 60) + ':' + this.cutTime(time % 60);
    }

    time() {
        let allTime = this.refs.myAudio.duration,
            hadTime = this.refs.myAudio.currentTime;
        this.setState({
            hadTimer: this.secondToMin(hadTime),
            allTimer: this.secondToMin(allTime)
        })
    }

    dragMove(ev) {
        let x = (ev.touches[0].pageX) / 30;
        if (x > 14.25) x = 14.25;
        else x < 0 ? x = 0 : x;
        this.setState({
            x: x + 'rem'
        })
    }

    dragEnd(ev) {
        let dragPaddingLeft = this.state.x;
        let changeLeft = dragPaddingLeft.replace("rem", "");
        let currentTime = (changeLeft / (this.refs.oToTal.offsetWidth / 20)) * this.refs.myAudio.duration;
        this.refs.myAudio.currentTime = currentTime;
        this.time()
    }

    playEnd() {
        this.setState({on: true})
        this.refs.meImg.style.animationPlayState = "paused";

    }
    shart(){
        let oImg=document.querySelector('.active');
        oImg.style.display='block';
    }

    render() {
        return (
            <div>
                <img src={this.state.headImgUrl} alt="" className="backImg"/>
                <div className="backColor"></div>
                <div className="wrap">
                    <div className="songName">
                        <span>{this.state.songName}</span>
                        <div className="singerName"><span>{this.state.singer}</span></div>
                    </div>
                    <div className="meImg" ref="meImg">
                        <img className="headImg" src={this.state.headImgUrl} alt=""/>
                        <section className="operate">
                            <div className="start" onClick={this.playPause.bind(this)}>
                                <img src={this.state.on ? require('./images/stop.png') : require('./images/play.png')}
                                     alt="stop/play" className="start-img"/>
                            </div>
                        </section>
                    </div>
                    <audio src={this.state.musicFileUrl} ref="myAudio" onEnded={this.playEnd.bind(this)}
                           onLoadedMetadata={this.time.bind(this)}></audio>
                    <section className="play">
                        <div className="total" ref="oToTal">
                            <div className="had-play" style={{width: this.state.x}}>
                                <div className="bar" style={{left: this.state.x}} onTouchMove={this.dragMove.bind(this)}
                                     onTouchEnd={this.dragEnd.bind(this)}>
                                    <div className="opcity"></div>
                                </div>
                            </div>
                        </div>
                        <div className="pro-time clearFix">
                            <span className="fl">{this.state.hadTimer}</span>
                            <span className="fr">{this.state.allTimer}</span>
                        </div>
                    </section>
                    <section>
                        <div className="shart" onClick={this.shart.bind(this)}>
                            <img className="active" src={require('./images/guide.png')} alt=""/>
                            <img src={require('./images/shart.png')} alt=""/>
                            <p>分享</p>
                        </div>
                    </section>
                </div>
            </div>
        )


    }
}
export default  Detail;

