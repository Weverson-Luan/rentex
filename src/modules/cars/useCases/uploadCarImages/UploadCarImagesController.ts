import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";


interface IFiles {
  filename: string;
}

class UploadCarImagesController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id} = request.params;
    const images = request.files as IFiles[] //aqui vamos pegar a image inteira
    const uploadCarImages = container.resolve(UploadCarImagesUseCase);

    //vamos pegar o pah das image e salva so path
    const images_name = images.map((file)=> file.filename);

    //agora vamos salvar de fato
    const carImages = await uploadCarImages.execute({
      car_id: id,
      images_name
    });

    return response.status(201).json(carImages);
  }

};

export { UploadCarImagesController }