package br.com.orlandoburli.seguranca.model.tabelasbasicas.porta;

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
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.TipoPorta;
import br.com.orlandoburli.seguranca.model.enums.converters.StatusConverter;
import br.com.orlandoburli.seguranca.model.enums.converters.TipoPortaConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "PORTA")
public class Porta extends AbstractEntity<UUID> {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private UUID id;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Column(name = "NOME")
	@NotEmpty(message = "Nome é obrigatório")
	private String nome;

	@Column(name = "ATIVO")
	@Convert(converter = StatusConverter.class)
	@NotNull(message = "Ativo é obrigatório")
	private Status ativo;

	@Column(name = "TIPO")
	@Convert(converter = TipoPortaConverter.class)
	@NotNull(message = "Tipo de Porta é obrigatório!")
	private TipoPorta tipo;

	@Column(name = "COMANDO")
	private String comando;

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

	public TipoPorta getTipo() {
		return this.tipo;
	}

	public void setTipo(TipoPorta tipo) {
		this.tipo = tipo;
	}

	public String getComando() {
		return this.comando;
	}

	public void setComando(String comando) {
		this.comando = comando;
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