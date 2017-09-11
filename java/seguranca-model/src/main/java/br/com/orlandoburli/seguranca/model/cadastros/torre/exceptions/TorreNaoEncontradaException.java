package br.com.orlandoburli.seguranca.model.cadastros.torre.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;

public class TorreNaoEncontradaException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public TorreNaoEncontradaException(String message) {
		super(message);
	}
}
