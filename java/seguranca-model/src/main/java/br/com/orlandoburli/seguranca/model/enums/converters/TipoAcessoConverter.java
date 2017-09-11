package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.TipoAcesso;

public class TipoAcessoConverter implements AttributeConverter<String, TipoAcesso> {

	@Override
	public TipoAcesso convertToDatabaseColumn(String source) {
		return TipoAcesso.fromValue(source);
	}

	@Override
	public String convertToEntityAttribute(TipoAcesso tipoAcesso) {
		if (tipoAcesso == null) {
			return null;
		}
		return tipoAcesso.getValor();
	}
}