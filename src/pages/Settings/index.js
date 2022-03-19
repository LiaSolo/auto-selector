import "./styles.css"
import {allFacs as allFaculties, back} from "../../config";
import {useState} from "react";
import axios from "axios"

function Settings() {
    const [inputs, setInputs] = useState(
        {
            faculty: new Array(Object.keys(allFaculties).length).fill(false),
            winners: new Array(Object.keys(allFaculties).length).fill(false),
            password: ""
        }
    );

    const [errorData, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleClickSendMessage = (event) => {
        setError("")
        event.preventDefault()
        setLoading(true)
        axios.post(`${back}/api/activate`, {
            password: inputs.password,
        })
            .then(res => {
                setLoading(false);
            }).catch(error => {
            setLoading(false);
            setError(error)
        })
    }

    const handleOnChange = (position, state) => {
        setInputs((prev) => ({
            ...prev, [state]: inputs[state].map((item, index) =>
                index === position ? !item : item
            )
        }));
    }

    const handleOnChangeText = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prev) => ({...prev, [name]: value}))
    }


    const handleSubmitAll = (event) => {
        setError("")
        event.preventDefault()
        const facultyData = inputs.faculty.map((checkbox, index) => checkbox ? index + 1 : null).filter(x => x)
        const headers = {
            'Content-Type': 'application/json'
        };

        if (facultyData.length) {
            setLoading(true)
            axios.post(`${back}/api/faculty`, {
                password: inputs.password,
                faculty: facultyData,
            }, {headers})
                .then(res => {
                    setLoading(false);
                    console.log(res.data);
                }).catch(error => {
                setLoading(false);
                setError(error)
            })
        }
    }

    const handleSubmitWinners = (event) => {
        setError("")
        event.preventDefault()
        const winnersData = inputs.winners.map((checkbox, index) => checkbox ? index + 1 : null).filter(x => x)
        const headers = {
            'Content-Type': 'application/json'
        };

        if (winnersData.length) {
            setLoading(true)
            axios.post(`${back}/api/winners`, {
                password: inputs.password,
                winners: winnersData,
            }, {headers})
                .then(res => {
                    setLoading(false);
                    console.log(res.data);
                }).catch(error => {
                setLoading(false);
                setError(error)
            })
        }
    }

    return (
        <div className="outer-container">
            <div className="outer-form">
                <form className="container-form" onSubmit={handleSubmitAll}>
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
                                        checked={inputs.faculty[index]}
                                        onChange={() => handleOnChange(index, "faculty")}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{allFaculties[faculty].name}</label>
                                </div>
                            )
                        }
                        <button type="submit" onSubmit={handleSubmitAll}>Отправить участников</button>
                    </div>
                </form>
                <form className="container-form" onSubmit={handleSubmitWinners}>
                    <div className="settings-inside">
                        <p>Че кто победил?</p>
                        {
                            Object.keys(allFaculties).map((faculty, index) =>
                                <div className="option" key={faculty}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={allFaculties[faculty].name}
                                        value={allFaculties[faculty].name}
                                        checked={inputs.winners[index]}
                                        onChange={() => handleOnChange(index, "winners")}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{allFaculties[faculty].name}</label>
                                </div>
                            )
                        }
                        <button type="submit" onSubmit={handleSubmitWinners}>Решить судьбу унивидения</button>
                    </div>
                </form>
            </div>

            <div className="text-input">
                <label>Секретный пароль, чтобы ММ не взломал нас</label>
                <input type="text" onChange={handleOnChangeText} name="password" value={inputs.password}/>
            </div>

            <button
                onClick={handleClickSendMessage}
            >
                Продвинуть сюжет
            </button>
            {errorData && <p className="error">{JSON.stringify(errorData.toJSON())}</p>}
            {loading && <p className="loading">ща-ща я посылаю данные на сервак...</p>}
        </div>
    )
}

export default Settings;