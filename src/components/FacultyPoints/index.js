import './style.css'
import React from 'react';
import {motion} from 'framer-motion'
import {useEffect, useState} from "react";

function FacultyPoints({params, points, id, currFac}) {
    const [color, setColor] = useState('rgba(255, 255, 255, 0.5)');

    useEffect(() => {
        if (currFac && id === currFac.faculty) {
            setColor('rgba(0, 0, 0, 0.5)');
            setTimeout(() => setColor('rgba(147,,255,0.7)'), 3000);
        }
    }, [currFac])

    return (
        <motion.div animate={{background: color}} transition={{ ease: "easeOut", background: {duration: 0.5}, layout: {duration: 2} }} layout className={`facultyPoints_outer`}>
            <div className={`faculty_logo`}>
                <motion.img src={`./assets/logos/${params.logo}`} height="50px"/>
            </div>
            <div className="faculty_name">
                <p>{params.name}</p>
            </div>
            <span className="points">{points}</span>
        </motion.div>
    );
}

export default FacultyPoints;