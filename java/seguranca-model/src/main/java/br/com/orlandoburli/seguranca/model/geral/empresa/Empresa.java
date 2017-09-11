package br.com.orlandoburli.seguranca.model.geral.empresa;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotEmpty;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.converters.StatusConverter;

@Entity
@Table(name = "EMPRESA")
public class Empresa extends AbstractEntity<UUID> implements IEmpresa {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "ID_EMPRESA", columnDefinition = "uuid")
	private UUID id;

	@Column(name = "NOME")
	@NotEmpty(message = "Campo Nome é obrigatório")
	private String nome;

	@Column(name = "ATIVO")
	@Convert(converter = StatusConverter.class)
	@NotNull(message = "Campo Ativo é obrigatório")
	private Status ativo;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	@Override
	public String getNome() {
		return this.nome;
	}

	@Override
	public void setNome(String nome) {
		this.nome = nome;
	}

	public Status getAtivo() {
		return this.ativo;
	}

	public void setAtivo(Status ativo) {
		this.ativo = ativo;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		// Faz nada...
	}

	@Override
	public IEmpresa getEmpresa() {
		return null;
	}

}
