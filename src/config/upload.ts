import multer from "multer";
import { resolve } from 'path';
import crypt from 'crypto';


export default {
  upload(folder: string){

    return {
      //onde vai ser salvo nosso arquivo.
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          //gerar uma criptografia do tipo hex para quando
          //salvamos um arquivo não termos um file duplicado
          const fileHash = crypt.randomBytes(16).toString("hex");

          //vamos concatenar o hash com o arquivo original
          const fileName = `${fileHash}-${file.originalname}`;

          //retorna callback 1.Null -> 2.FileName
          return callback(null, fileName);
        }
      })
    }
  }
}