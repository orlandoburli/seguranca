package br.com.orlandoburli.seguranca.model.cadastros.bloco.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.bloco.Bloco;

public class BlocoDuplicadoException extends BusinessException {
	private static final long serialVersionUID = 1L;

	public BlocoDuplicadoException(String message) {
		super(message);
	}

	public BlocoDuplicadoException(Bloco bloco) {
		super("O bloco '" + bloco.getNome() + "' já existe e ainda se encontra ativo!");
	}

}