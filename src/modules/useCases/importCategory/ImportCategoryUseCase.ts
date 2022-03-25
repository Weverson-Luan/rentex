import { parse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../cars/repositories/interface/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categorieRepository: ICategoriesRepository) {}

  readCategory(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); //metodo para fazer leitura,  ele precisa do path do arquivo
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile); //para cada pedaço do arquivo lido agente emcaminha para onde quirsemos.

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        }) // aqui recebe a linhas do nosso aquivo para ele esta fazer a leitura corretamente
        .on("end", () => {
          fs.promises.unlink(file.path); //cara responsavel por remover um arquivo
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });

      return categories;
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.readCategory(file);

    // categories.map(async (category) => {
    //   const { name, description } = category;

    //   const existCategory = this.categorieRepository.findByName(name);

    //   if (!existCategory) {
    //     this.categorieRepository.create({
    //       name,
    //       description,
    //     });
    //   }
    // });
    return;
  }
}

export { ImportCategoryUseCase };
