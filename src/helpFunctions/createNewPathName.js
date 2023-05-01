/*
This function take the actual pathname ej. /products/categoria=1&precio=100 and introduce a new filter to the url 
separating the pathname by '&', searching the filter in the array, replacing the value of the filter and 
returning the new url to use with navigate() by example.
Flujo: /products/categoria=1&precio=100  -> ['/products/categoria=1', 'precio=100'] -> agrego o remplazo por nuevo filtro -> retorno nueva url
*/
export function createNewPathName(pathname, filterName, filterValue){
    if (!pathname.includes(filterName)){ //si el filtro no esta en la ruta actual 
        if(pathname.endsWith("products/")){
            return `${pathname}${filterName}=${filterValue}`
        }
        if(pathname.endsWith("products")){
            return `${pathname}/${filterName}=${filterValue}`
        }
        return `${pathname}&${filterName}=${filterValue}`
    }else{
        let separatedPathname = pathname.split("&")
        if(separatedPathname[0].includes(`${filterName}=`)){
            separatedPathname[0] = `/products/${filterName}=${filterValue}`
        }
        else{
            for (let i = 0; i < separatedPathname.length; i++){
                if(separatedPathname[i].includes(`${filterName}=`)){
                    separatedPathname[i] = `${filterName}=${filterValue}`
                }
            }
        }
        return separatedPathname.join("&")
    }
}