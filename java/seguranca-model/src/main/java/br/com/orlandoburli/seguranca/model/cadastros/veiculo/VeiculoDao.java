package br.com.orlandoburli.seguranca.model.cadastros.veiculo;

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

public class VeiculoDao extends AbstractDao<UUID, Veiculo> {

	@Inject
	private transient Logger log;

	public List<Veiculo> consultaGenerica(Map<String, String> filtros, Integer pageSize, Integer pageNumber, Map<String, String> order) {
		this.getManager().clear();

		String filtroGeral = filtros.get("filtroGeral");

		// Substitui espaços por % no like
		if (filtroGeral != null) {
			filtroGeral = "%" + filtroGeral.replace(" ", "%").toUpperCase() + "%";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("SELECT e FROM " + Veiculo.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");

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

		TypedQuery<Veiculo> query = this.getManager().createQuery(sb.toString(), Veiculo.class);

		if (filtroGeral != null) {
			query.setParameter("p_filtro", filtroGeral);
		}

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

		sb.append("SELECT COUNT(*) FROM " + Veiculo.class.getSimpleName() + " e\n");
		sb.append(" WHERE 1=1\n");

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

		int count = query.getSingleResult().intValue();

		return count;

	}

	private void filtroGenerico(StringBuilder sb) {
		sb.append("   AND (\n");
		sb.append("      UPPER(e.placa) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.modelo) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.marca) LIKE :p_filtro\n");
		sb.append("   OR str(e.ano) LIKE :p_filtro\n");
		sb.append("   OR UPPER(e.cor) LIKE :p_filtro\n");
		sb.append("   OR UPPER(e.morador.unidade.numero) LIKE :p_filtro\n");
		sb.append("   OR UPPER(e.morador.pessoa.nome) LIKE :p_filtro\n");
		sb.append("   OR UPPER(e.morador.pessoa.rg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.orgaoRg) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.cpf) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.cnh) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.celular1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.celular2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.fone1) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.fone2) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.endereco) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.bairro) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.complemento) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.cidade) LIKE :p_filtro \n");
		sb.append("   OR UPPER(e.morador.pessoa.uf) LIKE :p_filtro\n");
		sb.append(")");
	}
}