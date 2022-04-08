import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { ICategoriesRepository } from "../../repositories/interface/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}


@injectable() //fazendo que nossoa clasee seja injetada por depedência
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository') //fazendo injeção de depedência
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {

    const cateogryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (cateogryAlreadyExists) throw new AppError("Category already exists", 404);

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
