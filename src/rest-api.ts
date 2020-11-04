interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json() as T;
  } catch (ex) {
    // may error if there is no body
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<T> {
  const response = await http<T>(new Request(path, args));
  if (response.parsedBody) {
    return response.parsedBody;
  }
  throw new Error(`No JSON returned from call to ${path}`);
}

export async function post<T>(
  path: string,
  body: unknown,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}
