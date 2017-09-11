package br.com.orlandoburli.seguranca.model.cadastros.morador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.utils.StringUtils;

public class MoradorService extends AbstractService<UUID, Morador, MoradorDao> {

	@Override
	public void doAntesSalvar(Morador vo) throws BusinessException {
		super.doAntesSalvar(vo);

		vo.getPessoa().setCpf(StringUtils.filtrarNumero(vo.getPessoa().getCpf()));

		vo.getPessoa().setFone1(StringUtils.filtrarNumero(vo.getPessoa().getFone1()));
		vo.getPessoa().setFone2(StringUtils.filtrarNumero(vo.getPessoa().getFone2()));

		vo.getPessoa().setCelular1(StringUtils.filtrarNumero(vo.getPessoa().getCelular1()));
		vo.getPessoa().setCelular2(StringUtils.filtrarNumero(vo.getPessoa().getCelular2()));

		vo.getPessoa().setNome(StringUtils.removerAcentos(vo.getPessoa().getNome()));

		vo.getPessoa().setCidade(StringUtils.removerAcentos(vo.getPessoa().getCidade()));
		vo.getPessoa().setComplemento(StringUtils.removerAcentos(vo.getPessoa().getComplemento()));
		vo.getPessoa().setBairro(StringUtils.removerAcentos(vo.getPessoa().getBairro()));
	}

	public List<Morador> consultaGenerica(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		return this.getDao().consultaGenerica(filtros, pageSize, pageNumber, order);
	}

	public Integer consultaGenericaTotal(HashMap<String, String> filtros) {
		return this.getDao().consultaGenericaTotal(filtros);
	}

	public List<Morador> buscarPorNome(String filtroNome, Integer idUnidade, Integer pageSize, Integer pageNumber) {
		if ((pageSize == null) || (pageSize > 10)) {
			pageSize = 10;
		}
		if (pageNumber == null) {
			pageNumber = 1;
		}
		return this.getDao().consultaPorNome(filtroNome, idUnidade, pageSize, pageNumber);
	}

	public Integer totalPorNome(String filtroNome, Integer idUnidade) {
		return this.getDao().totalPorNome(filtroNome, idUnidade);
	}
}