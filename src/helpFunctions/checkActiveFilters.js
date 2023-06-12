const pathExcluded = ["/products/", "/products", 
                      "/", "", 
                      "/process-pay", "/process-pay/", 
                      "/contact", "/contact/", 
                      "/about-us", "/about-us/"]

export function checkActiveFilters(pathname) {
  let listOfFilters = [];
  if (pathExcluded.indexOf(pathname) === -1) {
    
    let separatedPathName = pathname.split("&");
    let firstPartOfPathName = separatedPathName[0].split("/");
    separatedPathName[0] = firstPartOfPathName[2];
    
    for (let i = 0; i < separatedPathName.length; i++) {
      if (
        !separatedPathName[i].endsWith("=") 
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
