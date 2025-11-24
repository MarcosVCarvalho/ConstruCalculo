import { useObras } from '@/composable/useObras'
import ObraService from '@/services/ObraService'
import Obra from '@/models/Obra'

const obras = useObras()

const ObraController = {
  listar: async() => {
    return await Obra.getAll();
  },

  salvar: async (dados) => {
    if (!dados) throw new Error('Dados são obrigatórios')
    
    try {
      const novaObra = new Obra ({
        id: dados.id ?? Date.now(),
        ...dados
      });
      const obraCalculada = ObraService.calcularMateriais(novaObra);

      await obras.save(obraCalculada);
      return obraCalculada;
    } catch (error) {
      console.error('Erro ao salvar obra', error);
      throw error;
    }
  },
  

  findById: async (id) => {
    if (!id) return;

    const listar = await ObraService.listarObras();
    return listar.find(o => String(o.id) === String(id));
  },

  atualizar: async (obraAtual) => {
    if (!obraAtual || !obraAtual.id) {
      throw new Error('Obra inválida para atualização');
    }

    const camposObrigatorios = ['altura', 'largura', 'comprimento', 'custoPorMetroCubico'];
    
    const invalido = camposObrigatorios.some(campo => {
      const valor = obraAtual[campo];
      return valor == null || valor < 0;
    });

    if (invalido) {
      throw new Error('Preencha todos os campos com valores válidos (≥ 0).');
      
    }

    try {
      const obraCalculada = ObraService.calcularMateriais(obraAtual);
      await obras.update(obraAtual.id, obraCalculada); 

      return obraCalculada;
    } catch (error) {
      console.error('Erro ao atualizar obra:', error);
      throw error;
    }
  },

  excluir: async (id) => {
    if (id == null) return false;
    return await obras.remove(id); 
  }
};

export default ObraController

