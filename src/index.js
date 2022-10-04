import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const captureLinks = [...text.matchAll(regex)];
    const results = captureLinks.map(capture => ({[capture[1]]: [capture[2]]}));
    return results.length !== 0 ? results :'Não existe links nesse arquivo';
}

function handleError(erro){
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

async function getFile(filePath){
    try{
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(filePath, encoding);
        return extractLinks(text);
    }
    catch(erro){
        handleError(erro)
    }
}

export default getFile;

