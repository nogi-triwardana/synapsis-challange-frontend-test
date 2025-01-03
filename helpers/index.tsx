export function addProp<T extends object, K extends PropertyKey, V>(
  obj: T,
  key: K,
  value: V
): asserts obj is T & { [P in K]: V } {
  Object.assign(obj, { [key]: value });
}

export function getBaseUrl() {
  const env = process.env.NEXT_PUBLIC_CYPRESS_ENV;
  
  switch(env) {
    case 'production':
      return 'https://synapsis-challange-frontend-test.vercel.app/';
    default:
      return 'http://localhost:3000';
  }
}