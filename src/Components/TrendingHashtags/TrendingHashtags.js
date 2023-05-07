import React, { useState, useEffect } from 'react';
import './TrendingHashtags.css';
import { Link } from 'react-router-dom';


const TrendingHashtags = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/trending-hashtags')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(res); 
      return res.json();
    })
    .then(data => {
      setTrends(data);
      console.log(data)
    })
    .catch(error => {
      //console.error('Error fetching trending hashtags:', error);
    });
  
  }, []);

  

  return (
    <div className="trending-hashtags">
      <div className="trending-container">
        {trends.length > 0 && trends.map((trend, index) => (
          <div key={index} className="trending-item">
            {trend.tweets && (
              <div className="trending-item-stats">{trend.tweets} Tweets</div>
            )}
            <div className="trending-item-header">{trend.name}</div>
          </div>
        ))}
        {trends.length === 0 && <p>No trending hashtags found.</p>}
      </div>
    </div>
  );
  
  }
export default TrendingHashtags 
