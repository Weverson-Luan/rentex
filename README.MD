## INTRODUÇÃO AO TYPESCRIPT

[x] Uma linguagem open-source da Microsoft.

[x] Superset do Javascript.

[x] Tipagem estática ao seu código.

## POR QUE USAR O TYPESCRIPT

 Sem o typescript quando esse obejto for se intânciado,  não iremos saber os tipo de dados que esse obejeto recebe
const usuario = {
  name: "Luan",
  username: "Dev",
  document: "2223333"
}

[x]  Usuarios.
[x]  Uma carro relacionado a uma categoria
[x]  Imagens  relacionado a um carro
[x]  Especificações de um carro
[x]  Agendamento relacionado a usuario e ao carr.

# OS PRINCIPIOS DE SOLID

S => SRP - Single Responsability Principle (Principio de Reponsabilidade Única)
O => OCP - Open-Closed  Principle (Principio aberto/fechado)
L => LSP - Liskov Substituion Principle (Principio de Substituição de Liskov)
I => ISP - Interface Segegation Principle (Principio da Segregação de interface)
D => DIP - Dependency Inversion Principle (Principio da Inversão de Depedência)

### Module

-pequenos blocos da nossa aplicaçaõ.

## Fazendo Leitura de arquivos

Read-File => esse cara quando recebe um arquivoo de 1000 linhas e ai nosso arquivo desse tamanho nossa aplicação começa a fica pesado e o read-file quando esse cara vai ler um arquivo ele não ler por parte e sim de uma vez pensa tivermos um aquivos de 1000mil linhas e ele ler isso de uma vez nossa aplicação pode ate travar por que começar consumir muito memoria do nosso servidor. e por isso para essa leitura ser agradavel vamos utilizar  o conceito de Streen e esse conceito podemos dizer que ele e o mesmo de ler o arquivo por partes por exemplo quando usuario solicita um arquivo vamos mandando o arquivos aos pocos para nosso cliente.

## Documentação com Swagger-UI-Express

Para começar vamos ate ao nosso projeto no arquivo app.ts vamos importar o swagger-ui-express.
Agora iremos criar tipo um server(servidor) para rodar nossa documentação

yarn add swagger-ui-express
yarn add @types/swagger-ui-express


## TSyringe
T Seringa
Um contêiner leve de injeção de dependência para TypeScript/JavaScript para injeção de construtor.

link => https://github.com/microsoft/tsyringe



# TESTES COM JEST 

1. Criação de categoria
   a. Devo Cria uma uma nova categoria
   b. Não devo cria uma categoria com o mesmo nome exitente.

2. Autenticação de usuário
   a. Devo fazer autenticação de um usuário.
    1. preciso ter um usuário criando antes de fazer minha autenticação.
    2. preciso verificar se o usuário e exitente e se tem na minha base.
    3. preciso saber se a senha que o usuário esta madando estão corretas. 
   


## TRABALHAR COM DATAS 
yarn add dayjs




## TABALHAR COM TESTE DE INTEGRAÇÃO 
yaarn add supertest / @types/supertest





