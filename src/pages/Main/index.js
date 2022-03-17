import './styles.css';
import Faculty from "../../components/Faculty";
import {back, allFacs} from "../../config";
import {HotKeys} from "react-hotkeys";
import {useEffect, useRef, useState} from "react";
import FacultyWinner from "../../components/FacultyWinner";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from "axios";

const keyMap = {
    NEXT: "d"
};

let allFaculties;
let winners;
let iterator;
let winnersList;

function Main() {
    const inputRef = useRef()
    const [currFac, setFac] = useState(1000);
    const [counter, setCounter] = useState(0);
    const [state, setState] = useState({all: [], winners: [], iterator: undefined, winnersList: []});
    const [confetti, setConfetti] = useState(false);
    const {width, height} = useWindowSize()

    useEffect(() => {
        axios.get(`${back}/api/faculty`)
            .then(res => {
                setState(prev => ({...prev, all: res.data}))
            }).catch(error => {
            console.log(error)
        })
        axios.get(`${back}/api/winners`)
            .then(res => {
                setState(prev => ({
                    ...prev,
                    winners: res.data,
                    iterator: res.data.values(),
                    winnersList: [...Array(res.data.length).fill(undefined)]
                }))
            }).catch(error => {
            console.log(error)
        })


    }, [])

    const handlers = {
        NEXT: () => {
            setConfetti(true)
            setCounter(counter + 1)
            const Fac = state.iterator.next().value
            setFac(Fac)
            if (Fac)
                state.winnersList[counter] = Fac
        }
    }


    return (
        <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
            {confetti &&
            <Confetti
                gravity={0.1}
                initialVelocityY={20}
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                onConfettiComplete={() => setConfetti(false)}
            />}
            <div className="App" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/background.png'})`
            }}>
                <div className="line">
                    <div className="container">
                        <div className="right">
                            <div className="video"></div>
                            <div className="FacultyList">
                                {
                                    Object.values(state.all).map((faculty, index) =>
                                        <Faculty key={faculty} params={allFacs[faculty]} id={faculty}
                                                 currFac={currFac} showOpacity={true}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="left">
                            <p className="title"> Им придется петь еще раз</p>
                            <div className="winnersList">
                                {
                                    state.winnersList.map((faculty, index) =>
                                        <FacultyWinner key={index} params={allFacs[faculty]}/>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HotKeys>


    )
}

export default Main;