import { Category } from "../../entity/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../interface/ICategoriesRepository";

import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private static INSTANCE: CategoriesRepository;

  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log("repositorie", this.repository);
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
