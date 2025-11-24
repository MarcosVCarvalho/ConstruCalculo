import MaterialRepository from '@/repositories/MaterialRepository';
import Material from '@/models/Material';

class MaterialService {
  async getAll() {
    return MaterialRepository.getAll();
  }

  async getById(id) {
    return MaterialRepository.findById(id);
  }

  async create(data) {
    const material = new Material(
      null,
      data.nome,
      data.categoria,
      parseFloat(data.precoUnitario) || 0,
      data.unidadeMedida || 'un',
      data.imagem
    );
    return MaterialRepository.add(material);
  }

  async update(id, data) {
    const material = new Material(
      id,
      data.nome,
      data.categoria,
      parseFloat(data.precoUnitario),
      data.unidadeMedida
    );
    return MaterialRepository.update(id, material);
  }

  async delete(id) {
    MaterialRepository.delete(id);
  }
}

export default new MaterialService();