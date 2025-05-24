import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'; // Components for plotting
import '../../style/Dashboard.css';
import { useTranslation } from 'react-i18next';

const Analytics = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo({ top: 210, behavior: 'smooth' });

        // Function for uploading test results
        const fetchResults = async () => {
            try {
                // Requesting test results by email from the user
                const res = await fetch(`http://127.0.0.1:5000/auth/get-test-results?email=${currentUser?.email}`);
                const resultData = await res.json();
                if (Array.isArray(resultData)) {
                    // Grouping data by dates
                    const grouped = resultData.reduce((acc, item) => {
                        let date;
                        if (typeof item.timestamp === 'number') {
                            date = new Date(item.timestamp);
                        } else if (typeof item.timestamp === 'string') {
                            if (!item.timestamp.includes('Z') && !item.timestamp.match(/[+/-]\d{2}:\d{2}$/)) {
                                item.timestamp = item.timestamp + 'Z';
                            }
                            date = new Date(item.timestamp);
                        } else {
                            console.error('Invalid timestamp:', item.timestamp);
                            return acc; 
                        }

                        // Missing incorrect dates
                        if (isNaN(date.getTime())) {
                            return acc;
                        }

                        // Formatting the date in Asia/Almaty (DD.MM.YYYY)
                        const localDate = date.toLocaleString('ru-RU', {
                            timeZone: 'Asia/Almaty',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).split(', ')[0]; 

                        // Adding or updating a record for a date
                        const existing = acc.find(i => i.date === localDate);
                        if (existing) {
                            existing[item.test_type] = item.score;
                        } else {
                            acc.push({ date: localDate, [item.test_type]: item.score });
                        }
                        return acc;
                    }, []);
                    setData(grouped); // Saving the grouped data
                }
            } catch (err) {
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };

        // Requesting data if the user is logged in
        if (currentUser?.email) {
            fetchResults();
        }
    }, [currentUser]);

    return (
        <div className="page-container">
            <h2 className="page-title">{t('analytic-title')}</h2>
            {loading ? <p>{t('loading')}</p> : (
                data.length === 0 ? (
                    <p>{t('error-data')}</p>
                ) : (
                    // Adaptive container for graphics
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="anxiety"
                                stroke="#8884d8"
                                strokeWidth={3}
                                dot={{ r: 6, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
                                name={t('anxiety')}
                            />
                            <Line
                                type="monotone"
                                dataKey="stress"
                                stroke="#82ca9d"
                                strokeWidth={3}
                                dot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: '#fff' }}
                                name={t('stress')}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )
            )}
        </div>
    );
};

export default Analytics;