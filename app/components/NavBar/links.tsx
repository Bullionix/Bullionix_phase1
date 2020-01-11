import { dropdownButton } from "./dropdownButton"


var aboutLinkObject = [
    {
        name: "About Bullionix",
        href: "/about/bullionix",

    },
    {
        name: "About DGX",
        href: "/about/DGX",

    },
    {
        name: "About DigixDAO",
        href: "/about/digixDAO",

    },

]

var moreLinkObject = [

    {
        name: "Get DGX",
        href: "https://digix.global",

    },
    {
        name: "Blog",
        href: "https://medium.com/@bullionix",

    },
    {
        name: "About",
        href: "/about-bullionix",

    },

]


export var rightLinks = [

    {
        name: "Shop",
        href: "/shop",
        component: dropdownButton("Shop", [], "/shop"),
    },

    {
        name: "Display Case",
        href: "/display",
        component: dropdownButton("Display Case", [], "/display"),
    },

    {
        name: "Leaderboards",
        href: "/leaderboards",
        component: dropdownButton("Leaderboards", [], "/leaderboards"),
    },


    {
        name: "More",
        href: "/more",
        component: dropdownButton("More", moreLinkObject),
    },



    /*{
        name: "Login",
        href: "/auth",
        component: dropdownButton("Login", [], "/auth"),
    },
    */
]