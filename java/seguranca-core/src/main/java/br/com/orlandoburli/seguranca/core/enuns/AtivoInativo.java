package br.com.orlandoburli.seguranca.core.enuns;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.annotations.EnumType;

@EnumType(value = AtivoInativo.class)
@JsonSerialize()
public enum AtivoInativo implements IEnum<String>, Serializable {

	ATIVO("A", "Ativo"), INATIVO("I", "Inativo");

	private String valor;
	private String descricao;

	private AtivoInativo(String valor, String descricao) {
		this.valor = valor;
		this.descricao = descricao;
	}

	@Override
	@JsonValue
	public String getValor() {
		return this.valor;
	}

	public String getDescricao() {
		return this.descricao;
	}

	@JsonCreator
	public static AtivoInativo fromValue(String requisicao) {
		if (requisicao != null) {
			for (final AtivoInativo valorAtual : AtivoInativo.values()) {
				if (requisicao.equals(valorAtual.getValor()) || requisicao.equals(valorAtual.getDescricao())) {
					return valorAtual;
				}
			}
		}
		return null;
	}

	/**
	 * Método mantido para
	 *
	 * @param requisicao
	 * @return
	 */
	public static AtivoInativo fromString(String requisicao) {
		return fromValue(requisicao);
	}

}
