package br.com.orlandoburli.seguranca.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {

	ATIVO("A", "Ativo"), INATIVO("I", "Inativo");

	private String descricao;
	private String valor;

	Status(String valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	@JsonCreator
	public static Status fromValue(String source) {
		if ((source == null) || source.trim().isEmpty()) {
			return null;
		}
		for (Status status : Status.values()) {
			if (status.getValor().toUpperCase().equals(source.toUpperCase())) {
				return status;
			} else if (status.getDescricao().toUpperCase().equals(source.toUpperCase())) {
				return status;
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
