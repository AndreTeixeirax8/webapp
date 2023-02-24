export enum CidadeErrorApiEnum {
  NaoEncotrado = 'Cidade não encontrada',
  CidadeJaCadastrada = 'Já possui uma cidade com esse nome',
}

export enum UfErrorApiEnum {
  NaoEncotrado = 'Unidade federal não encontrada',
  UfJaCadastrada = 'Já possui uma unidade federal com esse nome',
}

export enum UserErrorApiEnum {
  NaoEncotrado = 'Usuário não encontrado',
  CpfJaCadastrado = 'CPF inserido já está em uso',
  EmailJaCadastrado = 'E-Mail inserido já está em uso',
}

export enum ProdutoErrorApiEnum {
  NaoEncotrado = 'Produto não encontrado',
  ProdutoJaCadastrado = 'Já possui um produto com esse nome',
}
