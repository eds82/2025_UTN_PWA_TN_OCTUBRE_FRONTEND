import { useState } from "react"

const useForm = ({
    initial_form_state,
    onSubmit
}) => {

    //Crea una variable de estado (form_state) con el objeto de arriba, y una función (setFormState) para actualizarlo.
    //Cada vez que el usuario escribe en un input, el estado se actualiza.
    const [form_state, setFormState] = useState(initial_form_state)

    const handleInputChange = (event) => {     //Cada vez que un input cambia de valor
        setFormState(          //Llamo al seter de estado de formulario
            (current_form_state) => {     //Tomo el estado actual del estado del formulario
                const field_name = event.target.name     //Tomo el nombre del campo que se esta modificando (name)
                const field_value = event.target.value    //Tomo el valor del campo que es lo que escribio el usuario en el input
                return { ...current_form_state, [field_name]: field_value }    // lo seteamos como estado del formulario, retorno un nuevo estado con el campo modificado 
            }
        )
    }

    //Función para manejar el submit del formulario, Cuando apretás el botón Registrarse, imprime en consola el objeto con todos los datos.
    const handleSubmit = (event) => {
        event.preventDefault();   //Evita que se recargue la pagina
        onSubmit(form_state)
    }

    return {
        form_state,
        handleInputChange,
        handleSubmit
    }
}

export default useForm