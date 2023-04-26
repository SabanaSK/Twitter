import React from 'react';
import './TrendingHashtags.css';

const TrendingHashtags = () => {
    const trends = [
        {
            name: '#iPhone',
            subtitle: 'Tech · Trending',
            tweets: '347k',
        },
        {
            name: '#JensenYH',
            tweets: '275k',
        },
        {
            name: '#GBG',
            tweets: '275k',
        }
    ];

    return (
        <div className="trending-hashtags">
            <div className="trending-container">
                <h2 className="trending-title">Trending for you</h2>
                {trends.map((trend, index) => (
                    <div key={index} className="trending-item">
                        {trend.tweets && (
                            <div className="trending-item-stats">{trend.tweets} Tweets</div>
                        )}
                        <div className="trending-item-header">{trend.name}</div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingHashtags;
