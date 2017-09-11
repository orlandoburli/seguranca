package br.com.orlandoburli.seguranca.model.acesso.perfil;

import java.io.Serializable;
import java.util.UUID;

public class PerfilDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private UUID id;
	private String nome;

	public UUID getId() {
		return this.id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
