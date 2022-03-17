import './style.css'
import {useRef} from "react";

function FacultyWinner({params}) {
    const inputRef = useRef()


    return (
        <div className={`facultyWinner_outer ${!params? "transparent" : ""} `} ref={inputRef}>
            {params &&
            <>
                <div className={`faculty_logo faculty_${params.color}`}>
                    <img src={`${process.env.PUBLIC_URL}/assets/logos/${params.logo}`} height="70px"/>
                </div>
                <div className="faculty_name">
                    <p>{params.name}</p>
                </div>
            </>
            }

        </div>
    );
}

export default FacultyWinner;