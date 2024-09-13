const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require("fs").promises;

let message = "Seja bem-vindo ao app de metas!";

let goals;

const loadGoals = async () => {

    try {
        
        const data = await fs.readFile("metas.json", "utf-8");
        goals = JSON.parse(data);

    } catch (error) {
        
        goals = [];
    }
}

const saveGoals = async () => {

    await fs.writeFile("metas.json", JSON.stringify(goals, null, 2));
}

const registerGoal = async () => {

    const goal = await input({ message: "Digite uma meta: "});

    if (goal.length == 0) {

        message = "A meta não pode ser vazia.";
        return;
    }

    goals.push(
        { value: goal, checked: false });
    
    message = `Meta '${goal}' cadastrada com sucesso!`;
}

const listGoals = async () => {

    if (goals.length == 0) {

        message = "Não existem metas!";
        return;
    }

    const answers = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar a etapa",
        choices: [...goals]
    })

    goals.forEach((goal) => {

        goal.checked = false;
    })

    if (answers.length == 0) {

        message = "Nenhuma meta selecionada!";
        return;
    }
    
    answers.forEach((answer) => {

        const goal = goals.find((g) => {
            
            return g.value == answer;
        })
        goal.checked = true;
    })
    
    message = "Meta(s) marcada(s) como concluída(s).";
}

const finalizedGoals = async () => {

    if (goals.length == 0) {
        
        message = "Não existem metas!";
        return;
    }

    const finalized = goals.filter((goal) => {

        return goal.checked;
    })

    if (finalized.length == 0) {

        message = "Não há nenhuma meta realizada! :(";
        return;
    }

    await select({
        message: "Metas realizadas: " + finalized.length,
        choices: [...finalized]
    })
}

const openGoals = async () => {

    if (goals.length == 0) {
        
        message = "Não existem metas!";
        return;
    }

    const open = goals.filter((goal) => {

        return goal.checked != true;
    })

    if (open.length == 0) {

        message = "Você não tem metas abertas! :)";
    }

    await select({
        message: "Metas abertas: " + open.length,
        choices: [...open]
    })
}

const deleteGoals = async () => {

    if (goals.length == 0) {
        
        message = "Não existem metas!";
        return;
    }

    const unmarkedGoals = goals.map((goal) => {

        return { value: goal.value, checked: false };
    })
    const deletedItems = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar a etapa",
        choices: [...unmarkedGoals]
    })

    if (deletedItems == 0) {

        message = "Nenhum item selecionado!";
        return;
    }

    deletedItems.forEach((item) => {

        goals = goals.filter((goal) => {

            return goal.value != item;
        })
    })

    message = "Meta(s) deletada(s) com sucesso!";
}

const showMessage = () => {

    console.clear();

    if (message != "") {
        
        console.log(message);
        console.log("");
        message = "";
    }
}

const start = async () => {

    await loadGoals();

    while (true) {

        showMessage();
        await saveGoals();

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
                name: "Deletar metas",
                value: "deletar"
            },
            {
                name: "Sair",
                value: "sair"
            }],
        })

        switch(option) {
            case "cadastrar":
                await registerGoal();
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
            case "deletar":
                await deleteGoals();
                break;
            case "sair":
                console.log("Saindo");
                return;    
        
        }
    }
}

start();
