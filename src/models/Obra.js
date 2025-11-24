
export default class Obra {
    constructor({ id, altura, largura, comprimento, tipo, custo = 0, materiais = [] }) {
    this.id = id
    this.altura = altura
    this.largura = largura
    this.comprimento = comprimento
    this.tipo = tipo
    this.custo = custo
    this.materiais = materiais
  }
}

