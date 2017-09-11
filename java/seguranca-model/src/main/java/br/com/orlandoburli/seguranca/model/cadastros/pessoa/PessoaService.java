package br.com.orlandoburli.seguranca.model.cadastros.pessoa;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.utils.StringUtils;

public class PessoaService extends AbstractService<UUID, Pessoa, PessoaDao> {

	@Override
	public void doAntesSalvar(Pessoa vo) throws BusinessException {
		super.doAntesSalvar(vo);

		vo.setCpf(StringUtils.filtrarNumero(vo.getCpf()));

		vo.setFone1(StringUtils.filtrarNumero(vo.getFone1()));
		vo.setFone2(StringUtils.filtrarNumero(vo.getFone2()));

		vo.setCelular1(StringUtils.filtrarNumero(vo.getCelular1()));
		vo.setCelular2(StringUtils.filtrarNumero(vo.getCelular2()));

		vo.setCidade(StringUtils.removerAcentos(vo.getCidade()));
		vo.setComplemento(StringUtils.removerAcentos(vo.getComplemento()));
		vo.setBairro(StringUtils.removerAcentos(vo.getBairro()));
	}

	public List<Pessoa> consultaGenerica(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		return this.getDao().consultaGenerica(filtros, pageSize, pageNumber, order);
	}

	public Integer consultaGenericaTotal(HashMap<String, String> filtros) {
		return this.getDao().consultaGenericaTotal(filtros);
	}

	@Override
	public void doAntesInserir(Pessoa vo) throws BusinessException {
		super.doAntesInserir(vo);

		vo.setDataCadastro(Calendar.getInstance());
	}

	@Override
	public void doAntesAtualizar(Pessoa vo) throws BusinessException {
		super.doAntesAtualizar(vo);

		vo.setDataAtualizacao(Calendar.getInstance());
	}
}