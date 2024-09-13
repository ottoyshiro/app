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

const finalizedGoals = async () => {

    const finalized = goals.filter((goal) => {

        return goal.checked;
    })

    if (finalized.length == 0) {

        console.log("Não há nenhuma meta realizada! :(");
        return;
    }

    await select({
        message: "Metas realizadas",
        choices: [...finalized]
    })
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
                name: "Metas realizadas",
                value: "realizadas"
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
                
                break;
            case "realizadas":
                await finalizedGoals();
                break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
}

start();
