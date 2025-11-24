import { useObras } from '@/composable/useObras';
import Obra from '@/models/Obra';

export default function useObraService() {

  const obraStore = useObras();

  const getAll = async () => {
    return await obraStore.getAll();
  };

  const listarObras = () => {
    return obraStore.getAll();
  };

  const findById = (id) => {
    return obraStore.findById(id);
  };

  const create = async (data) => {
    const obra = new Obra(
      null,
      data.nome,
      data.endereco,
      data.dataInicio,
      parseFloat(data.orcamento),
      data.status
    );
    return obraStore.add(obra);
  };

  const update = async (id, data) => {
    const obra = new Obra(
      id,
      data.nome,
      data.endereco,
      data.dataInicio,
      parseFloat(data.orcamento),
      data.status
    );
    return obraStore.update(id, obra);
  };

  const remove = async (id) => {
    return obraStore.remove(id);
  };

  return {
    getAll,
    findById,
    create,
    update,
    remove,
    listarObras
  };
}