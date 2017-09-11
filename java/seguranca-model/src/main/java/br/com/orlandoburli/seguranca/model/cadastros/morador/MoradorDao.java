package br.com.orlandoburli.seguranca.model.cadastros.morador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.persistence.TypedQuery;

import org.apache.log4j.Logger;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.core.utils.DaoUtils;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.Unidade;
import br.com.orlandoburli.seguranca.model.enums.Flag;

public class MoradorDao extends AbstractDao<UUID, Morador> {

	@Inject
	private Logger log;

	public List<Morador> consultaPorNome(String filtroNome, Integer idUnidade, Integer pageSize, Integer pageNumber) {
		this.getManager().clear();

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT e.id, pessoa.nome, unidade.numero, pessoa.cpf FROM " + Morador.class.getSimpleName() + " e\n");
		sb.append(" INNER JOIN e.pessoa pessoa \n");
		sb.append(" INNER JOIN pessoa.tipoPessoa tipoPessoa \n");
		sb.append(" INNER JOIN e.unidade unidade \n");
		sb.append(" WHERE 1=1 \n");
		sb.append("  AND tipoPessoa.morador = :p_tipoPessoaMorador \n");

		if (idUnidade != null) {
			sb.append(" AND unidade.id = :p_idUnidade\n");
		}

		this.filtroGenerico(sb);

		sb.append("  ORDER BY pessoa.nome\n");

		TypedQuery<Object[]> query = this.getManager().createQuery(sb.toString(), Object[].class);

		if (filtroNome == null) {
			filtroNome = "";
		}

		query.setParameter("p_filtro", "%" + filtroNome.toUpperCase() + "%");
		query.setParameter("p_tipoPessoaMorador", Flag.SIM);
		if (idUnidade != null) {
			query.setParameter("p_idUnidade", idUnidade);
		}

		if ((pageNumber != null) && (pageSize != null)) {
			query.setMaxResults(pageSize);
			int firstResult = (pageNumber - 1) * pageSize;
			query.setFirstResult(firstResult);
		}

		List<Object[]> list = query.getResultList();

		List<Morador> resultado = new ArrayList<>(list.size());

		for (Object[] object : list) {
			Morador m = new Morador();
			m.setPessoa(new Pessoa());
			m.setUnidade(new Unidade());

			m.setId((UUID) object[0]);
			m.getPessoa().setNome((String) object[1]);
			m.getUnidade().setNumero((String) object[2]);
			m.getPessoa().setCpf((String) object[3]);

			resultado.add(m);
		}

		return resultado;
	}

	public Integer totalPorNome(String filtroNome, Integer idUnidade) {
		this.getManager().clear();

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT COUNT(*) FROM " + Morador.class.getSimpleName() + " e\n");
		sb.append(" INNER JOIN e.pessoa pessoa \n");
		sb.append(" INNER JOIN pessoa.tipoPessoa tipoPessoa \n");
		sb.append(" INNER JOIN e.unidade unidade \n");
		sb.append(" WHERE 1=1 \n");
		sb.append("  AND tipoPessoa.morador = :p_tipoPessoaMorador \n");
		if (idUnidade != null) {
			sb.append(" AND unidade.id = :p_idUnidade\n");
		}

		this.filtroGenerico(sb);

		TypedQuery<Number> query = this.getManager().createQuery(sb.toString(), Number.class);

		if (filtroNome == null) {
			filtroNome = "";
		}

		query.setParameter("p_filtro", "%" + filtroNome.toUpperCase() + "%");
		query.setParameter("p_tipoPessoaMorador", Flag.SIM);
		if (idUnidade != null) {
			query.setParameter("p_idUnidade", idUnidade);
		}

		int count = query.getSingleResult().intValue();

		return count;

	}

