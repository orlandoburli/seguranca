package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import br.com.orlandoburli.seguranca.core.enuns.FormaLogoff;

@Converter
public class FormaLogoffConverter implements AttributeConverter<FormaLogoff, Integer> {

	@Override
	public Integer convertToDatabaseColumn(FormaLogoff forma) {
		if (forma == null) {
			return null;
		}
		return forma.getValor();
	}

	@Override
	public FormaLogoff convertToEntityAttribute(Integer source) {
		if (source != null) {
			return FormaLogoff.fromValue(source.toString());
		}
		return null;
	}

}