package br.com.orlandoburli.seguranca.model.cadastros.torre;

import java.util.List;
import java.util.UUID;

import javax.persistence.TypedQuery;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.model.enums.Status;

public class TorreDao extends AbstractDao<UUID, Torre> {

	public List<Torre> buscarPorNome(String nome, Status ativo) {

		TypedQuery<Torre> query = this.getManager().createQuery("SELECT e FROM " + this.getVOClass().getSimpleName() + " e WHERE TRIM(UPPER(e.nome)) LIKE (:p_nome) AND e.ativo = :p_ativo", this.getVOClass());
		query.setParameter("p_nome", nome.toUpperCase());
		query.setParameter("p_ativo", ativo);
		List<Torre> list = query.getResultList();

		return list;
	}
}