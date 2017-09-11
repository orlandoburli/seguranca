package br.com.orlandoburli.seguranca.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoAcesso {

	VISITANTE("V", "Visitante"), PRESTADOR("P", "Prestador de Serviços");

	private String descricao;
	private String valor;

	TipoAcesso(String valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	public static TipoAcesso fromValue(String source) {
		for (TipoAcesso tp : TipoAcesso.values()) {
			if (tp.getValor().toUpperCase().equals(source.toUpperCase())) {
				return tp;
			} else if (tp.getDescricao().toUpperCase().equals(source.toUpperCase())) {
				return tp;
			}
		}
		return null;
	}

	@Override
	public String toString() {
		return this.getDescricao();
	}

	@JsonValue
	public String getDescricao() {
		return this.descricao;
	}

	private void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getValor() {
		return this.valor;
	}

	private void setValor(String valor) {
		this.valor = valor;
	}
}