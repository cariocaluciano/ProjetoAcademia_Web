import CampoTexto from '../CampoTexto';
import CampoTextoSenha from '../CampoTextoSenha';
import './FormularioLoginAcademia.css'

const FormularioLoginAcademia = () => {
    return (
        <section className='formularioLoginAcademia'>
            <form>
                <h2>Faça seu login</h2>
                <CampoTexto label="Email" placeholder="Digite seu email" />
                <CampoTextoSenha label="Senha" placeholder="Digite sua senha" />
                <CampoTexto label="Identificador" placeholder="Digite seu número identificador" />
            </form>
        </section>
    )
}

export default FormularioLoginAcademia;