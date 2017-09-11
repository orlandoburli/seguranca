package br.com.orlandoburli.seguranca.model.tabelasbasicas.estado;

public class Estado {

	private String id;

	private String nome;

	public Estado() {

	}

	public Estado(String id, String nome) {
		this.setId(id);
		this.setNome(nome);
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return this.id;
	}

}
