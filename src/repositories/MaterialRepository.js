class MaterialRepository {
  static KEY = 'materiais';

  static getAll() {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : [];
  }

  static save(materials) {
    localStorage.setItem(this.KEY, JSON.stringify(materials));
  }

  static add(material) {
    const materials = this.getAll();
    material.id = Date.now(); // Simples ID
    materials.push(material);
    this.save(materials);
    return material;
  }

  static update(id, updatedMaterial) {
    let materials = this.getAll();
    const index = materials.findIndex(m => m.id == id);
    if (index !== -1) {
      materials[index] = { ...materials[index], ...updatedMaterial };
      this.save(materials);
      return materials[index];
    }
    return null;
  }

  static delete(id) {
    let materials = this.getAll();
    materials = materials.filter(m => m.id != id);
    this.save(materials);
  }

  static findById(id) {
    const materials = this.getAll();
    return materials.find(m => m.id == id);
  }
}

export default MaterialRepository;