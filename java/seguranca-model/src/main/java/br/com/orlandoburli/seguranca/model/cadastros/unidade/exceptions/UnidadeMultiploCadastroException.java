package br.com.orlandoburli.seguranca.model.cadastros.unidade.exceptions;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;

public class UnidadeMultiploCadastroException extends BusinessException {

	private static final long serialVersionUID = 1L;

	public UnidadeMultiploCadastroException(String message) {
		super(message);
	}
}