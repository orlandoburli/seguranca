package br.com.orlandoburli.seguranca.core.enuns;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FormaLogoff {
	/**
	 * 1) Falta de interação - morto por timeout sem interação 2) Logoff manual
	 * do usuário 9) Outros
	 */

	SEM_INTERACAO(1, "Falta de interação"), LOGOFF_MANUAL(2, "Logoff manual"), HOST_DIFERENTE(3, "Host diferente do esperado"), LOGOFF_FORCADO_SUPORTE(4, "Logoff forçado pelo suporte"), OUTROS(9, "Outros");

	private String descricao;
	private Integer valor;

	FormaLogoff(Integer valor, String descricao) {
		this.setValor(valor);
		this.setDescricao(descricao);
	}

	public static FormaLogoff fromValue(String source) {
		for (FormaLogoff flag : FormaLogoff.values()) {
			if (flag.getValor().toString().equals(source)) {
				return flag;
			} else if (flag.getDescricao().toUpperCase().equals(source.toUpperCase())) {
				return flag;
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

	public Integer getValor() {
		return this.valor;
	}

	private void setValor(Integer valor) {
		this.valor = valor;
	}
}
