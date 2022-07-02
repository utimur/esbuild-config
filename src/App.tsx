import React, {useState} from 'react';
import './index.css';
// @ts-ignore
import Logo from './logo.png';

const App = () => {
    const [state, setState] = useState<number>(111)

    const onBtnClick = () => {
        setState(state + 1)
    }

    return (
        <div>
            <h1>asfasf = ${state}</h1>
            <button onClick={onBtnClick}>CLICK ME</button>
        </div>
    );
};

export default App;
