package br.com.orlandoburli.seguranca.model.cadastros.veiculo;

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
import br.com.orlandoburli.seguranca.model.cadastros.morador.Morador;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.converters.StatusConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "VEICULO")
public class Veiculo extends AbstractEntity<UUID> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private UUID id;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Column(name = "PLACA")
	@NotEmpty(message = "Informe a placa!")
	private String placa;

	@Column(name = "MARCA")
	@NotEmpty(message = "Informe a marca do veículo!")
	private String marca;

	@Column(name = "MODELO")
	@NotEmpty(message = "Informe o modelo do veículo!")
	private String modelo;

	@Column(name = "COR")
	private String cor;

	@Column(name = "ANO")
	private Integer ano;

	@Column(name = "ATIVO")
	@Convert(converter = StatusConverter.class)
	@NotNull(message = "Campo Ativo é obrigatório")
	private Status ativo;

	@ManyToOne
	@JoinColumn(name = "ID_MORADOR")
	private Morador morador;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	public String getPlaca() {
		return this.placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getMarca() {
		return this.marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return this.modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public Integer getAno() {
		return this.ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public Morador getMorador() {
		return this.morador;
	}

	public void setMorador(Morador morador) {
		this.morador = morador;
	}

	public Status getAtivo() {
		return this.ativo;
	}

	public void setAtivo(Status ativo) {
		this.ativo = ativo;
	}

	public String getCor() {
		return this.cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
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
