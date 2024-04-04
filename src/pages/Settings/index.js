import "./styles.css"
import React from 'react';
import {allFacs as allFaculties, back, socketUrl} from "../../config";
import {useEffect, useState} from "react";
import axios from "axios"
import useWebSocket from 'react-use-websocket';

function Settings() {
    const [inputs, setInputs] = useState(
        {
            faculty: new Set(),
            winners: new Set(),
            password: ""
        }
    );

    const [fetching, setFetching] = useState({
        error: "",
        loading: false,
        ok: ""
    })

    const [currWinners, setCurrWinners] = useState([])

    // Отображение чекбоксов "че кто победил"
    const updateWinners = () => {
        axios.get(`${back}/api/faculty`)
            .then(res => {
                setCurrWinners(res.data)
            }).catch(error => {
                console.log(error)
        })
    }

    useEffect(() => {
        document.title = "Настройки авто-селектора"
        updateWinners()
    }, []);

    const { sendMessage } = useWebSocket(socketUrl);

    const handleClickSendMessage = (event) => {
        setFetching((prev) => ({...prev, ok: "", error: "", loading: true}))
        event.preventDefault()
        sendMessage('111');
        setFetching((prev) => ({...prev, ok: "все оки"}));
        setFetching((prev) => ({...prev, loading: false}));
    }

    const handleCheckbox = (index, state) => {
        if (inputs[state].has(index))
            inputs[state].delete(index);
        else
            inputs[state].add(index);

        // чтобы реакт понимал что надо бы обновить стейт для отрисовки текущего порядка победителей
        if (state === 'winners')
            setInputs((prev) => ({...prev, [state]: inputs[state]}))
    }


    const handleOnChangeText = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prev) => ({...prev, [name]: value}))
    }


    const handleSubmit = (state) => {
        return (event) => {
            setFetching((prev) => ({...prev, ok: "", error: ""}))
            event.preventDefault()
            const data = [...inputs[state]]
            const headers = {
                'Content-Type': 'application/json'
            };

            if (data.length) {
                setFetching((prev) => ({...prev, loading: true}))
                axios.post(`${back}/api/${state}`, {
                    password: inputs.password,
                    [state]: data,
                }, {headers})
                    .then(() => {
                        setFetching((prev) => ({...prev, ok: "все оки"}))
                        updateWinners();
                        setInputs((prev) => ({...prev, winners: new Set()}))
                    }).catch(error => {
                        setFetching((prev) => ({...prev, error: error}))
                    }).finally(() => {
                        setFetching((prev) => ({...prev, loading: false}))
                    })
            }
        }

    }

    return (
        <div className="outer-container">
            <div className="outer-form">
                <form className="container-form" onSubmit={handleSubmit('faculty')}>
                    <div className="settings-inside">
                        <p>Кто участвует вообще?</p>
                        {
                            Object.keys(allFaculties).map((faculty, index) =>
                                <div className="option" key={faculty}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={allFaculties[faculty].name}
                                        value={allFaculties[faculty].name}
                                        onChange={() => handleCheckbox(faculty, "faculty")}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{allFaculties[faculty].name}</label>
                                </div>
                            )
                        }
                        <button type="submit" onSubmit={handleSubmit('faculty')}>Отправить участников</button>
                    </div>
                </form>
                <form className="container-form" onSubmit={handleSubmit('winners')}>
                    <div className="settings-inside">
                        <p>Че кто победил?</p>
                        {
                            currWinners.map((faculty, index) =>
                                <div className="option" key={faculty}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={allFaculties[faculty].name}
                                        value={allFaculties[faculty].name}
                                        onChange={() => handleCheckbox(faculty, "winners")}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{allFaculties[faculty].name}</label>
                                </div>
                            )
                        }
                        <button type="submit" onSubmit={handleSubmit('winners')}>Решить судьбу унивидения</button>
                    </div>
                </form>
            </div>
            <div className="order">
                {
                    [...inputs.winners].map((faculty, index) =>
                    <p key={faculty}>{index + 1} - {allFaculties[faculty].name}</p>)
                }
            </div>
            <div className="text-input">
                <label>Секретный пароль, чтобы ММ не взломал нас</label>
                <input type="text" onChange={handleOnChangeText} name="password" value={inputs.password}/>
            </div>

            <button onClick={handleClickSendMessage}>
                Продвинуть сюжет
            </button>
            {fetching.error && <p className="error">Что-то пошло не так - {fetching.error.toJSON().message}</p>}
            {fetching.ok &&  <p className="ok">{fetching.ok}</p>}
            {fetching.loading && <p className="loading">ща-ща я посылаю данные на сервак...</p>}
        </div>
    )
}

export default Settings;