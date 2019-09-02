import React from 'react'


const ClientTable = props => {       

        

        return ( <table class="table"> 
        <thead>
            <tr>
                <th>Nome</th>
                <th>Pontuação</th>
                <th>Crédito</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {props.clients.length > 0 ? (
                    props.clients.map(
                        client => (
                            <tr key={client.id}>
                                <td>
                                    {client.nome}
                                </td>
                                <td>
                                    {client.pontuacao}
                                </td>
                                <td>
                                   { client.credito}
                                </td>
                                <td>
                                    <button class="btn btn-info mr-2" onClick ={() => props.editRow(client)}>Editar</button>
                                    <button class="btn btn-danger ml-2" onClick={() => props.deleteClient(client.id)}>Excluir</button>
                                </td>
                            </tr>                  
                        )
                    )) :
                    (
                        <tr> 
                            <td colSpan={4}> Sem solicitações </td>
                        </tr>

                    )}
          
        </tbody>
    </table>)
}

export default ClientTable