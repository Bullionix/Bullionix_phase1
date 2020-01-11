import React from "react";

interface LeaderboardItemProps {

}

const LeaderboardItem = (props: LeaderboardItemProps) => {
    return (
        <div className="itemContainer">

            <style jsx>
                {`
                
                .itemContainer {
                    display:flex;
                    flex-direction:row;
                    margin-top:10px;
                    margin-bottom:10px;
                    align-items:center;
                    border-bottom:solid 1px whitesmoke;
                }

                .itemText {
                    display:flex;
                    flex-direction:column;
                    flex:1;
                    margin-left:15px;
                }

                `}
            </style>

            <div className="itemNumber">#1</div>

            <div className="itemImage">
                <img src="/bullionix.png" height={60} width={60} />
            </div>

            <div className="itemText">
                <div className="itemTitle">
                    Full_Fridge89
                </div>

                <div className="itemSubtitle">
                    Last month: 3
                </div>
            </div>

            <div className="quantity">
                62 items
            </div>

            <div className="weight">
                452g
            </div>

        </div>
    );
}
export default LeaderboardItem;