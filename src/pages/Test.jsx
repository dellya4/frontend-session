import { useParams, useNavigate } from "react-router-dom";
import { testsData } from "../assets/testData";
import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../redux/store/moodSlice";
import Header from "../components/DashboardComponents/Header";
import { useEffect } from "react";
import { logUserAction } from "../utils/logAction";
import '../style/Header.css'
import '../style/Test.css'
import { useTranslation } from 'react-i18next';


const Test = () => {
    // Getting the test ID from the URL
    const { testId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Take the current user from Redux
    const currentUser = useSelector((state) => state.auth.currentUser);
    const { t } = useTranslation();

    // We log the opening of the test if the user is logged in
    useEffect(() => {
        if (currentUser?.email && testId && testsData[testId]) {
            logUserAction(currentUser.email, "page_view", `Opened ${testId} test`);
        }
    }, [currentUser, testId]);

    // Getting the test data by ID
    const test = testsData[testId];

    if (!test) return <h2>Test not found</h2>;
    // We get localized questions
    const questions = t(`test_questions.${testId}`, { returnObjects: true });

    // Handler for sending the test
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let result = 0;
        // We calculate the points: A=0, B=1, C=2, D=3
        for (let [, value] of data.entries()) {
            if (value === "A") result += 0;
            else if (value === "B") result += 1;
            else if (value === "C") result += 2;
            else if (value === "D") result += 3;
        }

        // Calculating the percentage of the result
        const maxScore = test.questions.length * 3;
        const percentage = Math.round((result / maxScore) * 100);

        // Saving the test timestamp in localStorage
        const userKey = currentUser?.username || 'guest';
        localStorage.setItem(`test-${testId}-${userKey}-timestamp`, Date.now());

        // Saving the results of anxiety or stress tests to the backend
        if (testId === "anxiety" || testId === "stress") {
            try {
                await fetch('http://127.0.0.1:5000/auth/save-test-result', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: currentUser.email,
                        test_type: testId,
                        score: percentage
                    })
                });
            } catch (err) {
                console.error("Failed to save test result:", err);
            }
        }

        // Setting the mood in Redux for the mood test
        if (testId === "mood") {
            if (result < 4) dispatch(setMood("happy"));
            else if (result < 8) dispatch(setMood("normal"));
            else if (result < 12) dispatch(setMood("sad"));
            else dispatch(setMood("anxious"));
        }

        // Redirecting to analytics
        navigate("/dashboard/analytics");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Header />
            <main className="concreteTest">
                <div className="concreteTest--container">
                    <h2 className="page-title">{t(`test_titles.${testId}`)}</h2>
                    <form onSubmit={onSubmit}>
                        {questions.map((item, index) => (
                            <Card key={index} title={item.question} index={index}>
                                {item.options.map((option, optIndex) => (
                                    <label key={optIndex} className="concreteTest--option">
                                        <input
                                            type="radio"
                                            name={`q-${index}`}
                                            value={String.fromCharCode(65 + optIndex)} // A, B, C, D
                                            required
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </Card>
                        ))}

                        <button type="submit" className="recommendation-btn">{t('test_finish_button')}</button>
                    </form>
                </div>
            </main>
        </>
    );
};

// Component for displaying the test question
const Card = ({ title, children, index }) => (
    <div className="concreteTest--card" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="concreteTest--card-title"><h3>{title}</h3></div>
        <div className="concreteTest--card-content">{children}</div>
    </div>
);

export default Test;
