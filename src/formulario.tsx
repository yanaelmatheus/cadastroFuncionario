import React, { ChangeEvent, FormEvent } from "react";

interface FormularioProps{
    label: string;
    name: string;
    type?: string;
    value: string; 
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const formulario: React.FC<FormularioProps> = ({label, name, type, value, onChange, onSubmit}) => {
    return (
        <div className='form-grid'>
            <form onSubmit={onSubmit} className='conteudo-form'>
                <div className='half-width'>
                <label>
                    {label}
                    <input type='text' 
                        value={value}
                        onChange={onChange}
                        required>
                    </input>
                </label>
                </div>
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
};
export default formulario;