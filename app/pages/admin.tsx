import React from "react";
import { useStateValue } from "../State/globalState";
import PageTitle from "../components/PageTitle";

interface AdminPageProps {

}

const AdminPage = (props: AdminPageProps) => {

    const [{ authUser }, dispatch] = useStateValue()

    console.log('authuser:', authUser)

    if (authUser && authUser.attributes.email === "dmathieuva@gmail.com") {

        const adminActions = [
            {
                name: "Blockchain Mould CRUD"
            },
            {
                name: "Post/Cancel Moulds for Sale"
            },
            {
                name: "Create new series"
            },
            {
                name: "Add mould to series"
            },
            {
                name: "Input mould metadata"
            },
            {
                name: "View all moulds for sale in display case"
            },
            {
                name: "View individual mould"
            },
            {
                name: "Blacklist a user"
            }

        ]

        return (
            <div>
                <PageTitle
                    title="Admin Page"
                    subtitle="What would you like to do?"
                />

                <div className="container">
                    <div>
                        Actions
                    </div>

                    <div>
                        {adminActions.map((action) => {
                            return (
                                <div key={action.name}>
                                    <button>
                                        {action.name}
                                    </button>
                                </div>
                            )
                        })}
                    </div>



                </div>

            </div>
        );
    }
    else {
        return <div></div>
    }


}
export default AdminPage;