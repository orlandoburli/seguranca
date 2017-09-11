package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.FormaAutorizacao;

public class FormaAutorizacaoConverter implements AttributeConverter<String, FormaAutorizacao> {

	@Override
	public FormaAutorizacao convertToDatabaseColumn(String source) {
		return FormaAutorizacao.fromValue(source);
	}

	@Override
	public String convertToEntityAttribute(FormaAutorizacao formaAutorizacao) {
		if (formaAutorizacao != null) {
			return formaAutorizacao.getValor();
		}
		return null;
	}

}
