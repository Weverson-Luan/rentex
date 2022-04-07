import fs from 'fs'; //para trabalharmos com arquivo

export const deletedFile = async (filename: string)=> {
  try {
    //ele responsanvel por verificar se o arquivo existe.
    await fs.promises.stat(filename);

  } catch{
    return;
  }
  //ele responsanvel por remover o arquivo
  await fs.promises.unlink(filename);
}