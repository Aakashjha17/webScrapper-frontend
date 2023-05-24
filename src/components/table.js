import React, { useEffect, useState } from 'react';
import { fetchInsights, deleteInsight,updateInsight } from '../api';
import './table.css';

const Table = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchInsights(); // Replace with your backend API endpoint
      console.log(response.data.data);
      if (response.data.data.length > 0) {
        console.log(true);
        setInsights(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (insightId) => {
    try {
      await deleteInsight(insightId); // Replace with your backend delete API endpoint
      const updatedInsights = insights.filter((insight) => insight._id !== insightId);
      setInsights(updatedInsights);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting insight:', error);
    }
  };

  const handleFavorite = async (insightId, currentFav) => {
    try {
      const newFav = currentFav === 'true' ? 'false' : 'true';
      await updateInsight(insightId, newFav);
  
      const updatedInsights = insights.map((insight) => {
        if (insight._id === insightId) {
          return { ...insight, fav: newFav };
        }
        return insight;
      });
      setInsights(updatedInsights);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Domain Name</th>
            <th>Word Count</th>
            <th>Favourite</th>
            <th>Web-links</th>
            <th>Media-links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((curInsight) => {
            const { _id, domain, fav, media_links, web_links, wordCount } = curInsight;
            return (
              <tr key={_id}>
                <td>{domain}</td>
                <td>{wordCount}</td>
                <td>{fav}</td>
                <td>
                  {web_links.map((link, index) => (
                    <span key={index}>
                        {link.trim()}
                      {index !== web_links.length - 1 && ','} {/* Add comma separator if not the last element */}
                    </span>
                  ))}
                </td>
                <td>
                  {media_links.map((link, index) => (
                    <span key={index}>
                        {link.trim()}
                      {index !== media_links.length - 1 && ','} {/* Add comma separator if not the last element */}
                    </span>
                  ))}
                </td>
                <td>
                    {fav === 'true' ? (
                        <button onClick={() => handleFavorite(_id, fav)}>Unfavorite</button>
                    ) : (
                        <button onClick={() => handleFavorite(_id, fav)}>Favorite</button>
                    )}
                    <button onClick={() => handleDelete(_id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
