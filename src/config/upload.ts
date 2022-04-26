import multer from "multer";
import { resolve } from 'path';
import crypt from 'crypto';

const tmpFolder =  resolve(__dirname, '..', '..', "tmp")

export default {
  tmpFolder,
 //onde vai ser salvo nosso arquivo.
  storage: multer.diskStorage({
    destination: tmpFolder,
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