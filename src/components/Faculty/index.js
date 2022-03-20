import './style.css'
import {useEffect, useState} from "react";

function Faculty({params, currFac, id, showOpacity}) {
    const [shown, setShown] = useState(false)

    useEffect(() => {

        if (currFac == id && showOpacity) {
            setShown(true)
        }
    }, [currFac])

    return (
        <div className="faculty_outer" style={shown ? {opacity: 0.5} : {opacity: 1}}>
            <div className={`faculty_logo faculty_${params.color}`}>
                <img src={`./assets/logos/${params.logo}`} height="40px"/>
            </div>
            <div className="faculty_name">
                <p>{params.name}</p>
            </div>
        </div>
    );
}

export default Faculty;