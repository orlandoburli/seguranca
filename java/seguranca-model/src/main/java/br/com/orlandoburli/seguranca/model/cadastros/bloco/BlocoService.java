package br.com.orlandoburli.seguranca.model.cadastros.bloco;

import java.util.List;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.exceptions.BlocoDuplicadoException;
import br.com.orlandoburli.seguranca.model.enums.Status;

public class BlocoService extends AbstractService<UUID, Bloco, BlocoDao> {

	@Override
	public void doAntesSalvar(Bloco vo) throws BusinessException {
		super.doAntesSalvar(vo);

		if ((vo.getAtivo() != null) && vo.getAtivo().equals(Status.INATIVO)) {
			return;
		}

		if (vo.getNome() == null) {
			return;
		}

		List<Bloco> buscarPorNome = this.getDao().buscarPorNome(vo.getNome(), Status.ATIVO);

		if (buscarPorNome.size() > 0) {
			for (Bloco vo2 : buscarPorNome) {
				if (vo2 != null) {
					if ((vo.getId() == null) || !vo2.getId().equals(vo.getId())) {
						throw new BlocoDuplicadoException(vo);
					}
				}
			}
		}
	}
}
