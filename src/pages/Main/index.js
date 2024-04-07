import './styles.css';
import React from 'react';
import Faculty from "../../components/Faculty";
import {allFacs, back, socketUrl} from "../../config";
import {HotKeys} from "react-hotkeys";
import {useEffect, useRef, useState} from "react";
import FacultyWinner from "../../components/FacultyWinner";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import {Link} from "react-router-dom";

const keyMap = {
    NEXT: "d"
};

function Main() {
    const inputRef = useRef()
    const [currFac, setFac] = useState(1000);
    const [counter, setCounter] = useState(0);
    const [state, setState] = useState({all: [], winners: [], iterator: undefined, winnersList: []});

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

        inputRef.current.focus();
    }, [])

    const handlers = {
        NEXT: () => {
            setCounter(counter + 1)
            const Fac = state.iterator.next().value
            setFac(Fac)
            if (Fac)
                state.winnersList[counter] = Fac
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
                backgroundImage: 'url(./assets/background.png)'
            }}>
                <div className="line">
                    <div className="container">
                        <div className="right">
                            <div className="video" style={{
                                backgroundImage: 'url(./assets/Logo.png)'
                            }} />
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
                            <p className="title">Финалисты</p>
                            <Link to="/settings" />
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