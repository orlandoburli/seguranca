package br.com.orlandoburli.seguranca.model.acesso.usuario;

import java.io.Serializable;
import java.util.UUID;

public class LoginRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String login;

	private String senha;

	private UUID empresa;

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return this.senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public UUID getEmpresa() {
		return this.empresa;
	}

	public void setEmpresa(UUID empresa) {
		this.empresa = empresa;
	}
}
