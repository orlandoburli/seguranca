package br.com.orlandoburli.seguranca.model.enums.converters;

import javax.persistence.AttributeConverter;

import br.com.orlandoburli.seguranca.model.enums.Status;

public class StatusConverter implements AttributeConverter<Status, String> {

	@Override
	public String convertToDatabaseColumn(Status status) {
		if (status == null) {
			return null;
		}
		return status.getValor();
	}

	@Override
	public Status convertToEntityAttribute(String source) {
		return Status.fromValue(source);
	}
}