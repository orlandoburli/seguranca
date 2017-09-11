package br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;

public class LoginDuplicadoException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public LoginDuplicadoException(String message) {
		super(message);
	}

	public LoginDuplicadoException(Usuario usuario) {
		super("O login '" + usuario.getLogin() + "' já existe e ainda se encontra ativo!");
	}
}
