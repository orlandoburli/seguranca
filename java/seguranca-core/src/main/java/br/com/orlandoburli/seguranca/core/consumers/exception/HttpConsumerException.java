package br.com.orlandoburli.seguranca.core.consumers.exception;

public class HttpConsumerException extends Exception {

	private static final long serialVersionUID = 1L;

	private int errorCode;

	public HttpConsumerException(String message, int errorCode) {
		super(message);
		this.setErrorCode(errorCode);
	}

	public int getErrorCode() {
		return this.errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
}
