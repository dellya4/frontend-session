import React from 'react';
import '../../style/Dashboard.css'

const Courses = () => {
    return (
        <div className="page-container">
            <h2 className="page-title">Mental Health Courses</h2>
            <div className="courses-list">
                <div className="course-card">
                    <div className="course-image" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}></div>
                    <div className="course-content">
                        <h3>Mindfulness Basics</h3>
                        <p>4-week course · Beginner</p>
                        <div className="progress-container">
                            <div className="progress-bar" style={{width: '65%'}}></div>
                            <span>65% completed</span>
                        </div>
                        <button className="primary-btn">Continue</button>
                    </div>
                </div>
                <div className="course-card">
                    <div className="course-image" style={{background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"}}></div>
                    <div className="course-content">
                        <h3>Managing Anxiety</h3>
                        <p>6-week course · Intermediate</p>
                        <button className="primary-btn">Start Course</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;