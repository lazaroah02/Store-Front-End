export function checkActiveFilters(pathname){
    let separatedPathName = pathname.split("&")
    let firstPartOfPathName = separatedPathName[0].split("/")
    separatedPathName[0] = firstPartOfPathName[2]
    let listOfFilters = []
    for(let i = 0; i < separatedPathName.length; i++){
        if(!separatedPathName[i].endsWith("=")){
            listOfFilters.push(separatedPathName[i].split("=")[0])
        }
    }
    return listOfFilters
}