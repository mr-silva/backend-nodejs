# Backend Node.js 

### Desafio 
Desenvolver uma solução em formato de API com a utilização de node.js e Typescript.
 

### Como utilizar  

Para iniciar você deve instalar as dependências:
```zsh
foo@bar:~$ npm i
ou
foo@bar:~$ yarn
```

Em seguida você poderá executar exemplos de utilização do sistema criado através do comando:
```zsh
foo@bar:~$ npm run dev
ou
foo@bar:~$ yarn dev
```  


### Rotas da aplicação

Abaixo uma breve explicação de como utilizar as rotas disponíveis na aplicação:

- **`POST /accounts`**: A rota deve receber `accountType` e `balance` dentro do corpo da requisição, sendo `accountType` o tipo da conta, que deve ser `savings` para Conta Poupança e `current` para Conta Corrente. Para cadastrar uma nova conta, o corpo da requisição deve ser enviado no seguinte formato :

```json
{
  "accountType": "savings",
  "balance": 500
}
```


- **`POST /transactions`**: A rota deve receber `accountId`, `operation` e `value`, sendo `accountId` o id da conta que para realizar a transação. O campo `operation` é o tipo de transação, que deve ser `deposit` para depósitos e `withdraw` para saques. Para cadastrar uma nova transação, o corpo da requisição deve ser enviado no seguinte formato:

```json
{
  "accountId": "020ab0e5-3f0a-44a6-99ae-43db9a9b2f68",
  "operation": "deposit",
  "value": 1000
}
```

- **`GET /accounts/transactions/:id`**: A rota deve receber `id` como parâmetro, sendo `id` o id da conta.  Essa rota deve retornar uma listagem com todas as transações realizadas em uma conta no seguinte formato.

```json
{
  "id": "020ab0e5-3f0a-44a6-99ae-43db9a9b2f68",
  "balance": 1749.7,
  "accountType": "current",
  "transactions": [
    {
      "id": "4f356759-a0aa-42cb-8cee-8b8d7acc7453",
      "accountId": "020ab0e5-3f0a-44a6-99ae-43db9a9b2f68",
      "value": 1150,
      "operation": "deposit",
      "date": "2020-06-19T16:17:19.943Z"
    },
    {
      "id": "820f0e1c-7ac2-4fbf-a186-15d4ca5409bf",
      "accountId": "020ab0e5-3f0a-44a6-99ae-43db9a9b2f68",
      "value": 1150,
      "operation": "deposit",
      "date": "2020-06-19T16:17:26.842Z"
    },
    {
      "id": "ee629797-b755-498a-a9c9-eb23db31aeae",
      "accountId": "020ab0e5-3f0a-44a6-99ae-43db9a9b2f68",
      "value": 550,
      "operation": "withdraw",
      "date": "2020-06-19T16:17:49.536Z"
    }
  ]
}
``` 

### Especificação dos testes

Em cada teste, tem uma breve descrição do que foi testado ao longo do desenvolvimento dessa API.

- **`should be able to create a new account`**: Deve criar uma nova conta.

- **`should not be able to create new account with invalid account type`**: Não deve criar uma nova conta com o tipo inválido.

- **`should not be able to create new account with negative balance`**: Não deve criar uma conta com saldo inicial sendo negativo.

- **`should be able to list one account`**: Deve listar uma conta.

- **`should be able to update account balance`**: Deve atualizar o saldo da conta.

- **`should be able to create a new transaction`**: Deve realizar uma nova transação.

- **`should not be able to create a new transaction for invalid account`**: Não deve realizar uma transação para em uma conta inválida.

- **`should not be able to create a new transaction with invalid operation`**: Não deve realizar uma nova transação com tipo de operação inválido.

- **`should not be able to create a new transaction with invalid value`**: Não deve realizar uma nova transação com valor inválido.

- **`should not be able to exceed withdraw value`**: Valor de saque não deve exceder B$ 600.

- **`should be able increase account balance on a deposit`**: Deve atualizar o saldo da conta ao realizar um depósito.

- **`should be able decrease account balance on a withdraw`**: Deve atualizar o saldo da conta ao realizar um saque.

- **`should not be able withdraw value when account has insuficient funds`**: Não deve executar um saque quando a conta possui saldo insuficiente.
