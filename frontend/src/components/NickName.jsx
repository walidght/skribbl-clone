import './NickName.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

function NickName({ name, setName, setStep }) {
    const navigate = useNavigate();

    function clickHandler(event) {
        if (event.key === 'Enter' && name != '') {
            // navigate(`/success?name=${name}`);
            setStep(2);
        }
    }
    return (
        <div className="nickname-content-container">
            <img src={logo} alt="" />

            <input
                type="text"
                placeholder="Nickname"
                onKeyPress={clickHandler}
                onInput={(e) => setName(e.target.value)}
                name={name}
            />
        </div>
    );
}

export default NickName;
