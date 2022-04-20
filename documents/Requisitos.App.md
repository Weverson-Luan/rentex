
**REQUISITOS FUNCTIONAIS** => Requisitos Funcionais 

0. São as funcionalidades que a aplição vai ter segue alguns exemplo..
  1. Fazer um cadastro de uma nova categorie
  2. Usuário vai poder recuperar a senha do seu acesso casa esqueça/perda.
  3. Listar informações de um usuário.


# Cadastro de carro.
  1. Deve ser possível cadastrar um novo carro.
  2. Deve ser possível listar todas as categorias.

# Listagem de carros.
  1. Deve ser possível listar todos os carros disponiveis.
  2. Deve ser possível listar todos os carro disponiveis pelo nome da categoria.
  3. Deve ser possível listar todos os carros disponiveis pelo nome da marca.
  4. Deve ser possível listar todos os carros disponiveis pelo nome da carro.

# Listagem de Especificações do carro.
  1. Deve ser possível listar todas as especificações de carros.
  2. Deve ser possível listar todas os carros.

# Cadastro de images do carro.
  1. Deve ser possível cadastrar image do carro.
  2. Deve ser possivel listar todos os carros.  

# Agendamento de um carro (aluguel).
  1. Deve ser possível cadastar(agendamento) um aluguel.


**REGRA DA APLICAÇÃO** => Regra de negócio.
  1. São ações que o usuário ira executar 

# Cadastro de carro.
  0. Apenas usuário com regra de (admin), deve cadastrar um carro.
  1. Não deve ser possível cadastrar um com uma placa já exitente.
  2. Não deve ser possível alterar uma placa de uma carro já exitente.
  3. O carro deve ser cadastrado, como disponivel por padrão.

# Listagem de carros
  0. Usuário não precisa estar logado no sistema para ver os carros disponiveis.

# Cadastro de Especificações do carro
  0. Não deve ser possível cadastrar uma especificação para um carro não existente.
  1. Não deve ser possível cadastrar uma especificação ja exitente para o mesmo carro.
  2. Apenas usuário com regra de (admin), deve cadastrar uma especificação de um carro.

# Cadastro de images do carro
  0. Usuário deve poder cadastrar mais de uma image para o mesmo carro.
  1. Apenas usuário com regra de (admin), deve cadastrar uma especificação de um carro.

# Cadastro de Agendamento de um carro.
  0. O aluguel deve ter duração minima de 24 hora.
  1. Não deve ser possível cadastrar um novo agendamento caso ja tem alguma ag.. em  aberto para o mesmo usuário.
  2. Não deve ser possível cadastrar um novo agendamento caso ja tem alguma ag.. em  aberto para o mesmo carro.
  3. Deve ser possível realizar a devolução de um carro.
  4. Ao realizar o agendamento de um carro, o status deverá ser alterado para indisponivel.
  5. Caso horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa propocional aos dias de atraso.
  6. Caso tenha multa , deverá se cobrado e somado junto ao total do aluguel.
  7. Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa