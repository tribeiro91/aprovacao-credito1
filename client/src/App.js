import React, { useState, useEffect } from 'react'
import ClientTable from './components/tables/ClientTable'
import AddClientForm from './components/forms/AddClientForm'
import { list, create, update, destroy, get} from './services/clientes'
import EditClientForm from './components/forms/EditClientForm'
import './assets/bootstrap.css'


const App = () => {

    const [clients, setClients] = useState([]);
    const [editing, setEditing] = useState(false);
    const [creating, setCreating] = useState(false);

    const initialFormState = {id: null, nome: '', pontuacao:'', credito:''}
    const [currentClient, setCurrentClient] = useState(initialFormState)

    const editRow = async(client) => {
      setEditing(true)      
      setCurrentClient({id: client.id, nome: client.nome, pontuacao: client.pontuacao, credito: client.credito})            
    }

    const newRow = async() => {
      setCreating(true)      
      
    }

    const load = async() => {
      const result = await list()
      setClients(result.data);
    }

    useEffect(() => {
      load();       
      
    }, []);

    

    const createClient = async(client) => {
      setCreating(false)
      await create(client)   
      load()    
    }

    const deleteClient = async (id) => {
      await destroy(id)
      load()
    }

    const updateClient = async(id, updatedClient) => {
      setEditing(false)
      await update(id, updatedClient)
      load()
    }

    return (
      <div className="container">
        <div class="row">
          <div class="col align-self-center">
            <ul class="nav p-3">
                <li class="nav-item">
                  <h3>Gerenciamento de gestão de crédito</h3>
                </li>
                <li class="nav-item ">
                  <button class="btn btn-primary ml-4" onClick ={newRow}>Nova solicitação</button>
                </li>
            </ul>
            
          </div>   
          
        </div>
        {
          creating || editing ? (
            <div class="row">
                <div class="col">
                    {editing ? (
                        <div>
                          <h4>Editar solicitação</h4>
                          <EditClientForm
                            editing={editing}
                            setEditing={setEditing}
                            currentClient={currentClient}
                            updateClient={updateClient}
                          />
                        </div>
                      ) : (
                        <div>
                            <h4> Adicionar solicitação </h4>
                            <AddClientForm creating={creating} setCreating={setCreating} addClient={createClient} />
                        </div>
                      )}
                      
                  </div>
            </div>

          ) :(
            <div class="row">
                <div class="col">
                  <h4> Solicitações </h4>              
                  <ClientTable clients={clients}  editRow={editRow} updateClient={updateClient} deleteClient={deleteClient}/>
                </div>
            </div> 
          )
        }
        
         
      </div>
    )  
}

export default App