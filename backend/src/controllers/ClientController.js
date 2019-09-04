const Client = require('../models/Client');
const CreditRequest = require('../models/CreditRequest')

const ClientController = () => {

    function getCredit(creditRequest){

        var credit = 0;

        if(creditRequest.score <= 299){
            credit=0;
            
        }else if(creditRequest.score >= 300 && creditRequest.score <= 599){
            credit=1000.00;
            
        }else if(creditRequest.score >= 600 && creditRequest.score <= 799){
            if(creditRequest.salary / 2 < 1000){
                credit=1000;                
            }else{
                credit=creditRequest.salary / 2 ;
            }
            
        }else if(creditRequest.score >= 800 && creditRequest.score <= 950){            
            credit=creditRequest.salary * 2 ;
            
        }else if(creditRequest.score >= 951 && creditRequest.score <= 999){
            credit=1000000 ;           
        }   

        return credit;
    }

    const list = async (req, res) => {
        try {
          const solicitacoes = await Client.findAll({
            include: [{
                model: CreditRequest,
                as : 'client'
            }]
        });
          return res.status(200).json(solicitacoes);          
        } catch (err) {
            
          console.log(err);
          return res.status(500).json({ msg: 'Ocorreu um erro durante a consulta.' });
        }
      }
  
      const get = async (req, res) => {
        // destruction ES6
        const { params } = req;
        try {
          const solicitacao = await Client.findById(params.id, {
            include: [{
                model: CreditRequest,
                as : 'client'
            }]
        });
          return res.status(200).json(solicitacao);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Ocorreu um erro durante a consulta.' });
        }
      }

    const create  = async (req, res) => {
        const {body} = req;

        try{
            body.score = Math.floor(Math.random() * (999 - 1 + 1)) + 1;

            const client = await Client.create({
                name: body.name,
                cpf: body.cpf,
                salary: body.salary,
                score: body.score
            });

            const creditRequestResult = getCredit(body);

            const creditRequest =  await CreditRequest.create({
                isApproved : (creditRequestResult == 0 ? false : true),
                credit :creditRequestResult,
                clientId: client.id
            });

            await client.setClient(creditRequest);
            
            res.status(201).json({'message': 'Criado com sucesso'  });
        }
        catch(err){
            
            res.status(500).json({
                message: err.message || "Ocorreu um erro ao salvar a solicitação do cliente."
            });
        }    
    };

    const update = async (req, res) => {
        const { body, params } = req;
        const client = await Client.findById(params.id, {
            include: [{
                model: CreditRequest,
                as : 'client'
            }]
        });        
        

        if(!client){
            return res.status(404).json({
                message: "Solicitação de cliente não encontrada com a identificação " + req.params.clienteId
            });
        }  
    
        try{
            await client.update({
                salary : body.salary
            });

            const creditRequest = await CreditRequest.findOne({
                where :{
                    clientId : client.id
                }
            });
            const creditRequestResult = getCredit(client);        

            await creditRequest.update({
                isApproved : (creditRequestResult == 0 ? false : true),
                credit : creditRequestResult
            });

            res.status(200).json({'message': 'Solicitação de crédito atualizada com sucesso'});            
            

            

        }catch(err){
            return res.status(500).json({
                message: "Algo aconteceu ao atualizar a solitação do cliente " + req.params.id
            });
        }
    };

    const destroy = async (req, res) => {
        const { params } = req;

        const client = await Client.findById(params.id);


        if(!client){
            return res.status(404).json({
                message: "Solicitação de cliente não encontrada com a identificação"
            });   
        }

        try{
            await client.destroy({
                include: [{
                    model: CreditRequest,
                    as : 'client'
                }]
            });
            
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