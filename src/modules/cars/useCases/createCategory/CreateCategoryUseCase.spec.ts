import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/inMemory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
//descrição do meu teste em si.
describe("Criar uma categoria ", ()=> {

  //ANTES DE QUALQUER COISA ELE EXECUTARA O BEFOREEACH.
  beforeEach(()=> {
    //vamos instância nossas classes
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory(); 
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  //ESPERO QUE SEJA CRIANDO UMA CATEGORIA.
  it("Eu espero criar uma nova categoria.", async ()=> {
    const category = {
      name: "Luan Teste",
      description: "Description teste."
    }
    await createCategoryUseCase.execute({
     name: category.name,
     description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    //agora de fato e oque eu espero que minha função retorna.
    expect(categoryCreated).toHaveProperty("id"); // espero que minha categoryCreated tenha a propiedade ID.
  });


  // ESPERO QUE NÃO SEJA CRIANDO CATEGORIA COM NOME EXITENTE. 
  it("Eu espero que não seja criada uma categoria com o nome exitente.", async ()=> {
    expect(async ()=> {
      const category = {
        name: "Luan Teste",
        description: "Teste 1234"
      }
      // CRIAMOS A PRIMEIRA VEZ, DEVE PASSAR NORMAL
      await createCategoryUseCase.execute({
       name: category.name,
       description: category.description
      });
  
      // CRIAMOS A SEGUNDA VEZ, DEVE DA ERROR.
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
       })
    }).rejects.toBeInstanceOf(AppError);

    // // FAZENDO A BUSCAR PARA VER SE TEM ALGUMA CATEGORIE COM O NOME QUE ESTOU TENTANDO CRIAR.
    // const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
   
    
    // // OQUE ESPERO DO MEU TESTE.
    // expect(categoryCreated).toHaveProperty("id"); // espero que minha categoryCreated tenha a propiedade ID.

  })
})