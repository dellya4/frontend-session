import React from 'react';
import { Link } from "react-router-dom";
import '../../style/Dashboard.css'

const RecommendationBlock = ({ title, text, to, button }) => {

    return (
        <div className="recommendation-card" id="recommendation">
            <h3>{title}</h3>
            <p>{text}</p>
            {to ? (
                <Link to={to} state={{ fromRecommendation: true }}>
                    <button className="recommendation-btn">
                        {button}
                    </button>
                </Link>
            ) : (
                <button className="recommendation-btn">
                    {button}
                </button>
            )}
        </div>
    );
};

export default RecommendationBlock;
