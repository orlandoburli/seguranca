package br.com.orlandoburli.seguranca.core.exceptions;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

public class BusinessException extends Exception {

	private static final long serialVersionUID = 1L;

	private List<ErrorField> errors;

	public BusinessException() {
		this.init();
	}

	public BusinessException(String message) {
		super(message);

		this.init();
	}

	public BusinessException(String message, List<ErrorField> errors) {
		super(message);

		this.errors = errors;
	}

	private void init() {
		this.setErrors(new ArrayList<ErrorField>());
	}

	public Status getErrorHttp() {
		return Response.Status.INTERNAL_SERVER_ERROR;
	}

	public List<ErrorField> getErrors() {
		return this.errors;
	}

	public void setErrors(List<ErrorField> errors) {
		this.errors = errors;
	}

}