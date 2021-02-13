export const getSubstringsBetween = (str, startDelimiter, endDelimiter) => {
    let contents = [];
    let startDelimiterLength = startDelimiter.length;
    let endDelimiterLength = endDelimiter.length;
    let startFrom = 0;
    let contentStart = 0;
    let contentEnd = 0;
    
    while(false !== (contentStart = strpos(str, startDelimiter, startFrom))) 
    {
        contentStart += startDelimiterLength;
        contentEnd = strpos(str, endDelimiter, contentStart);
        if(false === contentEnd) 
        {
            break;
        }
        contents.push( str.substr(contentStart, contentEnd - contentStart) );
        startFrom = contentEnd + endDelimiterLength;
    }

    return contents;
}
export const strpos = (haystack, needle, offset)  =>
{
    var i = (haystack+'').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}