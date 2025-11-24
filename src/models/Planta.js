export class Planta {
  constructor({
    id,
    nome,
    descricao,
    areaConstruida,
    tipo = 'residencial',
    imagemUrl = '',
    layoutUrl = '', // PDF/SVG/DWG preview
    especificacoes = {}
  }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.areaConstruida = areaConstruida; // m²
    this.tipo = tipo;
    this.imagemUrl = imagemUrl;
    this.layoutUrl = layoutUrl;
    this.especificacoes = {
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      pavimentos: 1,
      ...especificacoes
    };
  }
}