import React, {useState} from 'react'

const EditClientForm = props => {
   
    const [client, setClient] = useState(props.currentClient)

    const onSubmit = async(e) => {
         e.preventDefault();
         
          await props.updateClient(client.id,client)
          setClient({ nome: '', pontuacao :'', credito: '' })
    }

    const handleInputChange = event => {
        const { name, value } = event.target    
        setClient({ ...client, [name]: value })
        
    }    


    return (
        <form class="form" onSubmit={onSubmit}>
            <div class="form-group">
                <label>Nome</label>
                <input class="form-control" type="text" name="nome" value={client.nome} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Pontuação</label>
                <input class="form-control" type="number" min="0" max="999" name="pontuacao" value={client.pontuacao} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <button class="btn btn-success mr-2"> Editar </button>
                <button class="btn btn-secondary ml-2" onClick={() => props.setEditing(false)} >
                    Cancelar
                </button>
            </div>
            
            
            
        </form>
    )
}

export default EditClientForm