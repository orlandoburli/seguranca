package br.com.orlandoburli.seguranca.model.cadastros.bloco.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;

public class BlocoNaoEncontradoException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public BlocoNaoEncontradoException(String message) {
		super(message);
	}

}
