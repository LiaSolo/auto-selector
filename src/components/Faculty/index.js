import './style.css'
import {HotKeys} from "react-hotkeys";
import {useEffect, useRef, useState} from "react";

function Faculty({params, currFac, id, showOpacity}) {
    const inputRef = useRef()
    const [shown, setShown] = useState(false)

    useEffect(() => {

        if (currFac == id && showOpacity) {
            setShown(true)
        }
    }, [currFac])

    return (
            <div className="faculty_outer" style={shown? {opacity: 0.5} : {opacity: 1}} ref={inputRef}>
                <div className={`faculty_logo faculty_${params.color}`}>
                    <img src={`${process.env.PUBLIC_URL}/assets/logos/${params.logo}`} height="50px"/>
                </div>
                <div className="faculty_name">
                    <p>{params.name}</p>
                </div>
            </div>
    );
}

export default Faculty;