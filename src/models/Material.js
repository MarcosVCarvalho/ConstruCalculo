export default class Material {
  constructor(id, nome, categoria, precoUnitario, unidadeMedida, imagem = '') {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.precoUnitario = precoUnitario;
    this.unidadeMedida = unidadeMedida;
    this.imagem = imagem;
  }
}