package br.com.orlandoburli.seguranca.model.cadastros.torre.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.model.cadastros.torre.Torre;

public class TorreDuplicadaException extends BusinessException {
	private static final long serialVersionUID = 1L;

	public TorreDuplicadaException(String message) {
		super(message);
	}

	public TorreDuplicadaException(Torre torre) {
		super("A torre '" + torre.getNome() + "' já existe e ainda se encontra ativo!");
	}
}
