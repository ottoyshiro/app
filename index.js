const { select } = require('@inquirer/prompts');

const start = async () => {

    while (true) {

        const option = await select({

            message: "Menu >",
            choices: [
            {
                name: "Cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "Sair",
                value: "sair"
            }],
        })
        
        switch(option) {
            case "cadastrar":
                console.log("Vamos cadastrar!");
                break;
            case "listar":
                console.log("Vamos listar!");
                break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
};

start();