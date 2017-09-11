package br.com.orlandoburli.seguranca.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoDestino {

	AREA_COMUM("A", "Área Comum"), UNIDADE("U", "Unidade");

	private String descricao;
	private String valor;

	TipoDestino(String valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	public static TipoDestino fromValue(String source) {
		for (TipoDestino tp : TipoDestino.values()) {
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
