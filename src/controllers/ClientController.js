const Cliente = require('../models/Client');

const ClientController = () => {


    const list = async (req, res) => {
        try {
          const clientes = await Cliente.findAll();
          return res.status(200).json(clientes);          
        } catch (err) {
            
          console.log(err);
          return res.status(500).json({ msg: 'Ocorreu um erro durante a consulta.' });
        }
      }
  
      const get = async (req, res) => {
        // destruction ES6
        const { params } = req;
        try {
          const cliente = await Cliente.findById(params.id);
          return res.status(200).json(cliente);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Ocorreu um erro durante a consulta.' });
        }
      }

    const create  = async (req, res) => {
        const {body} = req;

        try{
            body.pontuacao = Math.floor(Math.random() * (999 - 1 + 1)) + 1;

            if(body.pontuacao >= 1 && body.pontuacao <= 299){
                body.credito = "Reprovado";
            }else if(body.pontuacao >= 300 && body.pontuacao <= 599){
                body.credito = "R$1000,00";
            }else if(body.pontuacao >= 600 && body.pontuacao <= 799){
                body.credito = "50% da renda informada, valor mínimo R$1000,00";
            }else if(body.pontuacao >= 800 && body.pontuacao <= 950){
                body.credito = "200% da renda informada";
            }else if(body.pontuacao >= 951 && body.pontuacao <= 999){
                body.credito = "Sem limites, considerar R$ 1.000.000";
            }   

            console.log(body);
            await Cliente.create(body);
            res.status(201).json({'message':body});
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message || "Ocorreu um erro ao salvar a solicitação do cliente."
            });
        }    
    };

    const update = async (req, res) => {
        const { body, params } = req;
        const client = await Cliente.findById(params.id);

        if(body.pontuacao >= 1 && body.pontuacao <= 299){
            body.credito = "Reprovado";
        }else if(body.pontuacao >= 300 && body.pontuacao <= 599){
            body.credito = "R$1000,00";
        }else if(body.pontuacao >= 600 && body.pontuacao <= 799){
            body.credito = "50% da renda informada, valor mínimo R$1000,00";
        }else if(body.pontuacao >= 800 && body.pontuacao <= 950){
            body.credito = "200% da renda informada";
        }else if(body.pontuacao >= 951 && body.pontuacao <= 999){
            body.credito = "Sem limites, considerar R$ 1.000.000";
        }   


        if(!client){
            return res.status(404).json({
                message: "Solicitação de cliente não encontrada com a identificação " + req.params.clienteId
            });
        }

        if (body.pontuacao > 1000) {
            return res.status(400).json({
                message: "Pontuacao no maximo 1000"
            });
        }

        const model = {
            ...client,
            ...body
        };

        try{
            await Cliente.update(model, {
                where: {
                    id : params.id
                }
            });
            res.status(200).json({'message': 'Solicitação de crédito atualizada com sucesso'});

        }catch(err){
            return res.status(500).json({
                message: "Algo aconteceu ao atualizar a solitação do cliente " + req.params.clienteId
            });
        }
    };

    const destroy = async (req, res) => {
        const { params } = req;

        const client = await Cliente.findById(params.id);

        if(!client){
            return res.status(404).json({
                message: "Solicitação de cliente não encontrada com a identificação"
            });   
        }

        try{
            await client.destroy();
            return res.status(200).json({message : "Solicitação excluída com sucesso"});

        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: "Não foi possível excluir a solicitação " + req.params.clienteId
            });      
        }
        
    }

    return{
        list,
        get,
        create,
        update, 
        destroy
    };

};


module.exports = ClientController;