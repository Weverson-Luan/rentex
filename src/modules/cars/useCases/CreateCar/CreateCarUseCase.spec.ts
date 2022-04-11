import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/CreateCar/CreateCarUseCase"
import { AppError } from "@shared/infra/http/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;


describe("Criação de um Carro", ()=> {

  beforeEach(()=> {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })
  it("Deve Cria um novo Carro",async ()=> {
  const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand Car",
      license_plate: "EGF-4098",
      category_id: "id_fake"
    });

    expect(car).toHaveProperty("id")
  })

  it("Não deve ser capaz de criar um carro com placa existente",async ()=> {
   expect(async ()=> {
    await createCarUseCase.execute({
      name: "Name Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand Car",
      license_plate: "EGF-4098",
      category_id: "id_fake"
    });

    await createCarUseCase.execute({
      name: "Name Car2",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand Car",
      license_plate: "EGF-4098",
      category_id: "id_fake"
    })
   }).rejects.toBeInstanceOf(AppError);
  })


  it("Deve ser capaz de criar um carro com available true disponível por padrão",async ()=> {
 
    const car = await createCarUseCase.execute({
       name: "Car Available",
       description: "Description Car",
       daily_rate: 100,
       fine_amount: 60,
       brand: "Brand Car",
       license_plate: "EGK-4098",
       category_id: "id_fake",
      available: true,
    });

    //eu espero que meu carro
    expect(car.available).toBe(true)


   })
})