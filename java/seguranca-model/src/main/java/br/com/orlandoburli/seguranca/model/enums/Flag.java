package br.com.orlandoburli.seguranca.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Flag {

	SIM("S", "Sim"), NAO("N", "Não");

	private String descricao;
	private String valor;

	Flag(String valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	public static Flag fromValue(String source) {
		for (Flag flag : Flag.values()) {
			if (flag.getValor().toUpperCase().equals(source.toUpperCase())) {
				return flag;
			} else if (flag.getDescricao().toUpperCase().equals(source.toUpperCase())) {
				return flag;
			}
		}
		return null;
	}

	@Override
	public String toString() {
		return getDescricao();
	}

	@JsonValue
	public String getDescricao() {
		return descricao;
	}

	private void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getValor() {
		return valor;
	}

	private void setValor(String valor) {
		this.valor = valor;
	}
}