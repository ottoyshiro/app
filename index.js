const { select, input, checkbox } = require('@inquirer/prompts');

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

const listGoals = async () => {

    const answers = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar a etapa",
        choices: [...goals]
    })

    if (answers.length == 0) {

        console.log("Nenhuma meta selecionada!");
        return;
    }
    console.log(goals);
    goals.forEach((goal) => {

        goal.checked = false;
    })

    answers.forEach((answer) => {

        const goal = goals.find((g) => {
            
            return g.value == answer;
        })
        goal.checked = true;
    })
    
    console.log("Meta(s) concluída(s).");
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
                name: "Listar metas",
                value: "listar"
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
                await listGoals();
                console.log("Vamos listar!");
                break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
}

start();
