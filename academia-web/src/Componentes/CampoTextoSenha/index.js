import './CampoTextoSenha.css';

const CampoTextoSenha = (props) => {
    return(
        <div className='campo-texto'>
            <label>{props.label}</label>
            <input type='password' placeholder = {props.placeholder}/>
        </div>
    )
}

export default CampoTextoSenha;