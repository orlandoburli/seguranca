package br.com.orlandoburli.seguranca.core.vo;

import java.util.Calendar;
import java.util.UUID;

public interface ISessaoUsuario {

	UUID getId();

	void setId(UUID id);

	void setEmpresa(IEmpresa empresa);

	IEmpresa getEmpresa();

	Calendar getDataCriacao();

	void setDataCriacao(Calendar dataCriacao);

	Calendar getUltimaInteracao();

	void setUltimaInteracao(Calendar ultimaInteracao);

	String getEnderecoIp();

	void setEnderecoIp(String enderecoIp);

	String getHostName();

	void setHostName(String hostName);

	IUsuario getUsuario();

	void setUsuario(IUsuario usuario);

}