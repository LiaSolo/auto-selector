import './style.css'
import {useEffect, useRef, useState} from "react";

function FacultyWinner({params}) {
    const inputRef = useRef()
    const [hasParams, setHasParams] = useState(false);
    const [gradient, setGradient] = useState(false);
    useEffect(() => {
        if (params) {
            setGradient(true);
            setTimeout(() => {
                setHasParams(true)
                setGradient(false);
            }, 1500)
        }
    }, [params])

    return (
        <div className={'facultyWinner_outer'}
            style={!hasParams ? {"background" : "rgba(255,255,255,0.5)"} : {"background" : "rgba(255,255,255,1)"}}
             ref={inputRef}>

            {hasParams &&
            <>
                <div className={`faculty_logo`}>
                    <img src={`./assets/logos/${params.logo}`} height="50px"/>
                </div>
                <div className="faculty_name">
                    <p>{params.name}</p>
                </div>
            </>
            }
            {gradient &&
            <div className="gradient" style={gradient ? params.styles : {}}>

            </div>}

        </div>
    );
}

export default FacultyWinner;