package br.com.orlandoburli.seguranca.model.cadastros.pessoa;

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
import br.com.orlandoburli.seguranca.model.enums.Flag;

public class PessoaDao extends AbstractDao<UUID, Pessoa> {

	@Inject
	private transient Logger log;

	public List<Pessoa> consultaGenerica(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		this.getManager().clear();

		String filtroGeral = filtros.get("filtroGeral");

		// Substitui espaços por % no like
		if (filtroGeral != null) {
			filtroGeral = "%" + filtroGeral.replace(" ", "%").toUpperCase() + "%";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT e FROM " + Pessoa.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");
		sb.append("  AND e.tipoPessoa.morador = :p_tipoPessoaMorador \n");

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

		TypedQuery<Pessoa> query = this.getManager().createQuery(sb.toString(), Pessoa.class);

		if (filtroGeral != null) {
			query.setParameter("p_filtro", filtroGeral);
		}

		// Parametro fixo
		query.setParameter("p_tipoPessoaMorador", Flag.NAO);

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

		sb.append("SELECT COUNT(*) FROM " + Pessoa.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");
		sb.append("  AND e.tipoPessoa.morador = :p_tipoPessoaMorador \n");

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
		query.setParameter("p_tipoPessoaMorador", Flag.NAO);

		int count = query.getSingleResult().intValue();

		return count;
	}

	private void filtroGenerico(StringBuilder sb) {
		sb.append("   AND (\n");
		sb.append("      UPPER(e.nome) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.rg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.orgaoRg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.cpf) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.cnh) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.celular1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.celular2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.fone1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.fone2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.endereco) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.bairro) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.complemento) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.cidade) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.uf) LIKE :p_filtro\n");
		sb.append(")");
	}
}