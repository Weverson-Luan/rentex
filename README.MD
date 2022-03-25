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
