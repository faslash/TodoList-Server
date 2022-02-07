function handleErrors(code: number, error: string): Object {
  return {
    retorno: {
      codigo: code,
      erro: error 
    }
  }
}

export default handleErrors