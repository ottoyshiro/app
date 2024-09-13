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

    goals.forEach((goal) => {

        goal.checked = false;
    })

    if (answers.length == 0) {

        console.log("Nenhuma meta selecionada!");
        return;
    }
    
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
        message: "Metas realizadas: " + finalized.length,
        choices: [...finalized]
    })
}

const openGoals = async () => {

    const open = goals.filter((goal) => {

        return goal.checked != true;
    })

    if (open.length == 0) {

        console.log("Você não tem metas abertas! :)");
    }

    await select({
        message: "Metas abertas: " + open.length,
        choices: [...open]
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
                name: "Metas abertas",
                value: "abertas"
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
                case "abertas":
                    await openGoals();
                    break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
}

start();
