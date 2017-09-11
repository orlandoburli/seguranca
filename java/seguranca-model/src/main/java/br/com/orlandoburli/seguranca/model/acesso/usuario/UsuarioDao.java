package br.com.orlandoburli.seguranca.model.acesso.usuario;

import java.util.List;
import java.util.UUID;

import javax.persistence.TypedQuery;

import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

public class UsuarioDao extends AbstractDao<UUID, Usuario> {

	public Usuario buscarPorNome(String nome, Status status, Empresa empresa) {

		TypedQuery<Usuario> query = this.getManager().createQuery("SELECT e FROM " + this.getVOClass().getSimpleName() + " e WHERE TRIM(UPPER(e.nome)) LIKE (:p_nome) AND e.ativo = :p_ativo AND e.empresa.id = :p_empresa", this.getVOClass());

		query.setParameter("p_nome", nome.toUpperCase());
		query.setParameter("p_ativo", status);
		query.setParameter("p_empresa", empresa.getId());

		List<Usuario> list = query.getResultList();

		if (list.size() > 0) {
			return list.get(0);
		}

		return null;
	}

	public Usuario buscarPorLogin(String login, Status status, Empresa empresa) {

		TypedQuery<Usuario> query = this.getManager().createQuery("SELECT e FROM " + this.getVOClass().getSimpleName() + " e WHERE TRIM(UPPER(e.login)) LIKE (:p_login) AND e.ativo = :p_ativo AND e.empresa.id = :p_empresa", this.getVOClass());

		query.setParameter("p_login", login.toUpperCase());
		query.setParameter("p_ativo", status);
		query.setParameter("p_empresa", empresa.getId());

		List<Usuario> list = query.getResultList();

		if (list.size() > 0) {
			return list.get(0);
		}

		return null;
	}
}
