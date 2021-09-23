# Cadastro de Carro

*** RF ***
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

*** RN ***
Não deve ser possível cadastrar um carro com uma placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado
O carro dever ser cadastrado com disponibilidade por padrão
O usuário responsável pelo cadastro deve ser um administrador

# Listagem de Carros

*** RF ***
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pela marca
Deve ser possível listar todos os carros disponíveis pela categoria
Deve ser possível listar todos os carros disponíveis pelo nome do carro
*** RN ***
O usuário não precisa está logado no sistema

# Cadastro de Especificação no carro

*** RF ***
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

*** RN ***
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação que já existe para um carro


# Cadastro de Imagens
*** RF ***
Deve ser possível cadastrar imagem do carro
Deve ser possível listar todos os carros

*** RNF ***
Utilizar o multer para upload dos arquivos

*** RN ***
O usuário pode cadastrar mais de uma imagem no carro
O usuário do cadastro de imagens deve ser admin

# Aluguel de Carros

*** RF ***
Deve ser possível listar todos os carros disponíveis
Deve ser possível caadastrar um aluguel
*** RNF ***

*** RN ***
O aluguel deve ter a duração mínima de 24 horas
Não deve ser possível cadastrar um novo aluguel para exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel para exista um aberto para o mesmo carro