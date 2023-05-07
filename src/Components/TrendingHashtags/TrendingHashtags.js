import React, {useEffect, useState} from 'react';
import './TrendingHashtags.css';
import axios from 'axios';


const TrendingHashtags = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trending-hashtags');
        /*   console.log(response); */
        setTrends(response.data);
        /* console.log(response.data); */
      } catch (error) {
        //console.error('Error fetching trending hashtags:', error);
      }
    };

    fetchTrendingHashtags();
  }, []);

  return (
    <div className="trending-hashtags">
      <div className="trending-container">
        {trends.length > 0 && trends.map((trend, index) => (
          <div key={index} className="trending-item">
            <a href={`/hashtags/${trend.name.slice(1)}`} >
              {trend.tweets && (
                <div className="trending-item-stats">{trend.tweets} Tweets</div>
              )}
              <div className="trending-item-header">{trend.name}</div>
            </a>
          </div>
        ))}
        {trends.length === 0 && <p>No trending hashtags found.</p>}
      </div>
    </div>
  );

}
export default TrendingHashtags 
