import React from "react";
import Footer from "../components/NextStyledFooter";
import LeaderboardItem from "../components/LeaderboardItem";
import PageTitle from "../components/PageTitle";
import { themeGold } from "../css/theme";

interface LeaderboardPageProps {

}

const LeaderboardPage = (props: LeaderboardPageProps) => {
    return (
        <div>

            <PageTitle
                title="Leaderboards"


            />

            <div className="container">



                <div className="pageSubtitle">
                    Leading goldsmiths
            </div>

                <div className="leaderContainerTitle">
                    This month's top producers (by grams)
            </div>

                <div className="leaderContainer">
                    <LeaderboardItem />
                    <LeaderboardItem />
                    <LeaderboardItem />
                    <LeaderboardItem />
                    <LeaderboardItem />
                    <LeaderboardItem />
                </div>

            </div>


            <Footer />
        </div>
    );
}
export default LeaderboardPage;