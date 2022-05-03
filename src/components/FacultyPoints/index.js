import './style.css'
import {motion} from 'framer-motion'

function FacultyPoints({params, points, id}) {
    const transition = {
        type: "spring",
        damping: 25,
        stiffness: 120
    };

    const spring = {
        type: "spring",
        damping: 25,
        stiffness: 120
    };
    return (
        <motion.div layout transition={spring} className={'facultyWinner_outer2'}>
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