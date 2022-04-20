 async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = await this.repository
          .createQueryBuilder("cars")
          .where("available = :available", { available: true });

      //quando o campo brand vier preenchido iremos fazer outra busca
      if(brand){
        carsQuery.andWhere("cars.brand = :brand", { brand });
      };
      //quando o campo name vier preenchido iremos fazer outra busca
      if(name){
        carsQuery.andWhere("cars.name = :name", { name });
      };
      //quando o campo category_id vier preenchido iremos fazer outra busca
      if(category_id){
        carsQuery.andWhere("cars.category_id = :category_id", { category_id });
      };

      //para realmente de conseguirmos rodar nosso builder
      const cars =  await carsQuery.getMany();

      return cars;
  }