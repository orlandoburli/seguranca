package br.com.orlandoburli.seguranca.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoPorta {

	ENTRADA("E", "Entrada"), SAIDA("S", "Saída");

	private String descricao;
	private String valor;

	TipoPorta(String valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	public static TipoPorta fromValue(String source) {
		for (TipoPorta tp : TipoPorta.values()) {
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