package br.com.orlandoburli.seguranca.model.acesso.usuario;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.core.vo.IUsuario;
import br.com.orlandoburli.seguranca.model.acesso.perfil.Perfil;
import br.com.orlandoburli.seguranca.model.enums.Status;
import br.com.orlandoburli.seguranca.model.enums.converters.StatusConverter;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "USUARIO")
public class Usuario extends AbstractEntity<UUID> implements IUsuario {

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

	@Column(name = "ATIVO")
	@Convert(converter = StatusConverter.class)
	@NotNull(message = "Campo Ativo é obrigatório")
	private Status ativo;

	@Column(name = "LOGIN")
	@NotEmpty(message = "Campo Login é obrigatório")
	private String login;

	@Column(name = "SENHA")
	@Min(message = "Informe pelo menos {value} dígitos na senha!", value = 5)
	@NotEmpty(message = "Campo Senha é obrigatório")
	private String senha;

	@Transient
	private String confirmacaoSenha;

	@ManyToOne
	@NotNull(message = "Perfil do usuário é obrigatório")
	@JoinColumn(name = "ID_PERFIL")
	private Perfil perfil;

	/*
	 * (non-Javadoc)
	 *
	 * @see br.com.orlandoburli.seguranca.model.acesso.usuario.IUsuario#getId()
	 */
	@Override
	public UUID getId() {
		return this.id;
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * br.com.orlandoburli.seguranca.model.acesso.usuario.IUsuario#setId(java.
	 * lang.Integer)
	 */
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

	public Perfil getPerfil() {
		return this.perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	@Override
	public String getLogin() {
		return this.login;
	}

	@Override
	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return this.senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getConfirmacaoSenha() {
		return this.confirmacaoSenha;
	}

	public void setConfirmacaoSenha(String confirmacaoSenha) {
		this.confirmacaoSenha = confirmacaoSenha;
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
