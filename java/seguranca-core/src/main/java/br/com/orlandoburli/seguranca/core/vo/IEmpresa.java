package br.com.orlandoburli.seguranca.core.vo;

import java.util.UUID;

public interface IEmpresa {

	UUID getId();

	void setId(UUID id);

	String getNome();

	void setNome(String nome);
}
