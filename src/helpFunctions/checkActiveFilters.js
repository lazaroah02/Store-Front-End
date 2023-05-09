const pathExcluded = ["/products/", "/products", "/", ""]
export function checkActiveFilters(pathname) {
  let listOfFilters = [];
  if (pathExcluded.indexOf(pathname) === -1) {
    
    let separatedPathName = pathname.split("&");
    let firstPartOfPathName = separatedPathName[0].split("/");
    separatedPathName[0] = firstPartOfPathName[2];
    
    for (let i = 0; i < separatedPathName.length; i++) {
      if (
        !separatedPathName[i].endsWith("=") &&
        !separatedPathName[i].includes("page")
      ) {
        listOfFilters.push({
          filter: separatedPathName[i].split("=")[0],
          value: separatedPathName[i].split("=")[1],
        });
      }
    }
  }
  return listOfFilters;
}
