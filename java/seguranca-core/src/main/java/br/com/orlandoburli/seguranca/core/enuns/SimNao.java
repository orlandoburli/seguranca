package br.com.orlandoburli.seguranca.core.enuns;

import javax.inject.Named;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@Named
public enum SimNao {

	NAO("N", "Não"), SIM("S", "Sim");

	private String valor;
	private String descricao;

	private SimNao(String valor, String descricao) {
		this.valor = valor;
		this.descricao = descricao;
	}

	@JsonValue
	public String getValor() {
		return this.valor;
	}

	public String getValorString() {
		return this.valor.toString();
	}

	public String getDescricao() {
		return this.descricao;
	}

	public static SimNao fromBoolean(boolean requisicao) {
		if (requisicao) {
			return SimNao.SIM;
		} else {
			return SimNao.NAO;
		}
	}

	@JsonCreator
	public static SimNao fromString(String requisicao) {
		if (requisicao != null) {
			for (SimNao valorAtual : SimNao.values()) {
				if (requisicao.equalsIgnoreCase(valorAtual.getValor())) {
					return valorAtual;
				} else if (requisicao.equalsIgnoreCase(valorAtual.getDescricao())) {
					return valorAtual;
				}
			}
		}
		return null;
	}

}
