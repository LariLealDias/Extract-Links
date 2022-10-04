import chalk from 'chalk';
import fs from 'fs';
import getFile from "./index.js";
import validateList from './http-validacao.js';

const path = process.argv;

async function printList(validates, result, identifier = ''){
    if(validates){
        console.log(
            chalk.yellow('lista validada'), 
            chalk.black.bgGreen(identifier),
            await validateList(result));
    }else{
        console.log(
            chalk.yellow('lista de links'), 
            chalk.black.bgGreen(identifier),
            result);
    }
}

async function processText(argumentos){
    const path = argumentos[2];
    const validates = argumentos[3] === 'valida';

    try{
        fs.lstatSync(path);
    } catch(erro){
        if(erro.code === 'ENOENT'){
            console.log(chalk.red('diretorio inexistente'));
            return;
        }
    }

    if(fs.lstatSync(path).isFile()){
        const result = await getFile(argumentos[2]);
        printList(validates, result);
    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`)
            printList(validates, list, fileName);
        })
    }
}

processText(path);
