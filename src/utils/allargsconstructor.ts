export function AllArgsConstructor(constructor: any) {
  const functionString:string = constructor.toString();
  const params = GetArgumentNames(functionString);
  
  const newConstructor: any = function (...args:[]) {
      const newObj = new constructor(args);
      params?.map((param, index) => newObj[param] = args[index]);     
      return newObj;
  }

  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}
const RegExInsideParentheses = /[(][^)]*[)]/;
const RegExParenthesesAndSpaces = /[()\s]/g;
const GetArgumentNames = (functionString: string): string[] | null => {
  const match = RegExInsideParentheses.exec(functionString);
  if (match) {
      return match[0].replace(RegExParenthesesAndSpaces, "").split(',').map(str => str.trim());
  }
  return null;
};
