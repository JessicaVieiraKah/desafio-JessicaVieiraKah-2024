class RecintosZoo {

    constructor() {
        // Definindo os recintos existentes
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, ocupacao: 3, especies: ['macaco'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupacao: 0, especies: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupacao: 1, especies: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupacao: 0, especies: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, ocupacao: 1, especies: ['leao'] },
        ];

        // Definindo as características dos animais
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        // Validando entradas
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = this.animais[animal];
        const espacoNecessario = (animalInfo.tamanho * quantidade) + (quantidade > 1 ? 1 : 0);
        let recintosViaveis = [];

        // Percorrendo os recintos para verificar viabilidade
        for (const recinto of this.recintos) {
            // Verificando bioma compatível
            if (!animalInfo.biomas.includes(recinto.bioma) && !(animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio')) {
                continue;
            }

            // Verificando espaço disponível
            const espacoDisponivel = recinto.tamanho - recinto.ocupacao;
            if (espacoNecessario > espacoDisponivel) {
                continue;
            }

            // Regras específicas para carnívoros e coabitação de espécies
            if (animalInfo.carnivoro && recinto.especies.length > 0 && !recinto.especies.includes(animal.toLowerCase())) {
                continue;
            }

            if (recinto.especies.includes('leao') || recinto.especies.includes('leopardo') || recinto.especies.includes('crocodilo')) {
                if (!animalInfo.carnivoro || !recinto.especies.includes(animal.toLowerCase())) {
                    continue;
                }
            }

            if (animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio' && recinto.especies.length > 0 && !recinto.especies.includes('hipopotamo')) {
                continue;
            }

            // Regras para macacos
            if (animal === 'MACACO' && (recinto.especies.length === 0 || (recinto.especies.length === 1 && recinto.especies[0] === 'macaco' && quantidade === 1))) {
                continue;
            }

            // Adicionando recinto viável à lista
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanho})`);
        }

        // Retornar recintos viáveis ou erro caso não existam
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis.sort() };
    }

}

export { RecintosZoo as RecintosZoo };
