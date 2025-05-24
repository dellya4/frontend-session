import React from 'react';
import RecommendationBlock from "./RecommendationBlock";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Recommendations = () => {
    const { t } = useTranslation();
    const { mood } = useSelector(state => state.mood);

    const pickRecommendation = () => {
        switch (mood) {
            case "happy":
                return (
                    <RecommendationBlock
                        title={t("recommendation.happy.title")}
                        text={t("recommendation.happy.text")}
                        to={"/dashboard/tests"}
                        button={t("recommendation.button")}
                    />
                );

            case "normal":
                return (
                    <RecommendationBlock
                        title={t("recommendation.normal.title")}
                        text={t("recommendation.normal.text")}
                        to={"/dashboard/tests"}
                        button={t("recommendation.button")}
                    />
                );

            case "anxious":
                return (
                    <RecommendationBlock
                        title={t("recommendation.anxious.title")}
                        text={t("recommendation.anxious.text")}
                        to={"/dashboard/tests"}
                        button={t("recommendation.button")}
                    />
                );

            case "sad":
                return (
                    <RecommendationBlock
                        title={t("recommendation.sad.title")}
                        text={t("recommendation.sad.text")}
                        to={"/dashboard/tests"}
                        button={t("recommendation.button")}
                    />
                );

            default:
                return (
                    <RecommendationBlock
                        title={t("recommendation.default.title")}
                        text={t("recommendation.default.text")}
                        to={"/dashboard/tests"}
                        button={t("recommendation.button")}
                    />
                );
        }
    }

    return (
        <div className="recommendations-section">
            <h2 className="recommendations-title">{t("recommendation.section_title")}</h2>
            <div className="recommendations-cards">
                {pickRecommendation()}
                <RecommendationBlock
                    title={t("recommendation.journal.title")}
                    text={t("recommendation.journal.text")}
                    to={"/dashboard/analytics"}
                    button={t("recommendation.journal.button")}
                />
            </div>
        </div>
    );
};

export default Recommendations;
