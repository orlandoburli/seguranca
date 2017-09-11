package br.com.orlandoburli.seguranca.model.acesso.usuario.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;

public class UsuarioDuplicadoException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public UsuarioDuplicadoException(String message) {
		super(message);
	}

	public UsuarioDuplicadoException(Usuario usuario) {
		super("O usuário '" + usuario.getNome() + "' já existe e ainda se encontra ativo!");
	}
}