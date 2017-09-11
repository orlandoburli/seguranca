package br.com.orlandoburli.seguranca.core.exceptions;

public class ErrorField {
	private String fieldName;
	private String message;

	public ErrorField() {

	}

	public ErrorField(String message) {
		setMessage(message);
	}

	public ErrorField(String fieldName, String message) {
		setFieldName(fieldName);
		setMessage(message);
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}