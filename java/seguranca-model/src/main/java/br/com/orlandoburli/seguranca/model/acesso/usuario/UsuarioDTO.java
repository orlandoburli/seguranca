package br.com.orlandoburli.seguranca.model.acesso.usuario;

import java.io.Serializable;

import br.com.orlandoburli.seguranca.model.acesso.perfil.PerfilDTO;

public class UsuarioDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String login;
	private String nome;
	private PerfilDTO perfil;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public PerfilDTO getPerfil() {
		if (this.perfil == null) {
			this.perfil = new PerfilDTO();
		}
		return this.perfil;
	}

	public void setPerfil(PerfilDTO perfil) {
		this.perfil = perfil;
	}
}