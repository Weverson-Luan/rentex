import { parse as csvParse } from "csv-parse";
import fs from "fs"; // modo nativo do node = file system
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/interface/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); // essa função que permite a leitura do arquivo em parter

      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile); // o pipe pega oq esta sendo lido do stream e joga para o lugar q a gente determinar

      parseFile
        .on("data", async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path); // remove o arquivo upload da pasta tmp
          resolve(categories);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
   

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };