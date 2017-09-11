package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.TipoDestino;

public class TipoDestinoConverter implements AttributeConverter<String, TipoDestino> {

	@Override
	public TipoDestino convertToDatabaseColumn(String source) {
		return TipoDestino.fromValue(source);
	}

	@Override
	public String convertToEntityAttribute(TipoDestino tipoDestino) {
		if (tipoDestino == null) {
			return null;
		}
		return tipoDestino.getValor();
	}
}