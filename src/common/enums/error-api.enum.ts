export enum ClienteErrorApiEnum {
  NaoEncotrado = 'Cliente não encontrado',
  CpfJaCadastrado = 'CPF inserido já está em uso',
  EmailJaCadastrado = 'E-Mail inserido já está em uso',
}

export enum CidadeErrorApiEnum {
  NaoEncotrado = 'Cidade não encontrado',
  CidadeJaCadastrada = 'Já possui uma cidade com esse nome',
}
