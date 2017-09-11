package br.com.orlandoburli.seguranca.model.cadastros.unidade;

import java.util.List;
import java.util.UUID;

import javax.persistence.TypedQuery;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.model.enums.Status;

public class UnidadeDao extends AbstractDao<UUID, Unidade> {

	public Unidade getBy(String numeroUnidade) {

		this.getManager().clear();
		TypedQuery<Unidade> query = this.getManager().createQuery("SELECT e FROM " + Unidade.class.getSimpleName() + " e WHERE e.ativo = :ativo AND e.numero = :numero", Unidade.class);
		query.setParameter("ativo", Status.ATIVO);
		query.setParameter("numero", numeroUnidade);

		List<Unidade> list = query.getResultList();

		if (list.size() > 0) {
			return list.get(0);
		}

		return null;
	}
}