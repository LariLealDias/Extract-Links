
function getLinks(arrLinks){
    return arrLinks.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(arrURLs){
    const arrStatus = await Promise.all(
        arrURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status; 
            }catch(erro){
                return handleErro(erro);
            }
        })
    )
    return arrStatus;
}

function handleErro(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';
    }else{
        return 'Ocorreu um erro';
    }
}

export default async function validateList(linksList){
    const  links = getLinks(linksList);
    const status = await checkStatus(links);
    return linksList.map((object, i) => ({
        ...object,
        status: status[i]
    }));
}
