# Sudoku Binário 6x6

Implementação das regras do Sudoku Binário de tamanho 6x6 em JavaScript, com casos de teste usando o test runner nativo do Node.js.

## Como rodar

Precisa do Node.js 18 ou mais novo. Não precisa instalar nenhuma dependência.

```bash
npm test
```

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `sudoku.js` | Regras e validações do Sudoku Binário |
| `sudoku.test.js` | Casos de teste (CT01 a CT39) |
| `package.json` | Configurações e comando de execução dos testes |

---

## Regras do jogo

### Tabuleiro

- O tabuleiro possui 6 linhas e 6 colunas, totalizando 36 posições.
- Cada posição pode conter somente os valores **0** ou **1**.
- Posições ainda não preenchidas são representadas por `null`.
- O tabuleiro deve possuir exatamente 6 linhas, cada uma com 6 colunas.

### Quantidade de zeros e uns

- Cada linha deve possuir no máximo 3 zeros e 3 uns.
- Cada coluna deve possuir no máximo 3 zeros e 3 uns.
- Quando o tabuleiro estiver completo, cada linha e coluna terá exatamente 3 zeros e 3 uns.

### Números consecutivos

- Não podem existir três zeros consecutivos na horizontal.
- Não podem existir três uns consecutivos na horizontal.
- A mesma regra se aplica verticalmente, nas colunas.
- Posições vazias não são consideradas números consecutivos.

### Linhas e colunas diferentes

- Não podem existir duas linhas completas idênticas.
- Não podem existir duas colunas completas idênticas.
- Linhas e colunas incompletas não são consideradas na comparação de duplicidade.

### Validação do tabuleiro

- O tabuleiro deve respeitar as regras de tamanho e valores permitidos.
- As linhas e colunas devem respeitar os limites de zeros e uns.
- Não são permitidos três números iguais consecutivos.
- Linhas e colunas completas devem ser diferentes entre si.
- Um tabuleiro somente é considerado completo quando todas as posições estão preenchidas e todas as regras são respeitadas.

---

## Casos de teste

### Criação do tabuleiro

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT01 | Criar tabuleiro | Tabuleiro vazio de 6x6 |

### Validação do tamanho

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT02 | Tabuleiro 6x6 | Tamanho aceito |
| CT03 | Menos de 6 linhas | Tabuleiro rejeitado |
| CT04 | Mais de 6 linhas | Tabuleiro rejeitado |
| CT05 | Linha com menos de 6 colunas | Tabuleiro rejeitado |
| CT06 | Linha com mais de 6 colunas | Tabuleiro rejeitado |
| CT07 | Valor que não seja um array | Tabuleiro rejeitado |

### Validação dos valores

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT08 | Valores 0, 1 e null | Valores aceitos |
| CT09 | Valor 2 | Valor rejeitado |
| CT10 | Valor negativo | Valor rejeitado |
| CT11 | Valor do tipo texto | Valor rejeitado |
| CT12 | Tabuleiro com tamanho incorreto | Tabuleiro rejeitado |

### Quantidade de zeros e uns

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT13 | Três zeros e três uns | Linha aceita |
| CT14 | Linha incompleta dentro dos limites | Linha aceita |
| CT15 | Mais de três zeros | Linha rejeitada |
| CT16 | Mais de três uns | Linha rejeitada |

### Números consecutivos

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT17 | Linha sem três números iguais consecutivos | Linha aceita |
| CT18 | Três zeros consecutivos | Linha rejeitada |
| CT19 | Três uns consecutivos | Linha rejeitada |
| CT20 | Posições vazias entre os valores | Linha aceita |

### Obtenção de colunas

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT21 | Obter valores de uma coluna | Coluna retornada corretamente |

### Validação das linhas

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT22 | Linhas que respeitam as regras | Linhas aceitas |
| CT23 | Três valores iguais consecutivos | Linhas rejeitadas |
| CT24 | Quantidade excessiva de zeros | Linhas rejeitadas |

### Validação das colunas

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT25 | Colunas que respeitam as regras | Colunas aceitas |
| CT26 | Três zeros consecutivos | Colunas rejeitadas |
| CT27 | Quantidade excessiva de uns | Colunas rejeitadas |

### Linhas duplicadas

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT28 | Linhas completas diferentes | Linhas aceitas |
| CT29 | Linhas completas idênticas | Tabuleiro rejeitado |
| CT30 | Linhas incompletas | Comparação ignorada |

### Colunas duplicadas

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT31 | Colunas completas diferentes | Colunas aceitas |
| CT32 | Colunas completas idênticas | Tabuleiro rejeitado |
| CT33 | Colunas incompletas | Comparação ignorada |

### Validação geral do tabuleiro

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT34 | Tabuleiro que respeita todas as regras | Tabuleiro aceito |
| CT35 | Tabuleiro com valores inválidos | Tabuleiro rejeitado |
| CT36 | Tabuleiro com tamanho inválido | Tabuleiro rejeitado |

### Verificação do preenchimento

| Nº | Caso | Resultado esperado |
|---|---|---|
| CT37 | Tabuleiro completamente preenchido | Tabuleiro identificado como completo |
| CT38 | Tabuleiro incompleto | Tabuleiro identificado como incompleto |
| CT39 | Tabuleiro completo que viola as regras | Tabuleiro rejeitado |