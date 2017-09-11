package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.TipoPorta;

public class TipoPortaConverter implements AttributeConverter<TipoPorta, String> {

	@Override
	public String convertToDatabaseColumn(TipoPorta tipoPorta) {
		if (tipoPorta == null) {
			return null;
		}
		return tipoPorta.getValor();
	}

	@Override
	public TipoPorta convertToEntityAttribute(String source) {
		return TipoPorta.fromValue(source);
	}
}