package br.com.orlandoburli.seguranca.model.geral.sessaousuario;

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

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.orlandoburli.seguranca.core.vo.AbstractEntity;
import br.com.orlandoburli.seguranca.core.vo.IEmpresa;
import br.com.orlandoburli.seguranca.core.vo.ISessaoUsuario;
import br.com.orlandoburli.seguranca.core.vo.IUsuario;
import br.com.orlandoburli.seguranca.model.acesso.usuario.Usuario;
import br.com.orlandoburli.seguranca.model.geral.empresa.Empresa;

@Entity
@Table(name = "SESSAO_USUARIO")
public class SessaoUsuario extends AbstractEntity<UUID> implements ISessaoUsuario {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "ID_SESSAO", columnDefinition = "uuid")
	private UUID id;

	@ManyToOne
	@NotNull(message = "Empresa é obrigatório")
	@JoinColumn(name = "ID_EMPRESA")
	@JsonDeserialize(as = Empresa.class)
	@JsonSerialize(as = Empresa.class)
	private Empresa empresa;

	@Column(name = "DATA_CRIACAO")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data de criação é obrigatório")
	private Calendar dataCriacao;

	@Column(name = "ULTIMA_INTERACAO")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Data da última interação é obrigatório")
	private Calendar ultimaInteracao;

	@Column(name = "ENDERECO_IP")
	@NotEmpty(message = "Endereço IP é obrigatório")
	private String enderecoIp;

	@Column(name = "HOSTNAME")
	@NotEmpty(message = "Hostname é obrigatório")
	private String hostName;

	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	@NotNull(message = "Usuário é obrigatório")
	private Usuario usuario;

	@Override
	public UUID getId() {
		return this.id;
	}

	@Override
	public void setId(UUID id) {
		this.id = id;
	}

	@Override
	public void setEmpresa(IEmpresa empresa) {
		this.empresa = (Empresa) empresa;
	}

	@Override
	public IEmpresa getEmpresa() {
		return this.empresa;
	}

	@Override
	public Calendar getDataCriacao() {
		return this.dataCriacao;
	}

	@Override
	public void setDataCriacao(Calendar dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	@Override
	public Calendar getUltimaInteracao() {
		return this.ultimaInteracao;
	}

	@Override
	public void setUltimaInteracao(Calendar ultimaInteracao) {
		this.ultimaInteracao = ultimaInteracao;
	}

	@Override
	public String getEnderecoIp() {
		return this.enderecoIp;
	}

	@Override
	public void setEnderecoIp(String enderecoIp) {
		this.enderecoIp = enderecoIp;
	}

	@Override
	public String getHostName() {
		return this.hostName;
	}

	@Override
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	@Override
	public IUsuario getUsuario() {
		return this.usuario;
	}

	@Override
	public void setUsuario(IUsuario usuario) {
		this.usuario = (Usuario) usuario;
	}
}
