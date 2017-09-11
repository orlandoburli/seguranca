package br.com.orlandoburli.seguranca.core.services;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.exceptions.ErrorField;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
public class CadastroResponse<T> {

	private T vo;

	private boolean success;

	private String message;

	private List<ErrorField> errors;

	public CadastroResponse(T vo, boolean success, String message) {
		this.vo = vo;
		this.success = success;
		this.message = message;

		this.errors = new ArrayList<>();
	}

	public T getVo() {
		return this.vo;
	}

	public void setVo(T vo) {
		this.vo = vo;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<ErrorField> getErrors() {
		return this.errors;
	}

	public void setErrors(List<ErrorField> errors) {
		this.errors = errors;
	}
}
