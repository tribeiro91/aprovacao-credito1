import React, {useState} from 'react'

const AddClientForm = props => {

    const initialFormState = { nome: '' }
    const [client, setClient] = useState(initialFormState);

    const onSubmit = async(e) => {
         e.preventDefault();
         
          await props.addClient(client)
          setClient({ nome: '' })
    }

    const handleInputChange = event => {
        const { name, value } = event.target    
        setClient({ ...client, [name]: value })
        console.log(value)
      }

    return (
        <form class="form" onSubmit={onSubmit}>
            <div class="form-group">
                <label>Nome</label>
                <input class="form-control" type="text" name="nome" value={client.nome} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <button class="btn btn-success"> Adicionar </button>
                <button class="btn btn-secondary ml-2" onClick={() => props.setCreating(false)} >
                    Cancelar
                </button>
            </div>
            
        </form>
    )
}

export default AddClientForm