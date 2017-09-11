package br.com.orlandoburli.seguranca.model.geral.parametro;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "PARAMETROS")
public class Parametro extends AbstractEntity<String> {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CHAVE")
	private String id;

	@Column(name = "VALOR")
	private String valor;

	@ManyToOne(targetEntity = Empresa.class)
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private IEmpresa empresa;

	@Override
	public String getId() {
		return this.id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	public String getValor() {
		return this.valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = empresa;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}
}
