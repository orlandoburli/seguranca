package br.com.orlandoburli.seguranca.model.portaria.preliberacao;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.cadastros.morador.Morador;
import br.com.orlandoburli.seguranca.model.cadastros.pessoa.Pessoa;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "PRE_LIBERACAO")
public class PreLiberacao extends AbstractEntity<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private Integer id;

	@ManyToOne(targetEntity = Empresa.class)
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private IEmpresa empresa;

	@Column(name = "DATA_HORA")
	private Calendar dataHora;

	@Column(name = "DATA_LIBERACAO")
	private Calendar dataLiberacao;

	@ManyToOne
	@JoinColumn(name = "ID_MORADOR")
	private Morador morador;

	@ManyToOne
	@JoinColumn(name = "ID_PESSOA")
	private Pessoa pessoa;

	@Column(name = "OBSERVACOES")
	private String observacoes;

	@Override
	public Integer getId() {
		return this.id;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public Calendar getDataHora() {
		return this.dataHora;
	}

	public void setDataHora(Calendar dataHora) {
		this.dataHora = dataHora;
	}

	public Calendar getDataLiberacao() {
		return this.dataLiberacao;
	}

	public void setDataLiberacao(Calendar dataLiberacao) {
		this.dataLiberacao = dataLiberacao;
	}

	public Morador getMorador() {
		return this.morador;
	}

	public void setMorador(Morador morador) {
		this.morador = morador;
	}

	public Pessoa getPessoa() {
		return this.pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public String getObservacoes() {
		return this.observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = empresa;
	}
}