export default function fetchWrapper(input: Request | string, init?: RequestInit): Promise<Response>{
   return fetch(input, init);
}