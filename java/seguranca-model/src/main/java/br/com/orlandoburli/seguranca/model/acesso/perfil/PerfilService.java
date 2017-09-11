package br.com.orlandoburli.seguranca.model.acesso.perfil;

import java.util.List;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.acesso.perfil.exceptions.PerfilDuplicadoException;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

public class PerfilService extends AbstractService<UUID, Perfil, PerfilDao> {

	@Override
	public void doAntesSalvar(Perfil vo) throws BusinessException {
		if ((vo.getAtivo() != null) && vo.getAtivo().equals(Status.ATIVO) && (vo.getNome() != null) && !vo.getNome().trim().isEmpty()) {
			List<Perfil> buscarPorNome = this.getDao().buscarPorNome(vo.getNome(), (Empresa) vo.getEmpresa(), Status.ATIVO);

			if (buscarPorNome.size() > 0) {
				for (Perfil vo2 : buscarPorNome) {
					if (vo2 != null) {
						if ((vo.getId() == null) || !vo2.getId().equals(vo.getId())) {
							throw new PerfilDuplicadoException(vo);
						}
					}
				}
			}
		}

		super.doAntesSalvar(vo);
	}
}