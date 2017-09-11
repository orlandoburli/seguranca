package br.com.orlandoburli.seguranca.model.cadastros.torre;

import java.util.List;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.torre.exceptions.TorreDuplicadaException;
import br.com.orlandoburli.seguranca.model.enums.Status;

public class TorreService extends AbstractService<UUID, Torre, TorreDao> {

	@Override
	public void doAntesSalvar(Torre vo) throws BusinessException {
		if ((vo.getAtivo() != null) && vo.getAtivo().equals(Status.ATIVO) && (vo.getNome() != null)) {
			List<Torre> buscarPorNome = this.getDao().buscarPorNome(vo.getNome(), Status.ATIVO);

			if (buscarPorNome.size() > 0) {
				for (Torre vo2 : buscarPorNome) {
					if (vo2 != null) {
						if ((vo.getId() == null) || !vo2.getId().equals(vo.getId())) {
							throw new TorreDuplicadaException(vo);
						}
					}
				}
			}
		}

		super.doAntesSalvar(vo);
	}
}
