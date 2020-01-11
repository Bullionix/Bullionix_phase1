
import React, { useRef, Suspense } from "react";




const ThreeJS = (props) => {

    if (typeof window !== 'undefined') {


        const App = require('../components/ThreeJSCanvas').default


        return (

            <div style={{ width: '100%', height: '100%' }}>
                <App />

            </div>




        );

    }
    else return null
}
export default ThreeJS;
