package br.com.orlandoburli.seguranca.model.cadastros.pessoa;

import java.util.Calendar;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.converters.DefaultCalendarSerializer;
import br.com.orlandoburli.seguranca.core.utils.StringUtils;
import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.model.cadastros.tipopessoa.TipoPessoa;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "PESSOA")
@JsonInclude(Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pessoa extends AbstractEntity<UUID> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "ID", columnDefinition = "uuid")
	private UUID id;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Column(name = "NOME")
	@NotEmpty(message = "Campo Nome é obrigatório")
	private String nome;

	@Column(name = "RG")
	private String rg;

	@Column(name = "ORGAO_RG")
	private String orgaoRg;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "ID_TIPO_PESSOA")
	private TipoPessoa tipoPessoa;

	@Column(name = "CPF")
	// @CPF
	private String cpf;

	@Column(name = "CNH")
	private String cnh;

	@Column(name = "CELULAR1")
	@NotEmpty(message = "Informe pelo menos 1 número de celular!")
	@Size(max = 11)
	private String celular1;

	@Column(name = "CELULAR2")
	@Size(max = 11)
	private String celular2;

	@Column(name = "FONE1")
	@Size(max = 11)
	private String fone1;

	@Column(name = "FONE2")
	@Size(max = 11)
	private String fone2;

	@Column(name = "CEP")
	private Integer cep;

	@Column(name = "ENDERECO")
	private String endereco;

	@Column(name = "BAIRRO")
	@Size(max = 100)
	private String bairro;

	@Column(name = "COMPLEMENTO")
	private String complemento;

	@Column(name = "CIDADE")
	private String cidade;

	@Column(name = "UF")
	private String uf;

	@Column(name = "OBSERVACOES")
	private String observacoes;

	@Column(name = "FOTO")
	private String foto;

	@Column(name = "DATA_CADASTRO")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data de cadastro não pode ser vazio")
	@JsonSerialize(contentUsing = DefaultCalendarSerializer.class)
	private Calendar dataCadastro;

	@Column(name = "DATA_ATUALIZACAO")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar dataAtualizacao;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	public String getBairro() {
		return this.bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCelular1() {
		return this.celular1;
	}

	public void setCelular1(String celular1) {
		this.celular1 = celular1;
	}

	public String getCelular2() {
		return this.celular2;
	}

	public void setCelular2(String celular2) {
		this.celular2 = celular2;
	}

	public Integer getCep() {
		return this.cep;
	}

	public void setCep(Integer cep) {
		this.cep = cep;
	}

	@JsonSetter
	public void setCep(String cep) {
		String s = StringUtils.filtrarNumero(cep);
		try {
			this.cep = Integer.parseInt(s);
		} catch (NumberFormatException e) {
			this.cep = null;
		}
	}

	public String getCidade() {
		return this.cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getCnh() {
		return this.cnh;
	}

	public void setCnh(String cnh) {
		this.cnh = cnh;
	}

	public String getComplemento() {
		return this.complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getCpf() {
		return this.cpf;
	}

	public void setCpf(String cpf) {
		if ((cpf != null) && cpf.trim().equals("")) {
			this.cpf = null;
		} else {
			this.cpf = cpf;
		}
	}

	public String getEndereco() {
		return this.endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getFone1() {
		return this.fone1;
	}

	public void setFone1(String fone1) {
		this.fone1 = fone1;
	}

	public String getFone2() {
		return this.fone2;
	}

	public void setFone2(String fone2) {
		this.fone2 = fone2;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getOrgaoRg() {
		return this.orgaoRg;
	}

	public void setOrgaoRg(String orgaoRg) {
		this.orgaoRg = orgaoRg;
	}

	public String getRg() {
		return this.rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getUf() {
		return this.uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public TipoPessoa getTipoPessoa() {
		return this.tipoPessoa;
	}

	public void setTipoPessoa(TipoPessoa tipoPessoa) {
		this.tipoPessoa = tipoPessoa;
	}

	public String getObservacoes() {
		return this.observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public String getFoto() {
		return this.foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Calendar getDataCadastro() {
		return this.dataCadastro;
	}

	public void setDataCadastro(Calendar dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Calendar getDataAtualizacao() {
		return this.dataAtualizacao;
	}

	public void setDataAtualizacao(Calendar dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
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