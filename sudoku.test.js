
const { describe, test } = require('node:test');
const assert = require('node:assert/strict');

const {
    TAMANHO,
    VALORES_VALIDOS,
    criarTabuleiro,
    validarTamanho,
    validarValores,
    validarQuantidade,
    validarTresConsecutivos,
    obterColuna,
    validarLinhas,
    validarColunas,
    validarLinhasDuplicadas,
    validarColunasDuplicadas,
    validarTabuleiro,
    verificarTabuleiroCompleto
} = require('./sudoku');


const tabuleiroValido = [
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0]
];

const tabuleiroIncompleto = [
    [0, 1, 0, 1, 0, null],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0]
];

describe('Criação do tabuleiro', () => {

    test('CT01 - Deve criar um tabuleiro vazio 6x6', () => {
        const tabuleiro = criarTabuleiro();

        assert.equal(tabuleiro.length, TAMANHO);
        assert.equal(tabuleiro.every(linha => linha.length === 6), true);
        assert.equal(tabuleiro.flat().every(valor => valor === null), true);
    });

});

describe('Validação do tamanho', () => {

    test('CT02 - Deve aceitar um tabuleiro 6x6', () => {
        assert.equal(validarTamanho(tabuleiroValido), true);
    });

    test('CT03 - Deve rejeitar um tabuleiro com menos de 6 linhas', () => {
        const tabuleiro = tabuleiroValido.slice(0, 5);

        assert.equal(validarTamanho(tabuleiro), false);
    });

    test('CT04 - Deve rejeitar um tabuleiro com mais de 6 linhas', () => {
        const tabuleiro = [...tabuleiroValido, [0, 1, 0, 1, 0, 1]];

        assert.equal(validarTamanho(tabuleiro), false);
    });

    test('CT05 - Deve rejeitar uma linha com menos de 6 colunas', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0].pop();

        assert.equal(validarTamanho(tabuleiro), false);
    });

    test('CT06 - Deve rejeitar uma linha com mais de 6 colunas', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0].push(0);

        assert.equal(validarTamanho(tabuleiro), false);
    });

    test('CT07 - Deve rejeitar um valor que não seja um array', () => {
        assert.equal(validarTamanho(null), false);
    });

});

describe('Validação dos valores', () => {

    test('CT08 - Deve aceitar somente valores 0, 1 e null', () => {
        assert.equal(validarValores(tabuleiroIncompleto), true);
    });

    test('CT09 - Deve rejeitar o valor 2', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0][0] = 2;

        assert.equal(validarValores(tabuleiro), false);
    });

    test('CT10 - Deve rejeitar valores negativos', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0][0] = -1;

        assert.equal(validarValores(tabuleiro), false);
    });

    test('CT11 - Deve rejeitar valores do tipo texto', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0][0] = '0';

        assert.equal(validarValores(tabuleiro), false);
    });

    test('CT12 - Deve rejeitar um tabuleiro com tamanho incorreto', () => {
        assert.equal(validarValores([[0, 1], [1, 0]]), false);
    });

});

describe('Validação da quantidade de zeros e uns', () => {

    test('CT13 - Deve aceitar uma linha com três zeros e três uns', () => {
        assert.equal(validarQuantidade([0, 1, 0, 1, 0, 1]), true);
    });

    test('CT14 - Deve aceitar uma linha incompleta sem ultrapassar os limites', () => {
        assert.equal(validarQuantidade([0, 1, 0, null, null, null]), true);
    });

    test('CT15 - Deve rejeitar uma linha com mais de três zeros', () => {
        assert.equal(validarQuantidade([0, 0, 0, 0, 1, 1]), false);
    });

    test('CT16 - Deve rejeitar uma linha com mais de três uns', () => {
        assert.equal(validarQuantidade([1, 1, 1, 1, 0, 0]), false);
    });

});

describe('Validação de números consecutivos', () => {

    test('CT17 - Deve aceitar uma linha sem três números iguais consecutivos', () => {
        assert.equal(validarTresConsecutivos([0, 1, 0, 1, 0, 1]), true);
    });

    test('CT18 - Deve rejeitar três zeros consecutivos', () => {
        assert.equal(validarTresConsecutivos([0, 0, 0, 1, 0, 1]), false);
    });

    test('CT19 - Deve rejeitar três uns consecutivos', () => {
        assert.equal(validarTresConsecutivos([1, 1, 1, 0, 1, 0]), false);
    });

    test('CT20 - Deve permitir posições vazias entre os valores', () => {
        assert.equal(validarTresConsecutivos([0, 0, null, 1, 1, null]), true);
    });

});

