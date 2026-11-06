
const TAMANHO = 6;
const VALORES_VALIDOS = [0, 1];

function criarTabuleiro() {
    return Array.from({ length: TAMANHO }, () =>
        Array(TAMANHO).fill(null)
    );
}

function validarTamanho(tabuleiro) {
    return Array.isArray(tabuleiro) &&
        tabuleiro.length === TAMANHO &&
        tabuleiro.every(linha =>
            Array.isArray(linha) && linha.length === TAMANHO
        );
}

function validarValores(tabuleiro) {
    if (!validarTamanho(tabuleiro)) return false;

    return tabuleiro.every(linha =>
        linha.every(valor =>
            VALORES_VALIDOS.includes(valor) || valor === null
        )
    );
}

function validarQuantidade(linha) {
    const zeros = linha.filter(valor => valor === 0).length;
    const uns = linha.filter(valor => valor === 1).length;

    return zeros <= 3 && uns <= 3;
}

function validarTresConsecutivos(linha) {
    for (let i = 0; i < linha.length - 2; i++) {
        if (
            linha[i] !== null &&
            linha[i] === linha[i + 1] &&
            linha[i] === linha[i + 2]
        ) {
            return false;
        }
    }

    return true;
}

function obterColuna(tabuleiro, coluna) {
    return tabuleiro.map(linha => linha[coluna]);
}

function validarLinhas(tabuleiro) {
    return tabuleiro.every(linha =>
        validarQuantidade(linha) &&
        validarTresConsecutivos(linha)
    );
}

function validarColunas(tabuleiro) {
    for (let coluna = 0; coluna < TAMANHO; coluna++) {
        const valores = obterColuna(tabuleiro, coluna);

        if (
            !validarQuantidade(valores) ||
            !validarTresConsecutivos(valores)
        ) {
            return false;
        }
    }

    return true;
}

function validarLinhasDuplicadas(tabuleiro) {
    const linhasCompletas = tabuleiro.filter(linha =>
        linha.every(valor => valor !== null)
    );

    return new Set(
        linhasCompletas.map(linha => linha.join(""))
    ).size === linhasCompletas.length;
}

function validarColunasDuplicadas(tabuleiro) {
    const colunas = [];

    for (let i = 0; i < TAMANHO; i++) {
        const coluna = obterColuna(tabuleiro, i);

        if (coluna.every(valor => valor !== null)) {
            colunas.push(coluna.join(""));
        }
    }

    return new Set(colunas).size === colunas.length;
}

function validarTabuleiro(tabuleiro) {
    if (!validarTamanho(tabuleiro)) return false;
    if (!validarValores(tabuleiro)) return false;
    if (!validarLinhas(tabuleiro)) return false;
    if (!validarColunas(tabuleiro)) return false;
    if (!validarLinhasDuplicadas(tabuleiro)) return false;
    if (!validarColunasDuplicadas(tabuleiro)) return false;

    return true;
}

function verificarTabuleiroCompleto(tabuleiro) {
    if (!validarTabuleiro(tabuleiro)) return false;

    return tabuleiro.every(linha =>
        linha.every(valor => valor !== null)
    );
}

module.exports = {
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
};
