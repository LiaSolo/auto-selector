import './styles.css';
import {allFacs, backFinal, socketUrl} from "../../config";
import {HotKeys} from "react-hotkeys";
import {motion} from 'framer-motion'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import FacultyPoints from "components/FacultyPoints";

const keyMap = {
    NEXT: "d"
};

function Final() {
    const inputRef = useRef()
    const [currFac, setFac] = useState(null);
    const [state, setState] = useState({all: [], iterator: undefined});

    useEffect(() => {
        axios.get(`${backFinal}/final/audience`)
            .then(res => {
                setState(prev => ({...prev, all: res.data.sort((a, b) => b.points - a.points), iterator: [...res.data].reverse().values()}))
            }).catch(error => {
            console.log(error)
        })
        inputRef.current.focus();
    }, [])

    const comparator = (a, b) => {
        if (Number(a.points) === Number(b.points) && a.was !== b.was) {
            if (a.was)
                return -1;
            if (b.was)
                return 1;
        }
        else
            return Number(b.points) - Number(a.points);
    }

    useEffect(() => {
        if (!currFac) return;
        const newFac = {...currFac, points: Number(currFac.points) + Number(currFac.added), was: true};
        console.log(newFac)
        const indexNewFac = state.all.findIndex(x => x.faculty === newFac.faculty)
        state.all[indexNewFac] = newFac;
        setTimeout(() =>setState(prev => ({...prev, all: state.all.sort(comparator)})), 1000)
        setTimeout(() => console.log(state), 1500)
    }, [currFac]);

    const handlers = {
        NEXT: () => {
            const Fac = state.iterator.next().value;
            setFac(Fac);
        }
    }

    const {lastMessage} = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        onMessage: handlers.NEXT,
        shouldReconnect: (closeEvent) => true,
    });


    return (
        <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} innerRef={inputRef}>
            <div className="App" style={{
                backgroundImage: 'url(./assets/BGTimer.gif)'
            }}>
                <div className="line">
                    <div className="container">
                        <div className="right">
                                <motion.div layout className="FacultyPointList">
                                    {
                                        Object.values(state.all).map((faculty, index) =>
                                            <FacultyPoints currFac={currFac} id={faculty.faculty} key={faculty.faculty}  params={allFacs[faculty.faculty]} points={faculty.points}/>
                                        )
                                    }
                                </motion.div>
                                <div className="added">
                                    {currFac && <span>{currFac.added}</span>}
                                </div>

                        </div>
                        <div className="left">
                            <div className="video" style={{
                                backgroundImage: 'url(./assets/Logo.png)'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </HotKeys>


    )
}

export default Final;