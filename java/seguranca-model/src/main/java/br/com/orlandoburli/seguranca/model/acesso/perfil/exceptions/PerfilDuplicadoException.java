package br.com.orlandoburli.seguranca.model.acesso.perfil.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.acesso.perfil.Perfil;

public class PerfilDuplicadoException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public PerfilDuplicadoException(String message) {
		super(message);
	}

	public PerfilDuplicadoException(Perfil perfil) {
		super("O perfil '" + perfil.getNome() + "' já existe e ainda se encontra ativo!");
	}

}