describe('Obtenção de colunas', () => {

    test('CT21 - Deve retornar corretamente os valores de uma coluna', () => {
        assert.deepEqual(
            obterColuna(tabuleiroValido, 0),
            [0, 1, 0, 1, 0, 1]
        );
    });

});

describe('Validação das linhas', () => {

    test('CT22 - Deve aceitar linhas que respeitam as regras', () => {
        assert.equal(validarLinhas(tabuleiroValido), true);
    });

    test('CT23 - Deve rejeitar linhas com três valores iguais consecutivos', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0] = [0, 0, 0, 1, 1, 1];

        assert.equal(validarLinhas(tabuleiro), false);
    });

    test('CT24 - Deve rejeitar linhas com quantidade excessiva de zeros', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0] = [0, 0, 0, 0, 1, 1];

        assert.equal(validarLinhas(tabuleiro), false);
    });

});

describe('Validação das colunas', () => {

    test('CT25 - Deve aceitar colunas que respeitam as regras', () => {
        assert.equal(validarColunas(tabuleiroValido), true);
    });

    test('CT26 - Deve rejeitar colunas com três zeros consecutivos', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0][0] = 0;
        tabuleiro[1][0] = 0;
        tabuleiro[2][0] = 0;

        assert.equal(validarColunas(tabuleiro), false);
    });

    test('CT27 - Deve rejeitar colunas com quantidade excessiva de uns', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);

        for (let i = 0; i < 4; i++) {
            tabuleiro[i][0] = 1;
        }

        assert.equal(validarColunas(tabuleiro), false);
    });

});

describe('Validação de linhas duplicadas', () => {

    test('CT28 - Deve aceitar linhas completas diferentes', () => {
        assert.equal(validarLinhasDuplicadas(tabuleiroValido), true);
    });

    test('CT29 - Deve rejeitar linhas completas idênticas', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[1] = [...tabuleiro[0]];

        assert.equal(validarLinhasDuplicadas(tabuleiro), false);
    });

    test('CT30 - Deve ignorar linhas incompletas na comparação', () => {
        assert.equal(validarLinhasDuplicadas(tabuleiroIncompleto), true);
    });

});

describe('Validação de colunas duplicadas', () => {

    test('CT31 - Deve aceitar colunas completas diferentes', () => {
        assert.equal(validarColunasDuplicadas(tabuleiroValido), true);
    });

    test('CT32 - Deve rejeitar colunas completas idênticas', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);

        for (let i = 0; i < 6; i++) {
            tabuleiro[i][1] = tabuleiro[i][0];
        }

        assert.equal(validarColunasDuplicadas(tabuleiro), false);
    });

    test('CT33 - Deve ignorar colunas incompletas na comparação', () => {
        assert.equal(validarColunasDuplicadas(tabuleiroIncompleto), true);
    });

});

describe('Validação geral do tabuleiro', () => {

    test('CT34 - Deve aceitar um tabuleiro que respeita todas as regras', () => {
        assert.equal(validarTabuleiro(tabuleiroValido), true);
    });

    test('CT35 - Deve rejeitar um tabuleiro com valores inválidos', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0][0] = 5;

        assert.equal(validarTabuleiro(tabuleiro), false);
    });

    test('CT36 - Deve rejeitar um tabuleiro com tamanho inválido', () => {
        assert.equal(validarTabuleiro([[0, 1], [1, 0]]), false);
    });

});

describe('Verificação do preenchimento do tabuleiro', () => {

    test('CT37 - Deve identificar um tabuleiro completamente preenchido', () => {
        assert.equal(verificarTabuleiroCompleto(tabuleiroValido), true);
    });

    test('CT38 - Deve identificar um tabuleiro incompleto', () => {
        assert.equal(verificarTabuleiroCompleto(tabuleiroIncompleto), false);
    });

    test('CT39 - Deve rejeitar um tabuleiro completo que viola as regras', () => {
        const tabuleiro = tabuleiroValido.map(linha => [...linha]);
        tabuleiro[0] = [0, 0, 0, 1, 1, 1];

        assert.equal(verificarTabuleiroCompleto(tabuleiro), false);
    });

});
