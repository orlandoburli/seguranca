package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.Flag;

public class FlagConverter implements AttributeConverter<Flag, String> {

	@Override
	public String convertToDatabaseColumn(Flag flag) {
		if (flag == null) {
			return null;
		}
		return flag.getValor();
	}

	@Override
	public Flag convertToEntityAttribute(String source) {
		return Flag.fromValue(source);
	}

}