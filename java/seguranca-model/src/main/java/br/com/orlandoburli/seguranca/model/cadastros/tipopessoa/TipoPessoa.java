package br.com.orlandoburli.seguranca.model.cadastros.tipopessoa;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.enums.Flag;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.converters.FlagConverter;
import br.com.orlandoburli.seguranca.model.enums.converters.StatusConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "TIPO_PESSOA")
public class TipoPessoa extends AbstractEntity<UUID> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "ID", columnDefinition = "uuid")
	private UUID id;

	@Column(name = "NOME")
	@NotEmpty(message = "Campo Nome é obrigatório")
	private String nome;

	@Column(name = "ATIVO")
	@Convert(converter = StatusConverter.class)
	@NotNull(message = "Campo Ativo é obrigatório")
	private Status ativo;

	@Column(name = "FLG_MORADOR")
	@Convert(converter = FlagConverter.class)
	@NotNull(message = "Campo Morador é obrigatório")
	private Flag morador;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Status getAtivo() {
		return this.ativo;
	}

	public void setAtivo(Status ativo) {
		this.ativo = ativo;
	}

	public Flag getMorador() {
		return this.morador;
	}

	public void setMorador(Flag morador) {
		this.morador = morador;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = (Empresa) empresa;
	}

}