	public List<Morador> consultaGenerica(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		this.getManager().clear();

		String filtroGeral = filtros.get("filtroGeral");

		// Substitui espaços por % no like
		if (filtroGeral != null) {
			filtroGeral = "%" + filtroGeral.replace(" ", "%").toUpperCase() + "%";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT e FROM " + Morador.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");
		sb.append("  AND e.pessoa.tipoPessoa.morador = :p_tipoPessoaMorador \n");

		if (filtroGeral != null) {
			this.filtroGenerico(sb);
		}

		// Filtro Genérico
		Map<String, Object> parametros = new HashMap<>();

		String buildWhereStatement = DaoUtils.buildWhereStatement(filtros, this.getVOClass(), parametros);

		sb.append(buildWhereStatement);

		if ((order != null) && (order.size() > 0)) {
			sb.append(" ORDER BY ");
			boolean first = true;
			Iterator<String> iterator = order.keySet().iterator();

			while (iterator.hasNext()) {
				String campo = iterator.next();

				if (!first) {
					sb.append(", ");
				}

				sb.append(campo + " " + order.get(campo));
				first = false;
			}
		}

		this.log.trace(sb);

		TypedQuery<Morador> query = this.getManager().createQuery(sb.toString(), Morador.class);

		if (filtroGeral != null) {
			query.setParameter("p_filtro", filtroGeral);
		}

		// Parametro fixo
		query.setParameter("p_tipoPessoaMorador", Flag.SIM);

		// Seta os parametros da query
		Iterator<String> paramsIterator = parametros.keySet().iterator();

		while (paramsIterator.hasNext()) {
			String paramName = paramsIterator.next();
			this.log.debug("Parametro: " + paramName + " valor: " + parametros.get(paramName));
			query.setParameter(paramName, parametros.get(paramName));
		}

		if ((pageSize != null) && (pageNumber != null)) {
			query.setMaxResults(pageSize);

			int firstResult = ((pageNumber - 1) * pageSize);

			query.setFirstResult(firstResult);

			this.log.debug("Page Number: " + pageNumber);
			this.log.debug("Page Size: " + pageSize);
			this.log.debug("Max results calculados: " + query.getMaxResults());
			this.log.debug("First result calculado: " + query.getFirstResult());
		}

		return query.getResultList();
	}

	public Integer consultaGenericaTotal(HashMap<String, String> filtros) {
		this.getManager().clear();

		String filtroGeral = filtros.get("filtroGeral");

		// Substitui espaços por % no like
		if (filtroGeral != null) {
			filtroGeral = "%" + filtroGeral.replace(" ", "%").toUpperCase() + "%";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT COUNT(*) FROM " + Morador.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");
		sb.append("  AND e.pessoa.tipoPessoa.morador = :p_tipoPessoaMorador \n");

		if (filtroGeral != null) {
			this.filtroGenerico(sb);
		}

		// Filtro Genérico
		Map<String, Object> parametros = new HashMap<>();

		String buildWhereStatement = DaoUtils.buildWhereStatement(filtros, this.getVOClass(), parametros);

		sb.append(buildWhereStatement);

		this.log.trace(sb);

		TypedQuery<Number> query = this.getManager().createQuery(sb.toString(), Number.class);

		// Seta os parametros da query
		Iterator<String> paramsIterator = parametros.keySet().iterator();

		while (paramsIterator.hasNext()) {
			String paramName = paramsIterator.next();
			this.log.debug("Parametro: " + paramName + " valor: " + parametros.get(paramName));
			query.setParameter(paramName, parametros.get(paramName));
		}

		if (filtroGeral != null) {
			this.log.trace("Filtro: " + filtroGeral);
			query.setParameter("p_filtro", filtroGeral);
		}

		// Parametro fixo
		query.setParameter("p_tipoPessoaMorador", Flag.SIM);

		int count = query.getSingleResult().intValue();

		return count;

	}

	private void filtroGenerico(StringBuilder sb) {
		sb.append("   AND (");
		sb.append("      UPPER(pessoa.nome) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.rg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.orgaoRg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.cpf) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.cnh) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.celular1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.celular2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.fone1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.fone2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.endereco) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.bairro) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.complemento) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.cidade) LIKE :p_filtro \n");
		sb.append("   OR UPPER(pessoa.uf) LIKE :p_filtro\n");
		sb.append(")");
	}
}
