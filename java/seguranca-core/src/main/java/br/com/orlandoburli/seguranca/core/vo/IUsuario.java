package br.com.orlandoburli.seguranca.core.vo;

import java.util.UUID;

public interface IUsuario {

	UUID getId();

	void setId(UUID id);

	String getNome();

	void setNome(String nome);

	String getLogin();

	void setLogin(String login);

	IEmpresa getEmpresa();

	void setEmpresa(IEmpresa empresa);

}