package br.com.orlandoburli.seguranca.model.acesso.perfil;

import java.util.List;
import java.util.UUID;

import javax.persistence.TypedQuery;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

public class PerfilDao extends AbstractDao<UUID, Perfil> {

	public List<Perfil> buscarPorNome(String nome, Empresa empresa, Status ativo) {

		TypedQuery<Perfil> query = this.getManager().createQuery("SELECT e FROM " + this.getVOClass().getSimpleName() + " e WHERE TRIM(UPPER(e.nome)) LIKE (:p_nome) AND e.ativo = :p_ativo AND e.empresa.id = :p_empresa", this.getVOClass());
		query.setParameter("p_nome", nome.toUpperCase());
		query.setParameter("p_ativo", ativo);
		query.setParameter("p_empresa", empresa.getId());
		List<Perfil> list = query.getResultList();

		return list;
	}
}