package br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;

public class LoginInvalidoException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public LoginInvalidoException(String message) {
		super(message);
	}

	public LoginInvalidoException() {
		super("Usuário / senha inválidos");
	}

	@Override
	public Status getErrorHttp() {
		return Response.Status.FORBIDDEN;
	}
}