const { select, input } = require('@inquirer/prompts');

let goals = [];

const registerGoal = async () => {

    const goal = await input({ message: "Digite uma meta: "});

    if (goal.length == 0) {

        console.log("A meta não pode ser vazia.");
        return;
    }

    goals.push(
        { value: goal, checked: false });
}

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
                await registerGoal();
                console.log(goals);
                break;
            case "listar":
                console.log("Vamos listar!");
                break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
}

start();
