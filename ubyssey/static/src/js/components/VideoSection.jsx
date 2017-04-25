import React from 'react';
import {YoutubeLoader, YoutubePlayer} from '../modules/Youtube';
import {formatPubDate} from '../modules/Dates';

const VideoSection = React.createClass({
    getInitialState() {
        return {videos: [], selected: undefined}
    },

    componentDidMount() {
        YoutubeLoader((videos) => {
            this.setState({videos: videos, selected: videos[0]});
            this.iframePlayer = 'video-' + videos[0].id;
            this.videoContainer = $('.js-video-launch');
        }, (error) => {
            console.log(error);
        });
    },

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected) {
            const player = YT.get(this.iframePlayer);
            player.loadVideoById(this.state.selected.id, 0, 'default');
            this.videoContainer.hide();
            $('#video-' + this.state.selected.id).show();
        }
    },

    renderImage(video) {
        return (
            <div className="image image-aspect-4-3 section-video-image__preview ">
                <div className="o-article-embed--video__inner" style={{backgroundImage: `url('${video.thumbnails.high.url}')`}}>
                    <div className="o-article-embed--video__play-large">
                        <div className="o-article-embed--video__play-large__inner"></div>
                    </div>
                </div>
            </div>
        );
    },

    setSelected(video) {
        this.setState({selected: video});
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    },

    renderSelected(video) {
        if (!video) 
            return;
        else 
            return (
                <article className="section-top row padded">
                    <div className="o-article-embed--video js-video-youtube" data-id={video.id}>
                        <div className="o-article-embed--video__wrapper js-video-launch">
                            <div
                                className="o-article-embed--video__inner"
                                style={{
                                backgroundImage: 'url(' + video.thumbnails.high.url + ')'
                            }}>
                                <div className="o-article-embed--video__play-large">
                                    <div className="o-article-embed--video__play-large__inner"></div>
                                </div>

                                <div className="o-article-embed--video__info o-article-embed__overlay">
                                    <div className="o-article-embed--video__play-small">
                                        &#9658; &nbsp;Play video
                                    </div>
                                    <h2 className="o-article-embed--video__title">{video.title}</h2>
                                    <p className="o-article-embed--video__caption">{formatPubDate(video.publishedAt)}</p>
                                </div>

                            </div>
                        </div>
                        <div className="o-article-embed--video__container" id={'video-' + video.id}></div>
                        <div className="caption">
                            <span className="credit">{video.description}</span>
                        </div>
                    </div>
                </article>
            );
        }
    ,

    render() {
        const videos = this
            .state
            .videos
            .map((video, i) => (
                <article
                    onClick={() => this.setSelected(video)}
                    key={i}
                    className="section-video-list"
                    style={{background: this.state.selected === video? "#dddddd" : "white"}}>
                    {this.renderImage(video)}
                    <h2 className="headline">{video.title}</h2>
                    <span className="byline">
                        <span className="published">{formatPubDate(video.publishedAt)}</span>
                    </span>
                    <p className="snippet">{video.description}</p>
                </article>
            ));

        return (
            <div>
                {this.renderSelected(this.state.selected)}
                <div className="blocks">{videos}</div>
            </div>
        );
    }
});

export default VideoSection;
